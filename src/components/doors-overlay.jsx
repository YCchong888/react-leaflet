import React from "react";
import { DoorMarker as DoorMarker_ } from "./door-marker";
import { SVGOverlay } from "react-leaflet";
import { withLabel } from "./with-label";

/**
 * Bind a marker to include the door name in the click event.
 * This is needed to avoid re-rendering all markers when only one of them changes.
 */
function bindMarker(MarkerComponent) {
  return ({ door, onClick, ...otherProps }) => {
    const handleClick = React.useCallback(
      (ev) => onClick && onClick(ev, door.name),
      [onClick, door.name]
    );
    return <MarkerComponent onClick={onClick && handleClick} {...otherProps} />;
  };
}
const DoorMarker = withLabel(DoorMarker_);

export const DoorsOverlay = ({
  doors,
  doorStates = {},
  hideLabels = false,
  onDoorClick,
  ...otherProps
}) => {
  React.useEffect(() => {
    console.log(doorStates, "2222222222222");
  }, [doorStates]);
  return (
    <SVGOverlay viewBox="0 0 80 80" {...otherProps}>
      {doors.map((door, index) => {
        const [x1, y1] = [door.v1_x, door.v1_y];
        const [x2, y2] = [door.v2_x, door.v2_y];
        return (
          <DoorMarker
            key={door.name}
            door={door}
            onClick={onDoorClick}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            doorType={door.door_type}
            doorMode={
              doorStates &&
              doorStates[index] &&
              doorStates[index].current_mode.value
            }
            aria-label={door.name}
            style={
              {
                // transformOrigin: `${center[0]}px ${center[1]}px`,
              }
            }
            hideLabel={hideLabels}
            labelText={door.name}
            labelSourceX={x2}
            labelSourceY={y1 + 2}
          />
        );
      })}
    </SVGOverlay>
  );
};

export default DoorsOverlay;
