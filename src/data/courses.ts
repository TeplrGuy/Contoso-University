export interface Course {
  id: number;
  code: string;
  title: string;
  description: string;
  credits: number;
  department: string;
  students: number;
}

export const courses: Course[] = [
  { id: 1, code: 'CS101', title: 'Introduction to Programming', description: 'Learn the fundamentals of programming using modern languages and tools.', credits: 3, department: 'Computer Science', students: 45 },
  { id: 2, code: 'CS201', title: 'Data Structures & Algorithms', description: 'Study fundamental data structures and algorithm design techniques.', credits: 4, department: 'Computer Science', students: 32 },
  { id: 3, code: 'CS301', title: 'Software Engineering', description: 'Learn software development methodologies, design patterns, and best practices.', credits: 3, department: 'Computer Science', students: 28 },
  { id: 4, code: 'MATH101', title: 'Calculus I', description: 'Introduction to differential and integral calculus with applications.', credits: 4, department: 'Mathematics', students: 55 },
  { id: 5, code: 'MATH201', title: 'Linear Algebra', description: 'Study of vector spaces, matrices, and linear transformations.', credits: 3, department: 'Mathematics', students: 38 },
  { id: 6, code: 'BUS101', title: 'Introduction to Business', description: 'Overview of business principles, management, and organizational behavior.', credits: 3, department: 'Business', students: 60 },
  { id: 7, code: 'ENG101', title: 'Engineering Fundamentals', description: 'Introduction to engineering principles, problem-solving, and design thinking.', credits: 4, department: 'Engineering', students: 42 },
  { id: 8, code: 'PHYS201', title: 'Physics II: Electromagnetism', description: 'Study of electric and magnetic fields, circuits, and electromagnetic waves.', credits: 4, department: 'Physics', students: 25 },
];
