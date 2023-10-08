/* eslint-disable react/no-unknown-property */

import vertexShader from './vertexShader.glsl'
import fragmentShader from './fragmentShader.glsl'
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function ShaderPattern() {

    return (
        <>
            <OrbitControls />
            <mesh position={[0, 0, 0]} rotation={[0, 0.2, 0]}>
                <planeGeometry args={[1, 1]} />
                <shaderMaterial
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </>
    )
}

export default ShaderPattern;