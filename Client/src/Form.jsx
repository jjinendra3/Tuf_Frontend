import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
const Form = () => {
  const [formData, setFormData] = useState({
    username: "",
    codingLanguage: "Python",
    sourceCode: "",
    stdinInput: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  function getCurrentDateTimeString() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.username.length === 0 ||
      formData.sourceCode.length === 0 ||
      formData.stdinInput.length === 0
    ) {
      toast.error("Please fill all the details!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      return;
    }
    try {
      const times = getCurrentDateTimeString();
      const response=await axios.post("http://localhost:5000/submit", {
        username: formData.username,
        lang: formData.codingLanguage,
        stdin: formData.stdinInput,
        code: formData.sourceCode,
        time: times,
      });
      console.log(response);
      toast.success("Form Submitted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      setFormData({
        username: "",
        codingLanguage: "Python",
        sourceCode: "",
        stdinInput: "",
      });
      return;
    } catch (error) {
      console.log(error);
      toast.error("Form not submitted, please try again later in sometime.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      return;
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center my-4">Submission Form</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="codingLanguage"
          >
            Coding Language
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="codingLanguage"
            name="codingLanguage"
            value={formData.codingLanguage}
            onChange={handleChange}
          >
            <option value="Python">Python</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="sourceCode"
          >
            Source Code
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="sourceCode"
            name="sourceCode"
            placeholder="Source Code"
            value={formData.sourceCode}
            onChange={handleChange}
            rows="20"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="stdinInput"
          >
            Stdin Input
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="stdinInput"
            name="stdinInput"
            placeholder="Stdin Input"
            value={formData.stdinInput}
            onChange={handleChange}
            rows="10"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
