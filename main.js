/* ==========================================================================
   MAIN JAVASCRIPT - INTERACTIVE PORTFOLIO ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Sticky Navigation Header scroll effect --- */
    const header = document.getElementById('header');
    
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleHeaderScroll);
    // Initial check in case page is refreshed while scrolled down
    handleHeaderScroll();


    /* --- 2. Mobile Navigation Toggle --- */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const iconMenu = mobileToggle.querySelector('.icon-menu');
    const iconClose = mobileToggle.querySelector('.icon-close');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        navMenu.classList.toggle('active');
        iconMenu.classList.toggle('hidden');
        iconClose.classList.toggle('hidden');
        document.body.classList.toggle('overflow-hidden');
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });


    /* --- 3. Scroll Reveal Animations (Intersection Observer) --- */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserverOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after revealing to prevent repeated triggers
                observer.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(el => revealObserver.observe(el));


    /* --- 4. Navigation Link Active Highlight on Scroll --- */
    const sections = document.querySelectorAll('section[id]');
    
    const navObserverOptions = {
        threshold: 0.25,
        rootMargin: '-80px 0px -40% 0px'
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(sec => navObserver.observe(sec));


    /* --- 5. Skills Filtering Logic --- */
    const filterButtons = document.querySelectorAll('.btn-filter');
    const skillCards = document.querySelectorAll('.skill-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state on buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Card transitions
                card.style.opacity = '0';
                card.style.transform = 'scale(0.85) translateY(20px)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.classList.remove('hidden');
                        // Trigger reflow for transition
                        void card.offsetWidth;
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1) translateY(0)';
                    } else {
                        card.classList.add('hidden');
                    }
                }, 200);
            });
        });
    });


    /* --- 6. Gallery Lightbox Modal --- */
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxCaption = document.getElementById('lightbox-caption');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.gallery-img');
            const captionTitle = item.querySelector('.gallery-overlay-content h4').innerText;
            const captionDesc = item.querySelector('.gallery-overlay-content p').innerText;

            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.innerHTML = `<strong>${captionTitle}</strong> &mdash; ${captionDesc}`;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock background scrolling
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Unlock scrolling
    };

    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close on clicking overlay background
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });


    /* --- 7. Interactive Contact Form with Toast Alert --- */
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');
    const btnSubmit = contactForm.querySelector('.btn-submit');
    const btnSubmitText = btnSubmit.querySelector('span');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Trigger Loading State
        btnSubmit.disabled = true;
        btnSubmitText.textContent = 'Sending Message...';
        btnSubmit.style.opacity = '0.7';

        // 2. Simulate Network delay (1.2 seconds)
        setTimeout(() => {
            // Reset Button
            btnSubmit.disabled = false;
            btnSubmitText.textContent = 'Send Message';
            btnSubmit.style.opacity = '1';

            // Show Custom Styled Toast Notification
            toast.classList.add('active');
            
            // Clear input fields
            contactForm.reset();

            // Auto-hide toast after 4 seconds
            setTimeout(() => {
                toast.classList.remove('active');
            }, 4000);

        }, 1200);
    });
});
