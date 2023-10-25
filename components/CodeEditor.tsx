import React from "react";
import Split from "react-split";
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
const CodeEditor = () => {
    return <div className="w-full overflow-auto p-2 ">
        <ReactCodeMirror
        value="console.log('hello world!')"
        theme={vscodeDark}
        extensions={[javascript()]}
        style={{fontSize:14}}
        />
    </div>
}

export default CodeEditor