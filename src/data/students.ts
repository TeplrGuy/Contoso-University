export interface Student {
  id: number;
  name: string;
  email: string;
  major: string;
  enrollmentDate: string;
  courses: number;
}

export const students: Student[] = [
  { id: 1, name: 'Emma Johnson', email: 'emma.johnson@contoso.edu', major: 'Computer Science', enrollmentDate: '2024-09-01', courses: 4 },
  { id: 2, name: 'Liam Williams', email: 'liam.williams@contoso.edu', major: 'Mathematics', enrollmentDate: '2024-09-01', courses: 3 },
  { id: 3, name: 'Olivia Brown', email: 'olivia.brown@contoso.edu', major: 'Business Administration', enrollmentDate: '2024-01-15', courses: 3 },
  { id: 4, name: 'Noah Davis', email: 'noah.davis@contoso.edu', major: 'Engineering', enrollmentDate: '2024-01-15', courses: 2 },
  { id: 5, name: 'Ava Miller', email: 'ava.miller@contoso.edu', major: 'Computer Science', enrollmentDate: '2023-09-01', courses: 4 },
  { id: 6, name: 'Ethan Wilson', email: 'ethan.wilson@contoso.edu', major: 'Physics', enrollmentDate: '2023-09-01', courses: 2 },
];
