import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Model = () => {
  const mesh = useRef(null);

  useFrame(() => {
    mesh.current.geometry.center();
    mesh.current.rotation.y += 0.01;
  });
  console.log("created model");
  return (
    <mesh
      ref={mesh}
      castShadow
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  );
};

export default Model;
