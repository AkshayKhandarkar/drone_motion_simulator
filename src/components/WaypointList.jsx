import React from "react";

const WaypointList = ({ waypoints, removeWaypoint, currentIndex }) => {
  return (
    <div className='waypoints'>
      <h3>Coordinates</h3>
      <ul>
        {waypoints.map((wp, i) => (
          <li key={i} className={currentIndex === i ? "active" : ""}>
            {wp.x}, {wp.y}
            <button onClick={() => removeWaypoint(i)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WaypointList;
