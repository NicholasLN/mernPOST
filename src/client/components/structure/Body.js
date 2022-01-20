import React from "react";
import ResponsiveNavBar from "./Navbar/ResponsiveNavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Body(props) {
  var [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    var timerID = setInterval(() => setTime(new Date()), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });

  return (
    <>
      <div className="text-white font-poppins h-screen">
        {/** Add a fixed div to the top right of the screen, for alerts */}
        <ToastContainer />
        <div id="mainContent" className="h-100 overflow-auto bg-gray-700">
          <ResponsiveNavBar />
          {/** Add a divider line here between the navbar and children */}
          <div className="border-3 w-full border-green-400 -mt-4" />
          <br />
          {props.children}
          {/** If the user is on a small device, add space on the bottom with tailwind */}
          <div className="h-28" />
        </div>
        <div className="bg-gray-900 fixed bottom-0 w-100 border-t-4 py-1 border-green-400 flex justify-center flex-wrap">
          <p className="text-xs text-center">
            {/** Add a live clock. Every second it should tick up.*/}
            {/** Add a copyright notice. */}
            <span className="user-select-none">
              <span className="hover:text-green-400">{time.toLocaleTimeString()}</span>
              <br />
              Copyright &copy; European Peril Games {time.getFullYear()}. All rights reserved.
              <br />
              Contact me at PhilScott4USA@gmail.com
              <br />
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
