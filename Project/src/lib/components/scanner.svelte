<script lang="ts">
  import { supabase } from '$lib/supabaseclient';
  import type { definitions } from 'types/database/index';
  import {
    Html5QrcodeScanner,
    Html5QrcodeScanType,
    Html5QrcodeSupportedFormats
  } from 'html5-qrcode';
  import type { Html5QrcodeResult } from 'html5-qrcode/core';
  import { onMount } from 'svelte';
  export let promisedFood: Promise<definitions['Food']> | undefined = undefined;
  let html5QrcodeScanner: Html5QrcodeScanner;
  let paused = false;
  async function checkIfProductExists(barCode: string) {
    let { data: Food, error } = await supabase
      .from<definitions['Food']>('Food')
      .select('*')
      .eq('bar_code', barCode);
    if (error) {
      console.log(error);
      return false;
    }
    if (Food?.length === 0) {
      console.log('Product does not exist');
      console.log('Creating Product');
      const { data, error } = await supabase
        .from('Food')
        .insert({ bar_code: barCode });
      if (data) return data[0];
    }

    if (Food) return Food[0];
  }
  function resume() {
    paused = false;
    html5QrcodeScanner.resume();
  }
  async function onScanSuccess(decodedText: string, decodedResult: Html5QrcodeResult) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
    if (
      (decodedResult.result.format?.format === Html5QrcodeSupportedFormats.EAN_13 ||
        decodedResult.result.format?.format === Html5QrcodeSupportedFormats.EAN_8) &&
      decodedText.charAt(0) === '4'
    ) {
      html5QrcodeScanner.pause();
      paused = true;
      promisedFood = await checkIfProductExists(decodedText);
    }
  }

  function onScanFailure(error: string) {
    // handle the error as you like, for example:
  }

  let config = {
    fps: 10,
    qrbox: { width: 200, height: 50 },
    rememberLastUsedCamera: true,
    // Only support camera scan type.
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
  };
  onMount(() => {
    html5QrcodeScanner = new Html5QrcodeScanner('reader', config, /* verbose= */ false);
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  });
</script>

<div class="col-span-1 grid max-w-[500px] gap-4">
  <div id="reader" />
  {#if paused}
    <button on:click={resume} class="rounded-md border-2 border-orange-100 bg-orange-300 p-2"
      >Resume Scanning</button>
  {/if}
</div>
