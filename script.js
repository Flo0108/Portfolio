











const threeCanvas = document.getElementById("three-canvas");
const renderer = new THREE.WebGLRenderer({ canvas: threeCanvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);


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
    text: "Investigation of spatial negotiation between material constraints and computational control systems.",
    description: "I see what’s happening. The issue isn’t with your showProjectPanel function itself—it’s that the call happens before the textures for the sprites have loaded. Your THREE.TextureLoader().load calls are asynchronous, so the project panel is being requested while the images are still loading, which can prevent layout logic or animations from initializing correctly. Here’s how you can fix it:",
    modules: [
      { type: "text", content: "Investigation of spatial negotiation between material constraints and computational control systems." },
      { type: "image-text", image: "images/MainProjects/image1.jpg", text: "Main view of the project" },
      { type: "image-grid", images: [
          "images/ClimateCenter/image0.jpg",
          "images/ClimateCenter/image1.jpg",
          "images/ClimateCenter/image2.jpg"
        ]
      }
    ]
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
    text: "Exploring material interactions in a built environment.",
    description: "I see what’s happening. The issue isn’t with your showProjectPanel function itself—it’s that the call happens before the textures for the sprites have loaded. Your THREE.TextureLoader().load calls are asynchronous, so the project panel is being requested while the images are still loading, which can prevent layout logic or animations from initializing correctly. Here’s how you can fix it:",
    modules: [
      { type: "text", content: "Investigation of spatial negotiation between material constraints and computational control systems." },
      { type: "image-text", image: "images/MainProjects/image1.jpg", text: "Main view of the project" },
      { type: "image-grid", images: [
          "images/DronePort/image0.jpg",
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
        ]
      }
    ]
  },
  { id: "project03", title: "Concert House", year: "2023", type: "Speculative",
    method: "Computational",
    mainImage: "images/MainProjects/image3.jpg",
    images: ["images/project03_01.jpg", "images/project03_02.jpg"],
    text: "A parametric exploration of form evolution through computational constraints.",
    description: "I see what’s happening. The issue isn’t with your showProjectPanel function itself—it’s that the call happens before the textures for the sprites have loaded. Your THREE.TextureLoader().load calls are asynchronous, so the project panel is being requested while the images are still loading, which can prevent layout logic or animations from initializing correctly. Here’s how you can fix it:",
    modules: [
      { type: "text", content: "Investigation of spatial negotiation between material constraints and computational control systems." },
      { type: "image-text", image: "images/MainProjects/image1.jpg", text: "Main view of the project" },
      { type: "image-grid", images: [
          "images/project03_01.jpg", "images/project03_02.jpg"
        ]
      }
    ]
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
    text: "A parametric exploration of form evolution through computational constraints.",
    description: "I see what’s happening. The issue isn’t with your showProjectPanel function itself—it’s that the call happens before the textures for the sprites have loaded. Your THREE.TextureLoader().load calls are asynchronous, so the project panel is being requested while the images are still loading, which can prevent layout logic or animations from initializing correctly. Here’s how you can fix it:",
    modules: [
      { type: "text", content: "Investigation of spatial negotiation between material constraints and computational control systems." },
      { type: "image-text", image: "images/MainProjects/image1.jpg", text: "Main view of the project" },
      { type: "image-grid", images: [
          "images/MoCap/natalia_anna_flo_image01_ws_22.jpg",
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
        ]
      }
    ]
  },
  { id: "project05", title: "CGI", year: "2023", type: "Speculative",
    method: "Computational",
    mainImage: "images/MainProjects/image5.jpg",
    images: ["images/project03_01.jpg", "images/project03_02.jpg"],
    text: "A parametric exploration of form evolution through computational constraints.",
    description: "I see what’s happening. The issue isn’t with your showProjectPanel function itself—it’s that the call happens before the textures for the sprites have loaded. Your THREE.TextureLoader().load calls are asynchronous, so the project panel is being requested while the images are still loading, which can prevent layout logic or animations from initializing correctly. Here’s how you can fix it:",
    modules: [
      { type: "text", content: "Investigation of spatial negotiation between material constraints and computational control systems." },
      { type: "image-text", image: "images/MainProjects/image1.jpg", text: "Main view of the project" },
      { type: "image-grid", images: [
          "images/ClimateCenter/image0.jpg",
          "images/ClimateCenter/image1.jpg",
          "images/ClimateCenter/image2.jpg"
        ]
      }
    ]
  },
  { id: "project06", title: "Google HQ", year: "2023", type: "Speculative",
    method: "Google HQ",
    mainImage: "images/MainProjects/image6.jpg",
    images: [ "images/Google/image1.jpg", 
              "images/Google/image2.jpg",
              "images/Google/image3.jpg"
            ],
    text: "A parametric exploration of form evolution through computational constraints.",
    description: "I see what’s happening. The issue isn’t with your showProjectPanel function itself—it’s that the call happens before the textures for the sprites have loaded. Your THREE.TextureLoader().load calls are asynchronous, so the project panel is being requested while the images are still loading, which can prevent layout logic or animations from initializing correctly. Here’s how you can fix it:",
    modules: [
      { type: "text", content: "Investigation of spatial negotiation between material constraints and computational control systems." },
      { type: "image-text", image: "images/MainProjects/image1.jpg", text: "Main view of the project" },
      { type: "image-grid", images: [
          "images/ClimateCenter/image0.jpg",
          "images/ClimateCenter/image1.jpg",
          "images/ClimateCenter/image2.jpg"
        ]
      }
    ]
  },
    { id: "project07", title: "Hospice", year: "2023", type: "Speculative",
    method: "Computational",
    mainImage: "images/MainProjects/image7.jpg",
    images: ["images/project03_01.jpg", "images/project03_02.jpg"],
    text: "A parametric exploration of form evolution through computational constraints.",
    description: "I see what’s happening. The issue isn’t with your showProjectPanel function itself—it’s that the call happens before the textures for the sprites have loaded. Your THREE.TextureLoader().load calls are asynchronous, so the project panel is being requested while the images are still loading, which can prevent layout logic or animations from initializing correctly. Here’s how you can fix it:",
    modules: [
      { type: "text", content: "Investigation of spatial negotiation between material constraints and computational control systems." },
      { type: "image-text", image: "images/MainProjects/image1.jpg", text: "Main view of the project" },
      { type: "image-grid", images: [
          "images/ClimateCenter/image0.jpg",
          "images/ClimateCenter/image1.jpg",
          "images/ClimateCenter/image2.jpg"
        ]
      }
    ]
  },
    { id: "project08", title: "Thesis", year: "2023", type: "Speculative",
    method: "Computational",
    mainImage: "images/MainProjects/image8.jpg",
    images: ["images/project03_01.jpg", "images/project03_02.jpg"],
    text: "A parametric exploration of form evolution through computational constraints.",
    description: "I see what’s happening. The issue isn’t with your showProjectPanel function itself—it’s that the call happens before the textures for the sprites have loaded. Your THREE.TextureLoader().load calls are asynchronous, so the project panel is being requested while the images are still loading, which can prevent layout logic or animations from initializing correctly. Here’s how you can fix it:",
    modules: [
      { type: "text", content: "Investigation of spatial negotiation between material constraints and computational control systems." },
      { type: "image-text", image: "images/MainProjects/image1.jpg", text: "Main view of the project" },
      { type: "image-grid", images: [
          "images/ClimateCenter/image0.jpg",
          "images/ClimateCenter/image1.jpg",
          "images/ClimateCenter/image2.jpg"
        ]
      }
    ]
  }
];

// --------------------------
// Main Load Functions
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

function positionOnSphere(index, total, radius) {
  const phi = Math.acos(-1 + (2 * index) / total);
  const theta = Math.sqrt(total * Math.PI) * phi;
  return new THREE.Vector3(
    radius * Math.cos(theta) * Math.sin(phi),
    radius * Math.sin(theta) * Math.sin(phi),
    radius * Math.cos(phi)
  );
}

function createSprite(texture, height = 1) {
  const material = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(material);
  const aspect = texture.image.width / texture.image.height;
  sprite.scale.set(height * aspect, height, 1);
  sprite.originalScale = sprite.scale.clone();
  return sprite;
}

function loadMainSphere() {
  sprites.forEach(s => sphereGroup.remove(s));
  sprites.length = 0;

  projects.forEach((project, i) => {
    new THREE.TextureLoader().load(project.mainImage, texture => {
      const sprite = createSprite(texture);
      sprite.userData.project = project;
      sprite.position.copy(positionOnSphere(i, projects.length, sphereRadius));
      sphereGroup.add(sprite);
      sprites.push(sprite);
    });
  });
}










// --------------------------
// DISPLAY
// --------------------------

// --------------------------
// 2D-Setup
// --------------------------


const pointCanvas = document.getElementById("grid-canvas");
const ctx = pointCanvas.getContext("2d");

const points = [];
const spacing = 20;

function generateGridPoints(width, height) {
  points.length = 0;
  for (let x = spacing / 2; x < width; x += spacing) {
    for (let y = spacing / 2; y < height; y += spacing) {
      points.push({ x, y });
    }
  }
}

function resizeCanvas() {
  pointCanvas.width = window.innerWidth;
  pointCanvas.height = window.innerHeight;
  generateGridPoints(window.innerWidth, window.innerHeight);
}


function projectSpriteToScreen(sprite) {
  const rect = overlayCanvas.getBoundingClientRect();
  const center = new THREE.Vector3();
  sprite.getWorldPosition(center);

  const camRight = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0).normalize();
  const camUp = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 1).normalize();

  const halfW = sprite.scale.x / 2;
  const halfH = sprite.scale.y / 2;

  const corners = [
    center.clone().add(camRight.clone().multiplyScalar(-halfW)).add(camUp.clone().multiplyScalar(-halfH)),
    center.clone().add(camRight.clone().multiplyScalar( halfW)).add(camUp.clone().multiplyScalar(-halfH)),
    center.clone().add(camRight.clone().multiplyScalar( halfW)).add(camUp.clone().multiplyScalar( halfH)),
    center.clone().add(camRight.clone().multiplyScalar(-halfW)).add(camUp.clone().multiplyScalar( halfH))
  ];

  const screen = corners.map(v => {
    v.project(camera);
    return { x: (v.x * 0.5 + 0.5) * rect.width, y: (-v.y * 0.5 + 0.5) * rect.height };
  });

  return {
    quad: screen,
    left: Math.min(...screen.map(p => p.x)),
    right: Math.max(...screen.map(p => p.x)),
    top: Math.min(...screen.map(p => p.y)),
    bottom: Math.max(...screen.map(p => p.y)),
    project: sprite.userData.project
  };
}



function drawBoundaryOutline() {
  const corners = [];

  // Collect all sprite rectangle corners
  sprites.forEach(sprite => {
    const r = projectSpriteToScreen(sprite);
    corners.push({ x: r.left, y: r.top });
    corners.push({ x: r.right, y: r.top });
    corners.push({ x: r.right, y: r.bottom });
    corners.push({ x: r.left, y: r.bottom });
  });

  if (corners.length === 0) return;

  // Convex hull (Andrew’s monotone chain)
  corners.sort((a, b) => a.x === b.x ? a.y - b.y : a.x - b.x);

  const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);

  const lower = [];
  for (const p of corners) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }

  const upper = [];
  for (let i = corners.length - 1; i >= 0; i--) {
    const p = corners[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }

  const hull = lower.slice(0, -1).concat(upper.slice(0, -1));

  // Draw outline
  ctx.strokeStyle = "rgba(0,0,0,0.5)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  hull.forEach((p, i) => {
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.closePath();
  ctx.stroke();
}


function drawPoints() {
  ctx.clearRect(0, 0, pointCanvas.width, pointCanvas.height);

  const spriteRects = sprites.map(projectSpriteToScreen);

  ctx.fillStyle = "rgba(0,0,0,0.2)";
  const radius = 2;
  const offset = 100;
  points.forEach(p => {
    const inside = spriteRects.some(r =>
      p.x + offset > r.left && p.x - offset < r.right &&
      p.y + offset > r.top  && p.y - offset < r.bottom
    );
    if (!inside) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();




const overlayCanvas = document.getElementById("overlay-canvas");
const overlayctx = overlayCanvas.getContext("2d");


function resizeOverlayCanvas() {
  overlayCanvas.width = window.innerWidth;
  overlayCanvas.height = window.innerHeight;
}

window.addEventListener("resize", () => {
  resizeOverlayCanvas();
  resizeCanvas(); // your existing grid-canvas resize function
});
resizeOverlayCanvas();


function drawSpriteName(dominantSprite) {
  overlayctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

  const spriteRects = sprites.map(projectSpriteToScreen);

  // Find the closest sprite along the camera forward direction
  let closestSpriteRect = null;
  let minCameraDistance = Infinity;


  sprites.forEach((sprite, i) => {

    if (dominantSprite) {
      const cameraSpacePos = sprite.position.clone().applyMatrix4(camera.matrixWorldInverse);
      const distance = -cameraSpacePos.z; // use negative z to get positive depth in front of camera
      if (distance < minCameraDistance) {
        minCameraDistance = distance;
        closestSpriteRect = spriteRects[i];
      }
    }
  });

  if (closestSpriteRect && closestSpriteRect.project) {
    const r = closestSpriteRect;
    
    // Use progress to fade in text
    const sprite = sprites.find(s => s.userData.project === r.project);
    const alpha = sprite ? sprite.userData.progress : 0;

    overlayctx.globalAlpha = alpha; // fade text in/out
    const x = r.right + 50;
    const y = r.bottom - 50;
    overlayctx.font = "24px 'Source Sans Pro', Arial";
    overlayctx.fillStyle = "black";
    overlayctx.fillText(r.project.title, x, y);
    overlayctx.font = "12px 'Source Sans Pro', Arial";
    overlayctx.fillText(`${r.project.year} — ${r.project.type}`, x, y + 16);
    overlayctx.globalAlpha = 1;
  }

}

















// --------------------------
// Portfolio Page
// --------------------------


// Image module
function createImageModule(src, alt = "") {
    const container = document.createElement("div");
    container.classList.add("project-module", "module-image-left");
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    container.appendChild(img);
    return container;
}

// Video module
function createVideoModule(src) {
    const container = document.createElement("div");
    container.classList.add("project-module", "module-image-left");
    const video = document.createElement("video");
    video.src = src;
    video.controls = true;
    container.appendChild(video);
    return container;
}

// Text module
function createTextModule(text) {
    const container = document.createElement("div");
    container.classList.add("project-module", "module-text");
    const p = document.createElement("p");
    p.textContent = text;
    container.appendChild(p);
    return container;
}

// Grid module for multiple images
function createImageGridModule(imageArray) {
    const container = document.createElement("div");
    container.classList.add("project-module", "module-grid");
    imageArray.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        container.appendChild(img);
    });
    return container;
}

// Image left, text right
function createImageTextModule(imageSrc, textContent, imageAlt = "") {
    const container = document.createElement("div");
    container.classList.add("project-module", "module-image-text");

    // Image container
    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("module-image");
    const img = document.createElement("img");
    img.src = imageSrc;
    img.alt = imageAlt;
    imgWrapper.appendChild(img);

    // Text container
    const textWrapper = document.createElement("div");
    textWrapper.classList.add("module-text");
    const p = document.createElement("p");
    p.textContent = textContent;
    textWrapper.appendChild(p);

    // Append image and text
    container.appendChild(imgWrapper);
    container.appendChild(textWrapper);

    return container;
}






const projectPanel = document.getElementById("project-panel");
const projectContent = document.getElementById("project-content");
const closeBtn = document.getElementById("close-project");

function showProjectPanel(project) {
    projectContent.innerHTML = ""; // clear old content

    // Add title
    const titleEl = document.createElement("h2");
    titleEl.textContent = project.title;
    projectContent.appendChild(titleEl);

    // Iterate through modules in order
    project.modules.forEach(module => {
        let el;
        switch(module.type) {
            case "text":
                el = createTextModule(module.content);
                break;
            case "image":
                el = createImageModule(module.src, module.alt || "");
                break;
            case "video":
                el = createVideoModule(module.src);
                break;
            case "image-grid":
                el = createImageGridModule(module.images);
                break;
            case "image-text":
                el = createImageTextModule(module.image, module.text, module.alt || "");
                break;
            default:
                console.warn("Unknown module type:", module.type);
        }
        if (el) projectContent.appendChild(el);
    });

    // Slide in panel
    projectPanel.classList.add("active");
}

closeBtn.addEventListener("click", () => { projectPanel.classList.remove("active"); });





// --------------------------
// Image Color-Setup
// --------------------------





function prepareGrayscale(sprite) {
  if (sprite.userData.grayTexture) return; // already done

  const texture = sprite.material.map;
  const image = texture.image;

  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(image, 0, 0);

  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;

  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.21 * data[i] + 0.72 * data[i + 1] + 0.07 * data[i + 2];
    const adjusted = gray + 60; // brighten slightly
    data[i] = data[i + 1] = data[i + 2] = Math.min(255, adjusted);
  }

  ctx.putImageData(imgData, 0, 0);

  const grayTexture = new THREE.Texture(canvas);
  grayTexture.needsUpdate = true;
  sprite.userData.grayTexture = grayTexture;

  if (!sprite.userData.originalTexture) {
    sprite.userData.originalTexture = texture; // store original
  }
}


function updateSpriteGrayscale(spriteArray, targetScale) {
  const epsilon = 0.7;
  spriteArray.forEach(sprite => {
    prepareGrayscale(sprite); // precompute if needed

    const sx = sprite.scale.x;
    const sy = sprite.scale.y;

    if (Math.abs(sx - targetScale) < epsilon || Math.abs(sy - targetScale) < epsilon) {
      sprite.material.map = sprite.userData.grayTexture;
    } else {
      sprite.material.map = sprite.userData.originalTexture;
    }
    sprite.material.needsUpdate = true;
  });
}





// --------------------------
// Interaction
// --------------------------

function onMouseMove(event) {
  const rect = threeCanvas.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function onClick() {
  console.log
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(sprites);
  if (intersects.length > 0) {
    const clicked = intersects[0].object;
    const fullSrc = clicked.material.map.image.src;
    const src = fullSrc.substring(fullSrc.indexOf("images/"));


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
    
    showProjectPanel(project);
  }
  
}

































// --------------------------
// Animate
// --------------------------

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // Enable auto-rotate when user is not interacting
  if (!userInteracting) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.1;
      controls.update();
  }

  // Scale parameters
  const minScale = 0.1;
  const maxScale = 1.3;

  // Detect mobile (simple breakpoint or matchMedia)
  const isMobile = window.innerWidth <= 768;  // or use a different breakpoint
  const mobileScaleFactor = isMobile ? 0.6 : 1; // reduce scale on mobile

  let dominantSprite = null;
  let minDistance = Infinity;

  sprites.forEach(sprite => {
    sprite.lookAt(camera.position);

    const distance = camera.position.distanceTo(sprite.position);
    let scaleFactor = THREE.MathUtils.clamp(5 / distance, minScale, maxScale);

    // Apply mobile scale adjustment
    scaleFactor *= mobileScaleFactor;

    sprite.scale.set(
      sprite.originalScale.x * scaleFactor,
      sprite.originalScale.y * scaleFactor,
      1
    );

    // Determine dominant sprite
    const cameraSpacePos = sprite.position.clone().applyMatrix4(camera.matrixWorldInverse);
    const z = -cameraSpacePos.z; 
    if (z < minDistance) {
      minDistance = z;
      dominantSprite = sprite;
    }
  });

  // Set grayscale for all sprites except dominant
  sprites.forEach(sprite => {
    prepareGrayscale(sprite);

    if (sprite === dominantSprite) {
      sprite.material.map = sprite.userData.originalTexture;
    } else {
      sprite.material.map = sprite.userData.grayTexture;
    }
    sprite.material.needsUpdate = true;
  });

  renderer.render(scene, camera);
  drawPoints();
  //drawBoundaryOutline();

  drawSpriteName(dominantSprite);
}



// --------------------------
// Events
// --------------------------




// --------------------------
// Init
// --------------------------
loadMainSphere();
animate();

let pointerDownTime = 0;

// Record when pointer is pressed
threeCanvas.addEventListener('pointerdown', (event) => {
    pointerDownTime = performance.now();
});

// Trigger click logic on pointer up if duration < 1 second
threeCanvas.addEventListener('pointerup', (event) => {
    const duration = performance.now() - pointerDownTime;

    if (duration > 100) return; // ignore long presses

    console.log("Click duration:", duration);

    onClick()
    
});



