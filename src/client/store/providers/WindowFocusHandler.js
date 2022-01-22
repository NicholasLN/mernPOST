import React, { useEffect, useContext } from "react";
import { UserContext } from "./../context/UserContext";

export default function WindowFocusHandler(props) {
  let { isFocused, setIsFocused } = useContext(UserContext);

  var onFocus = () => {
    setIsFocused(true);
  };

  var onBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, [isFocused, setIsFocused]);

  return <></>;
}
