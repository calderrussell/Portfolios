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
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message sent! (This is a demo - implement your own form handler)');
        });
    }
});

function openResume() {
    // Replace 'path/to/your/resume.pdf' with the actual path to your PDF file
    const resumeUrl = 'assets/CaldersWebsiteResume.pdf';
    
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
    
    localStorage.setItem('theme', newTheme);
}

// Load saved theme
/* 
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
document.getElementById('theme-icon').textContent = savedTheme === 'dark' ? '☀️' : '🌙';
 */

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
    });
});