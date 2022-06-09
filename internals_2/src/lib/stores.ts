import type { User } from '$lib/user';
import { writable } from 'svelte/store';
import { Course, Departments, IdGenerator, type Staff, Student } from '$lib/uni';
import { faker } from '@faker-js/faker';
export const currentUser = writable<User>();
export const students = writable<Map<number, Student>>(new Map());
export const staff = writable<Map<number, Staff>>(new Map());

const exampleCourses = [
  new Course('Mathematics'),
  new Course('Database'),
  new Course('Programming')
];
const exampleStudentIdGenerator: IdGenerator = new IdGenerator(3000);
function getDateStringMinusYears(offset: number) {
  const date = new Date();
  date.setFullYear(date.getFullYear() - offset);
  return date.toISOString().slice(0, 10);
}
for (const exampleCourse of exampleCourses) {
  for (let i = 0; i < 10; i++) {
    exampleCourse.addStudent(
      new Student(
        exampleStudentIdGenerator,
        faker.name.firstName(),
        faker.name.lastName(),
        'N/A',
        faker.internet.email(),
        faker.helpers.arrayElement(Object.values(Departments)),
        faker.date.between('2010-01-01', '2020-01-01'),
        faker.date.between(getDateStringMinusYears(60),getDateStringMinusYears(17))
      )
    );
  }
}

export const courses = writable<Course[]>(exampleCourses);
