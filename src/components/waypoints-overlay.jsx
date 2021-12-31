import React from "react";
import { fromRmfCoords } from "../utils/misc";
import { SVGOverlay } from "react-leaflet";
import { WaypointMarker as WaypointMarker_} from "./waypoint-marker";
import { withLabel } from './with-label';

// no need memo since waypoint doesn't have state and should never re-render.
const WaypointMarker = withLabel(WaypointMarker_);

export const WaypointsOverlay = ({
  hideLabels = false,
  waypoints,
  ...otherProps
}) => {
  // const viewBox = viewBoxFromLeafletBounds(otherProps.bounds);
  // Set the size of the waypoint. At least for now we don't want for this to change. We left this here in case we want for this to change in the future.
  const size = 0.2;
  // const scale = useAutoScale(60);

  return (
    <SVGOverlay viewBox="0 0 80 80" {...otherProps}>
      {/* <rect x="0" y="0" width="20%" height="20%" fill="blue" />
      <circle r="5" cx="10" cy="10" fill="red" />
      <text x="15" y="15" fill="black">
        text
      </text> */}
      {waypoints.map((waypoint, idx) => {
        const [x, y] = fromRmfCoords([waypoint.vertex.x, waypoint.vertex.y]);
        return (
          <g key={idx}>
            <WaypointMarker
              cx={x}
              cy={y}
              size={size}
              aria-label={waypoint.vertex.name}
              style={{ transformOrigin: `${x}px ${y}px` }}
              labelText={waypoint.vertex.name}
              labelSourceX={x}
              labelSourceY={y-1}
              hideLabel={hideLabels}
            />
          </g>
        );
      })}
    </SVGOverlay>
  );
};

export default WaypointsOverlay;
