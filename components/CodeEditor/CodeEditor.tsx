import React from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { AiOutlineDownload, AiOutlineShareAlt } from "react-icons/ai";
import { VscPlay, VscClose, VscClearAll } from "react-icons/vsc";

interface CodeEditorProps {
  file: {
    filename: string;
    runtime: string;
    fileId: string;
    content: string;
  };
  clearSelectedFile: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ file, clearSelectedFile }) => {
  return (
    <div className="w-full overflow-auto h-full  text-white flex flex-col md:flex-row justify-between ">
      <div className="w-full h-full overflow-auto">
        <div className="flex flex-row rounded-tl-lg justify-between px-2 pt-2 max-h-11 bg-[rgb(31,41,55)] mb-1">
          <div className="flex">
            <div className="pl-4 pr-2 bg-[rgb(29,28,28)] rounded-t-md relative">
              {/* for curved out border */}
              <div className="absolute bg-transparent bottom-0 -right-6 h-2 w-[24px] rounded-bl-full  shadow-[-5px_2px_0px_2px_rgba(29,28,28,1)]"></div>
              <div className="absolute bg-transparent bottom-0 -left-6 h-2 w-[24px] rounded-br-full  shadow-[7px_0px_0px_0px_rgba(29,28,28,1)]"></div>

              <div className="flex flex-row justify-between gap-10">
                <h3>{file.filename}</h3>
                <button
                  onClick={clearSelectedFile}
                  className="hover:bg-[rgb(58,59,59)] px-[0px] my-1 rounded-sm transition"
                >
                  <VscClose />
                </button>
              </div>
            </div>
            {/* <div className="flex flex-row justify-between gap-10 ml-1 hover:bg-[rgb(29,28,28)] px-2 rounded-lg mb-1">
                                 <h3>File2.js</h3>
                                 <button className="hover:bg-[rgb(58,59,59)] px-[0px] my-1 rounded-sm transition"><VscClose/></button>
                            </div> */}
          </div>
          <div className="space-x-1">
            <button className="icon-button">
              <VscPlay />
            </button>
            <button className="icon-button">
              <AiOutlineDownload />
            </button>
            <button className="icon-button">
              <AiOutlineShareAlt />
            </button>
          </div>
        </div>
        <div className="p-1">
          <ReactCodeMirror
            key={file.fileId}
            value={file.content}
            theme={vscodeDark}
            extensions={[
              file.runtime === "JS"
                ? javascript()
                : file.runtime === "PY"
                ? python()
                : cpp(),
            ]}
            style={{ fontSize: 14 }}
          />
        </div>
      </div>
      {/* output section */}
      <div className=" md:w-[35%] md:h-full h-[70%] bg-[rgb(31,41,55)] flex flex-col border-gray-600 mt-1 md:mt-0 border-t-[1px] md:border-t-0 md:border-l-[1px]  md:pt-[3px] overflow-auto">
        {/* output header */}
        <div className="flex justify-between pt-1 pl-2 text-white">
          <div className="flex flex-row justify-between gap-10">
            <h3>OUTPUT</h3>
          </div>
          <div className="mr-1">
            <button className="icon-button mr-1">
              <VscClearAll />
            </button>
            <button className="icon-button">
              <VscClose />
            </button>
          </div>
        </div>
        {/* output */}

        <div className="h-full bg-[rgb(29,28,28)] ">
          <ReactCodeMirror
            className="p-1"
            value=""
            placeholder={"Press run to see the output."}
            theme={vscodeDark}
            readOnly={true}
            extensions={[javascript()]}
            style={{ fontSize: 14 }}
            maxHeight=""
            maxWidth="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
