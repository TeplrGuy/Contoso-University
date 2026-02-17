export interface Department {
  name: string;
  color: string;
}

export const departments: Department[] = [
  { name: 'Computer Science', color: 'bg-blue-100 text-blue-800' },
  { name: 'Mathematics', color: 'bg-green-100 text-green-800' },
  { name: 'Business', color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Engineering', color: 'bg-purple-100 text-purple-800' },
  { name: 'Physics', color: 'bg-red-100 text-red-800' },
];

export function getDepartmentColor(department: string): string {
  return departments.find(d => d.name === department)?.color ?? 'bg-gray-100 text-gray-800';
}
