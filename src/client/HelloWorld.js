import React, { useEffect } from "react";
import axios from "axios";

const fetchData = (username, password) => {
  return axios.post("api/auth/login", { username, password });
};

const HelloWorld = () => {
  var [username, setUsername] = React.useState("");
  var [password, setPassword] = React.useState("");

  return (
    <>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={async () => console.log(await fetchData(username, password))}>Login</button>
    </>
  );
};

export default HelloWorld;
