import React from "react";
import { getQuadrant, getRing, getMovedStatus } from "../function.helper";
import { radar_visualization } from "../d3/radar_visualization";
import { useWindowSize } from "../custom-hooks";
import { QUADRANTS } from "../App";
import { stylesTheme } from "../index";
import * as d3 from "d3";

const RadarVisualization = ({ techList }) => {
  const radarRef = React.useRef();
  const radarWidth = 1450;
  const radarHeight = 980;
  const { isMobile } = useWindowSize();

  function setSize() {
    const aspect = radarWidth / radarHeight,
      chart = d3.select("#radar"),
      container = d3.select("#radarParent");

    if (container && container.node()) {
      var targetWidth = container.node().getBoundingClientRect().width - 100;
      chart.attr("width", targetWidth);
      chart.attr("height", Math.round(targetWidth / aspect));
    }
  }

  const updateRadar = React.useCallback(() => {
    const entries = techList.map(tech => {
      return {
        ...tech,
        label: tech.name,
        dbId: tech.id,
        quadrant: getQuadrant(tech.quadrant),
        quadrantString: tech.quadrant,
        ring: getRing(tech.ring),
        ringString: tech.ring,
        moved: getMovedStatus(tech.moved),
        movedString: tech.moved
      };
    });

    radar_visualization({
      svg_id: "radar",
      width: radarWidth,
      height: radarHeight,
      isMobile: !!isMobile,
      textColor: stylesTheme.default.lightColor,
      ringText: "rgba(255,255,255,0.5)",
      colors: {
        background: "#282c34",
        grid: "white",
        inactive: "#ddd"
      },
      title: "",
      quadrants: QUADRANTS,
      rings: [{ name: "Adopt" }, { name: "Trial" }, { name: "Assess" }, { name: "Hold" }],
      print_layout: true,
      entries: entries
      //zoomed_quadrant: 0,
    });
    setSize();
  }, [techList, isMobile]);

  React.useEffect(() => {
    const radarParent = radarRef.current;

    while (radarParent && radarParent.firstChild) {
      radarParent.removeChild(radarParent.firstChild);
    }
    updateRadar();
  }, [techList, updateRadar, radarRef]);

  return (
    <div id="radarParent" publicPage={true}>
      <svg
        ref={radarRef}
        id="radar"
        width={radarWidth}
        height={radarHeight}
        viewBox={`0 0 ${radarWidth} ${radarHeight}`}
        perserveaspectratio="xMinYMid"
      />
    </div>
  );
};

export default React.memo(RadarVisualization);
