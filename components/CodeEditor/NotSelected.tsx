import React from "react";
const NotSelected = () => {
  return (
    // <div className="w-full overflow-auto h-full flex justify-center text-5xl items-center  text-zinc-600 ">
    //   Select a file to Display.
    // </div>
    <div className="w-full h-full bg-[rgb(31,41,55)]  flex flex-row justify-center  overflow-auto text-slate-300 ">
      <div className=" flex flex-col items-center ">
        <img
          src="./Images/Emptystate.png"
          alt="dadaf"
          className="w-52 h-52 mb-2 mt-32"
        />
        <h1 className="text-5xl text-center pb-2">Dashboard!</h1>
        <p className="p-2">
          Get started by creating a new file or selecting one you already
          created.
        </p>
      </div>
    </div>
  );
};

export default NotSelected;
