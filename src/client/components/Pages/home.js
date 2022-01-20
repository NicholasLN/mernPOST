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
            delay: 25,
          }}
          onInit={(typewriter) => {
            typewriter.typeString(`<p class="font-syne_mono text-sm  bg-gray-900 p-2">...establishing connection</p>`).pauseFor(500),
              typewriter.typeString(`<p class="font-syne_mono text-sm text-green-400 bg-gray-900 p-2">...connection established</p>`).pauseFor(500),
              typewriter
                .typeString(`<p class="font-syne_mono text-sm text-green-700 bg-gray-900 p-2">...local client time: ${new Date().toLocaleTimeString()} </p>`)
                .pauseFor(500)
                .deleteAll(5)
                .changeDelay(50),
              typewriter.typeString(`<h1 class="text-green-400 font-extrabold text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center">POST[APOC]</h1>`).pauseFor(1000).start(),
              typewriter.typeString(`<p class="text-sm md:text-md lg:text-lg xl:text-lg my-2" >A multiplayer game about post-apocalypse USA.</p>`).pauseFor(1000).start(),
              typewriter.typeString(`<p class="text-sm md:text-md lg:text-lg xl:text-lg my-2 text-center">Developed by Phil Scott.</p>`).pauseFor(1000).start(),
              typewriter.typeString(`<p class="font-syne_mono text-sm md:text-md lg:text-lg xl:text-lg my-2 text-center">Welcome to the wasteland, fucker.</p>`).pauseFor(1000).start();
          }}
        />
      </div>
    </Body>
  );
}
