import React from "react";

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.3} color="white" />

      <pointLight
        position={[0, 0, 0]}
        castShadow={true}
        intensity={3 / 100} // Divide by 100 to control brightness
        color={"white"}
      />
    </>
  );
};

export default Lights;
