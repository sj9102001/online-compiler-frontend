import React from "react";
import { AiOutlineFileAdd, AiOutlineDelete } from "react-icons/ai";
import { VscRefresh } from "react-icons/vsc";

const FileSection = () => {
  return (
    <div className="bg-[rgb(31,41,55)] h-full rounded-tr-lg ">
      <div className="flex justify-between px-2 pt-2 max-h-11  mb-1">
        <h3>EXPLORER</h3>
        <div className="space-x-1">
          <button className="icon-button">
            <AiOutlineFileAdd />
          </button>
          <button className="icon-button">
            <VscRefresh />
          </button>
        </div>
      </div>
      <ul className="mt-5 ">
        <li className="file-list">1.txt</li>
        <li className="file-list">2.txt</li>
        <li className="file-list">3.txt</li>
        <li className="file-list">4.txt</li>
        <li className="file-list">5.txt</li>
      </ul>
    </div>
  );
};

export default FileSection;
