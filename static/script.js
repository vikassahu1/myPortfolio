import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";


// document.addEventListener("DOMContentLoaded", function () {
//     const scroll = new LocomotiveScroll({
//         el: document.querySelector('#main'),
//         smooth: true
//     });
// });


const container = document.getElementById("three-js-container");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    container.offsetWidth / container.offsetHeight,
    0.1,
    1000
);

camera.position.set(0, 0, 12.5);


const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(container.offsetWidth, container.offsetHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.physicallyCorrectLights = true; // For physically accurate lighting
renderer.toneMapping = THREE.ACESFilmicToneMapping; // Optional, for better tone rendering
// renderer.toneMappingExposure = 1; // Default exposure level

container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, container);
controls.enableRotate = false;
controls.enableZoom = false;
controls.enablePan = false;

const ambientLight = new THREE.AmbientLight(0xffffff, 2.6);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 0.4);
topLight.position.set(5, 5, 5);
scene.add(topLight);

const cursorLight = new THREE.PointLight(0xffffff, 0.1, 3);
cursorLight.position.set(0, 0, 5);
cursorLight.intensity = 7;
scene.add(cursorLight);

window.addEventListener("mousemove", (event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    cursorLight.position.x = mouseX * 5;
    cursorLight.position.y = mouseY * 5;
});

window.addEventListener("resize", () => {
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
});

const loader = new GLTFLoader();
loader.load(
    'head_of_the_buddha_anonymous_rijksmuseum.glb',
    function (gltf) {
        const object = gltf.scene;
        object.scale.set(1, 1, 1);
        object.position.set(0, 0, 0);
        object.rotation.y = -6.75;
        scene.add(object);
        console.log('Model loaded successfully');
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    function (error) {
        console.error('An error occurred while loading the model:', error);
    }
);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();




// Populating balls 
// Function to create icon balls dynamically
async function createIconBalls(containerSelector, iconsPath, imgfile) {
    const container = document.querySelector(containerSelector);
    console.log('Creating')
    // Clear existing content in the container
    container.innerHTML = '';

    // Fetch the JSON file containing the image names
    const response = await fetch(iconsPath);
    const icons = await response.json();

    // Apply container styles for layout
    container.classList.add('flex', 'flex-wrap', 'justify-center', 'gap-6', 'items-center');

    // Generate each ball with icon
    icons.forEach(icon => {
        const ballElement = document.createElement('div');
        ballElement.innerHTML = `
<div class="relative w-24 h-24 rounded-full group">
    <!-- Base layer with deep shadow -->
    <div class="absolute inset-0 bg-gray-800 rounded-full 
        shadow-[0_15px_30px_-10px_rgba(0,0,0,0.4)] 
        group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9)] 
        transition-shadow duration-300">
    </div>

    <!-- Inner highlight and texture layer -->
    <div class="absolute inset-0 rounded-full 
        bg-gradient-to-t from-gray-600/80 to-gray-300 
        backdrop-blur-sm 
        border-[1px] border-gray-300">
    </div>

    <!-- Lustrous overlay -->
    <div class="absolute inset-0 rounded-full 
        bg-gradient-to-tr from-white/90 to-transparent 
        opacity-60 
        animate-pulse-slow">
    </div>

    <!-- Subtle inner shadow for depth -->
    <div class="absolute inset-2 rounded-full 
        bg-gray-400
        shadow-inner">
    </div>

    <!-- Icon with slight 3D lift -->
    <img 
        src="../images/${imgfile}/${icon}.png" 
        alt="${icon}" 
        class="absolute w-16 h-16 inset-0 m-auto 
        transform transition-all duration-300 
        group-hover:scale-110 group-hover:translate-z-2 
        drop-shadow-[0_10px_8px_rgba(0,0,0,0.3)]"
    >
</div>
<div class="absolute -bottom-6 left-8 
     text-sm text-cynthia px-5">
    ${icon.split('.')[0]} <!-- Display file name without extension -->
</div>
        `;
        container.appendChild(ballElement);
    });
}

// Call the function after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createIconBalls('#web_icon', './web_icons.json','web_icons'); // Pass the container selector and JSON file path
});

document.addEventListener('DOMContentLoaded', () => {
    createIconBalls('#ai_icon', './ai_icons.json','ai_icons'); // Pass the container selector and JSON file path
});


document.addEventListener('DOMContentLoaded', () => {
    createIconBalls('#lang_icon', './lang_icon.json','lang_icon'); // Pass the container selector and JSON file path
});

document.addEventListener('DOMContentLoaded', () => {
    createIconBalls('#other_icon', './other_icons.json','other_icons'); // Pass the container selector and JSON file path
});


// moving navigation menu 
// // Select all navigation links and the moving span
// const navLinks = document.querySelectorAll('.nav-link');
// const navIndicator = document.getElementById('nav-indicator');

// // Function to set the nav-indicator's position
// function moveIndicator(link) {
//   const offsetLeft = link.offsetLeft;
//   const offsetWidth = link.offsetWidth;

//   // Set span position and size
//   navIndicator.style.left = `${offsetLeft}px`;
//   navIndicator.style.width = `${offsetWidth}px`;
// }

// // Add click event listeners to all links
// navLinks.forEach((link, index) => {
//   link.addEventListener('click', () => moveIndicator(link));

//   // Align the indicator to the first link on page load
//   if (index === 0) {
//     moveIndicator(link);
//   }
// });
// Get the cursor follower element
        // Get the cursor element and skills section
        const cursor = document.getElementById("cursor");
        const skillsSection = document.getElementById("projects");

        // Variable to track whether the mouse is over the skills section
        let isOverSkills = false;

        // Event listener for mouse movement
        document.addEventListener("mousemove", (event) => {
            const { clientX, clientY } = event;

            // Move the cursor with mouse position
            cursor.style.transform = `translate(${clientX}px, ${clientY}px)`;

            // If the mouse is over the skills section, expand cursor and show 'view'
            if (isOverSkills) {
                cursor.style.width = "60px";
                cursor.style.height = "60px";
                cursor.style.backgroundColor = "white";
                cursor.style.color  = "black";
                cursor.style.visibility = "visible";
                cursor.textContent = "VIEW";
                cursor.style.display = "flex";
                cursor.style.alignItems = "center";
                cursor.style.justifyContent = "center";
            } else {
                cursor.style.width = "15px";
                cursor.style.height = "15px";
                cursor.style.backgroundColor = "white";
                cursor.style.visibility = "visible";
                cursor.textContent = ""; // Remove text from the cursor
            }
        });

        // Detect mouse enter and leave on skills section
        skillsSection.addEventListener("mouseenter", () => {
            isOverSkills = true;
        });

        skillsSection.addEventListener("mouseleave", () => {
            isOverSkills = false;
        });








//  text rendering 
var clutter = new Array();
document.querySelector("#about-text>p").textContent.split(" ").forEach(function (dets) {
    clutter.push(`<span>${dets}</span>`); // Correct closing span tag
});
let sen =  clutter.join(" ");
document.querySelector("#about-text>p").innerHTML = sen; // Correct selector

// Apply GSAP animation
gsap.to("#about-text>p>span", {
    scrollTrigger: {
        trigger: `#about-text`, // Use parent container as trigger
        start: `top bottom`,
        end: `top top`,
        scroller: `#main`, // Ensure the scroller matches your locomotive-scroll configuration
        scrub: 5,
    },
    stagger: 0.2,
    color: `#fff`,
});







// div hover effect
document.querySelectorAll(".project").forEach(function (elem) {
    let rotate = 0;
    let diffrot = 0;
    let isMoving = false; // For throttling

    // Pre-select elements to avoid repeated queries
    const elemOverlay = elem.querySelector(".elem");
    const elemTitle = elem.querySelector("h1");

    // Mouse enter event to show the overlay immediately when cursor enters
    elem.addEventListener("mouseenter", function () {
        gsap.to(elemOverlay, {
            opacity: 1, // Make overlay visible when the mouse enters the div
            ease: Power2.easeOut,
        });

        gsap.to(elemTitle, {
            opacity: 0.3, // Make the title less visible when the overlay is shown
            ease: Power2.easeOut,
        });
    });

    // Mouse leave event to hide the overlay when the mouse leaves the div
    elem.addEventListener("mouseleave", function () {
        gsap.to(elemOverlay, {
            opacity: 0, // Hide overlay when the mouse leaves
            ease: Power2.easeOut,
        });

        gsap.to(elemTitle, {
            opacity: 1, // Make the title fully visible again
            ease: Power2.easeOut,
        });
    });

    // Mouse move event for dynamic hover effect, but not for showing the card
    elem.addEventListener("mousemove", function (event) {
        const rect = elem.getBoundingClientRect();
        const diff = event.clientY - rect.top;

        diffrot = event.clientX - rotate;
        rotate = event.clientX;

        // Update elemOverlay position and rotation dynamically as mouse moves
        gsap.to(elemOverlay, {
            top: diff,
            left: event.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
            ease: Power2.easeOut,
        });
    });
});











// Function to update the time
function updateTime() {
    const timing = document.getElementById('time');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0'); // Ensures 2-digit format
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Ensures 2-digit format
    const formattedTime = `${hours}:${minutes}`;
    timing.innerText = formattedTime;
}

// Call the function immediately to set the time
updateTime();

// Set an interval to update the time every 60 seconds
setInterval(updateTime, 60000); // 60000ms = 1 minute
