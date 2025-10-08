import React, { useState } from "react";
import WaypointList from "./WaypointList";

const Controls = ({
  addWaypoint,
  startSimulation,
  reset,
  isSimulating,
  waypoints,
  removeWaypoint,
  currentIndex,
}) => {
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    const xNum = Number(x);
    const yNum = Number(y);

    if (isNaN(xNum) || isNaN(yNum)) {
      setError("Coordinates must be numeric");
      return;
    }
    if (xNum < 0 || xNum > 1000 || yNum < 0 || yNum > 1000) {
      setError("Coordinates must be between 0 and 1000");
      return;
    }

    addWaypoint({ x: xNum, y: yNum });
    setX("");
    setY("");
    setError("");
  };

  return (
    <div className='controls'>
      <h2>Control Panel</h2>

      <div className='coord-inputs'>
        <div
          className='input-container'
          aria-describedby={error ? "coordinate-error" : ""}
        >
          <div>
            <label htmlFor='x-coordinate'>X Coordinate</label>
            <input
              id='x-coordinate'
              value={x}
              onChange={(e) => setX(e.target.value)}
              disabled={isSimulating}
            />
          </div>
          <div>
            <label htmlFor='y-coordinate'>Y Coordinate</label>
            <input
              id='y-coordinate'
              value={y}
              onChange={(e) => setY(e.target.value)}
              disabled={isSimulating}
            />
          </div>
        </div>
        <button onClick={handleAdd} className='add-btn' disabled={isSimulating}>
          Add
        </button>
      </div>
      {error && (
        <p className='error' id='coordinate-error'>
          {error}
        </p>
      )}
      {waypoints.length > 0 && (
        <>
          <WaypointList
            waypoints={waypoints}
            removeWaypoint={removeWaypoint}
            currentIndex={currentIndex}
          />

          <div className='action-btns'>
            <button
              onClick={startSimulation}
              className='start-btn'
              disabled={isSimulating}
            >
              Start Simulation
            </button>
            <button onClick={reset} className='reset-btn'>
              Reset
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Controls;
