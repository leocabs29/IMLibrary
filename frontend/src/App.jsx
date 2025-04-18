import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import AdminDashboard from './admin/components/adminDashboard';
import ViewBorrowedBooks from './admin/components/ViewBorrowedBooks';
import Homepage from './student/components/homepage';
import Login from './student/components/login';
import Signup from './student/components/signup';
function App() {
  return (
    <>
      <Homepage/>
    </>
  );
}

export default App;
