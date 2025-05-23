import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdminDashboard from './admin/components/adminDashboard';
import ViewBorrowedBooks from './admin/components/ViewBorrowedBooks';
import Homepage from './student/components/homepage';
import Login from './student/components/login';
import Signup from './student/components/signup';
import StudentDASHBOARD from './student/components/studentDASHBOARD';
import ProfilePage from './student/components/profilepage';
import BookCartPage from './student/components/bookcart';
import SearchBook from './student/components/searchBook';
import ViewBookPage from './student/components/Viewbook';
import StudentDashboard from './student/components/StudentDashboard2';
function App() {
  return (
    <Router>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-borrowed-books" element={<ViewBorrowedBooks />} />
        <Route path="/student-dashboard" element={<StudentDASHBOARD />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<BookCartPage />} />
        <Route path="/search" element={<SearchBook />} />
        <Route path="/view-books" element={<ViewBookPage />} />
        <Route path="/student-dashboard2" element={<StudentDashboard/>} />

        
      </Routes>
    </Router>
  );
}

export default App;
