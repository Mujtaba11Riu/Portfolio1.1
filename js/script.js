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
    
    if (!greenCells.length || !redCells.length) return () => {};
    
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

function typeText() {
    const typingElement = document.querySelector('.typing-text');
    const currentText = typingTexts[textIndex];

    // ===== HERO ANIMATION SWITCH =====
    // Hide all first
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
        // Clear previous animation if exists
        if (clearBinaryAnimation) {
            clearBinaryAnimation();
            clearBinaryAnimation = null;
        }
    }

    // Show specific animation based on text
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
            // Initialize and start binary matrix animation
            setTimeout(() => {
                initBinaryMatrix();
                clearBinaryAnimation = startBinaryAnimation();
            }, 100);
        }
    }
    // For "Cyber Security Specialist" and others, laptop will show

    // Typing logic
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50; // Faster deleting
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100; // Normal typing speed
    }
    
    // When text is complete, wait then start deleting
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 1500; // Wait 1.5 seconds before deleting
    } 
    // When text is deleted, move to next text
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingSpeed = 500; // Wait 0.5 seconds before typing next
    }
    
    setTimeout(typeText, typingSpeed);
}

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




// Add this to your existing script.js
function adjustHeroLayout() {
    const heroAnimation = document.querySelector('.hero-animation');
    const heroContent = document.querySelector('.hero-content');
    
    if (window.innerWidth <= 768) {
        // Mobile adjustments
        if (heroAnimation) {
            heroAnimation.style.margin = '0 auto 1rem auto';
            heroAnimation.style.width = '300px';
            heroAnimation.style.height = '200px';
        }
        
        // Reduce gap between name and typing text
        if (heroContent) {
            heroContent.style.gap = '0.5rem';
        }
    } else {
        // Desktop adjustments
        if (heroAnimation) {
            heroAnimation.style.margin = '0';
            heroAnimation.style.width = '320px';
            heroAnimation.style.height = '220px';
        }
    }
}

// Run on load and resize
window.addEventListener('DOMContentLoaded', adjustHeroLayout);
window.addEventListener('resize', adjustHeroLayout);