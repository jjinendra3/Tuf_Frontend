import React from 'react';
import Form from './Form';
import SubmissionsTable from './Submissions';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App justify-center">
      <ToastContainer/>
      <Router>
        <div className='flex flex-row justify-center my-8'>
          <div className='mx-4 p-2 border-2 rounded-lg border-green-200'>
            <NavLink to="/" activeclassname="active">Submission Form</NavLink>
          </div>
          <div className='mx-4 p-2 bg-white rounded-lg border-2 border-green-200'>
            <NavLink to="/sub" activeclassname="active">Submission Table</NavLink>
          </div>
        </div>
        <Routes>
          <Route exact path="/" element={<Form />} />
          <Route exact path="/sub" element={<SubmissionsTable />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
