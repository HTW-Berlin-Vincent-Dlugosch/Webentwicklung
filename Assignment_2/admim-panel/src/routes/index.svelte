<script lang="ts">
	interface Credentials {
		username: string;
		password: string;
	}
	let adminSelected = false;
	const adminCredentials: Credentials = { username: 'Admin', password: 'Admin' };
	const staffCredentials: Credentials = { username: 'Staff', password: 'Staff' };
	let userInputName: string;
	let userInputPassword: string;
	let loginAttempts: number = 0;

	function attempLogin(credentials: Credentials) {
		if (credentials.username === userInputName && credentials.password === userInputPassword) {
			loginAttempts = 0;
			console.log('Login successful');
		} else {
			loginAttempts++;
			console.log('Login unsuccessful');
		}
	}
</script>

<div class="grid h-screen place-items-center">
	<form
		on:submit|preventDefault={() =>
			attempLogin(adminSelected ? adminCredentials : staffCredentials)}>
		<fieldset
			disabled={loginAttempts > 2}
			class="grid max-w-xs grid-cols-2 gap-4 rounded-md border-2 p-4">
			<div
				on:click={() => (adminSelected = false)}
				class="basis-1/2 cursor-pointer rounded-md p-2 text-center
            	{adminSelected ? '' : 'bg-blue-500'}
				{loginAttempts > 2 ? ' cursor-not-allowed bg-slate-300' : 'bg-blue-300  hover:bg-blue-400'}">
				Staff Login
			</div>
			<div
				on:click={() => (adminSelected = true)}
				class="basis-1/2 cursor-pointer rounded-md p-2 text-center
            	{adminSelected ? 'bg-blue-500' : ''}
				{loginAttempts > 2 ? ' cursor-not-allowed bg-slate-300' : 'bg-blue-300  hover:bg-blue-400'}">
				Admin Login
			</div>
			<input
				type="text"
				name="username"
				required
				placeholder="Username"
				bind:value={userInputName}
				class="col-span-2 rounded-md" />
			<input
				type="password"
				name="password"
				required
				placeholder="Password"
				bind:value={userInputPassword}
				class="col-span-2 rounded-md" />
			<input
				type="submit"
				value="Log In"
				class=" col-span-2 cursor-pointer rounded-md p-2
				{loginAttempts > 2 ? ' cursor-not-allowed bg-slate-300' : 'bg-blue-300  hover:bg-blue-400'}" />
		</fieldset>
		{#if loginAttempts > 2}
			<div class="text-center text-red-500">Too many login attempts.</div>
		{/if}
	</form>
</div>
