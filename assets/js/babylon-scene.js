// Babylon.js 3D Scene - AutoCAD Interactive Model
(function() {
    'use strict';

    // Check if Babylon.js is loaded
    if (typeof BABYLON === 'undefined') {
        console.warn('Babylon.js not loaded');
        const canvas = document.getElementById('babylon-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = canvas.clientWidth;
                canvas.height = canvas.clientHeight;
                ctx.fillStyle = '#0D1117';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#8B949E';
                ctx.font = '16px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Babylon.js no se pudo cargar', canvas.width/2, canvas.height/2);
            }
        }
        return;
    }

    const canvas = document.getElementById('babylon-canvas');
    if (!canvas) return;

    // Create Babylon engine
    const engine = new BABYLON.Engine(canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true,
        antialias: true
    });

    // Create scene
    const createScene = function() {
        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0.05, 0.065, 0.09, 1);
        scene.ambientColor = new BABYLON.Color3(0.1, 0.1, 0.15);

        // Camera
        const camera = new BABYLON.ArcRotateCamera(
            "camera",
            -Math.PI / 4,
            Math.PI / 3,
            12,
            BABYLON.Vector3.Zero(),
            scene
        );
        camera.attachControl(canvas, true);
        camera.lowerRadiusLimit = 3;
        camera.upperRadiusLimit = 25;
        camera.wheelPrecision = 50;

        // Lights
        const hemisphericLight = new BABYLON.HemisphericLight(
            "hemiLight",
            new BABYLON.Vector3(0, 1, 0),
            scene
        );
        hemisphericLight.intensity = 0.7;
        hemisphericLight.diffuse = new BABYLON.Color3(0.9, 0.9, 1);
        hemisphericLight.groundColor = new BABYLON.Color3(0.1, 0.1, 0.2);

        const directionalLight = new BABYLON.DirectionalLight(
            "dirLight",
            new BABYLON.Vector3(-1, -2, 1),
            scene
        );
        directionalLight.intensity = 0.8;
        directionalLight.position = new BABYLON.Vector3(10, 20, -10);

        // Shadows
        const shadowGenerator = new BABYLON.ShadowGenerator(2048, directionalLight);
        shadowGenerator.useBlurExponentialShadowMap = true;
        shadowGenerator.blurKernel = 32;

        // Ground grid
        const ground = BABYLON.MeshBuilder.CreateGround(
            "ground",
            { width: 20, height: 20, subdivisions: 20 },
            scene
        );
        const groundMat = new BABYLON.GridMaterial("groundMat", scene);
        groundMat.majorUnitFrequency = 5;
        groundMat.minorUnitVisibility = 0.4;
        groundMat.gridRatio = 1;
        groundMat.opacity = 0.8;
        groundMat.backFaceCulling = false;
        groundMat.mainColor = new BABYLON.Color3(0.1, 0.15, 0.22);
        groundMat.lineColor = new BABYLON.Color3(0, 0.47, 0.83);
        ground.material = groundMat;
        ground.receiveShadows = true;

        // Materials
        const blueMat = new BABYLON.PBRMaterial("blueMat", scene);
        blueMat.albedoColor = new BABYLON.Color3(0, 0.47, 0.83);
        blueMat.metallic = 0.3;
        blueMat.roughness = 0.4;
        blueMat.emissiveColor = new BABYLON.Color3(0, 0.1, 0.2);

        const orangeMat = new BABYLON.PBRMaterial("orangeMat", scene);
        orangeMat.albedoColor = new BABYLON.Color3(0.91, 0.46, 0.1);
        orangeMat.metallic = 0.2;
        orangeMat.roughness = 0.5;

        const greenMat = new BABYLON.PBRMaterial("greenMat", scene);
        greenMat.albedoColor = new BABYLON.Color3(0.25, 0.73, 0.31);
        greenMat.metallic = 0.2;
        greenMat.roughness = 0.5;

        const grayMat = new BABYLON.PBRMaterial("grayMat", scene);
        grayMat.albedoColor = new BABYLON.Color3(0.3, 0.3, 0.35);
        grayMat.metallic = 0.5;
        grayMat.roughness = 0.3;

        const glassMat = new BABYLON.PBRMaterial("glassMat", scene);
        glassMat.albedoColor = new BABYLON.Color3(0.7, 0.85, 1);
        glassMat.metallic = 0.9;
        glassMat.roughness = 0.1;
        glassMat.alpha = 0.6;

        // Models container
        let currentModel = null;

        // Create Building Model
        function createBuilding() {
            const building = new BABYLON.TransformNode("building", scene);

            // Base
            const base = BABYLON.MeshBuilder.CreateBox("base", { width: 4, height: 0.5, depth: 3 }, scene);
            base.position.y = 0.25;
            base.material = grayMat;
            base.receiveShadows = true;
            shadowGenerator.addShadowCaster(base);
            base.parent = building;

            // Main structure
            const main = BABYLON.MeshBuilder.CreateBox("main", { width: 3.5, height: 2, depth: 2.5 }, scene);
            main.position.y = 1.5;
            main.material = blueMat;
            main.receiveShadows = true;
            shadowGenerator.addShadowCaster(main);
            main.parent = building;

            // Roof
            const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {
                diameterTop: 0,
                diameterBottom: 4.5,
                height: 1,
                tessellation: 4
            }, scene);
            roof.position.y = 3;
            roof.rotation.y = Math.PI / 4;
            roof.scaling = new BABYLON.Vector3(1, 0.5, 0.7);
            roof.material = orangeMat;
            roof.receiveShadows = true;
            shadowGenerator.addShadowCaster(roof);
            roof.parent = building;

            // Windows
            for (let i = -1; i <= 1; i++) {
                const window1 = BABYLON.MeshBuilder.CreateBox("window1_" + i, { width: 0.4, height: 0.5, depth: 0.1 }, scene);
                window1.position = new BABYLON.Vector3(i * 1.2, 1.8, 1.26);
                window1.material = glassMat;
                window1.parent = building;

                const window2 = window1.clone("window2_" + i);
                window2.position.z = -1.26;
                window2.parent = building;
            }

            // Door
            const door = BABYLON.MeshBuilder.CreateBox("door", { width: 0.6, height: 1, depth: 0.1 }, scene);
            door.position = new BABYLON.Vector3(0, 0.75, 1.26);
            door.material = orangeMat;
            door.parent = building;

            // Entrance steps
            for (let i = 0; i < 3; i++) {
                const step = BABYLON.MeshBuilder.CreateBox("step" + i, { width: 1.5, height: 0.15, depth: 0.4 }, scene);
                step.position = new BABYLON.Vector3(0, -i * 0.15 + 0.08, 1.5 + i * 0.4);
                step.material = grayMat;
                step.receiveShadows = true;
                step.parent = building;
            }

            return building;
        }

        // Create Machine Model
        function createMachine() {
            const machine = new BABYLON.TransformNode("machine", scene);

            // Base plate
            const basePlate = BABYLON.MeshBuilder.CreateCylinder("basePlate", { diameter: 3, height: 0.3 }, scene);
            basePlate.position.y = 0.15;
            basePlate.material = grayMat;
            basePlate.receiveShadows = true;
            shadowGenerator.addShadowCaster(basePlate);
            basePlate.parent = machine;

            // Main body
            const body = BABYLON.MeshBuilder.CreateCylinder("body", { diameter: 1.5, height: 1.5 }, scene);
            body.position.y = 1.05;
            body.material = blueMat;
            body.receiveShadows = true;
            shadowGenerator.addShadowCaster(body);
            body.parent = machine;

            // Top section
            const top = BABYLON.MeshBuilder.CreateCylinder("top", { diameterTop: 0.8, diameterBottom: 1.2, height: 0.8 }, scene);
            top.position.y = 2.2;
            top.material = orangeMat;
            top.receiveShadows = true;
            shadowGenerator.addShadowCaster(top);
            top.parent = machine;

            // Gear on top
            const gear = BABYLON.MeshBuilder.CreateTorus("gear", { diameter: 1, thickness: 0.15, tessellation: 32 }, scene);
            gear.position.y = 2.7;
            gear.rotation.x = Math.PI / 2;
            gear.material = greenMat;
            gear.receiveShadows = true;
            shadowGenerator.addShadowCaster(gear);
            gear.parent = machine;

            // Side arms
            for (let i = 0; i < 4; i++) {
                const arm = BABYLON.MeshBuilder.CreateBox("arm" + i, { width: 0.2, height: 0.2, depth: 1.5 }, scene);
                arm.position = new BABYLON.Vector3(0, 0.8, 0);
                arm.rotation.y = (i * Math.PI) / 2;
                arm.position.x = Math.sin(arm.rotation.y) * 1.8;
                arm.position.z = Math.cos(arm.rotation.y) * 1.8;
                arm.material = grayMat;
                arm.receiveShadows = true;
                shadowGenerator.addShadowCaster(arm);
                arm.parent = machine;
            }

            // Status light
            const light = BABYLON.MeshBuilder.CreateSphere("light", { diameter: 0.2 }, scene);
            light.position.y = 2.7;
            const lightMat = new BABYLON.PBRMaterial("lightMat", scene);
            lightMat.albedoColor = new BABYLON.Color3(0, 1, 0.5);
            lightMat.emissiveColor = new BABYLON.Color3(0, 1, 0.5);
            lightMat.metallic = 0;
            lightMat.roughness = 1;
            light.material = lightMat;
            light.parent = machine;

            return machine;
        }

        // Create House Model
        function createHouse() {
            const house = new BABYLON.TransformNode("house", scene);

            // Foundation
            const foundation = BABYLON.MeshBuilder.CreateBox("foundation", { width: 3, height: 0.4, depth: 2.5 }, scene);
            foundation.position.y = 0.2;
            foundation.material = grayMat;
            foundation.receiveShadows = true;
            shadowGenerator.addShadowCaster(foundation);
            foundation.parent = house;

            // Main walls
            const walls = BABYLON.MeshBuilder.CreateBox("walls", { width: 2.8, height: 1.8, depth: 2.3 }, scene);
            walls.position.y = 1.3;
            walls.material = blueMat;
            walls.receiveShadows = true;
            shadowGenerator.addShadowCaster(walls);
            walls.parent = house;

            // Roof - using two planes for pitched roof
            const roofLeft = BABYLON.MeshBuilder.CreateBox("roofLeft", { width: 1.8, height: 0.1, depth: 2.8 }, scene);
            roofLeft.position = new BABYLON.Vector3(-0.85, 2.6, 0);
            roofLeft.rotation.z = -Math.PI / 5;
            roofLeft.material = orangeMat;
            roofLeft.receiveShadows = true;
            shadowGenerator.addShadowCaster(roofLeft);
            roofLeft.parent = house;

            const roofRight = BABYLON.MeshBuilder.CreateBox("roofRight", { width: 1.8, height: 0.1, depth: 2.8 }, scene);
            roofRight.position = new BABYLON.Vector3(0.85, 2.6, 0);
            roofRight.rotation.z = Math.PI / 5;
            roofRight.material = orangeMat;
            roofRight.receiveShadows = true;
            shadowGenerator.addShadowCaster(roofRight);
            roofRight.parent = house;

            // Chimney
            const chimney = BABYLON.MeshBuilder.CreateBox("chimney", { width: 0.4, height: 0.8, depth: 0.4 }, scene);
            chimney.position = new BABYLON.Vector3(0.8, 3, -0.7);
            chimney.material = grayMat;
            chimney.receiveShadows = true;
            shadowGenerator.addShadowCaster(chimney);
            chimney.parent = house;

            // Door
            const door = BABYLON.MeshBuilder.CreateBox("door", { width: 0.5, height: 0.9, depth: 0.1 }, scene);
            door.position = new BABYLON.Vector3(0, 0.85, 1.16);
            door.material = orangeMat;
            door.parent = house;

            // Windows
            const windowLeft = BABYLON.MeshBuilder.CreateBox("windowLeft", { width: 0.5, height: 0.4, depth: 0.1 }, scene);
            windowLeft.position = new BABYLON.Vector3(-0.8, 1.5, 1.16);
            windowLeft.material = glassMat;
            windowLeft.parent = house;

            const windowRight = BABYLON.MeshBuilder.CreateBox("windowRight", { width: 0.5, height: 0.4, depth: 0.1 }, scene);
            windowRight.position = new BABYLON.Vector3(0.8, 1.5, 1.16);
            windowRight.material = glassMat;
            windowRight.parent = house;

            // Garden fence
            for (let i = -2; i <= 2; i++) {
                const post = BABYLON.MeshBuilder.CreateBox("post" + i, { width: 0.08, height: 0.5, depth: 0.08 }, scene);
                post.position = new BABYLON.Vector3(i * 0.8, 0.45, 1.6);
                post.material = greenMat;
                post.receiveShadows = true;
                shadowGenerator.addShadowCaster(post);
                post.parent = house;
            }

            // Garden path
            const path = BABYLON.MeshBuilder.CreateBox("path", { width: 0.6, height: 0.02, depth: 1 }, scene);
            path.position = new BABYLON.Vector3(0, 0.01, 1.8);
            path.material = grayMat;
            path.parent = house;

            return house;
        }

        function setModel(model) {
            if (currentModel) {
                currentModel.setEnabled(false);
            }
            currentModel = model;
            currentModel.setEnabled(true);
        }

        // Initial model
        const buildingModel = createBuilding();
        const machineModel = createMachine();
        const houseModel = createHouse();

        machineModel.setEnabled(false);
        houseModel.setEnabled(false);

        currentModel = buildingModel;

        // Wireframe mode
        let wireframeMode = false;
        const toggleWireframe = function() {
            wireframeMode = !wireframeMode;
            scene.meshes.forEach(mesh => {
                if (mesh.material && mesh.name !== "ground") {
                    mesh.material.wireframe = wireframeMode;
                }
            });
        };

        // Animation
        let autoRotate = true;
        scene.registerBeforeRender(function() {
            if (autoRotate && currentModel) {
                currentModel.rotation.y += 0.003;
            }
        });

        // FPS counter
        const fpsEl = document.getElementById('babylon-fps');
        const verticesEl = document.getElementById('babylon-vertices');
        let frameCount = 0;

        scene.registerBeforeRender(function() {
            frameCount++;
            if (frameCount % 30 === 0) {
                if (fpsEl) fpsEl.textContent = engine.getFps().toFixed(0) + ' FPS';
                if (verticesEl) {
                    let totalVertices = 0;
                    scene.meshes.forEach(mesh => {
                        if (mesh.getTotalVertices) {
                            totalVertices += mesh.getTotalVertices();
                        }
                    });
                    verticesEl.textContent = totalVertices.toLocaleString() + ' vértices';
                }
            }
        });

        return {
            scene: scene,
            camera: camera,
            models: {
                building: buildingModel,
                machine: machineModel,
                house: houseModel
            },
            setModel: setModel,
            toggleWireframe: toggleWireframe,
            resetCamera: function() {
                camera.alpha = -Math.PI / 4;
                camera.beta = Math.PI / 3;
                camera.radius = 12;
                camera.target = BABYLON.Vector3.Zero();
            }
        };
    };

    // Create the scene
    const sceneData = createScene();

    // Button controls
    const btnReset = document.getElementById('btn-babylon-reset');
    const btnWireframe = document.getElementById('btn-babylon-wireframe');
    const btnBuilding = document.getElementById('btn-babylon-building');
    const btnMachine = document.getElementById('btn-babylon-machine');
    const btnHouse = document.getElementById('btn-babylon-house');

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            sceneData.resetCamera();
            sceneData.models.building.rotation = new BABYLON.Vector3(0, 0, 0);
            sceneData.models.machine.rotation = new BABYLON.Vector3(0, 0, 0);
            sceneData.models.house.rotation = new BABYLON.Vector3(0, 0, 0);
        });
    }

    if (btnWireframe) {
        btnWireframe.addEventListener('click', () => {
            sceneData.toggleWireframe();
            btnWireframe.classList.toggle('active');
        });
    }

    if (btnBuilding) {
        btnBuilding.addEventListener('click', () => {
            sceneData.setModel(sceneData.models.building);
            setActiveBtn(btnBuilding);
        });
    }

    if (btnMachine) {
        btnMachine.addEventListener('click', () => {
            sceneData.setModel(sceneData.models.machine);
            setActiveBtn(btnMachine);
        });
    }

    if (btnHouse) {
        btnHouse.addEventListener('click', () => {
            sceneData.setModel(sceneData.models.house);
            setActiveBtn(btnHouse);
        });
    }

    function setActiveBtn(activeBtn) {
        [btnBuilding, btnMachine, btnHouse].forEach(btn => {
            if (btn) btn.classList.remove('active');
        });
        if (activeBtn) activeBtn.classList.add('active');
    }

    // Run render loop
    engine.runRenderLoop(function() {
        sceneData.scene.render();
    });

    // Handle resize
    window.addEventListener('resize', function() {
        engine.resize();
    });

})();
