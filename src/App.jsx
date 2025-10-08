import React, { useState } from "react";
import Playground from "./components/Playground";
import Controls from "./components/Controls";
import WaypointList from "./components/WaypointList";
import "./App.css";

export default function App() {
  const [dronePosition, setDronePosition] = useState({
    x: 0,
    y: 0,
    stateColor: "#22c55e",
  });
  const [waypoints, setWaypoints] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [status, setStatus] = useState("🟢 Idle");

  const addWaypoint = (point) => {
    if (isSimulating) return;
    setWaypoints((prev) => [...prev, point]);
  };

  const removeWaypoint = (index) => {
    if (isSimulating) return;
    setWaypoints((prev) => prev.filter((_, i) => i !== index));
  };

  const moveDrone = (target, i) =>
    new Promise((resolve) => {
      setDronePosition({ ...target, stateColor: "yellow" });
      setStatus(`🟡 Moving to waypoint ${i + 1} of ${waypoints.length}`);
      setTimeout(() => resolve(), 1000);
    });

  const startSimulation = async () => {
    if (waypoints.length === 0) return;
    setIsSimulating(true);

    for (let i = 0; i < waypoints.length; i++) {
      setCurrentIndex(i);
      await moveDrone(waypoints[i], i);
    }

    setDronePosition((prev) => ({ ...prev, stateColor: "#22c55e" }));
    setCurrentIndex(-1);
    setIsSimulating(false);
    setStatus("🟢 Simulation complete");
  };

  const reset = () => {
    setWaypoints([]);
    setDronePosition({ x: 0, y: 0, stateColor: "#22c55e" });
    setCurrentIndex(-1);
    setIsSimulating(false);
    setStatus("🟢 Idle");
  };

  return (
    <div className='App'>
      <h1 className='title'>Drone Motion Simulator</h1>

      <div className='container'>
        <div className='playground-section'>
          <Playground
            dronePosition={dronePosition}
            waypoints={waypoints}
            currentIndex={currentIndex}
          />
        </div>

        <div className='control-section'>
          <Controls
            addWaypoint={addWaypoint}
            startSimulation={startSimulation}
            reset={reset}
            isSimulating={isSimulating}
            waypoints={waypoints}
            removeWaypoint={removeWaypoint}
            currentIndex={currentIndex}
          />
          <div className='status-box'>
            <strong>Status:</strong> {status}
          </div>
        </div>
      </div>
    </div>
  );
}
