export type DepartmentName =
  | 'Computer Science'
  | 'Mathematics'
  | 'Business'
  | 'Engineering'
  | 'Physics';

export interface Department {
  id: number;
  name: DepartmentName;
  color: string;
}

export const departments: Department[] = [
  { id: 1, name: 'Computer Science', color: 'bg-blue-100 text-blue-800' },
  { id: 2, name: 'Mathematics', color: 'bg-green-100 text-green-800' },
  { id: 3, name: 'Business', color: 'bg-yellow-100 text-yellow-800' },
  { id: 4, name: 'Engineering', color: 'bg-purple-100 text-purple-800' },
  { id: 5, name: 'Physics', color: 'bg-red-100 text-red-800' },
];

export function getDepartmentColor(department: string): string {
  return departments.find(d => d.name === department)?.color ?? 'bg-gray-100 text-gray-800';
}
