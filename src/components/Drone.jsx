import React from "react";

const Drone = ({ position }) => {
  return (
    <div
      className='drone'
      style={{
        left: `${position.x - 15}px`,
        top: `${position.y - 15}px`,
        background: position.stateColor,
      }}
    ></div>
  );
};

export default Drone;
