interface Person {
	id: number;
	firstName: string;
	lastName: string;
	dob?: Date;
	gender: string;
	email: string;
}

class Staff implements Person {
	id: number;
	firstName: string;
	lastName: string;
	dob?: Date;
	gender: string;
	email: string;
	constructor(firstName: string, lastName: string, gender: string, email: string, dob?: Date) {
		this.id = Math.floor(100000 + Math.random() * 900000);
		this.firstName = firstName;
		this.lastName = lastName;
		this.dob = dob;
		this.gender = gender;
		this.email = email;
	}
}

class Student implements Person {
	id: number;
	firstName: string;
	lastName: string;
	dob?: Date;
	gender: string;
	email: string;
	department: Departments;
	constructor(
		firstName: string,
		lastName: string,
		gender: string,
		email: string,
		department: Departments,
		dob?: Date
	) {
		this.id = Math.floor(100000 + Math.random() * 900000);
		this.firstName = firstName;
		this.lastName = lastName;
		this.dob = dob;
		this.gender = gender;
		this.email = email;
		this.department = department;
	}
}

enum Departments {
	MATH = 'Mathematics',
	CS = 'Computer Science',
	BIO = 'Biology'
}

export { Student, Staff };
export type { Person };
export { Departments };
