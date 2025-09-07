import React from "react";
import Objgrupo2 from "../components/objgrupo2";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

const Practica1 = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h3>Practica2</h3>

      <div style={{ height: "600px" }}>
        <Canvas
          className="position-absolute w-100 h-100"
          style={{ position: "fixed", width: "100vw", height: "100vh" }}
          camera={{ position: [10, 5, 10], fov: 40 }}
        >
          <axesHelper args={[3]} />
          <Environment preset="forest" />
          <Objgrupo2/>
          <OrbitControls enableRotate={true} />
        </Canvas>
      </div>
    </div>
  );
};

export default Practica1;
