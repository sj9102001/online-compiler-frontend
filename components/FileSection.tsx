import React from "react";
import {AiOutlineFileAdd} from 'react-icons/ai';



const FileSection = () => {
    return <div className="p-2">
        <div className="flex justify-between">
            <h3>Explorer</h3>
            <div>
            <button className="hover:bg-[rgb(58,59,59)] p-1 rounded-sm transition"><AiOutlineFileAdd/></button>
            <button></button>
            </div>
        </div>
    </div>
}

export default FileSection