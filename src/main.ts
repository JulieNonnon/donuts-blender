import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


// Setup basique Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Positionne la caméra
camera.position.z = 2.5;

// Lumière
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

// Lumière ambiante supplémentaire
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); 
scene.add(ambientLight);

// Charger le modèle GLTF/GLB
const loader = new GLTFLoader();

loader.load(
  'models/tuto_doughnut_web.glb',
  function (gltf) {
    const model = gltf.scene;
    // model.rotation.x = THREE.MathUtils.degToRad(15);
    // model.rotation.y = THREE.MathUtils.degToRad(30);
    // model.rotation.z = THREE.MathUtils.degToRad(0); 
    scene.add(model);

    // Optionnel: Animation du modèle
    const animate = function () {
      requestAnimationFrame(animate);
      model.rotation.y += 0.01;
      model.rotation.x += 0.005;

      renderer.render(scene, camera);
    };

    animate();
  },
  undefined,
  function (error) {
    console.error('Une erreur est survenue lors du chargement du modèle', error);
  }
);

