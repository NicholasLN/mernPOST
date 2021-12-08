import React from "react";
import ResponsiveNavBar from "./Navbar/ResponsiveNavBar";

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
      <div className="bg-gray-700 text-white font-poppins h-screen">
        <div id="mainContent" className="h-95">
          <ResponsiveNavBar />
          {/** Add a divider line here between the navbar and children */}
          <div className="border-3 w-full border-green-400 -mt-4" />
          <br />
          {props.children}
        </div>
        <div className="bg-gray-900 fixed bottom-0 w-100">
          <div className="flex justify-center p-1">
            <p className="text-xs hover:text-green-400">
              {/** Add a live clock. Every second it should tick up.*/}
              {time.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex justify-center p-1">
            <p className="text-xs">
              {/** Add a copyright notice. */}
              &copy; {time.getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
