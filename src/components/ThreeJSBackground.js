import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Lights from "./Lights";
import Model from "./Model";

export function ThreeJSBackground() {
  <div id="canvasContainer">
    <Canvas
      camera={{ position: [0, 1, 2] }} //Camera looks down on rotating object intially
      shadows={{
        type: "PCFSoftShadowMap",
      }}
      //display pixel ratio
      dpr={[1, 2]}
    >
      <Lights />

      <Model />
      <OrbitControls />
    </Canvas>
  </div>;
}

/*useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Initialize the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    // Create the geometry and add it to the scene
    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop
    const animate = (time) => {
      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;

      renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(animate);

    // Cleanup function
    return () => {
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
    };
  }, []); // Empty dependency array means this effect runs only on mount and unmount

  return null; // This component doesn't return any JSX
}*/
