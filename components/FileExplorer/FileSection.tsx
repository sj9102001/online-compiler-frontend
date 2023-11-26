import React from "react";
import { VscRefresh } from "react-icons/vsc";
import Modal from "./Modal";

const FileSection = () => {
  return (
    <div className="bg-[rgb(31,41,55)] h-full rounded-tr-lg ">
      <div className="flex justify-between px-2 pt-2 max-h-11  mb-1">
        <h3>EXPLORER</h3>
        <div className="space-x-1">
          <button className="icon-button">
            <VscRefresh />
          </button>
        </div>
      </div>
      <ul className="mt-6 ml-2">
        {/* <li className="file-list">file.js</li> */}
        <Modal />
      </ul>
    </div>
  );
};

export default FileSection;
