import clsx from "clsx";
import React from "react";
import { DoorMode as RmfModels } from "../ref-models/DoorMode";
import { Door } from "../ref-models/Door";

const useDoorStyles = {
  marker: {
    cursor: "pointer",
    pointerEvents: "auto",
  },
  base: {
    strokeWidth: 0.2,
  },
  open: {
    stroke: "#AFDDAE",
    strokeDasharray: 0.1,
  },
  close: {
    stroke: "#BC4812",
  },
  moving: {
    stroke: "#E9CE9F",
    strokeDasharray: 0.3,
  },
  unknown: {
    stroke: "grey",
  },
  transparent: {
    stroke: "transparent",
  },
};

function useDoorStyle(doorMode) {
  const classes = useDoorStyles;
  console.log(doorMode,"mode1111");
  if (doorMode === undefined) {
    return classes.unknown;
  }

  switch (doorMode) {
    case RmfModels.MODE_OPEN:
      return classes.open;
    case RmfModels.MODE_MOVING:
      return classes.moving;
    case RmfModels.MODE_CLOSED:
      return classes.close;
    default:
      return classes.unknown;
  }
}

const BaseDoor = ({ classObj, ...otherProps }) => {
  const classes = useDoorStyles;
  // console.log("我又是个啥",clsx(classes.base, className),classes.base,className)
  // return <line x1={10} y1={20} x2={10} y2={50} style={{stroke:'#FFBF00',strokeWidth:10}}/>
  return <line style={(classes.base, classObj)} {...otherProps} />;
};

/**
 * Because we are using stroke-dash in some of the classes, it makes it such that only
 * the rendered line will be considered for click detection. To workaround it, we use
 * a transparent door on top of the marker, this dummy door will be used to allow the
 * full door to be clickable.
 */
const DummyDoor = ({ className, ...otherProps }) => {
  const classes = useDoorStyles;
  return (
    <line
      className={clsx(classes.base, classes.transparent, className)}
      {...otherProps}
    />
  );
};

const SingleSwingDoor = ({ x1, x2, y1, y2, doorMode }) => {
  const doorStyle = useDoorStyle(RmfModels.MODE_CLOSED);
  return (
    <>
      <BaseDoor x1={x1} y1={y1} x2={x2} y2={y2} classObj={doorStyle} />
      <DummyDoor x1={x1} y1={y1} x2={x2} y2={y2} />
    </>
  );
};

const SingleSlidingDoor = SingleSwingDoor;

const SingleTelescopeDoor = SingleSlidingDoor;

const DoubleSwingDoor = ({ x1, y1, x2, y2, doorMode }) => {
  const separatorX = (x2 - x1) * 0.05;
  const separatorY = (y2 - y1) * 0.05;
  const centerX = x1 + (x2 - x1) / 2;
  const centerY = y1 + (y2 - y1) / 2;
  const doorStyle = useDoorStyle(doorMode);
  return (
    <>
      <BaseDoor
        x1={x1}
        y1={y1}
        x2={centerX - separatorX}
        y2={centerY - separatorY}
        classObj={doorStyle}
      />
      <BaseDoor
        x1={centerX + separatorX}
        y1={centerY + separatorY}
        x2={x2}
        y2={y2}
        classObj={doorStyle}
      />
      <DummyDoor x1={x1} y1={y1} x2={x2} y2={y2} />
    </>
  );
};

const DoubleSlidingDoor = DoubleSwingDoor;

const DoubleTelescopeDoor = DoubleSlidingDoor;

export const DoorMarker = React.forwardRef(
  ({ x1, y1, x2, y2, doorType, doorMode, ...otherProps }, ref) => {
    const classes = useDoorStyles;
    const doorProps = { x1, y1, x2, y2, doorType, doorMode };

    const renderDoor = () => {
      console.log("走这里了么", doorType);
      // return <SingleSwingDoor {...doorProps} />;
      switch (doorType) {
        case Door.DOOR_TYPE_SINGLE_SWING:
          return <SingleSwingDoor {...doorProps} />; // 单开门
        case Door.DOOR_TYPE_SINGLE_SLIDING:
          return <SingleSlidingDoor {...doorProps} />;
        case Door.DOOR_TYPE_SINGLE_TELESCOPE:
          return <SingleTelescopeDoor {...doorProps} />;
        case Door.DOOR_TYPE_DOUBLE_SWING:
          return <DoubleSwingDoor {...doorProps} />; // 双开门
        case Door.DOOR_TYPE_DOUBLE_SLIDING:
          return <DoubleSlidingDoor {...doorProps} />;
        case Door.DOOR_TYPE_DOUBLE_TELESCOPE:
          return <DoubleTelescopeDoor {...doorProps} />;
        default:
          return null;
      }
    };

    try {
      return (
        <g ref={ref} {...otherProps}>
          <g className={otherProps.onClick ? classes.marker : undefined}>
            {/* <line x1={10} y1={20} x2={10} y2={50} style={{stroke:'#FFBF00',strokeWidth:10}}/> */}
            {renderDoor()}
          </g>
          {/* <rect x="10" y="10" width="100" height="100" /> */}
        </g>
      );
    } catch (e) {
      console.error(e.message);
      return null;
    }
  }
);

export default DoorMarker;
