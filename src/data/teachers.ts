export interface Teacher {
  id: number;
  name: string;
  email: string;
  department: string;
  office: string;
  role: string;
}

export const teachers: Teacher[] = [
  { id: 1, name: 'Dr. Sarah Anderson', email: 's.anderson@contoso.edu', department: 'Computer Science', office: 'Room 301', role: 'Department Head' },
  { id: 2, name: 'Prof. Michael Chen', email: 'm.chen@contoso.edu', department: 'Mathematics', office: 'Room 205', role: 'Senior Professor' },
  { id: 3, name: 'Dr. Jennifer Martinez', email: 'j.martinez@contoso.edu', department: 'Business', office: 'Room 412', role: 'Associate Professor' },
  { id: 4, name: 'Prof. David Thompson', email: 'd.thompson@contoso.edu', department: 'Engineering', office: 'Room 108', role: 'Professor' },
  { id: 5, name: 'Dr. Lisa Roberts', email: 'l.roberts@contoso.edu', department: 'Physics', office: 'Room 503', role: 'Assistant Professor' },
  { id: 6, name: 'Prof. James Taylor', email: 'j.taylor@contoso.edu', department: 'Computer Science', office: 'Room 302', role: 'Professor' },
];
