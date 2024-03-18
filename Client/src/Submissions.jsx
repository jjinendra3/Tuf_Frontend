import React from 'react';
import { useLocation } from 'react-router-dom';
const SubmissionsTable = () => {
  const submissions = [
    { id: 1, username: 'user1', codingLanguage: 'Python', sourceCode: 'print("Hello, World!")', stdinInput: '' },
    { id: 2, username: 'user2', codingLanguage: 'Java', sourceCode: 'System.out.println("Hello, World!");', stdinInput: '' },
  ];

  const location=useLocation();
  console.log(location);
  return (
    <div className="max-w-md mx-auto  justify-center">
        
      <h1 className="text-3xl font-bold text-center my-4">Submission Form</h1>
      <table className="min-w-full justify-center">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Coding Language</th>
            <th className="border px-4 py-2">Source Code</th>
            <th className="border px-4 py-2">Stdin Input</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id}>
              <td className="border px-4 py-2">{submission.id}</td>
              <td className="border px-4 py-2">{submission.username}</td>
              <td className="border px-4 py-2">{submission.codingLanguage}</td>
              <td className="border px-4 py-2">{submission.sourceCode}</td>
              <td className="border px-4 py-2">{submission.stdinInput}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionsTable;
