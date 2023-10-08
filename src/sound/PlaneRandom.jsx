/* eslint-disable react/no-unknown-property */

import { useFrame } from "@react-three/fiber";
import fragmentShader from "./fragmentShader.glsl";
import vertexShader from "./vertexShader.glsl";
import { useEffect, useRef } from "react";
import { BufferAttribute, MathUtils } from "three";
import { useControls } from "leva";

function Plane() {
  const meshRef = useRef();

  const { planeSegments, heightAmplitude, updateFrequency, lerpSpeed, maxHeight } = useControls({
    planeSegments: {
      value: 102,
      min: 0,
      max: 256,
      step: 2,
    },
    heightAmplitude: {
      value: 0.8,
      min: 0,
      max: 5,
      step: 0.1,
    },
    maxHeight: {
      value: 1,
      min: 0,
      max: 5,
      step: 0.1,
    },
    updateFrequency: {
      value: 0.02,
      min: 0,
      max: 0.1,
      step: 0.001,
    },
    lerpSpeed: {
      value: 0.05,
      min: 0,
      max: 0.5,
      step: 0.01,
    }
  })

  console.log(" plane render")

  let previousTime = 0;
  let nextRandomHeight = [];

  useEffect(() => {
    if (!meshRef.current) return;
    const count = meshRef.current.geometry.attributes.position.count;
    const randoms = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      randoms[i] = Math.random()
    }
    meshRef.current.geometry.setAttribute('aRandom', new BufferAttribute(randoms, 1));
    meshRef.current.geometry.attributes.aRandom.needsUpdate = true;
  }, [planeSegments])

  useFrame(({ clock }) => {
    if (!meshRef.current || !meshRef.current.geometry.attributes.aRandom) return;

    // Get geometry data
    const count = meshRef.current.geometry.attributes.position.count;
    const randoms = meshRef.current.geometry.attributes.aRandom.array;

    if (nextRandomHeight.length === 0) {
      // Create the new random height
      for (let i = 0; i < count; i++) {
        let clampedValue = Math.min(Math.random() * (randoms[i] + heightAmplitude - (randoms[i] - heightAmplitude)) + randoms[i] - heightAmplitude, maxHeight);
        clampedValue = Math.max(clampedValue, 0);
        nextRandomHeight[i] = clampedValue;
      }
    }

    if (updateFrequency < clock.getElapsedTime() - previousTime) {

      // Create the new random height
      for (let i = 0; i < count; i++) {
        if (randoms[i] === nextRandomHeight[i] || randoms[1] - nextRandomHeight[1] < 0.01) {
          let clampedValue = Math.min(Math.random() * (randoms[i] + heightAmplitude - (randoms[i] - heightAmplitude)) + randoms[i] - heightAmplitude, maxHeight);
          clampedValue = Math.max(clampedValue, 0);
          nextRandomHeight[i] = clampedValue;
        }

        randoms[i] = MathUtils.lerp(randoms[i], nextRandomHeight[i], lerpSpeed);
      }

      // Update the geometry
      meshRef.current.geometry.attributes.aRandom.needsUpdate = true;
      previousTime = clock.getElapsedTime();
    }

  })



  return (
    <mesh ref={meshRef} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[1, 1, planeSegments, planeSegments]} />
      <rawShaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}

export default Plane