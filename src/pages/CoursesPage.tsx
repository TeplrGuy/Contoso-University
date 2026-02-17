import { BookOpen, Users } from 'lucide-react';
import { courses } from '../data/courses';
import { getDepartmentColor } from '../data/departments';

export default function CoursesPage() {
  const deptCounts = courses.reduce<Record<string, number>>((acc, c) => {
    acc[c.department] = (acc[c.department] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
        <p className="text-gray-500 mt-1">Browse all available courses and programs.</p>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <BookOpen className="w-4 h-4 text-blue-500" />
              <span className="font-mono font-semibold">{course.code}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{course.description}</p>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  {course.credits} credits
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDepartmentColor(course.department)}`}>
                  {course.department}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Users className="w-4 h-4" />
                <span>{course.students}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Departments Summary */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Departments</h3>
        <div className="flex flex-wrap gap-3">
          {Object.entries(deptCounts).map(([dept, count]) => (
            <span
              key={dept}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${getDepartmentColor(dept)}`}
            >
              {dept}
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/50 text-xs font-bold">
                {count}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
