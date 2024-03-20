import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Editor from "@monaco-editor/react";
const Modal = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-4 z-10">
        <div className="flex justify-end">
          <button
            onClick={() => {
              console.log("sd");
              onClose(false);
            }}
          >
            &times;
          </button>
        </div>
        <div className="border-2 border-black">
          <Editor
            height="40vh"
            width="40vh"
            theme="light"
            defaultValue={data}
          />
        </div>
      </div>
    </div>
  );
};
const SubmissionsTable = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setdata] = useState("");
  console.log(isModalOpen);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("" + __VALUE__ + "/getsub");
        if (response.data.message !== "Table 'users' does not exist") {
          setSubmissions(response.data.result);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error fetching data!", {
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
    }
    fetchData();
  }, []);

  return (
    <div className="px-4 mx-auto">
      <h1 className="text-3xl font-bold text-center my-4">Submission Table</h1>
      {submissions.length === 0 ? (
        <div className="font-bold text-2xl text-center">No Submissions</div>
      ) : (
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="border px-1 py-2">ID</th>
              <th className="border px-1 py-2">Username</th>
              <th className="border px-1 py-2">Language</th>
              <th className="border px-1 py-2">Source Code</th>
              <th className="border px-1 py-2">StdIn</th>
              <th className="border px-1 py-2">Time Stamp</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => {
              const time = submission.time.split("T");
              const formattedTime = time[0] + "  " + time[1];
              return (
                <tr key={submission.id}>
                  <td className="border px-1 py-2">{submission.id}</td>
                  <td className="border px-1 py-2">{submission.username}</td>
                  <td className="border px-1 py-2">
                    {submission.prefer_code_lang}
                  </td>
                  <td className="border px-1 text-center">
                    <div className="overflow-x-auto">
                      {submission.src_code.slice(0, 100)}
                    </div>
                    <button
                      className="text-blue-400"
                      onClick={() => {
                        setdata(submission.src_code);
                        setIsModalOpen(true);
                      }}
                    >
                      View Code
                    </button>
                  </td>
                  <td className="border px-1 py-2">
                    <div className="overflow-x-auto">
                      {submission.stdin.slice(0, 100)}
                    </div>
                    {submission.stdin.length !== 0 ? (
                      <button
                        className="text-blue-400"
                        onClick={() => {
                          setdata(submission.stdin);
                          setIsModalOpen(true);
                        }}
                      >
                        View stdin
                      </button>
                    ) : (
                      <></>
                    )}
                  </td>
                  <td className="border px-1 py-2">
                    <div className="overflow-x-auto">
                      {formattedTime.slice(0, 20)}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {isModalOpen && <Modal data={data} onClose={setIsModalOpen} />}
    </div>
  );
};

export default SubmissionsTable;
