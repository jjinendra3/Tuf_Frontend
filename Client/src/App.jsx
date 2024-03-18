import React from 'react';
import Form from './Form';
import SubmissionsTable from './Submissions';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

function App() {
  return (
    <div className="App justify-center">
      <Router>
        <div className='flex flex-row justify-center my-8'>
          <div className='mx-4 p-2 border-2 rounded-lg border-green-200'>
            <NavLink to="/" activeClassName="active">Submission Form</NavLink>
          </div>
          <div className='mx-4 p-2 bg-white rounded-lg border-2 border-green-200'>
            <NavLink to="/sub" activeClassName="active">Submission Table</NavLink>
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
