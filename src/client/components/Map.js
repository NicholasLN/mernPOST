import React from "react";
import axios from "axios";
import * as d3 from "d3";
import ReactTooltip from "react-tooltip";

// Create a method for fetching counties. The api route is /api/info/counties/fetchAllCounties.
// The method should return a promise.
const fetchCounties = async () => {
  return await axios.get("/api/info/county/fetchAllCounties");
};

export default function Map({ height, width, className, onCountyClick }) {
  const [mWidth, setWidth] = React.useState(width);
  const [mHeight, setHeight] = React.useState(height);
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

      path.on("mouseover", function () {
        d3.select(this).attr("fill", "red");
      });
      path.on("mouseout", function () {
        d3.select(this).attr("fill", "white");
      });
      path.on("click", function () {
        d3.select(this).attr("fill", "red");
        onCountyClick(counties[i]);
      });

      path.attr(
        "data-tip",
        `${counties[i].name}, ${counties[i].state}
      ${counties[i].countyId}`
      );
      path.attr("data-for", "tooltip");
    }
    // Make the SVG only as large as the counties
    var bbox = d3.select("#map g").node().getBBox();
    d3.select("#map").attr("viewBox", `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
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
    fetchCounties().then((res) => {
      var counties = res.data;
      createSvg(counties);
    });
  }, []);

  return (
    <div id="map1" style={{ background: "lightBlue", margin: "0", padding: "0" }} className={className}>
      <svg id="map" width={mWidth} height={mHeight}>
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
