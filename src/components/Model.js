import { useRef } from "react";

const Model = () => {
  const mesh = useRef(null);
  console.log("created model");
  return (
    <mesh
      ref={mesh}
      castShadow
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <boxGeometry />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

export default Model;
