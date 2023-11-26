import React, { useState } from "react";
import { TbBrandCpp, TbBrandPython } from "react-icons/tb";
import { FaJava, FaFile } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState("");

  const addFile = (fileName) => {
    const fileType = getFileType(fileName);
    const newFile = { name: fileName, type: fileType };
    setFiles([...files, newFile]);
    setShowModal(false); // Close the modal after adding the file
  };

  const deleteFile = (file) => {
    setFiles(files.filter((f) => f !== file));
  };

  const getFileType = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    switch (extension) {
      case "cpp":
        return "cpp";
      case "java":
        return "java";
      case "py":
        return "python";
      default:
        return "file";
    }
  };

  return (
    <div className="file-section">
      <button
        onClick={() => setShowModal(true)}
        className="rounded-md bg-primary-600 px-2.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600;
 transition mb-3"
      >
        + New File
      </button>
      <ul>
        {files.map((file, index) => (
          <li
            className="bg-gray-700 mb-1  mr-2 rounded-md hover:bg-gray-500 transition"
            key={index}
          >
            {file.type === "cpp" && (
              <span className="flex flex-row justify-between">
                <div className="flex flex-row">
                  <TbBrandCpp className="m-1.5 bg-blue-800 rounded-md p-[2px]" />
                  {file.name}
                </div>
                <div className="hover:opacity-100 opacity-30 pt-1 pr-2">
                  <button onClick={() => deleteFile(file)}>
                    <MdDeleteOutline />
                  </button>
                </div>
              </span>
            )}
            {file.type === "java" && (
              <span className="flex flex-row justify-between">
                <div className="flex flex-row">
                  <FaJava className="m-1.5 bg-orange-600 rounded-md p-[2px]" />
                  {file.name}
                </div>
                <div className="hover:opacity-100 opacity-30 pt-1 pr-2">
                  <button onClick={() => deleteFile(file)}>
                    <MdDeleteOutline />
                  </button>
                </div>
              </span>
            )}
            {file.type === "python" && (
              <span className="flex flex-row justify-between">
                <div className="flex flex-row">
                  <TbBrandPython className="m-1.5 bg-yellow-600 rounded-md p-[2px]" />
                  {file.name}
                </div>
                <div className="hover:opacity-100 opacity-30 pt-1 pr-2">
                  <button onClick={() => deleteFile(file)}>
                    <MdDeleteOutline />
                  </button>
                </div>
              </span>
            )}
            {file.type === "file" && (
              <span className="flex flex-row justify-between">
                <div className="flex flex-row">
                  <FaFile className="m-1.5 p-[2px]" />
                  {file.name}
                </div>
                <div className="hover:opacity-100 opacity-30 pt-1 pr-2">
                  <button onClick={() => deleteFile(file)}>
                    <MdDeleteOutline />
                  </button>
                </div>
              </span>
            )}
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal fixed z-10 inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="modal-content bg-[rgb(31,41,55)] p-8 rounded-lg w-[350px]">
            <span
              className="close absolute top-2 right-2 text-gray-600 text-2xl cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              &times;
            </span>
            <h2 className="text-xl font-semibold mb-4">New File</h2>
            <input
              type="text"
              placeholder="Enter file name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full py-2 px-3 rounded border-gray-300 mb-4 text-black"
            />
            <p className="mb-4 text-gray-400">
              File name must have an extension <br></br>(ex: .cpp, .java, .py)
            </p>
            <div className="flex flex:row  justify-between">
              <button
                onClick={() => {
                  addFile(fileName);
                  setFileName("");
                }}
                className="bg-primary-500  hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
              >
                Create
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-transparent hover:bg-gray-700 text-gray-200 font-bold py-2 px-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
