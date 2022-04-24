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
	$: console.log(userInputName);
	$: console.log(userInputPassword);

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

<div class="grid h-screen">
	<div class="grid max-w-xs grid-cols-2 gap-4 place-self-center rounded-md border-2 p-4">
		<div
			on:click={() => (adminSelected = false)}
			class="basis-1/2 cursor-pointer rounded-md bg-blue-300 
            {adminSelected ? 'bg-blue-300 hover:bg-blue-400' : 'bg-blue-500'} p-2 text-center">
			Staff Login
		</div>
		<div
			on:click={() => (adminSelected = true)}
			class="basis-1/2 cursor-pointer rounded-md 
            {adminSelected ? 'bg-blue-500' : 'bg-blue-300 hover:bg-blue-400'} p-2 text-center">
			Admin Login
		</div>
		<input
			type="text"
			name="username"
			placeholder="Username"
			bind:value={userInputName}
			class="col-span-2 rounded-md" />
		<input
			type="password"
			name="password"
			placeholder="Password"
			bind:value={userInputPassword}
			class="col-span-2 rounded-md" />
		<input
			on:click={() =>
				adminSelected ? attempLogin(adminCredentials) : attempLogin(staffCredentials)}
			type="button"
			value="Log In"
			class=" col-span-2 cursor-pointer rounded-md bg-blue-300 p-2 hover:bg-blue-400" />
	</div>
</div>
