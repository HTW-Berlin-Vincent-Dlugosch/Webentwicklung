<script lang="ts">
  import { supabase } from '$lib/supabaseclient';
  import type { definitions } from 'types/database/index';
  import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
  import type { Html5QrcodeResult } from 'html5-qrcode/core';
  import { onMount } from 'svelte';
  import Addoreditproduct from '$lib/components/addoreditproduct.svelte';

  let promisedFood: Promise<definitions['Food']> | undefined = undefined;

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
      const { data, error } = await supabase.from('Food').insert({ bar_code: barCode });
      if (data) return data[0];
    }

    if (Food) return Food[0];
  }

  onMount(() => {
    async function onScanSuccess(decodedText: string, decodedResult: Html5QrcodeResult) {
      // handle the scanned code as you like, for example:
      console.log(`Code matched = ${decodedText}`, decodedResult);
      promisedFood = await checkIfProductExists(decodedText);
    }

    function onScanFailure(error: string) {
      // handle the error as you like, for example:
    }

    let config = {
      fps: 10,
      qrbox: { width: 250, height: 100 },
      rememberLastUsedCamera: true,
      // Only support camera scan type.
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
    };

    let html5QrcodeScanner = new Html5QrcodeScanner('reader', config, /* verbose= */ false);
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  });
</script>

<div class="max-w-[300px]" id="reader" />

{#if promisedFood}
  {#await promisedFood}
    <div>Waiting</div>
  {:then food}
    <Addoreditproduct {food} />
  {:catch error}
    <div>{error}</div>
  {/await}
{/if}
