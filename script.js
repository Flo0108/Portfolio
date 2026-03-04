// --------------------------
// Setup
// --------------------------








const pointCanvas = document.getElementById("grid-canvas");
const ctx = pointCanvas.getContext("2d");

function resizeCanvas() {
  pointCanvas.width = window.innerWidth;
  pointCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// generate a grid of points
const points = [];
const spacing = 40;
for (let x = spacing / 2; x < window.innerWidth; x += spacing) {
  for (let y = spacing / 2; y < window.innerHeight; y += spacing) {
    points.push({x, y});
  }
}

function drawPoints() {
  ctx.clearRect(0, 0, pointCanvas.width, pointCanvas.height);
  const radius = 2;
  const hideDistance = 200; // pixels around sprite to hide points

  // project each sprite to 2D
  const spritePositions2D = sprites.map(sprite => {
    const pos = sprite.position.clone();
    pos.project(camera);
    return {
      x: (pos.x * 0.5 + 0.5) * window.innerWidth,
      y: (-pos.y * 0.5 + 0.5) * window.innerHeight
    };
  });

  ctx.fillStyle = "rgba(0,0,0,0.2)";
  points.forEach(p => {
    // check if point is near any sprite
    const nearSprite = spritePositions2D.some(s => {
      const dx = s.x - p.x;
      const dy = s.y - p.y;
      return Math.sqrt(dx*dx + dy*dy) < hideDistance;
    });

    if (!nearSprite) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}








const container = document.getElementById('three-container');
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  // smooth rotation
controls.enableZoom = false;    // prevent zoom
controls.enablePan = false;     // prevent panning

// Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const tooltip = document.getElementById('tooltip');

// Groups
const sphereGroup = new THREE.Group();
scene.add(sphereGroup);

const floatingGroup = new THREE.Group();
scene.add(floatingGroup);

let sprites = [];
const sphereRadius = 2.5;
let autoRotateSpeed = 0.001;
let userInteracting = false;
let hoveredSprite = null;
let activeProject = null;

const spriteLabel = document.getElementById('sprite-label');
let focusedSprite = null;



// --------------------------
// Projects
// --------------------------
const projects = [
  { id: "project01", title: "Climate Center", year: "2025", type: "Speculative",
    method: "Parametric System",
    mainImage: "images/MainProjects/image1.jpg",
    images: [ "images/ClimateCenter/image0.jpg",
              "images/ClimateCenter/image1.jpg",
              "images/ClimateCenter/image2.jpg",
              "images/ClimateCenter/image3.jpg",
              "images/ClimateCenter/image4.jpg",
              "images/ClimateCenter/image5.jpg",
              "images/ClimateCenter/image6.jpg",
              "images/ClimateCenter/image7.jpg",
              "images/ClimateCenter/image8.jpg",
              "images/ClimateCenter/image9.jpg",
              "images/ClimateCenter/image10.jpg",
              "images/ClimateCenter/image11.jpg",
              "images/ClimateCenter/image12.jpg",
              "images/ClimateCenter/image13.jpg",
              "images/ClimateCenter/image14.jpg",
              "images/ClimateCenter/image15.jpg",
              "images/ClimateCenter/image16.jpg",
              "images/ClimateCenter/image17.jpg",
              "images/ClimateCenter/image18.jpg",
              "images/ClimateCenter/image19.jpg",
              "images/ClimateCenter/image20.jpg"
            ],
    text: "Investigation of spatial negotiation between material constraints and computational control systems."
  },
  { id: "project02", title: "Drone Port", year: "2024", type: "Built",
    method: "Research-Based",
    mainImage: "images/MainProjects/image2.jpg",
    images: [ "images/DronePort/image0.jpg",
              "images/DronePort/image1.jpg",
              "images/DronePort/image2.jpg",
              "images/DronePort/image3.jpg",
              "images/DronePort/image4.jpg",
              "images/DronePort/image5.jpg",
              "images/DronePort/image6.jpg",
              "images/DronePort/image7.jpg",
              "images/DronePort/image8.jpg",
              "images/DronePort/image9.jpg",
              "images/DronePort/image10.jpg",
              "images/DronePort/image11.jpg",
              "images/DronePort/image12.jpg",
              "images/DronePort/image13.jpg",
              "images/DronePort/image14.jpg",
              "images/DronePort/image15.jpg",
              "images/DronePort/image16.jpg",
              "images/DronePort/image17.jpg",
              "images/DronePort/image18.jpg",
              "images/DronePort/image19.jpg",
              "images/DronePort/image20.jpg"
            ],
    text: "Exploring material interactions in a built environment."
  },
  { id: "project03", title: "Concert House", year: "2023", type: "Speculative",
    method: "Computational",
    mainImage: "images/MainProjects/image3.jpg",
    images: ["images/project03_01.jpg", "images/project03_02.jpg"],
    text: "A parametric exploration of form evolution through computational constraints."
  },
  { id: "project04", title: "MoCap Factory", year: "2023", type: "Speculative",
    method: "MoCap Factory",
    mainImage: "images/MainProjects/image4.jpg",
    images: [ "images/MoCap/natalia_anna_flo_image01_ws_22.jpg",
              "images/MoCap/natalia_anna_flo_image02_ws_22.jpg",
              "images/MoCap/natalia_anna_flo_image03_ws_22.jpg",
              "images/MoCap/natalia_anna_flo_image04_ws_22.jpg",
              "images/MoCap/natalia_anna_flo_image05_ws_22.jpg",
              "images/MoCap/natalia_anna_flo_image06_ws_22.jpg",
              "images/MoCap/natalia_anna_flo_image07_ws_22_WG.jpg",
              "images/MoCap/natalia_anna_flo_image08_ws_22.jpg",
              "images/MoCap/natalia_anna_flo_image09_ws_22.jpg",
              "images/MoCap/natalia_anna_flo_image10_ws_22.jpg",
              "images/MoCap/natalia_anna_flo_image11_ws_22_WG.jpg",
            ],
    text: "A parametric exploration of form evolution through computational constraints."
  },
  { id: "project05", title: "CGI", year: "2023", type: "Speculative",
    method: "Computational",
    mainImage: "images/MainProjects/image5.jpg",
    images: ["images/project03_01.jpg", "images/project03_02.jpg"],
    text: "A parametric exploration of form evolution through computational constraints."
  },
  { id: "project06", title: "Google HQ", year: "2023", type: "Speculative",
    method: "Google HQ",
    mainImage: "images/MainProjects/image6.jpg",
    images: [ "images/Google/image1.jpg", 
              "images/Google/image2.jpg",
              "images/Google/image3.jpg"
            ],
    text: "A parametric exploration of form evolution through computational constraints."
  },
    { id: "project07", title: "Hospice", year: "2023", type: "Speculative",
    method: "Computational",
    mainImage: "images/MainProjects/image7.jpg",
    images: ["images/project03_01.jpg", "images/project03_02.jpg"],
    text: "A parametric exploration of form evolution through computational constraints."
  },
    { id: "project08", title: "Thesis", year: "2023", type: "Speculative",
    method: "Computational",
    mainImage: "images/MainProjects/image8.jpg",
    images: ["images/project03_01.jpg", "images/project03_02.jpg"],
    text: "A parametric exploration of form evolution through computational constraints."
  }
];

// --------------------------
// Functions
// --------------------------
function loadSphereImages(urls) {
  // Clear old sprites
  sprites.forEach(s => sphereGroup.remove(s));
  sprites = [];

  urls.forEach((url, i) => {
    const texture = new THREE.TextureLoader().load(url, () => {
      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);

      // Keep aspect ratio
      const aspect = texture.image.width / texture.image.height;
      const spriteHeight = 1;
      sprite.scale.set(spriteHeight * aspect, spriteHeight, 1);
      sprite.originalScale = sprite.scale.clone();

      // Position on sphere
      const phi = Math.acos(-1 + (2 * i) / urls.length);
      const theta = Math.sqrt(urls.length * Math.PI) * phi;
      sprite.position.set(
        sphereRadius * Math.cos(theta) * Math.sin(phi),
        sphereRadius * Math.sin(theta) * Math.sin(phi),
        sphereRadius * Math.cos(phi)
      );

      sphereGroup.add(sprite);
      sprites.push(sprite);
    });
  });
}

function loadMainSphere() {
  sprites.forEach(s => sphereGroup.remove(s));
  sprites = [];

  projects.forEach((project, i) => {
    const texture = new THREE.TextureLoader().load(project.mainImage, () => {
      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);

      const aspect = texture.image.width / texture.image.height;
      const spriteHeight = 1;
      sprite.scale.set(spriteHeight * aspect, spriteHeight, 1);
      sprite.originalScale = sprite.scale.clone();

      // Attach project reference
      sprite.userData.project = project;

      const phi = Math.acos(-1 + (2 * i) / projects.length);
      const theta = Math.sqrt(projects.length * Math.PI) * phi;

      sprite.position.set(
        sphereRadius * Math.cos(theta) * Math.sin(phi),
        sphereRadius * Math.sin(theta) * Math.sin(phi),
        sphereRadius * Math.cos(phi)
      );

      sphereGroup.add(sprite);
      sprites.push(sprite);
    });
  });
}

// --------------------------
// Interaction
// --------------------------

function onMouseMove(event) {
  const rect = container.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}


// --------------------------
// Interaction
// --------------------------
function onClick() {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(sprites);
  if (intersects.length > 0) {
    const clicked = intersects[0].object;
    const fullSrc = clicked.material.map.image.src;
    const src = fullSrc.substring(fullSrc.indexOf("images/"));
    alert("Selected: " + clicked.material.map.image.src);


    // Find the project that owns this image
    const project = projects.find(p => p.mainImage === src);
    if (project) {
      console.log("Project clicked:", project.title);

      // Remove all current sprites
      sprites.forEach(s => sphereGroup.remove(s));
      sprites = [];

      // Add the project's images as new sprites
      project.images.forEach((img, i) => {
        const texture = new THREE.TextureLoader().load(img, () => {
          const material = new THREE.SpriteMaterial({ map: texture });
          const sprite = new THREE.Sprite(material);

          // Maintain aspect ratio
          const aspect = texture.image.width / texture.image.height;
          const spriteHeight = 0.5;
          sprite.scale.set(spriteHeight * aspect, spriteHeight, 1);
          sprite.originalScale = sprite.scale.clone();

          // Position them on a small spherical arc
          const phi = Math.acos(-1 + (2 * i) / project.images.length);
          const theta = Math.sqrt(project.images.length * Math.PI) * phi;
          sprite.position.set(
            sphereRadius * Math.cos(theta) * Math.sin(phi),
            sphereRadius * Math.sin(theta) * Math.sin(phi),
            sphereRadius * Math.cos(phi)
          );

          sphereGroup.add(sprite);
          sprites.push(sprite);
        });
      });

      // Optional: display project text
      const display = document.getElementById('project-display');
      display.innerHTML = `<h2>${project.title}</h2><p>${project.text}</p>`;
    }
  }
}


function createTextSprite(text) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = 512;
  canvas.height = 128;

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'black';
  ctx.font = '40px Arial';
  ctx.fillText(text, 20, 70);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(material);

  sprite.scale.set(2, 0.5, 1);
  return sprite;
}


// --------------------------
// Animate
// --------------------------
let label3D = null; // persistent 3D label

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  if (!userInteracting) {
    sphereGroup.rotation.y += autoRotateSpeed;
  }

  const minScale = 0.1;
  const maxScale = 2;
  const revealThreshold = 1.3;

  let dominantSprite = null;

  // --- find dominant sprite ---
  sprites.forEach(sprite => {
    sprite.lookAt(camera.position);

    const distance = camera.position.distanceTo(sprite.position);
    const scaleFactor = THREE.MathUtils.clamp(5 / distance, minScale, maxScale);

    sprite.scale.set(
      sprite.originalScale.x * scaleFactor,
      sprite.originalScale.y * scaleFactor,
      1
    );

    if (scaleFactor >= revealThreshold && sprite.userData.project) {
      dominantSprite = sprite;
    }
  });

  // --- manage label ---
  if (dominantSprite) {
    focusedSprite = dominantSprite;
    const project = focusedSprite.userData.project;

    // Create label if it doesn't exist yet
    if (!label3D) {
      label3D = createTextSprite(project.title);
      sphereGroup.add(label3D);
    }

    // Update label position: push slightly outward along radial vector from center
    const dir = new THREE.Vector3().subVectors(focusedSprite.position, new THREE.Vector3(0,0,0)).normalize();
    label3D.position.copy(focusedSprite.position).add(dir.multiplyScalar(focusedSprite.scale.x * 1.2));

    // Make label always face camera
    label3D.lookAt(camera.position);

  } else {
    focusedSprite = null;
    if (label3D) {
      sphereGroup.remove(label3D);
      label3D = null;
    }
  }

  renderer.render(scene, camera);

  // draw 2D points after camera update
  drawPoints();
}

// --------------------------
// Events
// --------------------------




// --------------------------
// Init
// --------------------------
loadMainSphere();
animate();

window.addEventListener('click', onClick);
controls.addEventListener('start', () => { userInteracting = true; });
controls.addEventListener('end', () => { userInteracting = false; });
