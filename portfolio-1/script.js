document.addEventListener('DOMContentLoaded', function() {
    // Set the correct icon on page load
    const savedTheme = localStorage.getItem('theme') || 'light';
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }

    // Form submission (if contact form exists)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit' , (e) => {
            e.preventDefault();
            alert('Message sent! (This is a demo - implement your own form handler)');
        });
    }
    
    // Initialize blob effect
    initBlobEffect();
});

function openResume() {
    // Replace 'path/to/your/resume.pdf' with the actual path to your PDF file
    const resumeUrl = 'assets/Resume(Sept-2025).pdf';
    
    // Open PDF in new tab
    window.open(resumeUrl, '_blank');
    
    // Alternative: If you want to force download instead of opening
    // const link = document.createElement('a');
    // link.href = resumeUrl;
    // link.download = 'Your_Name_Resume.pdf';
    // link.click();
}

// Theme Toggle
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    document.getElementById('theme-icon').textContent = newTheme === 'dark' ? '☀️' : '🌙';
    
    // Save theme to localStorage for persistence
    localStorage.setItem('theme', newTheme);
}
// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
    });
});

/* -- Blob Effect -- */
function initBlobEffect() {
    const blob = document.getElementById("blob");
    
    const random = (min, max) => Math.floor(min + Math.random() * (max - min));
    const randomFloat = (min, max) => min + Math.random() * (max - min);
    const remain = (n) => 100 - n;
    
    function startRotation() {
        blob.animate(
            [
                { rotate: '0deg' },
                { rotate: '360deg' }
            ],
            {
                duration: 20000,
                iterations: Infinity,
                easing: 'linear'
            }
        );
    }
    
    function generateBlobShape() {
        let offset = 25;
        let r = [];
        
        for (let i = 0; i < 4; i++) {
            let n = random(offset, remain(offset));
            r.push(n);
            r.push(remain(n));
        }
        
        let coordinates = `${r[0]}% ${r[1]}% ${r[2]}% ${r[3]}% / ${r[4]}% ${r[6]}% ${r[7]}% ${r[5]}%`;
        
        const randomScale = randomFloat(0.93, 1.07);
        
        const animation = blob.animate(
            { 
                borderRadius: coordinates,
                scale: randomScale.toString()
            },
            {
                duration: 2000,
                fill: "forwards",
                easing: "ease-in-out"
            }
        );
        
        animation.onfinish = generateBlobShape;
    }
    
    startRotation();
    generateBlobShape();
    
    window.onpointermove = event => {
        const { clientX, clientY } = event;
        
        blob.animate({
            left: `${clientX}px`,
            top: `${clientY}px`
        }, { 
            duration: 3000, 
            fill: "forwards",
            easing: "ease-out"
        });
    };
}
