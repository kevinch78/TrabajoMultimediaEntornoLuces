// src/pages/Practica3.jsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Objgrupop from "../components/objgrupop"; // tu componente con objetos/grupos

const Practica3 = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h3>Práctica 3 - Migración a React Three Fiber</h3>
      <div style={{ height: "600px" }}>
        <Canvas
          shadows
          camera={{ position: [10, 5, 10], fov: 40 }}
          style={{ width: "100vw", height: "100vh" }}
        >
          {/* ✅ Luces en R3F */}
          <ambientLight intensity={-5} />
          <directionalLight position={[8, 15, 1]} intensity={1} castShadow />
          <hemisphereLight skyColor={"red"} groundColor={"blue"} intensity={2} />
          <pointLight position={[0, 5, 0]} intensity={5} />
          <spotLight position={[10, 15, 10]} angle={0.3} intensity={1.5} castShadow />
          <rectAreaLight width={5} height={5} intensity={2} color={"white"} position={[0, 5, 0]} />

          {/* ✅ Entorno y objetos */}
          <axesHelper args={[3]} />
          <Environment preset="sunset" />
          <Objgrupop />

          {/* ✅ Controles */}
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
};

export default Practica3;
