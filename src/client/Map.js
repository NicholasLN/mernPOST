import React from "react";
import axios from "axios";
import * as d3 from "d3";
import ReactTooltip from "react-tooltip";

// Create a method for fetching counties. The api route is /api/info/counties/fetchAllCounties.
// The method should return a promise.
const fetchCounties = async () => {
  return await axios.get("/api/info/county/fetchAllCounties");
};

export default function Map(props) {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);
  const [mode, setMode] = React.useState("viewNeighboring");

  const populatePaths = (counties) => {
    // Each county in counties looks like this {state, name, svgPath, countyId, neighbors: [countyId, countyId, ...]}
    // svgPath is a string that represents the path of the county on the map.
    for (let i = 0; i < counties.length; i++) {
      let path = d3.select("#map g").append("path");
      // Let's create an ID for each path element. This will be used later to identify the path element. Use countyId
      // as the ID.
      path.attr("id", counties[i].countyId);
      path.attr("d", counties[i].svgPath);
      path.attr("fill", "white");
      path.attr("stroke", "black");
      path.attr("stroke-width", 0.2);

      if (mode === "viewNeighboring") {
        path.on("mouseover", function (e) {
          let clickedCounty = e.target.id;
          let clickedCountyIndex = counties.findIndex((county) => county.countyId === clickedCounty);
          let clickedCountyNeighbors = counties[clickedCountyIndex].neighbors;
          clickedCountyNeighbors.forEach((neighbor) => {
            let neighborPath = d3.select("#map g").select(`[id="${neighbor}"]`);
            neighborPath.attr("fill", "blue");
          });
          d3.select(this).attr("fill", "red");
        });
        path.on("mouseout", function () {
          // When the mouse is no longer hovering over a path element, reset the color of all path elements.
          d3.selectAll("path").attr("fill", "white");
        });
      }
      path.attr(
        "data-tip",
        `${counties[i].name}, ${counties[i].state}
      ${counties[i].countyId}`
      );
      path.attr("data-for", "tooltip");
    }
  };

  const createSvg = (counties) => {
    populatePaths(counties);
    const handleZoom = (e) => {
      d3.select("svg g").attr("transform", e.transform);
    };
    let zoom = d3.zoom().on("zoom", handleZoom);
    d3.select("#map").call(zoom);
    ReactTooltip.rebuild();
  };

  React.useEffect(() => {
    console.log("Map component mounted");
    // Create a resize listener that will update the width and height of the svg. Wait a second though to save performance.
    const handleResize = () => {
      setTimeout(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      }, 100);
    };
    window.addEventListener("resize", handleResize);

    // Fetch the counties.
    fetchCounties().then((res) => {
      var counties = res.data;
      // Create the svg.
      createSvg(counties);
    });
  }, []);

  // The map viewbox should fit the window width and height.
  return (
    <div id="map1" style={{ background: "lightBlue" }} className="flex justify-center items-center h-100 w-100">
      <svg
        id="map"
        style={{ shapeRendering: "crispEdges" }}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g />
      </svg>
      <ReactTooltip
        id="tooltip"
        effect="solid"
        getContent={(dataTip) => (
          <div>
            <h3>{dataTip}</h3>
          </div>
        )}
        delayShow={500}
        place={"right"}
        border={false}
      ></ReactTooltip>
    </div>
  );
}
