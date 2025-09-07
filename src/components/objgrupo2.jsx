import { useLoader } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import { TextureLoader } from "three";

const Objgrupop = () => {
  // ✅ Cargar texturas
  const cubeTexture = useLoader(TextureLoader, "/assets/texture1.jpg");
  const sphereTexture = useLoader(TextureLoader, "/assets/texture2.jpg");
  const coneTexture = useLoader(TextureLoader, "/assets/alpha.png");

  // ✅ Referencias a cada grupo
  const group1Ref = useRef();
  const group2Ref = useRef();
  const group3Ref = useRef();

  // ✅ Animación para girar cada grupo
  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      if (group1Ref.current) group1Ref.current.rotation.y += 0.05;
      if (group2Ref.current) group2Ref.current.rotation.y += 0.05;
      if (group3Ref.current) group3Ref.current.rotation.y += 0.05;
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // ✅ Transformaciones iniciales a cada grupo
  useEffect(() => {
    if (group1Ref.current) {
      group1Ref.current.rotation.y = Math.PI / 4;
      group1Ref.current.scale.set(3, 3, 3);
      group1Ref.current.position.set(-8, 6, 0);
    }
    if (group2Ref.current) {
      group2Ref.current.rotation.y = Math.PI / 4;
      group2Ref.current.scale.set(2, 2, 2);
      group2Ref.current.position.set(0, 4, 0);
    }
    if (group3Ref.current) {
      group3Ref.current.rotation.y = Math.PI / 4;
      group3Ref.current.scale.set(1.5, 1.5, 1.5);
      group3Ref.current.position.set(8, 2, 0);
    }
  }, []);

  const Objetos = () => (
    <>
      {/* Cubo */}
      <mesh position={[-2, 0, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial map={cubeTexture} />
      </mesh>

      {/* Esfera */}
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial map={sphereTexture} />
      </mesh>

      {/* Cono */}
      <mesh position={[2, 0, 0]} castShadow>
        <coneGeometry args={[0.8, 1.5, 32]} />
        <meshStandardMaterial map={coneTexture} />
      </mesh>
    </>
  );

  return (
    <>
      {/* ✅ Luces */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

      {/* ✅ Suelo */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>

      {/* ✅ Grupo 1 */}
      <group ref={group1Ref}>
        <Objetos />
      </group>

      {/* ✅ Grupo 2 */}
      <group ref={group2Ref}>
        <Objetos />
      </group>

      {/* ✅ Grupo 3 */}
      <group ref={group3Ref}>
        <Objetos />
      </group>
    </>
  );
};

export default Objgrupop;
