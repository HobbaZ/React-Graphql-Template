import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Lights from "./Lights";
import Model from "./Model";
import React from "react";

export function ThreeJSBackground() {
  return (
    <div id="canvasContainer">
      <Canvas
        camera={{ position: [1, 1, 2] }}
        shadows={{
          type: "PCFSoftShadowMap",
        }}
        dpr={[1, 2]} // Display pixel ratio
      >
        <Lights />
        <Model />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
