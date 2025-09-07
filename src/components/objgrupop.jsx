import { useLoader } from "@react-three/fiber";
import React, { useRef, useEffect, useState } from "react";
import { TextureLoader } from "three";

const Objgrupop = () => {
  const cubeTexture = useLoader(TextureLoader, "/assets/texture1.jpg");
  const sphereTexture = useLoader(TextureLoader, "/assets/texture2.jpg");
  const coneTexture = useLoader(TextureLoader, "/assets/alpha.png");

  const group1Ref = useRef();
  const group2Ref = useRef();
  const group3Ref = useRef();

  const [rotation, setRotation] = useState(0.01);

  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      if (group1Ref.current) group1Ref.current.rotation.y += rotation;
      if (group2Ref.current) group2Ref.current.rotation.y += rotation;
      if (group3Ref.current) group3Ref.current.rotation.y += rotation;

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [rotation]);

  const handleClick = () => {
    setRotation(rotation === 0.01 ? 0.07 : 0.01);
    console.log("Click:", rotation);
  };

  const Objetos = ({ position }) => (
    <>
      {/* Cubo */}
      <mesh position={[position[0] - 2, position[1] + 2, position[2]]} castShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial map={cubeTexture} />
      </mesh>

      {/* Esfera con clic */}
      <mesh position={[position[0], position[1] + 2, position[2]]} castShadow onPointerDown={handleClick}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial map={sphereTexture} />
      </mesh>

      {/* Cono */}
      <mesh position={[position[0] + 2, position[1] + 1, position[2]]} castShadow>
        <coneGeometry args={[1, 3, 32]} />
        <meshStandardMaterial map={coneTexture} />
      </mesh>
    </>
  );

  return (
    <>
      {/* Luces */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

      {/* Suelo */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>

      {/* Agrupación 1 */}
      <group ref={group1Ref} position={[-8, 3, 0]} rotation={[5, 2, 0]}>
        <Objetos position={[0, 0, 0]} />
      </group>

      {/* Agrupación 2 */}
      <group ref={group2Ref} position={[0, 3, 0]} rotation={[5, 2, 0]}>
        <Objetos position={[0, 0, 0]} />
      </group>

      {/* Agrupación 3 */}
      <group ref={group3Ref} position={[8, 3, 0]} rotation={[5, 0, 0]}>
        <Objetos position={[0, 0, 0]} />
      </group>
    </>
  );
};

export default Objgrupop;
