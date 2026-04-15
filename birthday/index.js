// Birthday Celebration Page
document.addEventListener('DOMContentLoaded', function() {
    initializeStats();
});


function initializeStats() {
    const ageElement = document.getElementById('age');
    const daysElement = document.getElementById('days');
    
    // Get current date and calculate values
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // You can customize these values
    const birthYear = currentYear - 25; // Example: 25 years old
    const age = currentYear - birthYear;
    const days = Math.floor(Math.random() * 9000) + 1000; // Random days celebrated
    
    // Animate counter to final values
    animateCounter(ageElement, 0, age, 1000);
    animateCounter(daysElement, 0, days, 1000);
}

function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

function celebrate() {
    createConfetti();
}

function createConfetti() {
    const colors = ['#d4af37', '#a78bfa', '#60a5fa', '#fff9e6', '#e5e7eb'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        const duration = Math.random() * 2000 + 2000;
        const xOffset = (Math.random() - 0.5) * 200;
        
        animateConfetti(confetti, duration, xOffset);
    }
}

function animateConfetti(element, duration, xOffset) {
    const startTime = Date.now();
    
    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;
        
        if (progress < 1) {
            element.style.top = (window.innerHeight * progress) + 'px';
            element.style.left = (parseInt(element.style.left) + xOffset * 0.01) + 'px';
            element.style.opacity = 1 - progress;
            requestAnimationFrame(animate);
        } else {
            element.remove();
        }
    };
    
    animate();
}
