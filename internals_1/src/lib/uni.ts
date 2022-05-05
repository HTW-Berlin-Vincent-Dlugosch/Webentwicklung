interface Person {
	id: number;
	firstName: string;
	lastName: string;
	dob?: Date;
	gender: string;
	email: string;
}

class Staff implements Person {
	id;
	firstName;
	lastName;
	dob?;
	gender;
	email;
	#idGenerator: IdGenerator;

	constructor(
		idGenerator: IdGenerator,
		firstName: string,
		lastName: string,
		gender: string,
		email: string,
		dob?: Date
	) {
		this.#idGenerator = idGenerator;
		this.id = this.#idGenerator.generateId();
		this.firstName = firstName;
		this.lastName = lastName;
		this.dob = dob;
		this.gender = gender;
		this.email = email;
	}
}

class Student implements Person {
	id;
	firstName;
	lastName;
	dob?;
	gender;
	email;
	department: Departments;
	#idGenerator: IdGenerator;

	constructor(
		idGenerator: IdGenerator,
		firstName: string,
		lastName: string,
		gender: string,
		email: string,
		department: Departments,
		dob?: Date
	) {
		this.#idGenerator = idGenerator;
		this.id = this.#idGenerator.generateId();
		this.firstName = firstName;
		this.lastName = lastName;
		this.dob = dob;
		this.gender = gender;
		this.email = email;
		this.department = department;
	}
}

class IdGenerator {
	lastId: number;
	constructor(start: number) {
		this.lastId = start;
	}
	generateId(): number {
		this.lastId = this.lastId + 1;
		return this.lastId;
	}
}

enum Departments {
	MATH = 'Mathematics',
	CS = 'Computer Science',
	BIO = 'Biology'
}

class Course {
	name: string;
	students: Student[] = [];
	constructor(name: string) {
		this.name = name;
	}

	addStudent(student: Student) {
		this.students.push(student);
	}
}

export { Course, Student, Staff, IdGenerator };
export { Departments };
