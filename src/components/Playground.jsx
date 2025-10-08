import React from "react";
import Drone from "./Drone";

const Playground = ({ dronePosition, waypoints, currentIndex }) => {
  return (
    <div className='playground'>
      <h3 className='playground-title'>Playground</h3>
      <svg width='1000' height='1000' className='path-lines'>
        {Array.from({ length: 11 }).map((_, i) => (
          <line
            key={`xgrid-${i}`}
            x1={i * 100}
            y1='0'
            x2={i * 100}
            y2='1000'
            stroke='#f1efef'
            strokeWidth='1'
          />
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <line
            key={`ygrid-${i}`}
            x1='0'
            y1={i * 100}
            x2='1000'
            y2={i * 100}
            stroke='#f1efef'
            strokeWidth='1'
          />
        ))}
        {waypoints.map((wp, i) => {
          const prev = i === 0 ? { x: 0, y: 0 } : waypoints[i - 1];
          return (
            <line
              key={i}
              x1={prev.x}
              y1={1000 - prev.y}
              x2={wp.x}
              y2={1000 - wp.y}
              stroke='#3ca9ff'
              strokeDasharray='8 6'
              strokeWidth='3'
            />
          );
        })}

        {waypoints.map((wp, i) => (
          <g key={`point-${i}`}>
            <circle
              cx={wp.x}
              cy={1000 - wp.y}
              r='8'
              fill={currentIndex === i ? "#ff4d4f" : "#ff6666"}
              stroke='white'
              strokeWidth='2'
            />
            <text x={wp.x + 12} y={1000 - wp.y - 10} fill='#222' fontSize='12'>
              ({wp.x},{wp.y})
            </text>
          </g>
        ))}
      </svg>

      <Drone
        position={{
          x: dronePosition.x,
          y: 1000 - dronePosition.y,
          stateColor: dronePosition.stateColor,
        }}
      />
      <div className='origin'>(0,0)</div>
    </div>
  );
};

export default Playground;
