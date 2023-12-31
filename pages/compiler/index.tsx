import React, { useState } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { TbBrandCpp, TbBrandPython } from "react-icons/tb";
import { FaJsSquare } from "react-icons/fa";
import {
  VscPlay,
  VscScreenFull,
  VscScreenNormal,
  VscClose,
  VscClearAll,
} from "react-icons/vsc";
import { showErrorToast } from "@/components/Toast";

export default function BasicIde() {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [runtime, setRuntime] = useState<string>("JS");
  const [codeEditorKey, setCodeEditorKey] = useState(0);
  const [value, setValue] = useState("console.log('Hello world!')");
  const [output, setOutput] = useState("");
  const runHandler = async () => {
    try {
      const runResponse = await fetch(`http://localhost:8080/execute/basic`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: value,
          runtime: runtime,
        }),
      });
      if (runResponse.status === 200) {
        const runData = await runResponse.json();
        setOutput(runData.result);
      } else {
        throw "Failed to execute code";
      }
    } catch (error: any) {
      showErrorToast(error.message);
    }
  };

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={` ${
        isFullscreen
          ? "absolute z-50 inset-0 h-[99%] w-[99.5%] mx-[2px] mt-[3px] flex"
          : "h-full max-h-[87vh] flex md:justify-center px-2  md:px-0 overflow-auto "
      }`}
    >
      {/* sidebar */}
      <div
        className="md:w-20 w-14 min-h-[87vh]  rounded-lg bg-[rgb(31,41,55)] items-center pt-4 flex flex-col space-y-4 text-white border-[1px]
    border-gray-500"
      >
        <button
          onClick={() => {
            setRuntime("JS");
            setValue("console.log('Hello world')");
            setCodeEditorKey((prevKey) => prevKey + 1);
          }}
        >
          <FaJsSquare className="md:w-14 w-10 md:h-14 h-10 mt-4 border-gray-400 border-[1px]  hover:bg-[rgb(58,59,59)] rounded-lg p-2 transition" />
        </button>
        <button
          onClick={() => {
            setRuntime("PY");
            setValue("print('Hello world')");
            setCodeEditorKey((prevKey) => prevKey + 1);
          }}
        >
          <TbBrandPython className="md:w-14 w-10 md:h-14 h-10 border-gray-400 border-[1px]  hover:bg-[rgb(58,59,59)] rounded-lg p-2 transition" />
        </button>
        <button
          onClick={() => {
            setRuntime("CPP");
            setValue(
              '#include <iostream>\nint main() {\n std::cout << "Hello, World!" << std::endl;\n return 0; \n}'
            );
            setCodeEditorKey((prevKey) => prevKey + 1);
          }}
        >
          <TbBrandCpp className="md:w-14 w-10 md:h-14 h-10 border-gray-400 border-[1px]  hover:bg-[rgb(58,59,59)] rounded-lg p-2 transition" />
        </button>
      </div>
      <div
        className={` ${
          isFullscreen
            ? "w-[100%] flex flex-row rounded-lg ml-1  "
            : "md:w-[80%] w-[90%] ml-1 rounded-lg flex md:flex-row flex-col  "
        }`}
      >
        {/* program section */}
        <div className=" md:max-w-[70%] md:min-w-[70%] h-[100%] md:h-full bg-[rgb(31,41,55)] rounded-lg border-gray-500 border-[1px] flex flex-col overflow-hidden">
          {/*program header */}
          <div className="flex justify-between pt-2 pl-2 text-white">
            <div className="pl-4 pr-2 bg-[rgb(29,28,28)] rounded-t-md relative">
              {/* for curved out border */}
              <div className="absolute bg-transparent bottom-0 -right-6 h-2 w-[24px] rounded-bl-full  shadow-[-5px_2px_0px_2px_rgba(29,28,28,1)]"></div>
              <div className="absolute bg-transparent bottom-0 -left-6 h-2 w-[24px] rounded-br-full  shadow-[7px_0px_0px_0px_rgba(29,28,28,1)]"></div>

              <div className="flex flex-row justify-between gap-10">
                <h3>Main.{`${runtime.toLowerCase()}`}</h3>
                <button className="hover:bg-[rgb(58,59,59)] px-[0px] my-1 rounded-sm transition">
                  <VscClose />
                </button>
              </div>
            </div>
            <div className="mr-4">
              <button className="icon-button mr-2" onClick={runHandler}>
                <VscPlay />
              </button>
              <button onClick={handleFullscreenToggle}>
                {isFullscreen ? <VscScreenNormal /> : <VscScreenFull />}
              </button>
            </div>
          </div>
          {/* program */}
          <div className="h-full bg-[rgb(29,28,28)] rounded-b-lg px-[1px] overflow-auto">
            <ReactCodeMirror
              key={codeEditorKey}
              value={value}
              theme={vscodeDark}
              extensions={[
                runtime === "JS"
                  ? javascript()
                  : runtime === "PY"
                  ? python()
                  : cpp(),
              ]}
              style={{ fontSize: 14 }}
              maxHeight="100%"
              maxWidth="100%"
              onChange={(newValue) => setValue(newValue)}
              placeholder={"Write your code here."}
            />
          </div>
        </div>
        {/* output section */}
        <div
          className={` ${
            isFullscreen
              ? "min-w-[30%] h-full bg-[rgb(31,41,55)] rounded-lg flex flex-col border-gray-500 border-[1px] pt-1 ml-1 "
              : " md:min-w-[30%] max-w-[100%] md:h-full max-h-[30%] md:max-h-[100%] h-[45%] bg-[rgb(31,41,55)] rounded-lg flex flex-col border-gray-500 mt-1 md:mt-0 border-[1px] md:border-[1px]  md:pt-[3px] md:ml-1 overflow-hidden"
          }`}
        >
          {/* output header */}
          <div className=" flex justify-between pt-1 pl-2 text-white">
            <div className="flex flex-row justify-between gap-10">
              <h3>OUTPUT</h3>
            </div>
            <div className="mr-4">
              <button className="icon-button mr-2">
                <VscClearAll />
              </button>
              <button className="hover:bg-[rgb(58,59,59)] px-[0px] my-1 rounded-sm transition">
                <VscClose />
              </button>
            </div>
          </div>
          {/* output */}

          <div className="h-full overflow-auto bg-[rgb(29,28,28)] md:rounded-lg rounded-b-lg ">
            <ReactCodeMirror
              value={output}
              placeholder={"Press run to see the output."}
              theme={vscodeDark}
              readOnly={true}
              extensions={[javascript()]}
              style={{ fontSize: 14 }}
              maxHeight="100%"
              maxWidth="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
