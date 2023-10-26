import React from "react";
import Split from "react-split";
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import { VscPlay } from "react-icons/vsc";

const CodeEditor = () => {
    return <div className="w-full overflow-auto h-full p-2 text-white">
        <div className="flex flex-row justify-end border-b-gray-700 border-b-2 pb-2 mb-1">
            <button className="icon-button"><VscPlay/></button>
        </div>
        <ReactCodeMirror
        value="console.log('hello world!')"
        theme={vscodeDark}
        extensions={[javascript()]}
        style={{fontSize:14}}
        />
    </div>
}

export default CodeEditor