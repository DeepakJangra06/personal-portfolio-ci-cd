document.addEventListener("DOMContentLoaded", function () {
    // Ensure landing on Home when entering site without a hash
    try {
        if (!window.location.hash) {
            var homeSection = document.getElementById('home');
            if (homeSection && homeSection.scrollIntoView) {
                homeSection.scrollIntoView({ behavior: 'auto', block: 'start' });
            }
            if (window.history && window.history.replaceState) {
                window.history.replaceState(null, '', window.location.pathname + '#home');
            } else {
                window.location.hash = '#home';
            }
        }
    } catch (e) {
        // no-op
    }

    var typed = new window.Typed(".text", {
        strings: ["Frontend Developer", "Web Developer"],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animate progress bars when skills section comes into view
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress-line span');
                progressBars.forEach((bar, index) => {
                    setTimeout(() => {
                        // Get the parent element with class list
                        const parentElement = bar.parentElement;
                        const classList = parentElement.classList;
                        
                        let targetWidth = '0%';
                        
                        // Technical Skills
                        if (classList.contains('html')) targetWidth = '90%';
                        else if (classList.contains('css')) targetWidth = '85%';
                        else if (classList.contains('javascript')) targetWidth = '80%';
                        else if (classList.contains('java')) targetWidth = '70%';
                        else if (classList.contains('react')) targetWidth = '75%';
                        // Tools & Technologies
                        else if (classList.contains('git')) targetWidth = '85%';
                        else if (classList.contains('vscode')) targetWidth = '90%';
                        else if (classList.contains('jenkins')) targetWidth = '80%';
                        else if (classList.contains('firebase')) targetWidth = '70%';
                        
                        // Set the width to trigger animation
                        if (targetWidth !== '0%') {
                            bar.style.width = targetWidth;
                        }
                    }, index * 150);
                });
            } else {
                // Reset progress bars when section is out of view
                const progressBars = entry.target.querySelectorAll('.progress-line span');
                progressBars.forEach(bar => {
                    bar.style.width = '0%';
                });
            }
        });
    }, observerOptions);

    const skillsSection = document.getElementById('Skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values using IDs
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const subject = document.getElementById('contactSubject').value.trim();
            const message = document.getElementById('contactMessage').value.trim();
            
            // Validate required fields
            if (!name || !email || !message) {
                alert('Please fill in all required fields (Name, Email, and Message).');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Create mailto link with form data
            const subjectLine = subject ? subject : 'Contact Form Submission';
            const emailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message.replace(/\n/g, '%0D%0A')}`;
            const mailtoLink = `mailto:dpkjangra.011@gmail.com?subject=${encodeURIComponent(subjectLine)}&body=${emailBody}`;
            
            // Show success message
            alert('Thank you for your message! Opening your email client...');
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Reset form after a short delay
            setTimeout(() => {
                contactForm.reset();
            }, 1000);
        });
    }

    // Scroll to top functionality
    const scrollToTopBtn = document.querySelector('a[href="#"]:last-of-type');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Theme toggle functionality
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeKey = 'preferred-theme';

    // Function to apply theme
    const applyTheme = (isLight) => {
        if (isLight) {
            document.body.classList.add('light-theme');
            if (themeToggleBtn) themeToggleBtn.textContent = 'Dark Mode';
        } else {
            document.body.classList.remove('light-theme');
            if (themeToggleBtn) themeToggleBtn.textContent = 'Light Mode';
        }
    };

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem(themeKey);
    const isLightTheme = savedTheme === 'light';
    applyTheme(isLightTheme);

    // Theme toggle button click handler
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isCurrentlyLight = document.body.classList.contains('light-theme');
            const newTheme = !isCurrentlyLight ? 'light' : 'dark';
            applyTheme(!isCurrentlyLight);
            localStorage.setItem(themeKey, newTheme);
        });
    }

    // Update copyright year dynamically
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});