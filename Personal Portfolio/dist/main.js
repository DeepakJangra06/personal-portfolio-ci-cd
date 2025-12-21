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
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress-line span');
                progressBars.forEach((bar, index) => {
                    setTimeout(() => {
                        // Get the target width from the CSS class
                        const parentClass = bar.parentElement.className;
                        let targetWidth = '0%';
                        if (parentClass.includes('html')) targetWidth = '90%';
                        else if (parentClass.includes('css')) targetWidth = '85%';
                        else if (parentClass.includes('javascript')) targetWidth = '80%';
                        else if (parentClass.includes('java')) targetWidth = '70%';
                        else if (parentClass.includes('react')) targetWidth = '75%';
                        // Tools & Technologies
                        else if (parentClass.includes('git')) targetWidth = '85%';
                        else if (parentClass.includes('vscode')) targetWidth = '90%';
                        else if (parentClass.includes('jenkins')) targetWidth = '80%';
                        else if (parentClass.includes('firebase')) targetWidth = '70%';
                        
                        bar.style.width = targetWidth;
                    }, index * 200);
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
});