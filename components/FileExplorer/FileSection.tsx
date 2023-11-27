import React, { useState, Dispatch, SetStateAction } from "react";
import Modal from "./Modal";
import { TbBrandCpp, TbBrandPython } from "react-icons/tb";
import { FaJava, FaFile } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

interface FileSectionProps {
  files: { name: string; type: string }[];
  setFiles: Dispatch<SetStateAction<{ name: string; type: string }[]>>;
  addFile: (fileName: string, fileType: string) => void;
  deleteFile: (fileName: string) => void;
}

const FileSection: React.FC<FileSectionProps> = ({
  files,
  setFiles,
  addFile,
  deleteFile,
}) => {
  const onCloseHandler = () => {
    setShowModal(false);
  };
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-[rgb(31,41,55)] h-full rounded-tr-lg ">
      <div className="flex justify-between px-2 pt-2 max-h-11  mb-1">
        <h3>EXPLORER</h3>
        <div>
          <button
            onClick={() => setShowModal(true)}
            className="rounded-md bg-primary-600 px-2.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600;
 transition mb-3"
          >
            + New File
          </button>
          {showModal && (
            <Modal
              open={showModal}
              files={files}
              setFiles={setFiles}
              addFile={addFile}
              deleteFile={deleteFile}
              onClose={onCloseHandler}
            />
          )}
        </div>
      </div>
      <ul className="mt-6 ml-2">
        <ul>
          {files.map((file, index) => (
            <div key={index}>
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
                      <button onClick={() => deleteFile(file.name)}>
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
                      <button onClick={() => deleteFile(file.name)}>
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
                      <button onClick={() => deleteFile(file.name)}>
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
                      <button onClick={() => deleteFile(file.name)}>
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </span>
                )}
              </li>
            </div>
          ))}
        </ul>
      </ul>
    </div>
  );
};

export default FileSection;
