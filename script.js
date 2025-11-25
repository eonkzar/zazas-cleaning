document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileBtn.classList.toggle('active'); // Optional: for hamburger animation
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileBtn.classList.remove('active');
        });
    });

    // Scroll Animations using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.section-title, .about-text, .about-image, .service-card, .values-list li');

    animatedElements.forEach(el => {
        el.classList.add('fade-in-up'); // Add base class
        el.style.opacity = '0'; // Ensure hidden initially
        observer.observe(el);
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
            navbar.style.padding = "0.5rem 0";
        } else {
            navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
            navbar.style.padding = "1rem 0";
        }
    });

    // Contact Form Handler (Formspree AJAX)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const form = e.target;
            const data = new FormData(form);
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    submitBtn.innerHTML = 'Message Sent!';
                    submitBtn.style.backgroundColor = '#4CAF50'; // Green success color
                    submitBtn.style.borderColor = '#4CAF50';
                    form.reset();
                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                        submitBtn.style.backgroundColor = ''; // Reset to default
                        submitBtn.style.borderColor = '';
                    }, 5000);
                } else {
                    const errorData = await response.json();
                    console.error('Formspree Error:', errorData);
                    submitBtn.innerHTML = 'Error. Try Again.';
                    submitBtn.style.backgroundColor = '#f44336'; // Red error color
                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                        submitBtn.style.backgroundColor = '';
                    }, 3000);
                }
            } catch (error) {
                console.error('Network Error:', error);
                submitBtn.innerHTML = 'Error. Try Again.';
                submitBtn.style.backgroundColor = '#f44336';
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }
        });
    }
});
