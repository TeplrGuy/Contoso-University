import { BookOpen, Users } from 'lucide-react';
import { departments } from '../data/departments';
import { courses } from '../data/courses';
import { teachers } from '../data/teachers';

export default function DepartmentsPage() {
  const courseCounts = courses.reduce<Record<string, number>>((acc, c) => {
    acc[c.department] = (acc[c.department] || 0) + 1;
    return acc;
  }, {});

  const facultyCounts = teachers.reduce<Record<string, number>>((acc, t) => {
    acc[t.department] = (acc[t.department] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Departments</h2>
        <p className="text-gray-500 mt-1">Academic departments and their associated courses and faculty.</p>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map(dept => (
          <div key={dept.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${dept.color}`}>
                {dept.name}
              </span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <BookOpen className="w-4 h-4 text-blue-500" />
                <span>{courseCounts[dept.name] ?? 0} courses</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4 text-purple-500" />
                <span>{facultyCounts[dept.name] ?? 0} faculty</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
