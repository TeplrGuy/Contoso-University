import { Mail, MapPin, Briefcase } from 'lucide-react';
import { teachers } from '../data/teachers';
import { getDepartmentColor } from '../data/departments';

function getInitials(name: string) {
  const parts = name.replace(/^(Dr\.|Prof\.)\s*/, '').trim().split(' ');
  return parts.map(p => p[0]).join('');
}

export default function TeachersPage() {
  const deptGroups = teachers.reduce<Record<string, number>>((acc, t) => {
    acc[t.department] = (acc[t.department] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Teachers</h2>
        <p className="text-gray-500 mt-1">Faculty directory and department information.</p>
      </div>

      {/* Teacher Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {teachers.map(teacher => (
          <div key={teacher.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                {getInitials(teacher.name)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{teacher.name}</h3>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getDepartmentColor(teacher.department)}`}>
                  {teacher.department}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-gray-400" />
                {teacher.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-gray-400" />
                {teacher.office}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Briefcase className="w-4 h-4 text-gray-400" />
                {teacher.role}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Faculty by Department */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Faculty by Department</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {Object.entries(deptGroups).map(([dept, count]) => (
            <div key={dept} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{count}</p>
              <p className="text-sm text-gray-500 mt-1">{dept}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
