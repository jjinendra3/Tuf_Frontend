import React,{useEffect,useState} from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';
const SubmissionsTable = () => {
  const [submissions, setsubmissions] = useState([]);
  useEffect(() => {
    async function getter(){
      const response=await axios.get('http://localhost:5000/getsub'); 
      setsubmissions(response.data.result);
    }
    try {
      getter();
    } catch (error) {
      console.log(error);
      toast.error('Error fetching data!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  }, []);
  return (
    <div className="max-w-md mx-auto">
        
      <h1 className="text-3xl font-bold text-center my-4">Submission Form</h1>
      <table className="min-w-full justify-center">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Coding Language</th>
            <th className="border px-4 py-2">Source Code</th>
            <th className="border px-4 py-2">Stdin Input</th>
            <th className="border px-4 py-2">Time Stamp</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => 
        {
          const timee=submission.time.split('T');
          const ti=timee[0]+"  "+timee[1];

          return(
          <tr key={submission.id}>
            <td className="border px-4 py-2">{submission.id}</td>
            <td className="border px-4 py-2">{submission.username}</td>
            <td className="border px-4 py-2">{submission.prefer_code_lang}</td>
            <td className="border px-4 py-2">{submission.src_code}</td>
            <td className="border px-4 py-2">{submission.stdin}</td>
            <td className="border px-4 py-2">{ti.slice(0,19)}</td>
          </tr>
        )})}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionsTable;
