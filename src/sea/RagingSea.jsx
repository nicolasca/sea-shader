/* eslint-disable react/no-unknown-property */

import vertexShader from './vertexShader.glsl'
import fragmentShader from './fragmentShader.glsl'
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useControls } from "leva";
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';

function RagingSea() {
    const seaMesh = useRef();

    const { uBigWavesElevation, uBigWavesFrequencyX, uBigWavesFrequencyZ, uBigWavesSpeed,
        uSmallWavesElevation, uSmallWavesFrequency, uSmallWavesSpeed, uSmallWavesIterations,
        uDeepBlueColor, uSurfaceBlueColor, uColorMultiplier, uColorOffset } = useControls({
            uBigWavesElevation: {
                value: 0.2,
                min: 0,
                max: 1,
                label: 'uBigWavesElevation',
                onChange: (value) => {
                    if (!seaMesh.current) return;
                    seaMesh.current.material.uniforms.uBigWavesElevation.value = value;
                }
            },
            uBigWavesFrequencyX: {
                value: 4,
                min: 0,
                max: 10,
                step: 0.1,
                label: 'uBigWavesFrequencyX',
                onChange: (value) => {
                    if (!seaMesh.current) return;
                    seaMesh.current.material.uniforms.uBigWavesFrequency.value.x = value;
                }
            },
            uBigWavesFrequencyZ: {
                value: 1.5,
                min: 0,
                max: 10,
                step: 0.1,
                label: 'uBigWavesFrequencyZ',
                onChange: (value) => {
                    if (!seaMesh.current) return;
                    seaMesh.current.material.uniforms.uBigWavesFrequency.value.y = value;
                }
            },
            uBigWavesSpeed: {
                value: 0.75,
                min: 0,
                max: 4,
                step: 0.01,
                label: 'uBigWavesSpeed',
                onChange: (value) => {
                    if (!seaMesh.current) return;
                    seaMesh.current.material.uniforms.uBigWavesSpeed.value = value;
                }
            },
            uSmallWavesElevation: {
                value: 0.15,
                min: 0,
                max: 1,
                label: 'uSmallWavesElevation',
                onChange: (value) => {
                    if (!seaMesh.current) return;
                    seaMesh.current.material.uniforms.uSmallWavesElevation.value = value;
                }
            },
            uSmallWavesFrequency: {
                value: 3.0,
                min: 0,
                max: 10,
                step: 0.1,
                label: 'uSmallWavesFrequency',
                onChange: (value) => {
                    if (!seaMesh.current) return;
                    seaMesh.current.material.uniforms.uSmallWavesFrequency.value = value;
                }
            },
            uSmallWavesSpeed: {
                value: 0.2,
                min: 0,
                max: 4,
                step: 0.01,
                label: 'uSmallWavesSpeed',
                onChange: (value) => {
                    if (!seaMesh.current) return;
                    seaMesh.current.material.uniforms.uSmallWavesSpeed.value = value;
                }
            },
            uSmallWavesIterations: {
                value: 4.0,
                min: 0,
                max: 10.0,
                step: 1,
                label: 'uSmallWavesIterations',
                onChange: (value) => {
                    if (!seaMesh.current) return;
                    seaMesh.current.material.uniforms.uSmallWavesIterations.value = value;
                }
            },

            uDeepBlueColor: {
                value: '#1d1d58',
                onChange: (value) => {
                    if (!seaMesh.current) return;
                    seaMesh.current.material.uniforms.uDeepBlueColor.value = new THREE.Color(value);
                }
            },
            uSurfaceBlueColor: {
                value: '#81b4de',
                onChange: (value) => {
                    if (!seaMesh.current) return;
                    seaMesh.current.material.uniforms.uSurfaceBlueColor.value = new THREE.Color(value);
                }
            },
            uColorMultiplier: {
                value: 4.13,
                min: 0,
                max: 10,
                step: 0.01,
                label: 'uColorMultiplier',
                onChange: (value) => {
                    if (!seaMesh.current) return;
                    seaMesh.current.material.uniforms.uColorMultiplier.value = value;
                }
            },
            uColorOffset: {
                value: 0.22,
                min: 0,
                max: 1,
                step: 0.01,
                label: 'uColorOffset',
                onChange: (value) => {
                    if (!seaMesh.current) return;
                    seaMesh.current.material.uniforms.uColorOffset.value = value;
                }
            },

        });

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uBigWavesElevation: { value: uBigWavesElevation },
        uBigWavesFrequency: { value: new THREE.Vector2(uBigWavesFrequencyX, uBigWavesFrequencyZ) },
        uBigWavesSpeed: { value: uBigWavesSpeed },
        uSmallWavesElevation: { value: uSmallWavesElevation },
        uSmallWavesFrequency: { value: uSmallWavesFrequency },
        uSmallWavesSpeed: { value: uSmallWavesSpeed },
        uSmallWavesIterations: { value: uSmallWavesIterations },
        uDeepBlueColor: { value: new THREE.Color(uDeepBlueColor) },
        uSurfaceBlueColor: { value: new THREE.Color(uSurfaceBlueColor) },
        uColorMultiplier: { value: uColorMultiplier },
        uColorOffset: { value: uColorOffset },
    }), [uBigWavesElevation, uBigWavesFrequencyX, uBigWavesFrequencyZ, uBigWavesSpeed,
        uSmallWavesElevation, uSmallWavesFrequency, uSmallWavesSpeed, uSmallWavesIterations,
        uDeepBlueColor, uSurfaceBlueColor, uColorMultiplier, uColorOffset]);

    useFrame(({ clock }) => {
        if (!seaMesh.current) return;

        const time = clock.getElapsedTime();
        seaMesh.current.material.uniforms.uTime.value = time;
    });



    return (
        <>
            <OrbitControls />
            {/* <axesHelper args={[5]} /> */}
            <mesh ref={seaMesh} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} >
                <planeGeometry args={[2, 2, 512, 512]} />
                <shaderMaterial
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={uniforms}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </>
    )
}

export default RagingSea;