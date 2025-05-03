// Combined and enhanced script.js with additional animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const animatedElements = document.querySelectorAll('.animate');
    const sectionTitles = document.querySelectorAll('.section-title');
    const courseCards = document.querySelectorAll('.course-card');
    const heroSection = document.querySelector('.hero');

    // Add animated-bg class to the hero section
    heroSection.classList.add('animated-bg');

    // Add scroll-down indicator to hero
    const scrollDownIndicator = document.createElement('div');
    scrollDownIndicator.className = 'scroll-down';
    scrollDownIndicator.innerHTML = `
        <div class="scroll-down-text">Scroll Down</div>
        <div class="scroll-down-arrow"></div>
    `;
    heroSection.appendChild(scrollDownIndicator);

    // Add shimmer effect to logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.classList.add('shimmer');
    }

    // Add 3D button effect to all buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.classList.add('btn-3d');
    });

    // Add loading animation to all section titles
    sectionTitles.forEach(title => {
        title.classList.add('loading-animation');
        title.classList.add('section-title-animated');
    });

    // Add floating animation to some elements
    const aboutImg = document.querySelector('.about-img');
    if (aboutImg) {
        aboutImg.classList.add('float-animation');
    }

    // Split hero heading text for letter animation
    const heroHeading = document.querySelector('.hero h1');
    if (heroHeading) {
        const text = heroHeading.textContent;
        let newText = '';

        // Split text and wrap each letter in a span
        for (let i = 0; i < text.length; i++) {
            newText += `<span style="animation-delay: ${i * 0.03}s">${text[i]}</span>`;
        }

        heroHeading.innerHTML = newText;
    }

    // Add "featured" class to random course cards
    const randomFeature = () => {
        const randomIndexes = new Set();
        while (randomIndexes.size < 3 && randomIndexes.size < courseCards.length) {
            randomIndexes.add(Math.floor(Math.random() * courseCards.length));
        }

        randomIndexes.forEach(index => {
            if (courseCards[index]) {
                courseCards[index].classList.add('featured');
            }
        });
    };
    randomFeature();

    // Sticky Header on Scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Check if animated elements are in view
        animateOnScroll();

        // Animate section titles on scroll
        sectionTitles.forEach(title => {
            if (isInViewport(title)) {
                title.classList.add('active');
            }
        });

        // Parallax effect for hero section
        const scrollPosition = window.pageYOffset;
        heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });

    // Mobile Menu Toggle
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll
    function animateOnScroll() {
        const triggerBottom = window.innerHeight * 0.85;

        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
                element.classList.add('in-view');
            }
        });
    }

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        return (
            rect.top <= windowHeight * 0.85 &&
            rect.bottom >= 0
        );
    }

    // Initial check for animations
    animateOnScroll();

    // Animate section titles initially visible
    sectionTitles.forEach(title => {
        if (isInViewport(title)) {
            title.classList.add('active');
        }
    });

    // Course Registration Button Event
    const registerButtons = document.querySelectorAll('.register-btn');
    registerButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Track registration click events (can be expanded with analytics)
            const courseName = this.closest('.course-card').querySelector('.course-title').textContent;
            console.log(`Registration clicked for: ${courseName}`);

            // Optional: Show a confirmation message
            // Uncomment to use:
            // alert(`Thank you for your interest in our ${courseName} internship! Redirecting to registration form...`);
        });
    });

    // Course card interactions
    courseCards.forEach(card => {
        // Enhanced hover effect
        card.addEventListener('mouseenter', function() {
            this.querySelector('.course-img').style.transform = 'scale(1.05)';
        });

        card.addEventListener('mouseleave', function() {
            this.querySelector('.course-img').style.transform = 'scale(1)';
        });

        // Add flipInY animation when card comes into view
        if (isInViewport(card)) {
            card.style.animation = 'flipInY 0.8s ease forwards';
        }
    });

    // Add intersection observer for better scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');

                // Add special animations based on data attributes
                if (entry.target.dataset.animation === 'flip') {
                    entry.target.style.animation = 'flipInY 0.8s ease forwards';
                }

                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all course cards
    courseCards.forEach(card => {
        observer.observe(card);
    });

    // Initialize current year in copyright
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.copyright p');
    if (copyrightElement) {
        copyrightElement.innerHTML = `&copy; ${currentYear} Devternship. All rights reserved.`;
    }

    // Optional: Form submission handling
    // Uncomment if you add a contact form
    /*
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const name = this.querySelector('[name="name"]').value;
            const email = this.querySelector('[name="email"]').value;
            const message = this.querySelector('[name="message"]').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Send form data (replace with your own endpoint)
            console.log('Form submitted:', { name, email, message });
            
            // Reset form
            this.reset();
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
        });
    }
    */
});

// Add preloader
window.addEventListener('load', function() {
    const body = document.body;

    // Create preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="spinner"></div>
        <p>Loading Devternship...</p>
    `;

    // Add preloader styles
    const preloaderStyle = document.createElement('style');
    preloaderStyle.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #4A2C8F;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 1;
            transition: opacity 0.5s ease;
        }
        .preloader.fade-out {
            opacity: 0;
        }
        .spinner {
            width: 60px;
            height: 60px;
            border: 5px solid rgba(255, 255, 255, 0.3);
            border-top-color: #9C27B0;
            border-radius: 50%;
            animation: spin 1s infinite linear;
        }
        .preloader p {
            color: white;
            margin-top: 20px;
            font-size: 18px;
            letter-spacing: 1px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    document.head.appendChild(preloaderStyle);
    body.prepend(preloader);

    // Remove preloader after page loads
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 800);
});