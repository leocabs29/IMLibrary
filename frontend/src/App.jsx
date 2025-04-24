import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './admin/components/adminDashboard';
import ViewBorrowedBooks from './admin/components/ViewBorrowedBooks';
import Homepage from './student/components/homepage';
import Login from './student/components/login';
import Signup from './student/components/signup';
import Dashboard from './student/components/dashboard';
import StudentDASHBOARD from './student/components/studentDASHBOARD';
import ProfilePage from './student/components/profilepage';
import BookCartPage from './student/components/bookcart';
import SearchBook from './student/components/searchBook';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-borrowed-books" element={<ViewBorrowedBooks />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student-dashboard" element={<StudentDASHBOARD />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<BookCartPage />} />
        <Route path="/search" element={<SearchBook />} />
      </Routes>
    </Router>
  );
}

export default App;
