document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavbar();
    loadHomePage();
    initFooter();
    initScrollToTop();
    initAnimations();
});

// Navbar Component
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        
        navbar.innerHTML = `
            <nav class="navbar">
                <div class="navbar-container">
                    <a href="index.html" class="navbar-brand">
                        <svg class="navbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                            <line x1="6" y1="1" x2="6" y2="4"></line>
                            <line x1="10" y1="1" x2="10" y2="4"></line>
                            <line x1="14" y1="1" x2="14" y2="4"></line>
                        </svg>
                        <span class="navbar-brand-text">Brew Haven</span>
                    </a>

                    <button class="navbar-toggle" id="navbarToggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <div class="navbar-menu" id="navbarMenu">
                        <a href="Pages/home.html" class="navbar-link">Home</a>
                        <a href="Pages/menu.html" class="navbar-link">Menu</a>
                        <a href="Pages/reservations.html" class="navbar-link">Reservations</a>
                        <a href="Pages/about.html" class="navbar-link">About</a>
                        <a href="Pages/feedback.html" class="navbar-link">Feedback</a>
                    </div>

                    <a href="Pages/cart.html" class="navbar-cart">
                        <svg class="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        ${cartCount > 0 ? `<span class="cart-badge">${cartCount}</span>` : ''}
                    </a>
                </div>
            </nav>
        `;

        // Add mobile menu toggle
        const toggle = document.getElementById('navbarToggle');
        const menu = document.getElementById('navbarMenu');
        
        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                menu.classList.toggle('active');
                toggle.classList.toggle('active');
            });
        }
    };

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
}

// Load Home Page Content
function loadHomePage() {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    mainContent.innerHTML = `
        <section class="hero" style="background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('assets/cafe-hero.jpg');">
            <div class="hero-content">
                <p class="hero-tagline">Locally-Owned Coffee Shop</p>
                <h1 class="hero-title">Brewing Warmth & Great Coffee in Your Neighborhood</h1>
                <p class="hero-description">Once just a dream, now a vibrant community hub — <strong>Brew Haven</strong> is your neighborhood café bringing people together through <strong>community</strong>, <strong>quality</strong>, and <strong>exceptional coffee</strong>.</p>
                <div class="hero-buttons">
                    <button class="btn btn-primary" onclick="window.location.href='Pages/menu.html'">Order Ahead</button>
                    <button class="btn btn-secondary" onclick="window.location.href='Pages/about.html'">Learn More</button>
                </div>
                <p class="hero-hours">Open Daily 7am – 8pm</p>
            </div>
        </section>

        <section class="features">
            <div class="feature-card">
                <div class="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                        <line x1="6" y1="1" x2="6" y2="4"/>
                        <line x1="10" y1="1" x2="10" y2="4"/>
                        <line x1="14" y1="1" x2="14" y2="4"/>
                    </svg>
                </div>
                <h3>Premium Coffee</h3>
                <p>Ethically sourced beans from the world's finest farms</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                </div>
                <h3>Fresh Daily</h3>
                <p>Artisan pastries baked fresh every morning</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                </div>
                <h3>Made with Love</h3>
                <p>Every drink crafted with care and attention</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                </div>
                <h3>Community First</h3>
                <p>A welcoming space for everyone to connect</p>
            </div>
        </section>

        <section class="menu-section">
            <p class="section-tagline">Featured Special</p>
            <h2 class="section-title">Serving Up Something for Everyone</h2>
            <p class="section-description">From bold brews to sweet sips, every drink at Brew Haven is crafted with care and community in mind. Whether you're grabbing your go-to latte or trying something new, there's something on the menu to make everyone feel at home.</p>
            
            <div class="menu-cards">
                <div class="menu-card">
                    <img src="assets/coffee-1.jpg" alt="Signature Latte">
                    <div class="menu-card-content">
                        <div class="menu-badge">
                            <span class="material-symbols-outlined">workspace_premium</span>
                            Most Popular
                        </div>
                        <h3>Signature Latte</h3>
                        <p>Our strong latte with any available syrup</p>
                        <div class="menu-card-footer">
                            <span class="price">$5.00</span>
                            <span class="badge">100mg caffeine</span>
                        </div>
                    </div>
                </div>
                <div class="menu-card">
                    <img src="assets/pastry-1.jpg" alt="Artisan Pastries">
                    <div class="menu-card-content">
                        <div class="menu-badge">
                            <span class="material-symbols-outlined">bakery_dining</span>
                            Fresh Daily
                        </div>
                        <h3>Artisan Pastries</h3>
                        <p>Baked fresh every morning</p>
                        <div class="menu-card-footer">
                            <span class="price">Starting at $3.25</span>
                        </div>
                    </div>
                </div>
                <div class="menu-card">
                    <img src="assets/food-1.jpg" alt="Breakfast Specials">
                    <div class="menu-card-content">
                        <div class="menu-badge">
                            <span class="material-symbols-outlined">restaurant</span>
                            All Day
                        </div>
                        <h3>Breakfast Specials</h3>
                        <p>Hearty meals to fuel your day</p>
                        <div class="menu-card-footer">
                            <span class="price">Starting at $6.50</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <button class="btn btn-brown btn-center" onclick="window.location.href='Pages/menu.html'">Start a Pickup Order</button>
        </section>

        <section class="story-section">
            <img src="assets/barista-art.jpg" alt="Crafted with Passion" class="story-image">
            <div class="story-content">
                <h2>Crafted with Passion, Served with Heart</h2>
                <p>Every cup at Brew Haven is more than just coffee—it's an experience. Our skilled baristas take pride in creating the perfect brew, from expertly pulled espressos to beautifully crafted latte art.</p>
                <p>We believe that great coffee brings people together. That's why we source only the finest beans, roasted to perfection, and prepare each drink with meticulous care.</p>
                <button class="btn btn-outline" onclick="window.location.href='Pages/about.html'">Our Story</button>
            </div>
        </section>

        <section class="location-section">
            <div class="location-content">
                <h2>A Space to Connect & Unwind</h2>
                <p>Step into Brew Haven and feel right at home. Our warm, inviting atmosphere is perfect for catching up with friends, diving into a good book, or getting work done in a cozy environment.</p>
                <p>With comfortable seating, free WiFi, and the aroma of freshly brewed coffee filling the air, it's the ideal spot for any occasion.</p>
                <button class="btn btn-primary" onclick="window.location.href='Pages/reservations.html'">Reserve a Table</button>
            </div>
            <img src="assets/cafe-ambiance.jpg" alt="Cafe Interior" class="location-image">
        </section>

        <section class="product-section">
            <img src="assets/brewing-excellence.jpg" alt="Coffee Brewing" class="product-image">
            <div class="product-content">
                <h2>Grab a Bag of Our Best Brew!</h2>
                <p>Take a piece of Brew Haven home with you. Every 12oz bag of our signature roast fuels more than your morning—it powers quality, passion, and community.</p>
                <p class="product-detail">12 oz bag • 17-21 Servings</p>
                <p class="product-price">$14</p>
                <button class="btn btn-primary" onclick="window.location.href='Pages/menu.html'">Order Today</button>
            </div>
        </section>
    `;
    
    // Re-initialize animations for the loaded content
    setTimeout(() => initAnimations(), 100);
}

// Footer Component
function initFooter() {
    const footer = document.getElementById('footer');
    if (!footer) return;

    const currentYear = new Date().getFullYear();

    footer.innerHTML = `
        <footer class="footer">
            <div class="footer-container">
                <div class="footer-content">
                    <div class="footer-section">
                        <div class="footer-brand">
                            <svg class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                                <line x1="6" y1="1" x2="6" y2="4"></line>
                                <line x1="10" y1="1" x2="10" y2="4"></line>
                                <line x1="14" y1="1" x2="14" y2="4"></line>
                            </svg>
                            <span class="footer-brand-text">Brew Haven</span>
                        </div>
                        <p class="footer-description">
                            Your perfect cup of coffee, crafted with passion and served with love. 
                            Join our community today.
                        </p>
                        <div class="footer-social">
                            <a href="#" class="social-link" aria-label="Facebook">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </a>
                            <a href="#" class="social-link" aria-label="Instagram">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                            <a href="#" class="social-link" aria-label="Twitter">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                </svg>
                            </a>
                            <a href="#" class="social-link" aria-label="LinkedIn">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect x="2" y="9" width="4" height="12"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div class="footer-section">
                        <h3 class="footer-heading">Quick Links</h3>
                        <ul class="footer-links">
                            <li><a href="Pages/home.html">Home</a></li>
                            <li><a href="Pages/menu.html">Menu</a></li>
                            <li><a href="Pages/about.html">About Us</a></li>
                            <li><a href="Pages/reservations.html">Reservations</a></li>
                            <li><a href="Pages/feedback.html">Feedback</a></li>
                        </ul>
                    </div>

                    <div class="footer-section">
                        <h3 class="footer-heading">Contact Us</h3>
                        <ul class="footer-contact">
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                <span>123 Coffee Street, Brew City</span>
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                                <span>(555) 123-4567</span>
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                <span>hello@brewhaven.com</span>
                            </li>
                        </ul>
                    </div>

                    <div class="footer-section">
                        <h3 class="footer-heading">Opening Hours</h3>
                        <ul class="footer-hours">
                            <li>
                                <span>Monday - Friday</span>
                                <span>7:00 AM - 9:00 PM</span>
                            </li>
                            <li>
                                <span>Saturday</span>
                                <span>8:00 AM - 10:00 PM</span>
                            </li>
                            <li>
                                <span>Sunday</span>
                                <span>8:00 AM - 8:00 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="footer-bottom">
                    <p>&copy; ${currentYear} Brew Haven. All rights reserved.</p>
                    <div class="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <span>|</span>
                        <a href="#">Terms of Service</a>
                        <span>|</span>
                        <a href="#">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    `;
}

// Scroll to Top Component
function initScrollToTop() {
    const container = document.getElementById('scrollToTop');
    if (!container) return;

    const button = document.createElement('button');
    button.className = 'scroll-to-top-btn';
    button.setAttribute('aria-label', 'Scroll to top');
    button.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 15l-6-6-6 6"/>
        </svg>
    `;

    let isVisible = false;
    let ticking = false;

    const show = () => {
        if (!isVisible) {
            button.classList.add('visible');
            isVisible = true;
        }
    };

    const hide = () => {
        if (isVisible) {
            button.classList.remove('visible');
            isVisible = false;
        }
    };

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (scrollTop > 300) {
                    show();
                } else {
                    hide();
                }
                ticking = false;
            });
            ticking = true;
        }
    };

    const scrollToTop = () => {
        const start = window.pageYOffset;
        const startTime = performance.now();
        const duration = 600;

        const easeInOutCubic = (t) => {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };

        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easing = easeInOutCubic(progress);
            
            window.scrollTo(0, start * (1 - easing));

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    };

    button.addEventListener('click', scrollToTop);
    window.addEventListener('scroll', handleScroll, { passive: true });
    container.appendChild(button);
}

// Animation Observer
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.feature-card, .menu-card, .story-section, .location-section, .product-section');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });
}