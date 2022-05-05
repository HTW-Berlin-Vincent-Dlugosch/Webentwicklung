<script context="module">
	import { IdGenerator } from '$lib/uni';
	export const staffIdGenerator = new IdGenerator(1000);
	export const studentIdGenerator = new IdGenerator(2000);
</script>

<script lang="ts">
	import { Departments, Staff, Student } from '$lib/uni';
	import { staff, students } from '$lib/stores';
	export let studentForm: boolean;
	function addPerson(event: SubmitEvent) {
		let form = new FormData(event.target as HTMLFormElement);
		let firstName = form.get('firstName') as string;
		let lastName = form.get('lastName') as string;
		let dob = form.get('dob') ? new Date(form.get('dob') as string) : undefined;
		let gender = form.get('gender') as string;
		let email = form.get('email') as string;
		let department = form.get('department') as Departments;
		if (department) {
			let newStudent = new Student(
				studentIdGenerator,
				firstName,
				lastName,
				gender,
				email,
				department,
				dob
			);
			students.update((m) => m.set(newStudent.id, newStudent));
		} else {
			let newStaff = new Staff(staffIdGenerator, firstName, lastName, gender, email, dob);
			staff.update((m) => m.set(newStaff.id, newStaff));
		}
	}
</script>

<form
	on:submit|preventDefault={(event) => addPerson(event)}
	class="col-span-2 grid grid-cols-2 gap-4 rounded-md border-2 p-4">
	<input
		required
		type="text"
		name="firstName"
		placeholder="First Name"
		class="col-span-1 rounded-md" />
	<input type="text" name="lastName" placeholder="Last Name" class="col-span-1 rounded-md" />
	<input type="date" name="dob" placeholder="Last Name" class="col-span-1 rounded-md" />
	<input type="email" name="email" placeholder="E-Mail" class="col-span-1 rounded-md" required />
	<label class="col-span-1">
		<input type="radio" class="peer hidden" name="gender" value="Female" />
		<div
			class="cursor-pointer rounded-md bg-blue-300 p-2 text-center hover:bg-blue-400 peer-checked:bg-blue-500 peer-disabled:cursor-not-allowed peer-disabled:bg-slate-300">
			Female
		</div>
	</label>
	<label class="col-span-1">
		<input type="radio" class="peer hidden" name="gender" value="Male" />
		<div
			class="cursor-pointer rounded-md bg-blue-300 p-2 text-center hover:bg-blue-400 peer-checked:bg-blue-500 peer-disabled:cursor-not-allowed peer-disabled:bg-slate-300">
			Male
		</div>
	</label>
	<label class="col-span-1">
		<input type="radio" class="peer hidden" name="gender" value="Other" />
		<div
			class="cursor-pointer rounded-md bg-blue-300 p-2 text-center hover:bg-blue-400 peer-checked:bg-blue-500 peer-disabled:cursor-not-allowed peer-disabled:bg-slate-300">
			Other
		</div>
	</label>
	<label class="col-span-1">
		<input checked type="radio" class="peer hidden" name="gender" value="N/A" />
		<div
			class="cursor-pointer rounded-md bg-blue-300 p-2 text-center hover:bg-blue-400 peer-checked:bg-blue-500 peer-disabled:cursor-not-allowed peer-disabled:bg-slate-300">
			Prefer Not To Say
		</div>
	</label>
	{#if studentForm}
		<select name="department" class="col-span-2 rounded-md">
			{#each Object.entries(Departments) as department}
				<option value={department[0]}>{department[1]}</option>
			{/each}
		</select>
	{/if}
	<button
		type="submit"
		class="col-span-2 cursor-pointer rounded-md bg-blue-300 p-2 hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-slate-300"
		>{studentForm ? 'Add Student' : 'Add Staff'}</button>
</form>
