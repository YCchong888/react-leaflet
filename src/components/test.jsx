import React from 'react';
import { LayersControl } from 'react-leaflet';
import { AffineImageOverlay } from './affine-image-overlay';
import { Map as LMap_, ImageOverlay, Marker,Popup } from 'react-leaflet';
import * as L from "leaflet";
import mapBg from '../assets/canvasBg.jpg'
const dispensers = [{ guid: 'test_dispenser', location: [18, -9] }];
const ingestors = [{ guid: 'test_ingestor', location: [16, -9] }];
// const fleetState = {
//   name: 'test_fleet',
//   robots: [
//     makeRobot({
//       name: 'test_robot',
//       location: { x: 20, y: -10, yaw: 0, level_name: 'L1', index: 0, t: { sec: 0, nanosec: 0 } },
//     }),
//   ],
// };
const waypoints= [
  {
    level: 'L1',
    vertex: {
      x: 19.89569854736328,
      y: -3.4071500301361084,
      name: 'lounge',
      params: [],
    },
  },
];

export const ScheduleVisualizer= () => {
//   const safeAsync = useAsync();
//   const levels = React.useMemo(
//     () => [...officeMap.levels].sort((a, b) => a.name.localeCompare(b.name)),
//     [],
//   );
//   const [currentLevel, setCurrentLevel] = React.useState(levels[0]);
  const [images, setImages] = React.useState({});
  const [levelBounds, setLevelBounds] = React.useState(
    {test:[0,0]},
  );
//   const bounds = React.useMemo(() => levelBounds[currentLevel.name], [levelBounds, currentLevel]);
  const [robots, setRobots] = React.useState([]);
  const position = [51.505, -0.09];
  return (
    <div style={{ width: '100vw', height: '100vh', padding: 0, margin: 0 }}>
      <LMap_ center={position} zoom={1} style={{height:1000+'px'}} crs={L.CRS.Simple}>
        <LayersControl
          position="topleft"
        >
          <LayersControl.BaseLayer
              key={"test"}
              name={"test"}
              checked={true}
            >
              <ImageOverlay url={mapBg} bounds={levelBounds['test']}/>
            </LayersControl.BaseLayer>
        </LayersControl>
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup.
            <br />
            Easily customizable.
          </Popup>
        </Marker>
      </LMap_>
    </div>
  );
};
