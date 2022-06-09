abstract class Person {
  id: number;
  firstName: string;
  lastName: string;
  dob?: Date;
  gender: string;
  email: string;
  #idGenerator: IdGenerator;

  abstract getProperties(): string[];
  // abstract getPropertieNames(): string[];
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

class Staff extends Person {
  constructor(
    idGenerator: IdGenerator,
    firstName: string,
    lastName: string,
    gender: string,
    email: string,
    dob?: Date
  ) {
    super(idGenerator, firstName, lastName, gender, email, dob);
  }
  getProperties(): string[] {
    return [
      this.id.toString(),
      this.firstName,
      this.lastName,
      this.dob?.toLocaleDateString() || 'N/A',
      this.gender,
      this.email
    ];
  }
  static getPropertieNames(): string[] {
    return ['ID', 'First Name', 'Last Name', 'DOB', 'Gender', 'E-Mail'];
  }
}

class Student extends Person {
  department: Departments;
  joinDate: Date;
  constructor(
    idGenerator: IdGenerator,
    firstName: string,
    lastName: string,
    gender: string,
    email: string,
    department: Departments,
    joinDate: Date,
    dob?: Date
  ) {
    super(idGenerator, firstName, lastName, gender, email, dob);
    this.department = department;
    this.joinDate = joinDate;
  }
  getProperties(): string[] {
    return [
      this.id.toString(),
      this.firstName,
      this.lastName,
      this.dob?.toLocaleDateString() || 'N/A',
      this.gender,
      this.email,
      this.department,
      this.joinDate?.toLocaleDateString()
    ];
  }
  static getPropertieNames(): string[] {
    return ['ID', 'First Name', 'Last Name', 'DOB', 'Gender', 'E-Mail', 'Department', 'JoinDate'];
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
