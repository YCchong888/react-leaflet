// import clsx from 'clsx';
import "leaflet/dist/leaflet.css";
import React from "react";
import mapBg from "../assets/canvasBg.jpg";
import * as L from "leaflet";
import {
  Map,
  Marker,
  Popup,
  ImageOverlay,
  Pane,
  LayersControl,
  SVGOverlay,
  useLeaflet,
} from "react-leaflet";
import WaypointsOverlay from "./waypoints-overlay";
import DoorsOverlay from "./doors-overlay";
import { LabelsPortalContext } from "./labels-overlay";
import { Button } from "antd";

const position = [0, 0];
const CRS = L.CRS.Simple;
// export type LatLngBoundsExpression = L.LatLngBoundsExpression;

export const LMap = React.forwardRef(
  ({ className, children, ...otherProps }, ref) => {
    const [levelBounds, setLevelBounds] = React.useState({
      test: [
        [-100, -100],
        [100, 200],
      ],
    });
    const waypoints = [
      {
        level: "test",
        vertex: {
          name: "记录点1",
          params: [],
          x: 0,
          y: -20,
        },
      },
      {
        level: "test",
        vertex: {
          name: "记录点2",
          params: [],
          x: 30,
          y: -10,
        },
      },
    ]; //标记点 假数据
    const doors = [
      {
        door_type: 6,
        motion_direction: 1,
        motion_range: 1,
        name: "双开门1",
        v1_x: 10,
        v1_y: 50,
        v2_x: 20,
        v2_y: 60,
      },
      {
        door_type: 5,
        motion_direction: 1,
        motion_range: 1,
        name: "单开门1",
        v1_x: 60,
        v1_y: 25,
        v2_x: 60,
        v2_y: 16,
      },
    ]; // 门 假数据
    const doorStates = [
      {
        door_name: "main_door",
        current_mode: {
          value: 1,
        },
        door_time: {
          sec: 322,
          nanosec: 555000,
        },
      },
      {
        door_name: "coe_door",
        current_mode: {
          value: 1,
        },
        door_time: {
          sec: 322,
          nanosec: 235000,
        },
      },
    ];
    const [currentLevel, setCurrentLevel] = React.useState({
      waypoints: waypoints,
      doors: doors,
      doorStates: doorStates,
    });
    const [layersUnChecked, setLayersUnChecked] = React.useState({});
    const [labelsPortal, setLabelsPortal] = React.useState(null);
    const registeredLayersHandlers = React.useRef(false);

    const position = [51.505, -0.09];
    const changeDoors = () => {
      setCurrentLevel({
        waypoints: waypoints,
        doors: doors,
        doorStates: [
          {
            door_name: "main_door",
            current_mode: {
              value: 2,
            },
            door_time: {
              sec: 322,
              nanosec: 555000,
            },
          },
          {
            door_name: "coe_door",
            current_mode: {
              value: 3,
            },
            door_time: {
              sec: 322,
              nanosec: 235000,
            },
          },
        ],
      });
    };
    React.useEffect(() => {
      console.log(currentLevel, "312321231");
      return () => {};
    }, [currentLevel]);
    return (
      <div>
        <Button onClick={changeDoors}>测试门</Button>
        <Map
          center={position}
          zoom={1}
          style={{ height: 1000 + "px" }}
          crs={CRS}
          ref={(cur) => {
            if (registeredLayersHandlers.current || !cur) return;
            cur.leafletElement.on("overlayadd", (ev) => {
              console.log("on里面的", layersUnChecked); //这竟然是 闭包 。。。
              setLayersUnChecked((prev) => ({ ...prev, [ev.name]: false }));
            });
            cur.leafletElement.on("overlayremove", (ev) =>
              setLayersUnChecked((prev) => ({ ...prev, [ev.name]: true }))
            );
            registeredLayersHandlers.current = true;
          }}
        >
          {/* <EntityManagerProvider> */}
          <LabelsPortalContext.Provider value={labelsPortal}>
            <LayersControl position="topleft">
              <LayersControl.BaseLayer
                key={"test"}
                name={"test"}
                checked={true}
              >
                <ImageOverlay url={mapBg} bounds={levelBounds["test"]} />
              </LayersControl.BaseLayer>
              {/* 重叠层 静止的*/}
              <LayersControl.Overlay
                name="Waypoints"
                checked={!layersUnChecked["Waypoints"]}
              >
                <WaypointsOverlay
                  bounds={levelBounds["test"]}
                  waypoints={currentLevel.waypoints}
                  hideLabels={layersUnChecked["Waypoints"]}
                />
              </LayersControl.Overlay>
              {/* 重叠层 有状态的 门*/}
              <LayersControl.Overlay
                name="Doors"
                checked={!layersUnChecked["Doors"]}
              >
                <DoorsOverlay
                  bounds={levelBounds["test"]}
                  doors={currentLevel.doors}
                  doorStates={currentLevel.doorStates}
                  hideLabels={layersUnChecked["Doors"]}
                />
              </LayersControl.Overlay>
              {/* 重叠层 弹窗*/}
              <LayersControl.Overlay name="Marker with popup">
                <Marker position={position}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </LayersControl.Overlay>
            </LayersControl>
            <Pane name="label" style={{ zIndex: 1000 }}>
              <SVGOverlay
                ref={(current) => {
                  setLabelsPortal(current?.container || null);
                }}
                viewBox="0 0 80 80"
                bounds={levelBounds["test"]}
              />
            </Pane>
          </LabelsPortalContext.Provider>
          {/* </EntityManagerProvider> */}
        </Map>
      </div>
    );
  }
);
