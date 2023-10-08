/* eslint-disable react/no-unknown-property */

import { Canvas, useFrame } from "@react-three/fiber";
import fragmentShader from "./fragmentShader.glsl";
import vertexShader from "./vertexShader.glsl";
import { OrbitControls, } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { AudioAnalyser, BufferAttribute, MathUtils } from "three";
import { useControls } from "leva";
import AudioPlayer from "./AudioPlayer";
import useAudioStore from "./audio.store";


export default function Experience() {

  const sound = useRef();


  return (
    <>
      <OrbitControls />
      <ambientLight />
      <AudioPlayer audioRef={sound} />
      <Plane sound={sound} />
      <axesHelper />
    </>
  )
}

function Plane({ sound }) {
  const meshRef = useRef();
  const analyserRef = useRef();

  const uniforms = useMemo(
    () => ({
      u_freq: {
        value: 0.0,
      },
    }), []
  );

  console.log(" plane render")

  useEffect(() => {
    analyserRef.current = new AudioAnalyser(sound.current, 32)
    console.log(meshRef.current.geometry)
  }, [sound])

  useFrame(({ clock }) => {
    if (!analyserRef.current || !meshRef.current) return;

    const data = analyserRef.current.getFrequencyData();
    meshRef.current.material.uniforms.u_freq.value = data[10] / 255.0;
    meshRef.current.scale.y = data[10] / 10;

  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 0.1, 1, 64, 64]} />
      <rawShaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}