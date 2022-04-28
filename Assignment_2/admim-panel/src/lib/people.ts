interface Staff {
    id: number;
    firstName: string;
    lastName?: string;
    dob?: Date;
    gender?: string;
    email: string;
}

interface Student extends Staff {
    department: Department;
}

enum Department{
    MATH = 'Mathematics',
    CS = 'Computer Science',
    BIO = 'Biology'
}


export type { Student , Staff};