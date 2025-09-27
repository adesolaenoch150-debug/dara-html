// E-Shades Website - JavaScript Functionality

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize Website Functions
function initializeWebsite() {
    setupNavigation();
    setupScrollEffects();
    setupProductFilters();
    setupProductGallery();
    setupMobileMenu();
    setupAnimations();
    setupContactForm();
}

// Navigation Setup
function setupNavigation() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Handle scroll event for header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Handle navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // If it's a hash link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Smooth scroll to section
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navMenu = document.querySelector('.nav-menu');
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                    }
                }
            }
        });
    });
}

// Scroll Effects
function setupScrollEffects() {
    // Highlight active section in navigation
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    });
}

// Product Filters
function setupProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const productItems = document.querySelectorAll('.product-card');
    
    if (filterButtons.length && productItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter products
                productItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else if (item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Product Gallery
function setupProductGallery() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productName = this.querySelector('.product-name').textContent;
            const productPrice = this.querySelector('.price').textContent;
            
            // Here you would typically open a modal with product details
            // For this demo, we'll just show an alert
            alert(`You selected: ${productName} - ${productPrice}`);
        });
    });
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering the card click
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            
            // Here you would typically add the product to a cart
            // For this demo, we'll just show an alert
            alert(`Added to cart: ${productName} - ${productPrice}`);
        });
    });
}

// Mobile Menu
function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

// Animations
function setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.product-card, .about-image, .testimonial-card, .contact-form');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Contact Form
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const message = this.querySelector('textarea[name="message"]').value;
            
            // Validate form data
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For this demo, we'll just show an alert
            alert(`Thank you for your message, ${name}! We will get back to you soon.`);
            
            // Reset form
            this.reset();
        });
    }
}

// Newsletter Subscription
function setupNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            // Here you would typically send the email to a server
            // For this demo, we'll just show an alert
            alert(`Thank you for subscribing with ${email}!`);
            
            // Reset form
            this.reset();
        });
    }
}

// Initialize additional features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setupNewsletter();
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
const debouncedScrollHandler = debounce(function() {
    // Handle scroll events here if needed
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);