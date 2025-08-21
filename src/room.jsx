import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
export const Room = ({ roomColor, vaseColor ,sofaColor ,mattressColor,fridgeColor}) => {
    const mountRef = useRef(null);
    useEffect(() => {
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const textureLoader = new THREE.TextureLoader();

        const ceilingTexture = textureLoader.load("src/assets/cielling.png");
        ceilingTexture.wrapS = THREE.RepeatWrapping;
        ceilingTexture.wrapT = THREE.RepeatWrapping;
        ceilingTexture.repeat.set(8, 8);

        //room defination
        const roomWidth = 40;
        const roomHeight = 20;
        const roomDepth = 60;

        const wallMaterial1 = new THREE.MeshLambertMaterial({ color: roomColor, emissive: new THREE.Color(roomColor).multiplyScalar(0.8) , roughness: 0.4, metalness: 0.2 });
        const wallMaterial3 = new THREE.MeshLambertMaterial({ color: roomColor, emissive: roomColor, roughness: 0.5, metalness: 0.2 });
        const woodTexture = textureLoader.load("src/assets/woodenflooring.jpeg");
        woodTexture.wrapS = THREE.RepeatWrapping;
        woodTexture.wrapT = THREE.RepeatWrapping;
        woodTexture.repeat.set(10, 10);
        const woodNormal = textureLoader.load("src/assets/woodenflooring.jpeg");
        const woodRoughness = textureLoader.load("src/assets/woodenflooring.jpeg");
        const floorMaterial = new THREE.MeshStandardMaterial({
            map: woodTexture,
            normalMap: woodNormal,
            roughnessMap: woodRoughness,
            roughness: 0.3,
            metalness: 0.3,
        });
        const ceilingMaterial = new THREE.MeshStandardMaterial({ map: ceilingTexture, roughness: 0.3, metalness: 0.5 });
        const createWall = (width, height, material, position, rotation) => {
            const geometry = new THREE.PlaneGeometry(width, height);
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(...position);
            mesh.rotation.set(...rotation);
            mesh.receiveShadow = true;
            mesh.castShadow = true;
            scene.add(mesh);
        };
        createWall(roomWidth, roomHeight, wallMaterial3, [0, roomHeight / 2, -roomDepth / 2], [0, 0, 0]); 
        createWall(roomWidth, roomHeight, wallMaterial3, [0, roomHeight / 2, roomDepth / 2], [0, Math.PI, 0]); 
        createWall(roomDepth, roomHeight, wallMaterial1, [-roomWidth / 2, roomHeight / 2, 0], [0, Math.PI / 2, 0]); 
        createWall(roomDepth, roomHeight, wallMaterial1, [roomWidth / 2, roomHeight / 2, 0], [0, -Math.PI / 2, 0]); 
        const floor = new THREE.Mesh(new THREE.PlaneGeometry(roomWidth, roomDepth), floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = 0;
        floor.receiveShadow = true;
        scene.add(floor);
        const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(roomWidth, roomDepth), ceilingMaterial);
        ceiling.rotation.x = Math.PI / 2;
        ceiling.position.y = roomHeight;
        ceiling.receiveShadow = true;
        scene.add(ceiling);
        const topMaterial = new THREE.MeshStandardMaterial({
            color: 0x8b5a2b,
            roughness: 0.6,
            metalness: 0.1,
        });
        const sideMaterial = new THREE.MeshStandardMaterial({
            color: 0x5a3d1e, 
            roughness: 0.6,
            metalness: 0.1,
        });
        const tableMaterials = [sideMaterial, sideMaterial, topMaterial, sideMaterial, sideMaterial, sideMaterial];
        const tableTop = new THREE.Mesh(new THREE.BoxGeometry(7, 0.5, 6), tableMaterials);
        tableTop.position.set(-roomWidth / 2 + 4, 5, -roomDepth / 2 + 4);
        tableTop.receiveShadow = true;
        tableTop.castShadow = true;
        scene.add(tableTop);
        const legMaterial = new THREE.MeshStandardMaterial({
            color: 0x555555, 
            roughness: 0.3,
            metalness: 0.8,
        });
        const createTableLeg = (x, z) => {
            const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 5, 16), legMaterial);
            leg.position.set(x, 2.5, z);
            leg.castShadow = true;
            scene.add(leg);
        };
        createTableLeg(-roomWidth / 2 + 2, -roomDepth / 2 + 2);
        createTableLeg(-roomWidth / 2 + 2, -roomDepth / 2 + 6);
        createTableLeg(-roomWidth / 2 + 6, -roomDepth / 2 + 2);
        createTableLeg(-roomWidth / 2 + 6, -roomDepth / 2 + 6);
        const vaseGeometry = new THREE.BufferGeometry();
        const vertices = [];
        const colors = [];
        const indices = [];
        const segments = 30;
        const height = 5;
        const radius = 1; 
        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            for (let j = 0; j <= segments; j++) {
                const y = (j / segments) * height - height / 2;
                const waveFactor = Math.sin(j * 0.5) * 0.30; 
                const r = radius + waveFactor; 
                const x = Math.cos(angle) * r;
                const z = Math.sin(angle) * r;
                vertices.push(x, y, z);
                const baseColor = new THREE.Color(vaseColor);
                const heightFactor = (y + height / 2) / height * 0.2; 
                const finalColor = baseColor.lerp(new THREE.Color(1, 1, 1), heightFactor); 

                colors.push(finalColor.r, finalColor.g, finalColor.b);
            }
        }
        for (let i = 0; i < segments; i++) {
            for (let j = 0; j < segments; j++) {
                const a = i * (segments + 1) + j;
                const b = a + 1;
                const c = a + segments + 1;
                const d = c + 1;

                indices.push(a, b, c);
                indices.push(b, d, c);
            }
        }
        vaseGeometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
        vaseGeometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
        vaseGeometry.setIndex(indices);
        vaseGeometry.computeVertexNormals();
        const vaseMaterial = new THREE.MeshStandardMaterial({
            vertexColors: true,
        });
        const vase = new THREE.Mesh(vaseGeometry, vaseMaterial);
        vase.position.set(-roomWidth / 2 + 4, 7.5, -roomDepth / 2 + 4); 
        vase.castShadow = true;
        vase.receiveShadow = true;
        scene.add(vase);

        //total sofa code (using group)
        const sofaGroup = new THREE.Group();
        function lightenColor(hex, percent) {
            hex = parseInt(hex.replace("#", ""), 16);
            let r = (hex >> 16) & 0xff;
            let g = (hex >> 8) & 0xff;
            let b = hex & 0xff;
            r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
            g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
            b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));
            return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
        }
        const cushionColor = lightenColor(sofaColor, 20); 
        const sofaMaterial = new THREE.MeshStandardMaterial({
            color: sofaColor,
            roughness: 0.4,
            metalness: 0.1,
        });
        const sofaBase = new THREE.Mesh(new RoundedBoxGeometry(13.5, 2, 5.7,10,2), sofaMaterial);
        sofaBase.position.set(-roomWidth / 2 + 22.4, 3, -roomDepth / 2 + 7);
        sofaBase.castShadow = true;
        sofaBase.receiveShadow = true;
        sofaGroup.add(sofaBase);
        const cushionMaterial = new THREE.MeshStandardMaterial({
            color: cushionColor,
            roughness: 0.7,
            metalness: 0.1,
        });
        const seatCushion1 = new THREE.Mesh(new RoundedBoxGeometry(6.08, 1.6, 4.48,10,2), cushionMaterial);
        seatCushion1.position.set(-roomWidth / 2 + 19.2, 4.12, -roomDepth / 2 + 6.4);
        sofaGroup.add(seatCushion1);
        const seatCushion2 = new THREE.Mesh(new RoundedBoxGeometry(6.08, 1.6, 4.48,10,2), cushionMaterial);
        seatCushion2.position.set(-roomWidth / 2 + 25.6, 4.12, -roomDepth / 2 + 6.4);
        sofaGroup.add(seatCushion2);
        const backrestframematerial = new THREE.MeshStandardMaterial({
            color:0x222222,
        })
        const backrest = new THREE.Mesh(new RoundedBoxGeometry(12.3, 5.5, 1.6,10,2), sofaMaterial);
        const backrestframe = new THREE.Mesh(new RoundedBoxGeometry(12.8,6,0.8,10,1),backrestframematerial);
        backrest.position.set(-roomWidth / 2 + 22.4, 5, -roomDepth / 2 + 4);
        backrestframe.position.set(-roomWidth / 2 + 22.4, 5, -roomDepth / 2 + 3.65);
        sofaGroup.add(backrest);
        sofaGroup.add(backrestframe);
        const armrestGeo = new THREE.CylinderGeometry(1.6, 1.6, 4.8, 16); 
        const leftArmrest = new THREE.Mesh(armrestGeo, sofaMaterial);
        leftArmrest.position.set(-roomWidth / 2 + 16.2, 3.8, -roomDepth / 2 + 6.4);
        leftArmrest.rotation.x = Math.PI / 2;
        sofaGroup.add(leftArmrest);
        const rightArmrest = new THREE.Mesh(armrestGeo, sofaMaterial);
        rightArmrest.position.set(-roomWidth / 2 + 28.6, 3.8, -roomDepth / 2 + 6.4);
        rightArmrest.rotation.x = Math.PI / 2;
        sofaGroup.add(rightArmrest);
        const sofalegMaterial = new THREE.MeshStandardMaterial({
            color: 0x3e2723, // Dark wood
            roughness: 0.6,
            metalness: 0.1,
        });
        const createSofaLeg = (x, z) => {
            const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 5, 12), sofalegMaterial);
            leg.position.set(x, 0, z);
            sofaGroup.add(leg);
        };
        createSofaLeg(-roomWidth / 2 + 17, -roomDepth / 2 + 5.2);
        createSofaLeg(-roomWidth / 2 + 17, -roomDepth / 2 + 9);
        createSofaLeg(-roomWidth / 2 + 27.8, -roomDepth / 2 + 5.2);
        createSofaLeg(-roomWidth / 2 + 27.8, -roomDepth / 2 + 9);
        sofaGroup.rotateY(-Math.PI/2);
        sofaGroup.position.set(-roomWidth/2+12,0,-15);
        scene.add(sofaGroup);

        //door group
        const doorGroup = new THREE.Group();
        const doorMaterial = new THREE.MeshLambertMaterial({
            color: 0x7B2523,
        });
        const doorframeMaterial = new THREE.MeshStandardMaterial({
            color: 0x806838,
        });
        const doorgeometry=()=>{
            const doorWidth = 6;
            const doorHeight = 12;
            const doorDepth = 0.5;
            const door = new THREE.Mesh(new THREE.BoxGeometry(doorWidth, doorHeight, doorDepth/2), doorMaterial);
            const doorframe1 = new THREE.Mesh(new THREE.BoxGeometry(doorWidth,0.5,doorDepth),doorframeMaterial);
            const doorframe2 = new THREE.Mesh(new THREE.BoxGeometry(0.5,doorHeight+0.5,doorDepth),doorframeMaterial);
            const doorframe3 = new THREE.Mesh(new THREE.BoxGeometry(0.5,doorHeight+0.5,doorDepth),doorframeMaterial);
            doorframe1.position.set(0,doorHeight+0.25,roomDepth/2-0.26);
            doorframe2.position.set((doorWidth+0.5)/2,(doorHeight+0.5)/2,roomDepth/2-0.26);
            doorframe3.position.set(-(doorWidth+0.5)/2,(doorHeight+0.5)/2,roomDepth/2-0.26);
            doorframe1.castShadow=true;
            doorframe1.receiveShadow=true;
            doorframe2.castShadow=true;
            doorframe2.receiveShadow=true;
            doorframe3.castShadow=true;
            doorframe3.receiveShadow=true;
            door.position.set(0, doorHeight / 2, roomDepth / 2 - 0.26); 
            door.castShadow = true;
            door.receiveShadow = true;
            doorGroup.add(door);
            doorGroup.add(doorframe1);
            doorGroup.add(doorframe2);
            doorGroup.add(doorframe3);
        };
        doorgeometry();
        const handleMaterial = new THREE.MeshStandardMaterial({
            color: 0xaaaaaa, 
            roughness: 0.3,
            metalness: 0.8,
        });
        const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1, 16), handleMaterial);
        handle.rotation.z = Math.PI / 2; 
        handle.position.set(-2.25, 6, roomDepth / 2 - 0.35); 
        doorGroup.add(handle);
        scene.add(doorGroup);
        
        const bedheight=3;
        const bedwidth=12.5;
        const beddepth=25;
        const bedboxmaterial = new THREE.MeshStandardMaterial({
            color: 0x3e2723,
        });
        const bedboxmesh=new THREE.Mesh(new THREE.BoxGeometry(bedwidth,bedheight,beddepth),bedboxmaterial);
        bedboxmesh.position.set(-13,3,17);
        bedboxmesh.castShadow=true;
        bedboxmesh.receiveShadow=true;
        scene.add(bedboxmesh);
        const mattressGeometry = new RoundedBoxGeometry(bedwidth-1, 3, beddepth-1, 10, 5); // Rounded corner
        const mattressMaterial = new THREE.MeshStandardMaterial({
            color: mattressColor,
        });
        const mattressmesh=new THREE.Mesh(mattressGeometry,mattressMaterial);
        mattressmesh.position.set(-13,4,17)
        scene.add(mattressmesh);
        const pillowgeometry=new RoundedBoxGeometry(5,3,3,2,0.8);
        const pillowColor = lightenColor(mattressColor,20);
        const pillowMaterial = new THREE.MeshStandardMaterial({
            color:pillowColor,
        })
        const pillowmesh=new THREE.Mesh(pillowgeometry,pillowMaterial);
        pillowmesh.position.set(-bedwidth,bedheight+2,beddepth+0.5);
        scene.add(pillowmesh);
        const createbedLeg = (x, z) => {
            const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 5, 12), sofalegMaterial);
            leg.position.set(x, 0, z);
            scene.add(leg);
        };
        createbedLeg(-roomWidth / 2 + bedwidth, 17+beddepth/2-2);
        createbedLeg(-roomWidth / 2 + bedwidth, 17-beddepth/2+2);
        createbedLeg(-roomWidth / 2 + 2, 17-beddepth/2+2);

        //TV


        const TVtexture = textureLoader.load("src/assets/react.svg");
        
        TVtexture.wrapS = THREE.RepeatWrapping;
        TVtexture.wrapT = THREE.RepeatWrapping;
        
        const TVGroup = new THREE.Group();
        const TVgeometry=new THREE.BoxGeometry(0.25,8.5,15);
        const TVmaterial=new THREE.MeshStandardMaterial({
            color:0x000000,
            // map:TVtexture,
            metalness:-2
        });
        const TVmesh = new THREE.Mesh(TVgeometry,TVmaterial);
        TVmesh.receiveShadow=true;
        TVmesh.castShadow=true;
        TVmesh.position.set(-roomWidth/2.05,roomHeight/2,-roomDepth/5);
        TVGroup.add(TVmesh);
        const TVframegeometrypart1 = new THREE.BoxGeometry(0.8,9,0.5);
        const TVframegeometrypart2 = new THREE.BoxGeometry(0.8,0.5,15);
        const TVframematerial = new THREE.MeshStandardMaterial({
            color:0x333333,
        });
        const TVmeshframe1= new THREE.Mesh(TVframegeometrypart1,TVframematerial);
        const TVmeshframe2= new THREE.Mesh(TVframegeometrypart2,TVframematerial);
        const TVmeshframe3= new THREE.Mesh(TVframegeometrypart1,TVframematerial);
        const TVmeshframe4= new THREE.Mesh(TVframegeometrypart2,TVframematerial);
        TVmeshframe1.position.set(-roomWidth/2.05,roomHeight/2,-roomDepth/5+7.5);
        TVmeshframe2.position.set(-roomWidth/2.05,roomHeight/2+4.25,-roomDepth/5);
        TVmeshframe3.position.set(-roomWidth/2.05,roomHeight/2,-roomDepth/5-7.5);
        TVmeshframe1.position.set(-roomWidth/2.05,roomHeight/2,-roomDepth/5+7.5);
        TVmeshframe4.position.set(-roomWidth/2.05,roomHeight/2-4.25,-roomDepth/5);
        
        TVGroup.add(TVmeshframe1);
        TVGroup.add(TVmeshframe2);
        TVGroup.add(TVmeshframe3);
        TVGroup.add(TVmeshframe4);


        TVGroup.rotateZ(-0.06);
        scene.add(TVGroup);
        
        //fridge
        const fridgeheight = 13;
        const fridgewidth = 9;
        const fridgedepth = 5;
        const fridgeGroup = new THREE.Group();
        const fridgebasegeometry = new RoundedBoxGeometry(fridgewidth,fridgeheight,fridgedepth,2,0.25);
        const fridgebasematerial = new THREE.MeshStandardMaterial({
            color:fridgeColor,
            metalness:0.8,
        });
        const fridgebasemesh = new THREE.Mesh(fridgebasegeometry,fridgebasematerial);
        fridgebasemesh.position.set(0,fridgeheight/2,0);
        fridgeGroup.add(fridgebasemesh);
        const fridgedoortopgeometry= new RoundedBoxGeometry(fridgewidth,fridgeheight/3.2,fridgedepth/2.5,2,0.25);
        const fridgedoortopmesh = new THREE.Mesh(fridgedoortopgeometry,fridgebasematerial);
        fridgedoortopmesh.position.set(0,fridgeheight/2+fridgeheight/3,-2.5-1.1);
        fridgeGroup.add(fridgedoortopmesh);
        const fridgedoorbottomgeometry= new RoundedBoxGeometry(fridgewidth,fridgeheight*2/3,fridgedepth/2.5,2,0.25);
        const fridgedoorbottommesh = new THREE.Mesh(fridgedoorbottomgeometry,fridgebasematerial);
        fridgedoorbottommesh.position.set(0,fridgeheight*2/6,-2.5-1.1);
        fridgeGroup.add(fridgedoorbottommesh);
        const fridgehandlebottomgeometry = new RoundedBoxGeometry(0.5,3,1,2,0.1);
        const fridgehandlematerial = new THREE.MeshStandardMaterial({
            color:0xaaaaaa,
            roughness: 0.3,
            metalness: 0.8,
        });
        const fridgehandlebottommesh= new THREE.Mesh(fridgehandlebottomgeometry,fridgehandlematerial);
        fridgehandlebottommesh.position.set(3.5,fridgeheight/2.3,-4.5);
        fridgeGroup.add(fridgehandlebottommesh);
        const fridgehandletopgeometry = new RoundedBoxGeometry(0.5,1.5,1,2,0.1);
        const fridgehandletopmesh= new THREE.Mesh(fridgehandletopgeometry,fridgehandlematerial);
        fridgehandletopmesh.position.set(3.5,fridgeheight-2.4,-4.5);
        fridgeGroup.add(fridgehandletopmesh);
        fridgeGroup.rotateY(Math.PI/2);
        fridgeGroup.position.set(17,0,20);
        
        scene.add(fridgeGroup);



        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
        hemiLight.position.set(0, 5, 0);
        scene.add(hemiLight);
        const ambientlight=new THREE.AmbientLight(0xffffff,0.7);
        ambientlight.position.set(0,20,0);
        scene.add(ambientlight);
        const pointlight = new THREE.PointLight(0xffffff,1);
        pointlight.position.set(-roomWidth/2.075,roomHeight/2,-roomDepth/5);
        scene.add(pointlight);
        pointlight.castShadow=true;
        camera.position.set(0, 10, 0);
        const controls = new PointerLockControls(camera, document.body);
        document.addEventListener("click", () => controls.lock());
        const moveSpeed = 0.2;
        const keys = {};
        const tableMinX = -roomWidth / 2 + 1;  
        const tableMaxX = -roomWidth / 2 + 7;  
        const tableMinZ = -roomDepth / 2 + 1;  
        const tableMaxZ = -roomDepth / 2 + 7; 
        document.addEventListener("keydown", (e) => (keys[e.code] = true));
        document.addEventListener("keyup", (e) => (keys[e.code] = false));
        function updatePlayerMovement() {
            const oldX = camera.position.x;
            const oldZ = camera.position.z;
            if (keys["KeyW"]) controls.moveForward(moveSpeed);
            if (keys["KeyS"]) controls.moveForward(-moveSpeed);
            if (keys["KeyA"]) controls.moveRight(-moveSpeed);
            if (keys["KeyD"]) controls.moveRight(moveSpeed);
            if (keys["ArrowUp"]) controls.moveForward(moveSpeed);
            if (keys["ArrowDown"]) controls.moveForward(-moveSpeed);
            if (keys["ArrowLeft"]) controls.moveRight(-moveSpeed);
            if (keys["ArrowRight"]) controls.moveRight(moveSpeed);
            if (
                camera.position.x > tableMinX &&
                camera.position.x < tableMaxX &&
                camera.position.z > tableMinZ &&
                camera.position.z < tableMaxZ
            ) {
                camera.position.set(oldX, camera.position.y, oldZ);
            }
            camera.position.x = Math.max(-roomWidth / 2 + 1, Math.min(roomWidth / 2 - 1, camera.position.x));
            camera.position.z = Math.max(-roomDepth / 2 + 1, Math.min(roomDepth / 2 - 1, camera.position.z));
        }
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);
        const animate = () => {
            requestAnimationFrame(animate);
            updatePlayerMovement();
            renderer.render(scene, camera);
        };
        animate();
        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
        };
        window.addEventListener("resize", onWindowResize);
        return () => {
            window.removeEventListener("resize", onWindowResize);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, [roomColor]);
    return (
        <div
            ref={mountRef}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                zIndex: 0,
            }}
        />
    );
};
