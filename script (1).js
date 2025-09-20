// CBN Website Replica - JavaScript Functionality

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize Website Functions
function initializeWebsite() {
    setupNavigation();
    setupSearch();
    setupAnimations();
    setupVideoCards();
    setupCookieNotice();
    updateEconomicIndicators();
    setupResponsiveMenu();
}

// Navigation Setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to section if it exists
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Search Functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.querySelector('.search-box input');
    const query = searchInput.value.trim();
    
    if (query) {
        // Simulate search functionality
        alert(`Searching for: "${query}"\n\nThis is a demo search. In a real implementation, this would search the CBN database.`);
        searchInput.value = '';
    }
}

// Animation Setup
function setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe content sections
    const contentSections = document.querySelectorAll('.content-section, .video-card, .service-card');
    contentSections.forEach(section => {
        observer.observe(section);
    });
    
    // Animate economic indicators
    animateCounters();
}

// Counter Animation for Economic Indicators
function animateCounters() {
    const indicators = document.querySelectorAll('.indicator .value');
    
    indicators.forEach(indicator => {
        const finalValue = indicator.textContent;
        const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
        
        if (!isNaN(numericValue)) {
            animateCounter(indicator, 0, numericValue, finalValue, 2000);
        }
    });
}

function animateCounter(element, start, end, finalText, duration) {
    const startTime = performance.now();
    const isPercentage = finalText.includes('%');
    const isCurrency = finalText.includes('₦');
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (end - start) * easeOutQuart(progress);
        
        let displayValue;
        if (isCurrency) {
            displayValue = `₦${current.toFixed(1)}`;
        } else if (isPercentage) {
            displayValue = `${current.toFixed(2)}%`;
        } else {
            displayValue = current.toFixed(2);
        }
        
        element.textContent = displayValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = finalText;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Easing function
function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

// Video Cards Setup
function setupVideoCards() {
    const playButtons = document.querySelectorAll('.play-button');
    const watchButtons = document.querySelectorAll('.watch-btn');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoCard = this.closest('.video-card');
            const title = videoCard.querySelector('h4').textContent;
            
            // Simulate video play
            alert(`Playing video: "${title}"\n\nThis is a demo. In a real implementation, this would open the video player.`);
        });
    });
    
    watchButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const videoCard = this.closest('.video-card');
            const title = videoCard.querySelector('h4').textContent;
            
            // Simulate video watch
            alert(`Watching: "${title}"\n\nThis would redirect to the actual video on YouTube or CBN's video platform.`);
        });
    });
}

// Cookie Notice Setup
function setupCookieNotice() {
    const cookieNotice = document.getElementById('cookieNotice');
    
    // Check if user has already accepted cookies
    if (localStorage.getItem('cbnCookiesAccepted') === 'true') {
        cookieNotice.style.display = 'none';
    }
}

function acceptCookies() {
    const cookieNotice = document.getElementById('cookieNotice');
    localStorage.setItem('cbnCookiesAccepted', 'true');
    
    // Fade out animation
    cookieNotice.style.transition = 'opacity 0.5s ease-out';
    cookieNotice.style.opacity = '0';
    
    setTimeout(() => {
        cookieNotice.style.display = 'none';
    }, 500);
}

// Update Economic Indicators (simulate real-time data)
function updateEconomicIndicators() {
    // This would typically fetch real data from CBN API
    const indicators = [
        { selector: '.indicator:nth-child(1) .value', value: '27.5%' },
        { selector: '.indicator:nth-child(2) .value', value: '20.12%' },
        { selector: '.indicator:nth-child(3) .value', value: '₦1487.9' },
        { selector: '.indicator:nth-child(4) .value', value: '15.00%' }
    ];
    
    // Simulate periodic updates (every 30 seconds)
    setInterval(() => {
        indicators.forEach(indicator => {
            const element = document.querySelector(indicator.selector);
            if (element) {
                // Add a subtle flash effect to show update
                element.style.transition = 'background-color 0.3s ease';
                element.style.backgroundColor = 'rgba(255, 215, 0, 0.3)';
                
                setTimeout(() => {
                    element.style.backgroundColor = 'transparent';
                }, 300);
            }
        });
    }, 30000);
}

// Responsive Menu Setup
function setupResponsiveMenu() {
    // Create mobile menu toggle if screen is small
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }
    
    // Listen for window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            createMobileMenu();
        } else {
            removeMobileMenu();
        }
    });
}

function createMobileMenu() {
    const navigation = document.querySelector('.navigation');
    const navContainer = document.querySelector('.nav-container');
    
    // Check if mobile toggle already exists
    if (document.querySelector('.mobile-menu-toggle')) {
        return;
    }
    
    // Create mobile menu toggle
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-menu-toggle';
    mobileToggle.innerHTML = '☰';
    mobileToggle.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 10px;
        display: block;
    `;
    
    // Insert toggle button
    navContainer.insertBefore(mobileToggle, navContainer.firstChild);
    
    // Hide menu by default on mobile
    const navMenu = document.querySelector('.nav-menu');
    navMenu.style.display = 'none';
    
    // Toggle functionality
    mobileToggle.addEventListener('click', function() {
        if (navMenu.style.display === 'none') {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.backgroundColor = 'rgba(46, 139, 87, 0.95)';
            navMenu.style.padding = '20px';
            navMenu.style.zIndex = '1000';
            this.innerHTML = '✕';
        } else {
            navMenu.style.display = 'none';
            this.innerHTML = '☰';
        }
    });
}

function removeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.remove();
    }
    
    if (navMenu) {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'row';
        navMenu.style.position = 'static';
        navMenu.style.backgroundColor = 'transparent';
        navMenu.style.padding = '0';
    }
}

// Smooth Scrolling for Internal Links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Service Cards Interaction
function setupServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceName = this.querySelector('h4').textContent;
            
            // Simulate service access
            alert(`Accessing ${serviceName}\n\nThis is a demo. In a real implementation, this would redirect to the actual service.`);
        });
    });
}

// Content Section Links
function setupContentLinks() {
    const seeMoreLinks = document.querySelectorAll('.see-more');
    
    seeMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionTitle = this.closest('.content-section').querySelector('h3').textContent;
            
            // Simulate navigation to section
            alert(`Navigating to ${sectionTitle} section\n\nThis would show more items in this category.`);
        });
    });
}

// Initialize additional features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setupSmoothScrolling();
    setupServiceCards();
    setupContentLinks();
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

// Error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        acceptCookies,
        performSearch,
        animateCounter,
        easeOutQuart
    };
}