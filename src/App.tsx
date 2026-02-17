import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import StudentsPage from './pages/StudentsPage';
import CoursesPage from './pages/CoursesPage';
import TeachersPage from './pages/TeachersPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="teachers" element={<TeachersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
