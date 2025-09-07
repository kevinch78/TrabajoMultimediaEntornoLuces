import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

const SombrasEscena = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        /**
         * Base
         */
        const scene = new THREE.Scene();

        // Tamaño
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        /**
         * Camera
         */
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        camera.position.set(1, 1, 2);
        scene.add(camera);

        /**
         * Renderer
         */
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        /**
         * Lights
         */
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.3);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.camera.near = 1;
        directionalLight.shadow.camera.far = 6;
        directionalLight.shadow.camera.top = 2;
        directionalLight.shadow.camera.right = 2;
        directionalLight.shadow.camera.bottom = -2;
        directionalLight.shadow.camera.left = -2;
        directionalLight.shadow.radius = 10;
        directionalLight.position.set(0.8, 2.5, -1);
        scene.add(directionalLight);

        const spotLight = new THREE.SpotLight(0xffffff, 3.6, 10, Math.PI * 0.3);
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        spotLight.shadow.camera.near = 1;
        spotLight.shadow.camera.far = 6;
        spotLight.position.set(0, 2, 2);
        scene.add(spotLight);
        scene.add(spotLight.target);

        const pointLight = new THREE.PointLight(0xffffff, 2.7);
        pointLight.castShadow = true;
        pointLight.shadow.mapSize.width = 1024;
        pointLight.shadow.mapSize.height = 1024;
        pointLight.shadow.camera.near = 0.1;
        pointLight.shadow.camera.far = 5;
        pointLight.position.set(-1, 1, 0);
        scene.add(pointLight);

        /**
         * Materials - Diferentes tipos de materiales
         */
        const standardMaterial = new THREE.MeshStandardMaterial({
            color: 0x8888ff,
            metalness: 0.3,
            roughness: 0.6
        });

        const phongMaterial = new THREE.MeshPhongMaterial({
            color: 0x8888ff,
            shininess: 100,
            specular: 0x111111
        });

        const lambertMaterial = new THREE.MeshLambertMaterial({
            color: 0x8888ff
        });

        // Material inicial
        let currentMaterial = standardMaterial;

        /**
         * Objects
         */
        const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.9, 32, 32), currentMaterial);
        sphere.position.x = -1.5;
        sphere.castShadow = true;
        sphere.receiveShadow = true;

        const cube = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.9), currentMaterial);
        cube.position.x = 1.5;
        cube.castShadow = true;
        cube.receiveShadow = true;

        const plane = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), new THREE.MeshStandardMaterial({ color: 0x666666 }));
        plane.rotation.x = -Math.PI * 0.5;
        plane.position.y = -0.65;
        plane.receiveShadow = true;

        scene.add(sphere, cube, plane);

        /**
         * Controls
         */
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        /**
         * GUI (Lil-GUI)
         */
        const gui = new GUI();

        const lightFolder = gui.addFolder("Luces");
        lightFolder.open();
        lightFolder.add(ambientLight, "intensity").min(0).max(2).step(0.01).name("Ambient Intensity");
        lightFolder.add(directionalLight, "intensity").min(0).max(5).step(0.01).name("Directional Intensity");
        lightFolder.add(pointLight, "intensity").min(0).max(3).step(0.01).name("Point Intensity");

        // Carpeta para selección de material
        const materialFolder = gui.addFolder("Tipo de Material");
        materialFolder.open();
        
        const materialOptions = {
            material: "Standard"
        };

        materialFolder.add(materialOptions, "material", ["Standard", "Phong", "Lambert"])
            .name("Material Type")
            .onChange((value) => {
                let newMaterial;
                switch(value) {
                    case "Standard":
                        newMaterial = standardMaterial;
                        break;
                    case "Phong":
                        newMaterial = phongMaterial;
                        break;
                    case "Lambert":
                        newMaterial = lambertMaterial;
                        break;
                }
                
                // Aplicar el nuevo material a ambos objetos
                sphere.material = newMaterial;
                cube.material = newMaterial;
                currentMaterial = newMaterial;
                
                // Actualizar controles de propiedades
                updateMaterialControls();
            });

        // Carpeta para propiedades del material
        const propertiesFolder = gui.addFolder("Propiedades del Material");
        propertiesFolder.open();

        // Función para actualizar controles según el material
        function updateMaterialControls() {
            // Limpiar controles existentes
            propertiesFolder.children.forEach(child => {
                if (child._name !== "Material Type") {
                    propertiesFolder.remove(child);
                }
            });

            if (currentMaterial === standardMaterial) {
                // Controles para MeshStandardMaterial
                propertiesFolder.add(standardMaterial, "metalness").min(0).max(1).step(0.01).name("Metalness");
                propertiesFolder.add(standardMaterial, "roughness").min(0).max(1).step(0.01).name("Roughness");
                propertiesFolder.addColor(standardMaterial, "color").name("Color");
            } else if (currentMaterial === phongMaterial) {
                // Controles para MeshPhongMaterial
                propertiesFolder.add(phongMaterial, "shininess").min(0).max(200).step(1).name("Shininess");
                propertiesFolder.addColor(phongMaterial, "specular").name("Specular Color");
                propertiesFolder.addColor(phongMaterial, "color").name("Color");
            } else if (currentMaterial === lambertMaterial) {
                // Controles para MeshLambertMaterial
                propertiesFolder.addColor(lambertMaterial, "color").name("Color");
            }
        }

        // Inicializar controles
        updateMaterialControls();

        /**
         * Resize Handling
         */
        const handleResize = () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;

            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();

            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };
        window.addEventListener("resize", handleResize);

        /**
         * Animate
         */
        const clock = new THREE.Clock();
        const tick = () => {
            const elapsedTime = clock.getElapsedTime();

            sphere.rotation.y = 0.1 * elapsedTime;
            sphere.rotation.x = 0.05 * elapsedTime;
            cube.rotation.y = 0.1 * elapsedTime;
            cube.rotation.x = 0.05 * elapsedTime;

            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(tick);
        };
        tick();

        /**
         * Cleanup on Unmount
         */
        return () => {
            gui.destroy();
            window.removeEventListener("resize", handleResize);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ width: "70vw", height: "70vh" }} />;
};

export default SombrasEscena;
