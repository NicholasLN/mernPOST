import React from "react";
import Typewriter from "typewriter-effect";
import Body from "../structure/Body";

export default function Home() {
  return (
    <Body>
      {/* Add a nice header with Tailwind. Center it vertically and horizontally */}
      <div className="flex items-center justify-center">
        <br />
        <Typewriter
          options={{
            cursor: "",
            delay: 50,
          }}
          onInit={(typewriter) => {
            typewriter.typeString(`<h1 class="text-green-400 font-extrabold text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center">POST[APOC]</h1>`).pauseFor(2500).start(),
              typewriter.typeString(`<p class="text-sm md:text-md lg:text-lg xl:text-lg my-2" >A multiplayer game about post-apocalypse USA.</p>`).pauseFor(2500).start(),
              typewriter.typeString(`<p class="text-sm md:text-md lg:text-lg xl:text-lg my-2">A game developed by Phil Scott.</p>`).pauseFor(2500).start();
          }}
        />
      </div>
    </Body>
  );
}
