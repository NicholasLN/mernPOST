import React from "react";
import Body from "../structure/Body";
import notfound from "../../assets/img/404.png";
export default function notFound() {
  return (
    <Body>
      {/* Link the 404 image. Make it mobile responsive with tailwind. */}
      <img src={notfound} alt="404" className="w-80 mx-auto" />
      <br />
      <h1 className="text-xl text-center">Fuck.</h1>
      <h1 className="text-md mt-2 text-center">You're lost.</h1>
    </Body>
  );
}
