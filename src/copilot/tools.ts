import type { Student } from '../data/students';
import type { Course } from '../data/courses';
import type { Teacher } from '../data/teachers';
import { students } from '../data/students';
import { courses } from '../data/courses';
import { teachers } from '../data/teachers';

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, { type: string; description: string }>;
  handler: (params: Record<string, string>) => ToolResult;
}

export interface ToolResult {
  success: boolean;
  data: unknown;
  summary: string;
}

export const campusTools: ToolDefinition[] = [
  {
    name: 'searchStudents',
    description: 'Search for students by name, major, or email. Returns matching student records.',
    parameters: {
      query: { type: 'string', description: 'Search term to match against student name, major, or email' },
    },
    handler: ({ query }) => {
      const q = query.toLowerCase();
      const results: Student[] = students.filter(
        s => s.name.toLowerCase().includes(q) ||
             s.major.toLowerCase().includes(q) ||
             s.email.toLowerCase().includes(q)
      );
      return {
        success: true,
        data: results,
        summary: `Found ${results.length} student(s) matching "${query}"`,
      };
    },
  },
  {
    name: 'listCourses',
    description: 'List all available courses, optionally filtered by department.',
    parameters: {
      department: { type: 'string', description: 'Optional department name to filter by (e.g., "Computer Science")' },
    },
    handler: ({ department }) => {
      const results: Course[] = department
        ? courses.filter(c => c.department.toLowerCase().includes(department.toLowerCase()))
        : courses;
      return {
        success: true,
        data: results,
        summary: department
          ? `Found ${results.length} course(s) in "${department}"`
          : `Listing all ${results.length} courses`,
      };
    },
  },
  {
    name: 'getTeacherInfo',
    description: 'Get information about faculty members by name or department.',
    parameters: {
      query: { type: 'string', description: 'Teacher name or department to search for' },
    },
    handler: ({ query }) => {
      const q = query.toLowerCase();
      const results: Teacher[] = teachers.filter(
        t => t.name.toLowerCase().includes(q) ||
             t.department.toLowerCase().includes(q)
      );
      return {
        success: true,
        data: results,
        summary: `Found ${results.length} faculty member(s) matching "${query}"`,
      };
    },
  },
  {
    name: 'getUniversityStats',
    description: 'Get overall university statistics: total students, courses, faculty, and enrollments.',
    parameters: {},
    handler: () => {
      const totalEnrollments = students.reduce((sum, s) => sum + s.courses, 0);
      const stats = {
        totalStudents: students.length,
        totalCourses: courses.length,
        totalFaculty: teachers.length,
        totalEnrollments,
        departments: [...new Set(courses.map(c => c.department))],
      };
      return {
        success: true,
        data: stats,
        summary: `University has ${stats.totalStudents} students, ${stats.totalCourses} courses, ${stats.totalFaculty} faculty`,
      };
    },
  },
];

/** Invoke a tool by name with the given parameters */
export function invokeTool(toolName: string, params: Record<string, string>): ToolResult {
  const tool = campusTools.find(t => t.name === toolName);
  if (!tool) {
    return { success: false, data: null, summary: `Unknown tool: ${toolName}` };
  }
  return tool.handler(params);
}
