document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded successfully!');
    
    // Header scroll effect
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            if (backToTop) backToTop.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            if (backToTop) backToTop.classList.remove('active');
        }
    });
    
    // Back to top button
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Dropdown toggles for warranty details
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');
    
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.parentElement;
            
            // Close all other dropdowns first
            document.querySelectorAll('.dropdown').forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('active');
                }
            });
            
            // Toggle the clicked dropdown
            dropdown.classList.toggle('active');
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Review slider functionality
    const reviews = document.querySelectorAll('.review');
    const dots = document.querySelectorAll('.dot');
    
    if (reviews.length > 0 && dots.length > 0) {
        let currentReview = 0;
        
        // Show only one review at a time
        function showReview(index) {
            reviews.forEach((review, i) => {
                review.classList.toggle('active', i === index);
            });
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        // Initialize first review
        showReview(currentReview);
        
        // Click event for dots
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                currentReview = i;
                showReview(currentReview);
            });
        });
        
        // Auto-rotate reviews
        setInterval(() => {
            currentReview = (currentReview + 1) % reviews.length;
            showReview(currentReview);
        }, 5000);
    }
    
    // Existing (optional) contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            if (!name || !name.value.trim()) {
                isValid = false;
                showError(name, 'Please enter your name');
            } else {
                removeError(name);
            }
            
            if (!email || !email.value.trim() || !isValidEmail(email.value)) {
                isValid = false;
                showError(email, 'Please enter a valid email address');
            } else {
                removeError(email);
            }
            
            if (!message || !message.value.trim()) {
                isValid = false;
                showError(message, 'Please enter your message');
            } else {
                removeError(message);
            }
            
            if (isValid) {
                alert('Thank you for your message. We will get back to you soon!');
                this.reset();
            }
        });
    }

    // Quote form validation (new)
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(quoteForm);
            const requiredFields = ['name','email','service','pickup','dropoff','date','time','passengers'];
            let isValid = true;

            requiredFields.forEach(field => {
                const fieldEl = quoteForm.querySelector(`[name="${field}"]`);
                if (!fieldEl || !String(formData.get(field)).trim()) {
                    isValid = false;
                    if (fieldEl) showError(fieldEl, 'Required');
                } else {
                    removeError(fieldEl);
                }
            });

            const emailEl = quoteForm.querySelector('[name="email"]');
            if (emailEl && !isValidEmail(emailEl.value)) {
                isValid = false;
                showError(emailEl, 'Please enter a valid email');
            }

            if (!isValid) return;

            alert('Thanks! Your enquiry has been received. We will respond shortly.');
            quoteForm.reset();
        });
    }
    
    // Helper function for email validation
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        
        let errorMessage = formGroup.querySelector('.error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            formGroup.appendChild(errorMessage);
        }
        
        errorMessage.textContent = message;
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
        
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    // Add a back to top button if it doesn't exist
    if (!backToTop) {
        const backToTopBtn = document.createElement('a');
        backToTopBtn.href = '#';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        document.body.appendChild(backToTopBtn);
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
    }

    function handleClick(service) {
        // Open popup when any card is clicked
        document.getElementById("contactPopup").style.display = "flex";
      }
      
      function closePopup() {
        document.getElementById("contactPopup").style.display = "none";
      }
      
      // Optional: Close popup if user clicks outside content
      window.onclick = function(event) {
        const popup = document.getElementById("contactPopup");
        if (event.target === popup) {
          popup.style.display = "none";
        }
      }
      
    
    // Add scroll animations to elements
    const animateElements = document.querySelectorAll('.plan, .address, .contact-info, .contact-form');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on initial load
}); 