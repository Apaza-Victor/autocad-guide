// 3D Background - Three.js Interactive Background
(function() {
    'use strict';

    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded for 3D background');
        return;
    }

    // Create background container
    const bgContainer = document.createElement('div');
    bgContainer.id = 'bg-3d-container';
    bgContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
    `;
    document.body.prepend(bgContainer);

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-3d-canvas';
    canvas.style.cssText = 'width: 100%; height: 100%; display: block;';
    bgContainer.appendChild(canvas);

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0D1117, 0.035);

    // Camera
    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 30;
    camera.position.y = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0D1117, 1);

    // Colors
    const colors = {
        blue: 0x0078D4,
        blueLight: 0x4DA3FF,
        orange: 0xE8751A,
        green: 0x3FB950,
        purple: 0xBB80FF,
        cyan: 0x00D4D4
    };

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(colors.blue, 1, 50);
    pointLight1.position.set(-20, 10, -20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(colors.orange, 0.8, 40);
    pointLight2.position.set(20, 5, 20);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(colors.purple, 0.6, 30);
    pointLight3.position.set(0, -10, 15);
    scene.add(pointLight3);

    // Materials
    const materials = {
        blue: new THREE.MeshPhongMaterial({
            color: colors.blue,
            transparent: true,
            opacity: 0.6,
            shininess: 100,
            wireframe: false
        }),
        orange: new THREE.MeshPhongMaterial({
            color: colors.orange,
            transparent: true,
            opacity: 0.5,
            shininess: 80
        }),
        green: new THREE.MeshPhongMaterial({
            color: colors.green,
            transparent: true,
            opacity: 0.5,
            shininess: 80
        }),
        purple: new THREE.MeshPhongMaterial({
            color: colors.purple,
            transparent: true,
            opacity: 0.5,
            shininess: 80
        }),
        wireframe: new THREE.MeshBasicMaterial({
            color: colors.blueLight,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        }),
        gridLine: new THREE.LineBasicMaterial({
            color: colors.blue,
            transparent: true,
            opacity: 0.1
        })
    };

    // Floating objects group
    const floatingObjects = new THREE.Group();
    scene.add(floatingObjects);

    // Create various 3D shapes
    function createCube(size, material) {
        const geometry = new THREE.BoxGeometry(size, size, size);
        return new THREE.Mesh(geometry, material);
    }

    function createSphere(radius, material) {
        const geometry = new THREE.SphereGeometry(radius, 16, 16);
        return new THREE.Mesh(geometry, material);
    }

    function createOctahedron(radius, material) {
        const geometry = new THREE.OctahedronGeometry(radius, 0);
        return new THREE.Mesh(geometry, material);
    }

    function createTorus(radius, tube, material) {
        const geometry = new THREE.TorusGeometry(radius, tube, 8, 24);
        return new THREE.Mesh(geometry, material);
    }

    function createTetrahedron(radius, material) {
        const geometry = new THREE.TetrahedronGeometry(radius, 0);
        return new THREE.Mesh(geometry, material);
    }

    function createIcosahedron(radius, material) {
        const geometry = new THREE.IcosahedronGeometry(radius, 0);
        return new THREE.Mesh(geometry, material);
    }

    // Create floating objects
    const objects = [];
    const objectCount = 25;

    const materialArray = [materials.blue, materials.orange, materials.green, materials.purple];

    for (let i = 0; i < objectCount; i++) {
        const material = materialArray[Math.floor(Math.random() * materialArray.length)];
        const size = 0.3 + Math.random() * 1.2;
        
        let mesh;
        const shapeType = Math.floor(Math.random() * 6);
        
        switch(shapeType) {
            case 0:
                mesh = createCube(size, material);
                break;
            case 1:
                mesh = createSphere(size * 0.6, material);
                break;
            case 2:
                mesh = createOctahedron(size * 0.7, material);
                break;
            case 3:
                mesh = createTorus(size * 0.5, size * 0.2, material);
                break;
            case 4:
                mesh = createTetrahedron(size * 0.8, material);
                break;
            case 5:
                mesh = createIcosahedron(size * 0.6, material);
                break;
        }

        // Random position
        mesh.position.x = (Math.random() - 0.5) * 80;
        mesh.position.y = (Math.random() - 0.5) * 60;
        mesh.position.z = (Math.random() - 0.5) * 40 - 20;

        // Random rotation
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;

        // Store animation data
        mesh.userData = {
            originalPosition: mesh.position.clone(),
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.01
            },
            floatSpeed: 0.3 + Math.random() * 0.5,
            floatOffset: Math.random() * Math.PI * 2,
            floatAmplitude: 0.5 + Math.random() * 1.5
        };

        floatingObjects.add(mesh);
        objects.push(mesh);
    }

    // Create wireframe duplicates for some objects
    objects.slice(0, 10).forEach(obj => {
        const wireframeMesh = obj.clone();
        wireframeMesh.material = materials.wireframe;
        wireframeMesh.scale.multiplyScalar(1.1);
        wireframeMesh.userData = { ...obj.userData };
        floatingObjects.add(wireframeMesh);
    });

    // Create particles
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorPalette = [
        new THREE.Color(colors.blue),
        new THREE.Color(colors.blueLight),
        new THREE.Color(colors.orange),
        new THREE.Color(colors.green),
        new THREE.Color(colors.purple)
    ];

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        particlePositions[i3] = (Math.random() - 0.5) * 100;
        particlePositions[i3 + 1] = (Math.random() - 0.5) * 80;
        particlePositions[i3 + 2] = (Math.random() - 0.5) * 60 - 20;

        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        particleColors[i3] = color.r;
        particleColors[i3 + 1] = color.g;
        particleColors[i3 + 2] = color.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Create grid floor
    const gridSize = 100;
    const gridDivisions = 50;
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, colors.blue, colors.blue);
    gridHelper.position.y = -25;
    gridHelper.material.opacity = 0.15;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Create connecting lines between objects (reused, not re-created every frame)
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);
    const connectionLines = [];

    for (let i = 0; i < objects.length - 1; i++) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, 0)
        ]);
        const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
            color: colors.blue,
            transparent: true,
            opacity: 0.1
        }));
        line.visible = false;
        lineGroup.add(line);
        connectionLines.push({ line, a: objects[i], b: objects[i + 1] });
    }

    function updateLines() {
        for (const conn of connectionLines) {
            const distance = conn.a.position.distanceTo(conn.b.position);
            const positions = conn.line.geometry.attributes.position;
            if (distance < 20) {
                positions.setXYZ(0, conn.a.position.x, conn.a.position.y, conn.a.position.z);
                positions.setXYZ(1, conn.b.position.x, conn.b.position.y, conn.b.position.z);
                positions.needsUpdate = true;
                conn.line.visible = true;
            } else {
                conn.line.visible = false;
            }
        }
    }

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    document.addEventListener('mousemove', (e) => {
        targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
        targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Scroll interaction
    let scrollY = 0;
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });

    // Animation loop
    let time = 0;
    function animate() {
        time += 0.01;

        // Smooth mouse following
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        // Animate floating objects
        objects.forEach((obj, index) => {
            // Rotation
            obj.rotation.x += obj.userData.rotationSpeed.x;
            obj.rotation.y += obj.userData.rotationSpeed.y;
            obj.rotation.z += obj.userData.rotationSpeed.z;

            // Floating motion
            const floatY = Math.sin(time * obj.userData.floatSpeed + obj.userData.floatOffset) * obj.userData.floatAmplitude;
            obj.position.y = obj.userData.originalPosition.y + floatY;

            // Mouse influence
            obj.position.x = obj.userData.originalPosition.x + mouseX * 2;
        });

        // Animate particles
        const posArray = particleGeometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            posArray[i3 + 1] += Math.sin(time + i * 0.1) * 0.02;
        }
        particleGeometry.attributes.position.needsUpdate = true;

        // Camera follows mouse slightly
        camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
        camera.position.y += (mouseY * 2 + 5 - camera.position.y) * 0.02;
        camera.lookAt(0, 0, -10);

        // Animate lights
        pointLight1.position.x = Math.sin(time * 0.3) * 25;
        pointLight1.position.z = Math.cos(time * 0.3) * 25;
        
        pointLight2.position.x = Math.cos(time * 0.2) * 20;
        pointLight2.position.z = Math.sin(time * 0.2) * 20;

        pointLight3.position.x = Math.sin(time * 0.4) * 15;
        pointLight3.position.z = Math.cos(time * 0.4) * 15;

        // Update connecting lines
        updateLines();

        renderer.render(scene, camera);
    }

    // Performance optimization - reduce animations when tab is not visible
    let animId = null;
    function startLoop() {
        if (animId !== null) return;
        const loop = () => {
            animate();
            animId = requestAnimationFrame(loop);
        };
        loop();
    }
    function stopLoop() {
        if (animId !== null) {
            cancelAnimationFrame(animId);
            animId = null;
        }
    }

    startLoop();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopLoop();
        } else {
            startLoop();
        }
    });

    console.log('🎨 3D Background loaded successfully!');
})();
