import React from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { TbBrandCpp, TbBrandPython } from "react-icons/tb";
import { FaJsSquare } from "react-icons/fa";
import { VscPlay, VscScreenFull, VscClose } from "react-icons/vsc";

export default function BasicIde() {
  return (
    <div className=" h-full max-h-[87vh] flex justify-center overflow-auto  ">
      {/* sidebar */}
      <div
        className="w-20 h-[87vh]  rounded-lg bg-[rgb(31,41,55)] items-center pt-4 flex flex-col space-y-4 text-white border-[1px]
    border-gray-500"
      >
        <a href="">
          <FaJsSquare className="w-14 h-14 mt-4 border-gray-400 border-[1px]  hover:bg-[rgb(58,59,59)] rounded-lg p-2 transition" />
        </a>
        <a href="">
          <TbBrandPython className="w-14 h-14 border-gray-400 border-[1px]  hover:bg-[rgb(58,59,59)] rounded-lg p-2 transition" />
        </a>
        <a href="">
          <TbBrandCpp className="w-14 h-14 border-gray-400 border-[1px]  hover:bg-[rgb(58,59,59)] rounded-lg p-2 transition" />
        </a>
      </div>
      <div className="w-[70%]  flex flex-row ">
        {/* program section */}
        <div className=" ml-2 w-[100%] h-full bg-[rgb(31,41,55)] rounded-lg flex flex-col border-b-[1px] border-[1px] border-gray-500">
          {/*program header */}
          <div className="flex justify-between pt-2 pl-2 text-white">
            <div className="pl-4 pr-2 bg-[rgb(29,28,28)] rounded-t-md relative">
              {/* for curved out border */}
              <div className="absolute bg-transparent bottom-0 -right-6 h-2 w-[24px] rounded-bl-full  shadow-[-5px_2px_0px_2px_rgba(29,28,28,1)]"></div>
              <div className="absolute bg-transparent bottom-0 -left-6 h-2 w-[24px] rounded-br-full  shadow-[7px_0px_0px_0px_rgba(29,28,28,1)]"></div>

              <div className="flex flex-row justify-between gap-10">
                <h3>Main.cpp</h3>
                <button className="hover:bg-[rgb(58,59,59)] px-[0px] my-1 rounded-sm transition">
                  <VscClose />
                </button>
              </div>
            </div>
            <div className="mr-4">
              <button className="icon-button mr-2">
                <VscPlay />
              </button>
              <button className="icon-button">
                <VscScreenFull />
              </button>
            </div>
          </div>
          {/* program */}
          <div className="h-full rounded-b-lg overflow-auto bg-[rgb(29,28,28)]">
            <ReactCodeMirror
              value="console.log('hello world')"
              theme={vscodeDark}
              extensions={[javascript()]}
              style={{ fontSize: 14 }}
            />
          </div>
        </div>
        {/* output section */}
        {/* output header */}
        {/* output */}
        {/* <div className="bg-gray-800 w-[45%] flex flex-col h-full overflow-auto">
          <div className="flex h-12 w-full justify-between">
            <div className="">output</div>
            <div className="">clear btn</div>
          </div>
          <div className="overflow-auto">
            <ReactCodeMirror
              value="//Output"
              theme={vscodeDark}
              extensions={[javascript()]}
              style={{ fontSize: 14 }}
            />
          </div> */}
      </div>
    </div>
  );
}
