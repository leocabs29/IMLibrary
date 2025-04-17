import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import AdminDashboard from './admin/components/adminDashboard';
import ViewBorrowedBooks from './admin/components/ViewBorrowedBooks';
import Homepage from './student/components/homepage';
import Login from './student/components/login';
import Signup from './student/components/signup';
import Dashboard from './student/components/dashboard';
import StudentDASHBOARD from './student/components/studentDASHBOARD';
import ProfilePage from './student/components/profilepage';
import BookCartPage from './student/components/bookcart';

function App() {
  return (
    <>
      {/* <AdminDashboard /> */}
      <StudentDASHBOARD />
      {/* <Login /> */}
    </>
  );
}

export default App;
