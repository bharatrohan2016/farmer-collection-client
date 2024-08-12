import React from 'react';
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/Login/Login';
import Form from './Pages/Farmer/Form';
import Navbar from './Components/Navbar';
import Manage from './Pages/Manage/Manage';
import ProtectedRoute from './Utils/ProtectedRoute';

function App() {
  return (
    <div>
       <Router>
          <Routes>
              <Route path='/' element={ <ProtectedRoute><Login/></ProtectedRoute>} />
              <Route path='/onboard' element={ <ProtectedRoute><Form/></ProtectedRoute>} />
              <Route path='/manage' element={<ProtectedRoute><Manage/></ProtectedRoute>} />
          </Routes>
        </Router>
       <ToastContainer/>
    </div>
  );
}

export default App;
