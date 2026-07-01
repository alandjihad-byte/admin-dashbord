import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Allitems from './pages/Allitems';
import Edit from './pages/Edit';
import Create from './pages/Create';
import AllUsers from './pages/AllUsers';
import Employees from './pages/Employees';
import EditEmployee from "./pages/EditEmplyee";

import ProtectedRoute from './ProtectedRoute';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // 401 means the token is completely invalid or expired
      if (error.response.status === 401) {
        alert("Your session has expired or been terminated.");
        localStorage.removeItem('adminToken');
        window.location.href = '/';
      }
      
      // 403 means they are logged in, but their role/permission isn't allowed here
      if (error.response.status === 403) {
        alert("You do not have permission to access this resource.");
      }
    }
    return Promise.reject(error);
  }
);

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Login />} />
          
          {/* Secured Routes */}
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/items" element={<ProtectedRoute><Allitems /></ProtectedRoute>} />
          <Route path="/items/edit/:id" element={<ProtectedRoute><Edit /></ProtectedRoute>} />
          <Route path="/items/create" element={<ProtectedRoute><Create /></ProtectedRoute>} />
          <Route path="/employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
          <Route path="/employees/edit/:id" element={<ProtectedRoute><EditEmployee /></ProtectedRoute>} />
          
          {/* FIXED: /allusers is now fully protected */}
          <Route path="/allusers" element={<ProtectedRoute><AllUsers /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;