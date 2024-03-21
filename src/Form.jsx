import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Editor from "@monaco-editor/react";
const Form = () => {
  const editorRef = useRef(null);
  async function hello(lang, code, stdin) {}

  const stdinRef = useRef(null);
  function handlestdDidMount(stdin, monaco) {
    stdinRef.current = stdin;
  }
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }
  const [formData, setFormData] = useState({
    username: "",
    codingLanguage: "Select",
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
    const code = editorRef.current.getValue();
    const stdin = stdinRef.current.getValue();
    if (
      formData.username.length === 0 ||
      formData.codingLanguage === "Select" ||
      code.length === 0
    ) {
      toast.error("Please fill all the details!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    try {
      const times = getCurrentDateTimeString();
      let id = 0;
      if (formData.codingLanguage === "Python") {
        id = 71;
      } else if (formData.codingLanguage === "C++") {
        id = 53;
      } else if (formData.codingLanguage === "Java") {
        id = 62;
      } else {
        id = 63;
      }
      const s = btoa(code);
      const t = btoa(stdin);
      const options = {
        method: "POST",
        url: "https://judge0-ce.p.rapidapi.com/submissions",
        params: {
          base64_encoded: "true",
          fields: "*",
          wait: "true",
        },
        headers: {
          "content-type": "application/json",
          "Content-Type": "application/json",
          "X-RapidAPI-Key": `${__JUDGEVALUE__}`,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
        data: {
          language_id: id,
          source_code: s,
          stdin: t,
        },
      };
      let stdout = await axios.request(options);
      stdout = stdout.data;
      let stdouts = "";
      if (stdout) {
        if (stdout.stderr) {
          stdouts = "Error";
        }
        if (stdout.compile_output) {
          stdouts = "Error";
        }
        if (stdout.stdout) {
          stdouts = atob(stdout.stdout);
        }
      }
      const response = await axios.post(__VALUE__ + "/submit", {
        username: formData.username,
        lang: formData.codingLanguage,
        stdin: stdin,
        code: code,
        time: times,
        stdout: stdouts,
      });
      if (response.data.s === false) {
        if (response.data.message === "Username already exists.") {
          toast.error(
            "Username already in use. Please use a different username",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
          return;
        } else {
          throw response.data.s;
        }
      }
      toast.success("Form Submitted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setFormData({
        username: "",
        codingLanguage: "Select",
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
        theme: "dark",
      });
      return;
    }
  };

  return (
    <div className="w-1/2 mx-auto">
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
            <option value="Select">Select</option>
            <option value="Python">Python</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
          </select>
        </div>
        {formData.codingLanguage !== "Select" ? (
          <>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="sourceCode"
            >
              Source Code
            </label>

            <div className="mb-4 border-2 border-black">
              <Editor
                id="sourceCode"
                height="60vh"
                width="100%"
                theme="light"
                defaultLanguage={formData.codingLanguage}
                onMount={handleEditorDidMount}
              />
            </div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="stdinInput"
            >
              Stdin Input
            </label>
            <div className="mb-4 border-2 border-black">
              <Editor
                id="stdinInput"
                height="40vh"
                width="100%"
                theme="light"
                onMount={handlestdDidMount}
              />
            </div>
          </>
        ) : (
          <h1 className="font-bold text-center mb-4 text-2xl">
            Please select your language to continue
          </h1>
        )}
        <div className="flex items-center justify-center">
          <button
            className={`${
              formData.codingLanguage === "Select"
                ? "bg-gray-400"
                : "bg-blue-500 hover:bg-blue-700 text-white "
            } font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
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
