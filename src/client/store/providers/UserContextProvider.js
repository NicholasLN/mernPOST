import axios from "axios";
import React, { useState, useEffect } from "react";
import { UserContext } from "./../context/UserContext";
import Authentication from "./../actions/AuthenticationActions";
import Loading from "./../../components/misc/Loading";
import WindowFocusHandler from "./WindowFocusHandler";

const fetchInformation = async (setUser, loading, setLoading, isFocused) => {
  if (isFocused) {
    var data = await Authentication.getSessionData()
      .then((res) => {
        console.log(res);
        setUser({
          user: res,
          isLoggedIn: true,
        });
      })
      .catch((err) => {
        setUser({
          isLoggedIn: false,
        });
      });
    if (loading) {
      setLoading(false);
    }
  }
};

export default function UserContextProvider(props) {
  const [sessionData, setSessionData] = useState({});
  const [isFocused, setIsFocused] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInformation(setSessionData, loading, setLoading, isFocused);
    const interval = setInterval(() => {
      fetchInformation(setSessionData, loading, setLoading, isFocused);
    }, 10000);
    return () => clearInterval(interval);
  }, [isFocused]);

  if (loading) {
    return (
      <>
        <Loading />
        <UserContext.Provider value={{ isFocused, setIsFocused }}>
          <WindowFocusHandler />
        </UserContext.Provider>
      </>
    );
  } else {
    return (
      <UserContext.Provider value={{ sessionData, setSessionData, loading, setLoading, isFocused, setIsFocused }}>
        <WindowFocusHandler />
        {props.children}
      </UserContext.Provider>
    );
  }
}
