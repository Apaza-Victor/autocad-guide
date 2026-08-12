// 3D Scene using Three.js
(function() {
    'use strict';

    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded');
        return;
    }

    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0D1117);
    scene.fog = new THREE.Fog(0x0D1117, 10, 50);

    // Camera
    const camera = new THREE.PerspectiveCamera(
        60,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
    );
    camera.position.set(5, 4, 5);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const blueLight = new THREE.PointLight(0x0078D4, 1, 20);
    blueLight.position.set(-5, 3, -5);
    scene.add(blueLight);

    const orangeLight = new THREE.PointLight(0xE8751A, 0.5, 15);
    orangeLight.position.set(5, 2, 5);
    scene.add(orangeLight);

    // Grid helper
    const gridHelper = new THREE.GridHelper(20, 20, 0x0078D4, 0x1a2433);
    gridHelper.material.opacity = 0.3;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Materials
    const materials = {
        blue: new THREE.MeshStandardMaterial({
            color: 0x0078D4,
            metalness: 0.3,
            roughness: 0.4,
            emissive: 0x0078D4,
            emissiveIntensity: 0.1
        }),
        orange: new THREE.MeshStandardMaterial({
            color: 0xE8751A,
            metalness: 0.3,
            roughness: 0.4,
            emissive: 0xE8751A,
            emissiveIntensity: 0.1
        }),
        green: new THREE.MeshStandardMaterial({
            color: 0x3FB950,
            metalness: 0.3,
            roughness: 0.4,
            emissive: 0x3FB950,
            emissiveIntensity: 0.1
        }),
        purple: new THREE.MeshStandardMaterial({
            color: 0xBB80FF,
            metalness: 0.3,
            roughness: 0.4,
            emissive: 0xBB80FF,
            emissiveIntensity: 0.1
        }),
        wireframe: new THREE.MeshBasicMaterial({
            color: 0x4DA3FF,
            wireframe: true
        })
    };

    // Objects group
    const objects = new THREE.Group();
    scene.add(objects);

    // Create shapes
    let currentShape = null;

    function createCube() {
        const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        const mesh = new THREE.Mesh(geometry, materials.blue);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        return mesh;
    }

    function createSphere() {
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const mesh = new THREE.Mesh(geometry, materials.orange);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        return mesh;
    }

    function createCylinder() {
        const geometry = new THREE.CylinderGeometry(0.8, 0.8, 2, 32);
        const mesh = new THREE.Mesh(geometry, materials.green);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        return mesh;
    }

    function createTorus() {
        const geometry = new THREE.TorusGeometry(0.8, 0.3, 16, 100);
        const mesh = new THREE.Mesh(geometry, materials.purple);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.rotation.x = Math.PI / 2;
        return mesh;
    }

    function createCompound() {
        const group = new THREE.Group();

        // Base box
        const boxGeo = new THREE.BoxGeometry(2, 0.3, 2);
        const box = new THREE.Mesh(boxGeo, materials.blue);
        box.position.y = -0.5;
        box.castShadow = true;
        box.receiveShadow = true;
        group.add(box);

        // Top sphere
        const sphereGeo = new THREE.SphereGeometry(0.5, 32, 32);
        const sphere = new THREE.Mesh(sphereGeo, materials.orange);
        sphere.position.y = 0.5;
        sphere.castShadow = true;
        group.add(sphere);

        // Side cylinders
        const cylGeo = new THREE.CylinderGeometry(0.2, 0.2, 1, 16);
        const cyl1 = new THREE.Mesh(cylGeo, materials.green);
        cyl1.position.set(0.7, 0, 0.7);
        cyl1.castShadow = true;
        group.add(cyl1);

        const cyl2 = new THREE.Mesh(cylGeo, materials.green);
        cyl2.position.set(-0.7, 0, -0.7);
        cyl2.castShadow = true;
        group.add(cyl2);

        return group;
    }

    function addShape(shape) {
        if (currentShape) {
            objects.remove(currentShape);
        }
        currentShape = shape;
        objects.add(currentShape);
    }

    // Initial shape
    addShape(createCompound());

    // Controls
    let isWireframe = false;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const deltaMove = {
            x: e.clientX - previousMousePosition.x,
            y: e.clientY - previousMousePosition.y
        };

        objects.rotation.y += deltaMove.x * 0.01;
        objects.rotation.x += deltaMove.y * 0.01;

        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    canvas.addEventListener('mouseup', () => {
        isDragging = false;
    });

    canvas.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    // Touch support
    canvas.addEventListener('touchstart', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });

    canvas.addEventListener('touchmove', (e) => {
        if (!isDragging) return;

        const deltaMove = {
            x: e.touches[0].clientX - previousMousePosition.x,
            y: e.touches[0].clientY - previousMousePosition.y
        };

        objects.rotation.y += deltaMove.x * 0.01;
        objects.rotation.x += deltaMove.y * 0.01;

        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });

    canvas.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Button controls
    const btnReset = document.getElementById('btn-reset');
    const btnWireframe = document.getElementById('btn-wireframe');
    const btnSphere = document.getElementById('btn-sphere');
    const btnCube = document.getElementById('btn-cube');
    const btnCylinder = document.getElementById('btn-cylinder');

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            objects.rotation.set(0, 0, 0);
            addShape(createCompound());
            isWireframe = false;
            if (btnWireframe) btnWireframe.classList.remove('active');
        });
    }

    if (btnWireframe) {
        btnWireframe.addEventListener('click', () => {
            isWireframe = !isWireframe;
            btnWireframe.classList.toggle('active', isWireframe);

            objects.traverse((child) => {
                if (child.isMesh) {
                    if (isWireframe) {
                        child.userData.originalMaterial = child.material;
                        child.material = materials.wireframe;
                    } else if (child.userData.originalMaterial) {
                        child.material = child.userData.originalMaterial;
                    }
                }
            });
        });
    }

    if (btnSphere) {
        btnSphere.addEventListener('click', () => addShape(createSphere()));
    }

    if (btnCube) {
        btnCube.addEventListener('click', () => addShape(createCube()));
    }

    if (btnCylinder) {
        btnCylinder.addEventListener('click', () => addShape(createCylinder()));
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        if (!isDragging) {
            objects.rotation.y += 0.005;
        }

        // Animate lights
        const time = Date.now() * 0.001;
        blueLight.position.x = Math.sin(time * 0.5) * 5;
        blueLight.position.z = Math.cos(time * 0.5) * 5;
        orangeLight.position.x = Math.cos(time * 0.3) * 5;
        orangeLight.position.z = Math.sin(time * 0.3) * 5;

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    function onWindowResize() {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    }

    window.addEventListener('resize', onWindowResize);
    onWindowResize();

})();
