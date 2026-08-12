// Three.js Particle System for Hero Section
(function() {
    'use strict';

    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded for particles');
        return;
    }

    const heroCanvas = document.getElementById('heroCanvas');
    if (!heroCanvas) return;

    // Create a separate canvas for particles
    const particleContainer = document.createElement('div');
    particleContainer.id = 'particle-container';
    particleContainer.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;';
    heroCanvas.style.position = 'relative';
    heroCanvas.appendChild(particleContainer);

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, heroCanvas.clientWidth / heroCanvas.clientHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(heroCanvas.clientWidth, heroCanvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    particleContainer.appendChild(renderer.domElement);

    // Create particles
    const particleCount = 150;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const colorPalette = [
        new THREE.Color(0x0078D4), // Blue
        new THREE.Color(0x3FB950), // Green
        new THREE.Color(0xE8751A), // Orange
        new THREE.Color(0xBB80FF), // Purple
        new THREE.Color(0x4DA3FF)  // Light blue
    ];

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Random positions
        positions[i3] = (Math.random() - 0.5) * 60;
        positions[i3 + 1] = (Math.random() - 0.5) * 40;
        positions[i3 + 2] = (Math.random() - 0.5) * 30;

        // Random colors from palette
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;

        // Random sizes
        sizes[i] = Math.random() * 2 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Particle material
    const material = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Add floating lines (grid effect)
    const linesMaterial = new THREE.LineBasicMaterial({ 
        color: 0x0078D4, 
        transparent: true, 
        opacity: 0.1 
    });

    for (let i = 0; i < 10; i++) {
        const lineGeometry = new THREE.BufferGeometry();
        const linePositions = new Float32Array([
            -30 + Math.random() * 60, (Math.random() - 0.5) * 40, -10,
            -30 + Math.random() * 60, (Math.random() - 0.5) * 40, -10
        ]);
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        const line = new THREE.Line(lineGeometry, linesMaterial);
        scene.add(line);
    }

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Rotate particles
        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;

        // Animate individual particles
        const posArray = geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Floating motion
            posArray[i3 + 1] += Math.sin(time + i * 0.1) * 0.02;
            posArray[i3] += Math.cos(time + i * 0.1) * 0.01;
        }
        geometry.attributes.position.needsUpdate = true;

        // Mouse influence
        particles.rotation.y += mouseX * 0.0003;
        particles.rotation.x += mouseY * 0.0003;

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = heroCanvas.clientWidth / heroCanvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(heroCanvas.clientWidth, heroCanvas.clientHeight);
    });

    console.log('✨ Particle system loaded!');
})();
