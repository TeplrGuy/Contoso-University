import { BookOpen, UserCheck, Users, Crown } from 'lucide-react';
import { departments } from '../data/departments';
import { courses } from '../data/courses';
import { teachers } from '../data/teachers';

export default function DepartmentsPage() {
  const coursesPerDept = courses.reduce<Record<string, number>>((acc, c) => {
    acc[c.department] = (acc[c.department] || 0) + 1;
    return acc;
  }, {});

  const studentsPerDept = courses.reduce<Record<string, number>>((acc, c) => {
    acc[c.department] = (acc[c.department] || 0) + c.students;
    return acc;
  }, {});

  const teachersPerDept = teachers.reduce<Record<string, number>>((acc, t) => {
    acc[t.department] = (acc[t.department] || 0) + 1;
    return acc;
  }, {});

  const headPerDept = teachers.reduce<Record<string, string>>((acc, t) => {
    if (t.role === 'Department Head') acc[t.department] = t.name;
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Departments</h2>
        <p className="text-gray-500 mt-1">Academic departments and their programs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map(dept => {
          const courseCount = coursesPerDept[dept.name] ?? 0;
          const teacherCount = teachersPerDept[dept.name] ?? 0;
          const studentCount = studentsPerDept[dept.name] ?? 0;
          const head = headPerDept[dept.name];

          return (
            <div
              key={dept.id}
              data-testid="department-card"
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${dept.color}`}>
                  {dept.name}
                </span>
              </div>
              {head && (
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <Crown className="w-4 h-4 text-amber-500" />
                  <span>{head}</span>
                </div>
              )}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span>{courseCount} {courseCount === 1 ? 'course' : 'courses'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <UserCheck className="w-4 h-4 text-purple-500" />
                  <span>{teacherCount} {teacherCount === 1 ? 'faculty member' : 'faculty members'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-green-500" />
                  <span>{studentCount} {studentCount === 1 ? 'student enrolled' : 'students enrolled'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
