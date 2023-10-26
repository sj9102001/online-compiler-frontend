import React from "react";
import {AiOutlineFileAdd} from 'react-icons/ai';
import {VscRefresh} from 'react-icons/vsc';


const FileSection = () => {
    return <div className="p-2">
        <div className="flex justify-between">
            <h3>Explorer</h3>
            <div>
            <button className="icon-button"><AiOutlineFileAdd/></button>
            <button className="icon-button"><VscRefresh/></button>
            </div>
        </div>
    </div>
}

export default FileSection