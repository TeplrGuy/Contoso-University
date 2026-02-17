import { Link } from 'react-router-dom';
import { Users, BookOpen, UserCheck, GraduationCap, ArrowRight } from 'lucide-react';
import { students } from '../data/students';
import { courses } from '../data/courses';
import { teachers } from '../data/teachers';

const totalEnrollments = students.reduce((sum, s) => sum + s.courses, 0);

const stats = [
  { label: 'Total Students', value: students.length, icon: Users, color: 'bg-blue-500', bgColor: 'bg-blue-50' },
  { label: 'Active Courses', value: courses.length, icon: BookOpen, color: 'bg-green-500', bgColor: 'bg-green-50' },
  { label: 'Faculty Members', value: teachers.length, icon: UserCheck, color: 'bg-purple-500', bgColor: 'bg-purple-50' },
  { label: 'Total Enrollments', value: totalEnrollments, icon: GraduationCap, color: 'bg-orange-500', bgColor: 'bg-orange-50' },
];

const quickLinks = [
  { to: '/students', label: 'Students', description: 'View and manage student records', icon: Users, color: 'text-blue-600' },
  { to: '/courses', label: 'Courses', description: 'Browse available courses and programs', icon: BookOpen, color: 'text-green-600' },
  { to: '/teachers', label: 'Teachers', description: 'Faculty directory and information', icon: UserCheck, color: 'text-purple-600' },
];

export default function HomePage() {
  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Welcome to Contoso University</h2>
        <p className="text-gray-500 mt-1">Manage students, courses, and faculty all in one place.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, color, bgColor }) => (
          <div key={label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
            <div className={`${bgColor} p-3 rounded-lg`}>
              <Icon className={`w-6 h-6 text-white ${color} rounded p-0.5`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickLinks.map(({ to, label, description, icon: Icon, color }) => (
            <Link
              key={to}
              to={to}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-8 h-8 ${color}`} />
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <h4 className="font-semibold text-gray-900">{label}</h4>
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
