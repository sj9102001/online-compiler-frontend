import { on } from "events";
import React, { useState, SetStateAction, Dispatch } from "react";

interface ModalProps {
  onClose: () => void;
  files: { name: string; type: string }[];
  setFiles: Dispatch<SetStateAction<{ name: string; type: string }[]>>;
  addFile: (fileName: string, fileType: string) => void;
  deleteFile: (fileName: string) => void;
  open: boolean;
}
const Modal: React.FC<ModalProps> = ({
  onClose,
  open,
  files,
  setFiles,
  addFile,
  deleteFile,
}) => {
  const [fileName, setFileName] = useState("");

  const getFileType = (fileName: string | undefined) => {
    if (!fileName) {
      return "file";
    }
    const extension = fileName.split(".").pop()?.toLowerCase();
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
      <div className="modal fixed z-10 inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
        <div className="modal-content bg-[rgb(31,41,55)] p-8 rounded-lg w-[350px]">
          <span
            className="close absolute top-2 right-2 text-gray-600 text-2xl cursor-pointer"
            onClick={onClose}
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
                if (fileName) {
                  addFile(fileName, getFileType(fileName));
                  setFileName("");
                  onClose();
                }
              }}
              className="bg-primary-500  hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
            >
              Create
            </button>
            <button
              onClick={onClose}
              className="bg-transparent hover:bg-gray-700 text-gray-200 font-bold py-2 px-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
