// ===== NEURAL NETWORK BACKGROUND =====

const canvas = document.createElement('canvas');
canvas.id = 'neuralCanvas';
canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
`;
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const nodes = [];
const NODES_COUNT = 80;
const MAX_DISTANCE = 150;
const MOUSE = { x: null, y: null };

window.addEventListener('mousemove', e => {
    MOUSE.x = e.clientX;
    MOUSE.y = e.clientY;
});

window.addEventListener('mouseleave', () => {
    MOUSE.x = null;
    MOUSE.y = null;
});

for (let i = 0; i < NODES_COUNT; i++) {
    nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 2.5 + 1,
        pulse: Math.random() * Math.PI * 2,
    });
}

function drawNeural() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move nodes
    nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.02;

        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        // Mouse repulsion
        if (MOUSE.x !== null) {
            const dx = MOUSE.x - n.x;
            const dy = MOUSE.y - n.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
                n.x -= dx * 0.003;  // 0.01 → 0.003
                n.y -= dy * 0.003;  // 0.01 → 0.003
            }
        }
    });

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < MAX_DISTANCE) {
                const alpha = (1 - dist / MAX_DISTANCE) * 0.15;
                const gradient = ctx.createLinearGradient(
                    nodes[i].x, nodes[i].y,
                    nodes[j].x, nodes[j].y
                );
                gradient.addColorStop(0, `rgba(0, 255, 255, ${alpha})`);
                gradient.addColorStop(1, `rgba(0, 255, 136, ${alpha})`);

                ctx.beginPath();
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 0.8;
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            }
        }
    }

    // Draw nodes
    nodes.forEach(n => {
        const pulse = Math.sin(n.pulse) * 0.5 + 0.5;
        const r = n.radius + pulse * 1.5;

        // Glow
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
        glow.addColorStop(0, `rgba(0, 255, 255, ${0.1 * pulse})`);
        glow.addColorStop(1, 'rgba(0, 255, 255, 0)');
        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, ${0.3 + pulse * 0.2})`;
        ctx.fill();
    });



    requestAnimationFrame(drawNeural);
}

drawNeural();



// ===== NEURAL NETWORK ARROW CURSOR =====
const arrowSVG = `
<svg width="35" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
  <!-- Main arrow outline -->
  <polygon points="2,2 2,40 13,29 17,46 24,43 20,27 35,27"
           fill="none" stroke="#00ffff" stroke-width="1.2" stroke-linejoin="round" opacity="0.9"/>
  
  <!-- Internal lines -->
  <line x1="2" y1="2" x2="18" y2="24" stroke="#00ffff" stroke-width="0.7" opacity="0.6"/>
  <line x1="2" y1="2" x2="32" y2="24" stroke="#00ffff" stroke-width="0.7" opacity="0.5"/>
  <line x1="2" y1="18" x2="18" y2="24" stroke="#00ffff" stroke-width="0.6" opacity="0.5"/>
  <line x1="12" y1="26" x2="22" y2="18" stroke="#00ffff" stroke-width="0.6" opacity="0.4"/>
  <line x1="12" y1="18" x2="22" y2="24" stroke="#00ffff" stroke-width="0.6" opacity="0.4"/>
  <line x1="16" y1="40" x2="12" y2="26" stroke="#00ffff" stroke-width="0.7" opacity="0.5"/>
  <line x1="8" y1="12" x2="18" y2="16" stroke="#00ffff" stroke-width="0.5" opacity="0.4"/>

  <!-- Glowing dots -->
  <circle cx="2" cy="2" r="2.2" fill="#00ffff" opacity="1"/>
  <circle cx="2" cy="36" r="1.8" fill="#00ffff" opacity="0.9"/>
  <circle cx="32" cy="24" r="1.8" fill="#00ffff" opacity="0.9"/>
  <circle cx="12" cy="26" r="1.5" fill="#00ffff" opacity="0.8"/>
  <circle cx="16" cy="40" r="1.5" fill="#00ffff" opacity="0.8"/>
  <circle cx="22" cy="38" r="1.5" fill="#00ffff" opacity="0.8"/>
  <circle cx="18" cy="24" r="1.5" fill="#00ffff" opacity="0.8"/>
  <circle cx="2" cy="18" r="1.2" fill="#00ffff" opacity="0.7"/>
  <circle cx="12" cy="18" r="1.2" fill="#00ffff" opacity="0.7"/>
  <circle cx="22" cy="18" r="1.2" fill="#00ffff" opacity="0.6"/>
  <circle cx="8" cy="12" r="1" fill="#00ffff" opacity="0.6"/>
  <circle cx="18" cy="16" r="1" fill="#00ffff" opacity="0.5"/>
</svg>
`;

const cursorMain = document.createElement('div');
cursorMain.style.cssText = `
    position: fixed;
    width: 35px;
    height: 35px;
    pointer-events: none;
    z-index: 99999;
    filter: drop-shadow(0 0 4px #00ffff) drop-shadow(0 0 10px #00ffff88);
    transition: transform 0.1s ease;
`;
cursorMain.innerHTML = arrowSVG;
document.body.appendChild(cursorMain);

// Hide default cursor
document.body.style.cursor = 'none';
document.querySelectorAll('a, button, input, textarea').forEach(el => {
    el.style.cursor = 'none';
});

document.addEventListener('mousemove', (e) => {
    cursorMain.style.left = e.clientX + 'px';
    cursorMain.style.top = e.clientY + 'px';
});

// Click effect
document.addEventListener('mousedown', () => {
    cursorMain.style.filter = 'drop-shadow(0 0 12px #00ffff) drop-shadow(0 0 25px #00ffffff)';
    cursorMain.style.transform = 'scale(1.2)';
});

document.addEventListener('mouseup', () => {
    cursorMain.style.filter = 'drop-shadow(0 0 4px #00ffff) drop-shadow(0 0 10px #00ffff88)';
    cursorMain.style.transform = 'scale(1)';
});



// ===== TYPING ANIMATION =====
const typingTexts = [
    "Cyber Security Specialist",
    "Certified Ethical Hacker",
    "Certified Penetration Tester",
    "Web & App Security Tester",
    "Malware Analyst & Developer",
    "Security Researcher"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

// ===== HERO ANIMATION SWITCH =====
// Get all animation elements
const laptop = document.querySelector('.laptop');
const hackingSimulation = document.querySelector('.hacking-simulation');
const pentestSimulation = document.querySelector('.pentest-simulation');
const websecuritySimulation = document.querySelector('.websecurity-simulation');
const malwareSimulation = document.querySelector('.malware-simulation');
const researcherSimulation = document.querySelector('.researcher-simulation');

// Binary matrix animation variables
let clearBinaryAnimation = null;

// Create binary matrix animation function
function initBinaryMatrix() {
    const greenMatrix = document.getElementById('green-matrix');
    const redMatrix = document.getElementById('red-matrix');

    if (!greenMatrix || !redMatrix) return;

    // Clear existing cells
    greenMatrix.innerHTML = '';
    redMatrix.innerHTML = '';

    // Create 8x6 grid for both matrices (48 cells)
    for (let i = 0; i < 48; i++) {
        const greenCell = document.createElement('div');
        greenCell.className = 'binary-cell';
        greenCell.textContent = Math.random() > 0.5 ? '1' : '0';
        greenMatrix.appendChild(greenCell);

        const redCell = document.createElement('div');
        redCell.className = 'binary-cell';
        redCell.textContent = Math.random() > 0.5 ? '1' : '0';
        redMatrix.appendChild(redCell);
    }
}

// Binary falling animation
function startBinaryAnimation() {
    const greenCells = document.querySelectorAll('#green-matrix .binary-cell');
    const redCells = document.querySelectorAll('#red-matrix .binary-cell');
    const greenZeros = document.getElementById('green-zeros');
    const greenOnes = document.getElementById('green-ones');
    const redZeros = document.getElementById('red-zeros');
    const redOnes = document.getElementById('red-ones');
    const dataAnalyzed = document.getElementById('data-analyzed');
    const patternsFound = document.getElementById('patterns-found');
    const accuracyRate = document.getElementById('accuracy-rate');
    const iteration = document.getElementById('iteration');

    if (!greenCells.length || !redCells.length) return () => { };

    let iterationCount = 1;

    // Update counters
    function updateCounters() {
        let gZeros = 0, gOnes = 0, rZeros = 0, rOnes = 0;

        greenCells.forEach(cell => {
            if (cell.textContent === '0') gZeros++;
            else gOnes++;
        });

        redCells.forEach(cell => {
            if (cell.textContent === '0') rZeros++;
            else rOnes++;
        });

        if (greenZeros) greenZeros.textContent = gZeros;
        if (greenOnes) greenOnes.textContent = gOnes;
        if (redZeros) redZeros.textContent = rZeros;
        if (redOnes) redOnes.textContent = rOnes;

        // Update research stats
        if (dataAnalyzed) dataAnalyzed.textContent = (gZeros + gOnes + rZeros + rOnes) * 10;
        if (patternsFound) patternsFound.textContent = Math.floor((gOnes + rOnes) / 2);
        if (accuracyRate) {
            const accuracy = gOnes + gZeros > 0 ? Math.floor((gOnes / (gOnes + gZeros)) * 100) : 0;
            accuracyRate.textContent = Math.min(99, accuracy) + '%';
        }
        if (iteration) iteration.textContent = iterationCount;
    }

    // Random binary fall animation
    function randomBinaryFall() {
        // Random green cell falls
        if (greenCells.length > 0) {
            const randomGreenIndex = Math.floor(Math.random() * greenCells.length);
            const greenCell = greenCells[randomGreenIndex];

            greenCell.textContent = Math.random() > 0.5 ? '1' : '0';
            greenCell.classList.add('falling');

            setTimeout(() => {
                greenCell.classList.remove('falling');
            }, 1500);
        }

        // Random red cell falls
        if (redCells.length > 0) {
            const randomRedIndex = Math.floor(Math.random() * redCells.length);
            const redCell = redCells[randomRedIndex];

            redCell.textContent = Math.random() > 0.5 ? '1' : '0';
            redCell.classList.add('falling');

            setTimeout(() => {
                redCell.classList.remove('falling');
            }, 1500);
        }

        // Update counters
        updateCounters();
        iterationCount++;
    }

    // Initial update
    updateCounters();

    // Start animation interval
    const animationInterval = setInterval(randomBinaryFall, 300);

    // Return cleanup function
    return () => clearInterval(animationInterval);
}





let typingTimeout = null;
let isTypingActive = true;

function typeText() {
    if (!isTypingActive) {
        return;  // Stop ho gaya to kuch mat karo
    }

    const typingElement = document.querySelector('.typing-text');
    const currentText = typingTexts[textIndex];

    // ===== HERO ANIMATION SWITCH =====
    if (laptop) {
        laptop.style.display = "block";
        laptop.style.opacity = "1";
    }
    if (hackingSimulation) {
        hackingSimulation.style.display = "none";
        hackingSimulation.style.opacity = "0";
    }
    if (pentestSimulation) {
        pentestSimulation.style.display = "none";
        pentestSimulation.style.opacity = "0";
    }
    if (websecuritySimulation) {
        websecuritySimulation.style.display = "none";
        websecuritySimulation.style.opacity = "0";
    }
    if (malwareSimulation) {
        malwareSimulation.style.display = "none";
        malwareSimulation.style.opacity = "0";
    }
    if (researcherSimulation) {
        researcherSimulation.style.display = "none";
        researcherSimulation.style.opacity = "0";
        if (clearBinaryAnimation) {
            clearBinaryAnimation();
            clearBinaryAnimation = null;
        }
    }

    // Show specific animation
    if (currentText === "Certified Ethical Hacker") {
        if (laptop) laptop.style.display = "none";
        if (hackingSimulation) {
            hackingSimulation.style.display = "flex";
            hackingSimulation.style.opacity = "1";
        }
    }
    else if (currentText === "Certified Penetration Tester") {
        if (laptop) laptop.style.display = "none";
        if (pentestSimulation) {
            pentestSimulation.style.display = "flex";
            pentestSimulation.style.opacity = "1";
        }
    }
    else if (currentText === "Web & App Security Tester") {
        if (laptop) laptop.style.display = "none";
        if (websecuritySimulation) {
            websecuritySimulation.style.display = "flex";
            websecuritySimulation.style.opacity = "1";
        }
    }
    else if (currentText === "Malware Analyst & Developer") {
        if (laptop) laptop.style.display = "none";
        if (malwareSimulation) {
            malwareSimulation.style.display = "flex";
            malwareSimulation.style.opacity = "1";
        }
    }
    else if (currentText === "Security Researcher") {
        if (laptop) laptop.style.display = "none";
        if (researcherSimulation) {
            researcherSimulation.style.display = "flex";
            researcherSimulation.style.opacity = "1";
            setTimeout(() => {
                initBinaryMatrix();
                clearBinaryAnimation = startBinaryAnimation();
            }, 100);
        }
    }

    // Typing logic
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 1500;
    }
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingSpeed = 500;
    }

    // Schedule next update (SIRF YAHAN EK BAAR)
    typingTimeout = setTimeout(typeText, typingSpeed);
}




document.getElementById('stopAnimationBtn').addEventListener('click', function() {
    isTypingActive = false;
    if (typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
    }
    document.getElementById('stopAnimationBtn').style.display = 'none';
    document.getElementById('startAnimationBtn').style.display = 'inline-block';
});

document.getElementById('startAnimationBtn').addEventListener('click', function() {
    if (isTypingActive) return;
    isTypingActive = true;
    typeText();  // wahi se restart hoga
    document.getElementById('stopAnimationBtn').style.display = 'inline-block';
    document.getElementById('startAnimationBtn').style.display = 'none';
});











// Start typing animation when page loads
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeText, 1000);
});

// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== CONSOLE MESSAGE =====
console.log('%c🔐 Welcome to My Portfolio!', 'color: #00ffff; font-size: 20px; font-weight: bold;');
console.log('%cInterested in cybersecurity? Let\'s connect!', 'color: #00ff88; font-size: 14px;');




// ===== MOBILE MENU TOGGLE =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

// Close menu when clicking on a link
const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
mobileMenuItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});



// Certification 

const certs = [
    { icon: '<i class="fas fa-graduation-cap"></i>', title: 'ISC2 CC Certificate', org: 'International Information System Security Certification', link: 'https://drive.google.com/file/d/1wCopSt-Zlgdr4EK52JjaupXckk7ie_sD/view?usp=sharing' },
    { icon: '<i class="fas fa-user-secret"></i>', title: 'Ethical Hacking', org: 'Honhaar Jawan Govt of Pakistan', link: 'https://drive.google.com/file/d/1fVi3vTYo1pHmVq6Xc_uUkvQmUbEcBQ12/view' },
    { icon: '<i class="fas fa-bug"></i>', title: 'Penetration Testing', org: 'Honhaar Jawan Govt of Pakistan', link: 'https://drive.google.com/file/d/1pxkYXList-Lf57qNcz6zE0ovadEYeHTr/view' },
    { icon: '<i class="fas fa-lock"></i>', title: 'Cybersecurity Essentials', org: 'CISCO Networking Academy', link: 'https://drive.google.com/file/d/1DPIMXP7BSMk3Vs2GqCkChQtU8F4mKHZQ/view' },
    { icon: '<i class="fas fa-shield-halved"></i>', title: 'Intro to Cybersecurity', org: 'CISCO Networking Academy', link: 'https://drive.google.com/file/d/1crhaom0prvjiB4biEiWkrRwGMmNIamBh/view?usp=drive_link' },
    { icon: '<i class="fas fa-shield-halved"></i>', title: 'Network Defense', org: 'CISCO Networking Academy', link: 'https://drive.google.com/file/d/1bsf6q-_6HG8LmO2P-0cVyKRXxIGJIFrR/view?usp=drive_link' },
    { icon: '<i class="fas fa-laptop-code"></i>', title: 'Operating Systems Basics', org: 'CISCO Networking Academy', link: 'https://drive.google.com/file/d/1nA8qKdusNjkcWWZXvXKNrnj151oJaeaJ/view' },
    { icon: '<i class="fas fa-robot"></i>', title: 'Intro to IoT & Digital Transformation', org: 'CISCO Networking Academy', link: 'https://drive.google.com/file/d/1_NrR3LHNP9iKJDUHWtGnQb8QXe1iHbug/view?usp=drive_link' },
    { icon: '<i class="fas fa-computer"></i>', title: 'IT Essentials', org: 'CISCO - 6 Months', link: 'https://drive.google.com/file/d/1D6mTtJOWydDsCEhjdEHUa_Xxh_KXXzvC/view?usp=drive_link' },
    { icon: '<i class="fas fa-code"></i>', title: 'C++ Advanced', org: 'CISCO - 6 Months', link: 'https://drive.google.com/file/d/1Aqn6LuY_2b0fR4yRppmBQSgGUx2ufz2r/view' },
    { icon: '<i class="fas fa-code"></i>', title: 'C++ Essentials 1', org: 'CISCO - 6 Months', link: 'https://drive.google.com/file/d/1UiKR2RcBh92nJ2aHNTMwa0r5aLQ44EbC/view?usp=drive_link' },
    { icon: '<i class="fas fa-network-wired"></i>', title: 'Getting Started with Cisco Packet Tracer', org: '3 Months Course', link: 'https://drive.google.com/file/d/14Gd4TLKsTNhAk6MnJR85D0crvxzrErbY/view' },
    { icon: '<i class="fas fa-palette"></i>', title: 'UI/UX Design', org: '3 Months Course', link: 'https://drive.google.com/file/d/1kfux39i1Vm7_6d8h7hvtUuFZ_JmpRnyo/view?usp=drive_link' },
    { icon: '<i class="fas fa-desktop"></i>', title: 'Basic Computer Course', org: '6 Months Course', link: 'https://drive.google.com/file/d/1ZzCGwXO6Wvp_YHwU74ll0mG-L4neaKhw/view?usp=drive_link' }
];


const perPage = 6;
let current = 0;
const totalPages = Math.ceil(certs.length / perPage);

function render() {
    const grid = document.getElementById('certGrid');
    const dots = document.getElementById('certDots');
    const start = current * perPage;
    const slice = certs.slice(start, start + perPage);

    grid.innerHTML = slice.map(c => `
        <div class="cert-item">
            <span class="cert-icon">${c.icon}</span>
            <h4>${c.title}</h4>
            <p>${c.org}</p>
            <a href="${c.link}" target="_blank">View Certificate</a>
        </div>
    `).join('');

    dots.innerHTML = Array.from({ length: totalPages }, (_, i) =>
        `<div class="cert-dot ${i === current ? 'active' : ''}" onclick="goTo(${i})"></div>`
    ).join('');
}

function goTo(page) { current = page; render(); }

document.getElementById('nextBtn').onclick = () => {
    if (current < totalPages - 1) { current++; render(); }
};
document.getElementById('prevBtn').onclick = () => {
    if (current > 0) { current--; render(); }
};

render();





//projects 

const projects = [
    { title: 'Target Data Collector [DSA]', desc: 'C++ console tool using BST to collect and manage personal data of any target.', tags: ['Security', 'Programming', 'Tracking'], link: 'https://github.com/Mujtaba11Riu/DSA-Project-Target-Data-Collector' },
    { title: 'Malware / Virus MKPV [Assembly]', desc: 'First professional malware developed using Assembly Language as a learning project.', tags: ['Assembly', 'Development', 'Malware'], link: 'https://github.com/Mujtaba11Riu/3rd-Semester-End-Project-Of-Computer-Organization-and-Assembly-Language-' },
    { title: 'WiFi Deauther DDOS [DLD]', desc: 'Deauthentication simulation for academic demonstration and defensive research.', tags: ['DDOS', 'WiFi', 'Research'], link: 'https://github.com/Mujtaba11Riu/WiFi-Deauther-DLD-Project' },
    { title: 'Complete Documentation [Cybersecurity]', desc: 'BURP Suite documentation with practical exercises for hands-on learning.', tags: ['Linux Tool', 'Pentesting', 'Research'], link: 'https://github.com/Mujtaba11Riu/3rd-Semester-End-Project-Of-Cyber-Security' },
    { title: 'Encryption Decryption [C++]', desc: 'Lightweight C++ tool to encrypt and decrypt files with animations.', tags: ['C++', 'Development', 'Cryptography'], link: 'https://github.com/Mujtaba11Riu/Encryption-Decryption-' },
    { title: 'Meal Ordering System [Assembly]', desc: 'Assembly language structured meal ordering system.', tags: ['Assembly', 'Development', 'Console App'], link: 'https://github.com/Mujtaba11Riu/Assembly-Language-Project-' },
    { title: 'Meal Ordering System [Java]', desc: 'OOP project using core Java concepts for meal ordering.', tags: ['Java', 'OOP', 'Console App'], link: 'https://github.com/Mujtaba11Riu/Meal-Ordering-System-Java' },
    { title: 'Meal Ordering System [C++]', desc: 'Console-based ordering system with categories and billing.', tags: ['C++', 'Console', 'Programming'], link: 'https://github.com/Mujtaba11Riu/meal-ordering-system' },
    { title: 'Data Structure & Algorithm [DSA]', desc: 'Basic array operations and practice codes for indexing and traversal.', tags: ['C++', 'Algorithm', 'Development'], link: 'https://github.com/Mujtaba11Riu/DSA-Codes' },
    { title: 'Computer Network [Cisco Packet Tracer]', desc: 'Company System Network Design project report.', tags: ['Networking', 'Packet Tracer', 'Deployment'], link: 'https://github.com/Mujtaba11Riu/3rd-Semester-End-Project-Of-Computer-Network' },
    { title: 'First ICT Project', desc: 'Basic HTML/CSS project for documentation and structured programming practice.', tags: ['HTML', 'CSS', 'Web'], link: 'https://github.com/Mujtaba11Riu/First_ict_project_Riu' },
];

const projPerPage = 6;
let projCurrent = 0;
const projTotalPages = Math.ceil(projects.length / projPerPage);

function renderProjects() {
    const grid = document.getElementById('projGrid');
    const dots = document.getElementById('projDots');
    const start = projCurrent * projPerPage;
    const slice = projects.slice(start, start + projPerPage);

    grid.innerHTML = slice.map(p => `
        <div class="project-card">
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
            <div class="project-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
            <a href="${p.link}" target="_blank" class="cert-link" style="margin-top:auto; font-size:0.72rem; padding:0.2rem 0.6rem;">View on GitHub →</a>
        </div>
    `).join('');

    dots.innerHTML = Array.from({ length: projTotalPages }, (_, i) =>
        `<div class="cert-dot ${i === projCurrent ? 'active' : ''}" onclick="projGoTo(${i})"></div>`
    ).join('');
}

function projGoTo(page) { projCurrent = page; renderProjects(); }

document.getElementById('projNextBtn').onclick = () => {
    if (projCurrent < projTotalPages - 1) { projCurrent++; renderProjects(); }
};
document.getElementById('projPrevBtn').onclick = () => {
    if (projCurrent > 0) { projCurrent--; renderProjects(); }
};

renderProjects();






// Skill 

const experiences = [
    { icon: '<i class="fas fa-briefcase"></i>', title: 'DevSecOps Intern', org: 'PHI Consulting', duration: 'Currently Working', desc: 'Working on DevSecOps practices, security automation, and CI/CD pipelines.' },
    { icon: '<i class="fas fa-desktop"></i>', title: 'Data Entry Operator', org: 'Torcia Academy | 6th Road', duration: '1.5 Year', desc: 'Data management, record keeping, and administrative support.' },
    { icon: '<i class="fas fa-clipboard"></i>', title: 'Data Entry Operator', org: 'Ropani Foundation', duration: '8 Months', desc: 'Data processing and documentation management.' },
];
const expPerPage = 6;
let expCurrent = 0;
const expTotalPages = Math.ceil(experiences.length / expPerPage);
function renderExp() {
    const grid = document.getElementById('expGrid');
    const dots = document.getElementById('expDots');
    const start = expCurrent * expPerPage;
    const slice = experiences.slice(start, start + expPerPage);
    grid.innerHTML = slice.map(e => `
            <div class="project-card">
                <div style="font-size:1.8rem; margin-bottom:0.4rem;">${e.icon}</div>
                <h3>${e.title}</h3>
                <p style="color:#00ff88; font-size:0.72rem; margin-bottom:0.3rem;">${e.org}</p>
                <span style="background:rgba(0,255,255,0.2); padding:0.15rem 0.5rem; border-radius:10px; font-size:0.65rem; color:#00ffff; margin-bottom:0.5rem; display:inline-block;">${e.duration}</span>
                <p style="margin-bottom:0.8rem;">${e.desc}</p>
            </div>
        `).join('');
    dots.innerHTML = Array.from({ length: expTotalPages }, (_, i) =>
        `<div class="cert-dot ${i === expCurrent ? 'active' : ''}" onclick="expGoTo(${i})"></div>`
    ).join('');
}
function expGoTo(page) { expCurrent = page; renderExp(); }
document.getElementById('expNextBtn').onclick = () => { if (expCurrent < expTotalPages - 1) { expCurrent++; renderExp(); } };
document.getElementById('expPrevBtn').onclick = () => { if (expCurrent > 0) { expCurrent--; renderExp(); } };
renderExp();




// Achivements 

const achievements = [
            { icon: '<i class="fas fa-medal"></i>', title: 'CyberInfinity Riphah CTF 2025', desc: 'CTF Competition\nOrganized By Riphah International University.', link: 'https://linkedin.com/in/mujtaba-riu' },
            { icon: '<i class="fas fa-medal"></i>', title: 'Air CTF 2025 - Top 6 Finalist', desc: 'Competed against top universities\nincluding NUST, GIKI, COMSATS, UET, Bahria.', link: 'https://linkedin.com/in/mujtaba-riu' },
            { icon: '<i class="fas fa-award"></i>', title: "NaSCon'25 CTF Qualified Finalists", desc: 'FAST-NUCES Islamabad\nCTF Competition.', link: 'https://linkedin.com/in/mujtaba-riu' },
            { icon: '<i class="fas fa-trophy"></i>', title: 'PCC 2025 Qualifiers', desc: 'Web Exploitation, Cryptography,\nForensics & Reverse Engineering.', link: 'https://linkedin.com/in/mujtaba-riu' },
            { icon: '<i class="fas fa-medal"></i>', title: 'CUI TECH Fest CTF 2025', desc: 'Solved complicated CTFs.\nContinuous learning & improvement. 🚀', link: 'https://linkedin.com/in/mujtaba-riu' },
            { icon: '<i class="fas fa-chart-line"></i>', title: 'AirOverflow Wargames', desc: 'RE, Web Exploitation, Forensics,\nCryptography, AI & Miscellaneous.', link: 'https://linkedin.com/in/mujtaba-riu' },
            { icon: '<i class="fas fa-lock"></i>', title: 'TryHackMe Achievements', desc: 'Current Rank: 1,199,241\n2/98 Badges Earned.', link: 'https://tryhackme.com' },
        ];
        const achievePerPage = 6;
        let achieveCurrent = 0;
        const achieveTotalPages = Math.ceil(achievements.length / achievePerPage);
        function renderAchievements() {
            const grid = document.getElementById('achieveGrid');
            const dots = document.getElementById('achieveDots');
            const start = achieveCurrent * achievePerPage;
            const slice = achievements.slice(start, start + achievePerPage);
            grid.innerHTML = slice.map(a => `
            <div class="achievement-card">
                <div class="achievement-icon">${a.icon}</div>
                <h3 style="margin-bottom:0.6rem;">${a.title}</h3>
                <p style="white-space:pre-line; margin-bottom:0.8rem;">${a.desc}</p>
                <a href="${a.link}" target="_blank" class="cert-link" style="margin-top:auto;">View on LinkedIn →</a>
            </div>
        `).join('');
            dots.innerHTML = Array.from({ length: achieveTotalPages }, (_, i) =>
                `<div class="cert-dot ${i === achieveCurrent ? 'active' : ''}" onclick="achieveGoTo(${i})"></div>`
            ).join('');
        }
        function achieveGoTo(page) { achieveCurrent = page; renderAchievements(); }
        document.getElementById('achieveNextBtn').onclick = () => { if (achieveCurrent < achieveTotalPages - 1) { achieveCurrent++; renderAchievements(); } };
        document.getElementById('achievePrevBtn').onclick = () => { if (achieveCurrent > 0) { achieveCurrent--; renderAchievements(); } };
        renderAchievements();



//Skill 


 const skills = [
            { icon: '<i class="fas fa-user-secret"></i>', name: 'Penetration Testing', percent: 85 },
            { icon: '<i class="fas fa-shield-virus"></i>', name: 'Ethical Hacking', percent: 90 },
            { icon: '<i class="fas fa-globe"></i>', name: 'Network Security', percent: 80 },
            { icon: '<i class="fab fa-linux"></i>', name: 'Linux System Administration', percent: 75 },
            { icon: '<i class="fas fa-spider"></i>', name: 'Web Application Testing', percent: 85 },
            { icon: '<i class="fas fa-code"></i>', name: 'Programming (C++, Java, Python)', percent: 70 },
            { icon: '<i class="fas fa-bug"></i>', name: 'Bug Bounty Hunting', percent: 75 },
            { icon: '<i class="fas fa-flag"></i>', name: 'CTF Competitions', percent: 80 },
        ];

        const skillPerPage = 6;
        let skillCurrent = 0;
        const skillTotalPages = Math.ceil(skills.length / skillPerPage);

        function renderSkills() {
            const grid = document.getElementById('skillsGrid');
            const dots = document.getElementById('skillDots');
            const start = skillCurrent * skillPerPage;
            const slice = skills.slice(start, start + skillPerPage);

            grid.innerHTML = slice.map(s => `
        <div class="project-card">
            <div style="font-size:1.8rem; margin-bottom:0.5rem;">${s.icon}</div>
            <h3 style="margin-bottom:0.6rem;">${s.name}</h3>
            <div style="width:100%; height:6px; background:rgba(0,255,255,0.1); border-radius:10px; overflow:hidden; margin-bottom:0.3rem;">
                <div style="width:${s.percent}%; height:100%; background:linear-gradient(90deg,#00ffff,#00ff88); border-radius:10px; box-shadow:0 0 8px rgba(0,255,255,0.4);"></div>
            </div>
            <p style="color:#00ffff; font-size:0.72rem; text-align:right;">${s.percent}%</p>
        </div>
    `).join('');

            dots.innerHTML = Array.from({ length: skillTotalPages }, (_, i) =>
                `<div class="cert-dot ${i === skillCurrent ? 'active' : ''}" onclick="skillGoTo(${i})"></div>`
            ).join('');
        }

        function skillGoTo(page) { skillCurrent = page; renderSkills(); }

        document.getElementById('skillNextBtn').onclick = () => {
            if (skillCurrent < skillTotalPages - 1) { skillCurrent++; renderSkills(); }
        };
        document.getElementById('skillPrevBtn').onclick = () => {
            if (skillCurrent > 0) { skillCurrent--; renderSkills(); }
        };

        renderSkills();


 //Email


  emailjs.init("AndsvpB-Uk0sALIFx");

        function sendEmail() {
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;

            if (!name || !email || !message) {
                alert('Sab fields bharein!');
                return;
            }

            document.getElementById('sendBtn').innerText = 'Sending...';

            emailjs.send('service_h82udlq', 'template_hmztzpc', {
                from_name: name,
                from_email: email,
                message: message,
            }).then(() => {
                document.getElementById('sendBtn').innerText = 'Message Sent ✅';
                document.getElementById('contactName').value = '';
                document.getElementById('contactEmail').value = '';
                document.getElementById('contactMessage').value = '';
                setTimeout(() => {
                    document.getElementById('sendBtn').innerText = 'Send Message →';
                }, 3000);
            }).catch((err) => {
                console.error(err);
                document.getElementById('sendBtn').innerText = 'Failed ❌ Try Again';
                setTimeout(() => {
                    document.getElementById('sendBtn').innerText = 'Send Message →';
                }, 3000);
            });
        }
