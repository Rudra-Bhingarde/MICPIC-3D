import React from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

// Function to create vase geometry
const createVaseGeometry = (size) => {
    const points = [
        new THREE.Vector2(0.5 * size, 0),
        new THREE.Vector2(0.3 * size, 0.5 * size),
        new THREE.Vector2(0.5 * size, 1 * size),
        new THREE.Vector2(0.4 * size, 1.5 * size),
        new THREE.Vector2(0.6 * size, 2 * size),
        new THREE.Vector2(0.5 * size, 2.5 * size),
        new THREE.Vector2(0.3 * size, 3 * size),
        new THREE.Vector2(0.5 * size, 3.5 * size),
    ];
    return new THREE.LatheGeometry(points, 32);
};

// Vase Component
const Vase = ({ color, position, size }) => {
    const geometry = createVaseGeometry(size);
    return (
        <mesh geometry={geometry} position={position}>
            <meshStandardMaterial color={color} roughness={0.4} metalness={0.6} />
        </mesh>
    );
};

// Scene Component
const VaseScene = ({ initialColor = "#FF1493", initialPosition = [0, 0, 0], size = 1 }) => {
    return (
        <Canvas>
            {/* Vase */}
            <Vase color={initialColor} position={initialPosition} size={size} />
        </Canvas>
    );
};

export default VaseScene;
