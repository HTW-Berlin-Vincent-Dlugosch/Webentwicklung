<script lang="ts">
	import { goto } from '$app/navigation';
import { currentUser } from '$lib/stores';
	import { User, UserGroup } from '$lib/user';

	const availabeUsers = [
		new User('Admin', 'Admin', UserGroup.ADMIN),
		new User('Staff', 'Staff', UserGroup.STAFF)
	];

	let loginAttempts: number = 0;

	function submitForm(event: SubmitEvent) {
		const formData = new FormData(event.target as HTMLFormElement);
		const userName = formData.get('username') as string;
		const userPassword = formData.get('password') as string;
		const userGroup = formData.get('userGroup') as UserGroup;

		for (let user of availabeUsers) {
			if (user.validate(userName, userPassword, userGroup)) {
				currentUser.set(user);
				loginAttempts = 0;
				console.log('Login successful');
				// goto(`/${user.group}`);
				return;
			}
		}

		console.log('Login unsuccessful');
		loginAttempts++;
	}
</script>

<div class="grid h-screen place-items-center">
	<form on:submit|preventDefault={(event) => submitForm(event)}>
		<fieldset
			disabled={loginAttempts > 2}
			class="grid max-w-xs grid-cols-2 gap-4 rounded-md border-2 p-4">
			<label class="col-span-1">
				<input
					checked
					type="radio"
					class="peer hidden"
					name="userGroup"
					value={UserGroup.STAFF}
					required />
				<div
					class="cursor-pointer rounded-md bg-blue-300 p-2 text-center hover:bg-blue-400 peer-checked:bg-blue-500 peer-disabled:cursor-not-allowed peer-disabled:bg-slate-300">
					Staff Login
				</div>
			</label>
			<label class="col-span-1">
				<input type="radio" class="peer hidden" name="userGroup" value={UserGroup.ADMIN} required />
				<div
					class="cursor-pointer rounded-md bg-blue-300 p-2 text-center hover:bg-blue-400 peer-checked:bg-blue-500 peer-disabled:cursor-not-allowed peer-disabled:bg-slate-300">
					Admin Login
				</div>
			</label>
			<input
				type="text"
				name="username"
				required
				placeholder="Username"
				class="col-span-2 rounded-md" />
			<input
				type="password"
				name="password"
				required
				placeholder="Password"
				class="col-span-2 rounded-md" />
			<input
				type="submit"
				value="Log In"
				class=" col-span-2 cursor-pointer rounded-md bg-blue-300 p-2 hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-slate-300" />
		</fieldset>
		{#if loginAttempts > 2}
			<div class="text-center text-red-500">Too many login attempts.</div>
		{/if}
	</form>
</div>
