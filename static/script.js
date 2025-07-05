// Typing effect for hero section
// Rotates through different job titles with a typing animation
const typed_texts = [
    "an AI/ML Engineer.",
    "a Data Scientist.",
    "a Web Developer.",
    "a Problem Solver."
];
let typedIndex = 0, charIndex = 0, typing = true;
const typedSpan = document.querySelector('.typed');
function typeEffect() {
    if (typing) {
        if (charIndex < typed_texts[typedIndex].length) {
            typedSpan.textContent += typed_texts[typedIndex][charIndex++];
            setTimeout(typeEffect, 85);
        } else {
            typing = false;
            setTimeout(typeEffect, 1200);
        }
    } else {
        if (charIndex > 0) {
            typedSpan.textContent = typed_texts[typedIndex].substring(0, --charIndex);
            setTimeout(typeEffect, 30);
        } else {
            typing = true;
            typedIndex = (typedIndex + 1) % typed_texts.length;
            setTimeout(typeEffect, 420);
        }
    }
}
if (typedSpan) typeEffect();

// Tab navigation for About section
// Switches between tabs (e.g., Skills, Experience)
const tablinks = document.getElementsByClassName('tab-links');
const tabcontents = document.getElementsByClassName('tab-contents');
function opentab(tabname){
    for(let tablink of tablinks) tablink.classList.remove('active-link');
    for(let tabcontent of tabcontents) tabcontent.classList.remove('active-tab');
    event.currentTarget.classList.add('active-link');
    document.getElementById(tabname).classList.add('active-tab');
}

// Modern Navbar: Toggle for mobile
// Handles opening/closing the mobile menu and highlighting nav links
document.addEventListener("DOMContentLoaded", function () {
    const navbarToggle = document.getElementById('navbar-toggle');
    const sidemenu = document.getElementById('sidemenu');
    if (navbarToggle && sidemenu) {
        navbarToggle.addEventListener('click', () => {
            sidemenu.classList.add('open');
        });
        // Close menu on close icon or link click (mobile)
        sidemenu.addEventListener('click', function (e) {
            if (
                e.target.closest('.navbar-close-btn') ||
                (e.target.classList.contains('nav-link') && window.innerWidth <= 700)
            ) {
                sidemenu.classList.remove('open');
            }
        });
    }
    // Highlight current section in nav (optional scrollspy)
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', function () {
        let fromTop = window.scrollY + 80;
        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section && section.offsetTop <= fromTop && (section.offsetTop + section.offsetHeight) > fromTop) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
});

// --- Navbar Toggle ---
try {
    const navbarToggle = document.getElementById('navbar-toggle');
    const sidemenu = document.getElementById('sidemenu');
    if (navbarToggle && sidemenu) {
        navbarToggle.addEventListener('click', () => {
            sidemenu.classList.add('open');
        });
        sidemenu.addEventListener('click', function (e) {
            if (
                e.target.closest('.navbar-close-btn') ||
                (e.target.classList.contains('nav-link') && window.innerWidth <= 700)
            ) {
                sidemenu.classList.remove('open');
            }
        });
    }
} catch (err) {
    console.error("Navbar logic error:", err);
}

// --- Services Slider ---
try {
    const slider = document.getElementById('services-slider');
    const leftBtn = document.getElementById('services-left');
    const rightBtn = document.getElementById('services-right');
    let scrollStep = window.innerWidth <= 600 ? 220 : 340;
    function updateScrollStep() {
        scrollStep = window.innerWidth <= 600 ? 220 : 340;
    }
    if (slider && leftBtn && rightBtn) {
        window.addEventListener('resize', updateScrollStep);
        leftBtn.addEventListener('click', function() {
            slider.scrollBy({left: -scrollStep, behavior: 'smooth'});
        });
        rightBtn.addEventListener('click', function() {
            slider.scrollBy({left: scrollStep, behavior: 'smooth'});
        });
        function updateArrows() {
            leftBtn.style.opacity = slider.scrollLeft <= 0 ? "0.3" : "1";
            rightBtn.style.opacity = (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 5) ? "0.3" : "1";
        }
        slider.addEventListener('scroll', updateArrows);
        setTimeout(updateArrows, 120);
    }
} catch (err) {
    console.error("Services slider logic error:", err);
}

// --- Portfolio Overlay Clickable ---
try {
    document.querySelectorAll('.portfolio-item').forEach(item => {
        const link = item.querySelector('.portfolio-overlay a');
        if (link && link.href && link.href !== "#") {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                window.open(link.href, '_blank');
            });
        }
    });
} catch (err) {
    console.error("Portfolio overlay logic error:", err);
}

// --- Footer Year ---
try {
    const yearSpan = document.getElementById("year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
} catch (err) {
    console.error("Footer year logic error:", err);
}

// --- Contact Form Validation & EmailJS ---
try {
    const form = document.getElementById("contactForm");
    if (form) {
        const fields = {
            name: document.getElementById("name"),
            email: document.getElementById("email"),
            subject: document.getElementById("subject"),
            message: document.getElementById("message")
        };
        const errors = {
            name: document.getElementById("error-name"),
            email: document.getElementById("error-email"),
            subject: document.getElementById("error-subject"),
            message: document.getElementById("error-message")
        };
        const submitBtn = document.getElementById("submitBtn");
        const submitText = document.getElementById("submitText");
        const submitSpinner = document.getElementById("submitSpinner");
        const formStatus = document.getElementById("formStatus");
        const successMessage = document.getElementById("successMessage");

        function validEmail(value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
        }
        function validateField(field) {
            let value = fields[field].value.trim();
            let error = "";
            if (value === "") error = "Required.";
            else if (field === "email" && !validEmail(value)) error = "Invalid email format.";
            else if (field === "name" && value.length < 2) error = "Name too short.";
            else if (field === "subject" && value.length < 3) error = "Subject too short.";
            else if (field === "message" && value.length < 10) error = "Message too short.";
            errors[field].textContent = error;
            return error === "";
        }
        Object.keys(fields).forEach(field => {
            fields[field].addEventListener("input", () => validateField(field));
            fields[field].addEventListener("blur", () => validateField(field));
        });
        if (window.emailjs) emailjs.init("qfm15fP7kAwGRCLID");
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            let isValid = true;
            Object.keys(fields).forEach(field => {
                if (!validateField(field)) isValid = false;
            });
            if (!isValid) {
                formStatus.textContent = "Fix errors above.";
                return;
            }
            formStatus.textContent = "";
            submitText.style.display = "none";
            submitSpinner.style.display = "inline-block";
            submitBtn.disabled = true;
            emailjs.sendForm("service_8ivk16p", "template_yja8nnz", form)
            .then(function () {
                successMessage.style.display = "block";
                form.reset();
                submitText.style.display = "inline";
                submitSpinner.style.display = "none";
                submitBtn.disabled = false;
                Object.values(errors).forEach(e => e.textContent = "");
                formStatus.textContent = "";
                setTimeout(() => { successMessage.style.display = "none"; }, 5000);
            }, function (error) {
                console.error("EmailJS error:", error);
                formStatus.textContent = "Failed to send. Try again later.";
                submitText.style.display = "inline";
                submitSpinner.style.display = "none";
                submitBtn.disabled = false;
            });
        });
    }
} catch (err) {
    console.error("Contact form logic error:", err);
}

// About Me Modern Tabs
function openAboutTab(evt, tabId) {
    // Hide all
    document.querySelectorAll('.about-modern-tab-content').forEach(e => e.classList.remove('active'));
    document.querySelectorAll('.about-tab-link').forEach(e => e.classList.remove('active'));
    // Show selected
    document.getElementById(tabId).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// Side menu open/close
let sidemenu = document.getElementById('sidemenu');
function openmenu() { sidemenu.style.right = "0"; }
function closemenu() { sidemenu.style.right = "-210px"; }

// Services slider
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById('services-slider');
    const leftBtn = document.getElementById('services-left');
    const rightBtn = document.getElementById('services-right');
    let scrollAmount = 0;
    let scrollStep = 340;

    function updateScrollStep() {
        if(window.innerWidth <= 600) scrollStep = 220;
        else scrollStep = 340;
    }
    updateScrollStep();
    window.addEventListener('resize', updateScrollStep);

    leftBtn.addEventListener('click', function() {
        slider.scrollBy({left: -scrollStep, behavior: 'smooth'});
    });
    rightBtn.addEventListener('click', function() {
        slider.scrollBy({left: scrollStep, behavior: 'smooth'});
    });
    // Optional: hide/show arrows if can't scroll
    function updateArrows() {
        if (slider.scrollLeft <= 0) leftBtn.style.opacity = "0.3";
        else leftBtn.style.opacity = "1";
        if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 5) rightBtn.style.opacity = "0.3";
        else rightBtn.style.opacity = "1";
    }
    slider.addEventListener('scroll', updateArrows);
    setTimeout(updateArrows, 120);
});

// Portfolio grid: make overlay clickable everywhere
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.portfolio-item').forEach(item => {
        const link = item.querySelector('.portfolio-overlay a');
        if (link && link.href && link.href !== "#") {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                window.open(link.href, '_blank');
            });
        }
    });
});

// MLOps Pipeline Scroll Animation
document.addEventListener("DOMContentLoaded", function () {
    // Animate the dot when the pipeline is in view
    const section = document.getElementById('mlops-pipeline');
    const dot = document.getElementById('mlops-flow-dot');
    let pipelinePlayed = false;
    function triggerPipelineAnimation() {
        if (!section || !dot || pipelinePlayed) return;
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7 && rect.bottom > 0) {
            dot.classList.remove('active');
            // Restart animation by forcing reflow
            void dot.offsetWidth;
            dot.classList.add('active');
            pipelinePlayed = true;
            setTimeout(() => { pipelinePlayed = false; }, 8000); // allow replay after a delay
        }
    }
    window.addEventListener('scroll', triggerPipelineAnimation, { passive: true });
    // Optionally: replay animation when the section comes back into view
});

// Sophisticated contact form validation & enhanced UX
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const fields = {
        name: document.getElementById("name"),
        email: document.getElementById("email"),
        subject: document.getElementById("subject"),
        message: document.getElementById("message")
    };
    const errors = {
        name: document.getElementById("error-name"),
        email: document.getElementById("error-email"),
        subject: document.getElementById("error-subject"),
        message: document.getElementById("error-message")
    };
    const submitBtn = document.getElementById("submitBtn");
    const submitText = document.getElementById("submitText");
    const submitSpinner = document.getElementById("submitSpinner");
    const formStatus = document.getElementById("formStatus");
    const successMessage = document.getElementById("successMessage");

    // Helper: email validation
    function validEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    }

    // Validate fields live
    function validateField(field) {
        let value = fields[field].value.trim();
        let error = "";
        if (value === "") error = "Required.";
        else if (field === "email" && !validEmail(value)) error = "Invalid email format.";
        else if (field === "name" && value.length < 2) error = "Name too short.";
        else if (field === "subject" && value.length < 3) error = "Subject too short.";
        else if (field === "message" && value.length < 10) error = "Message too short.";
        errors[field].textContent = error;
        return error === "";
    }

    Object.keys(fields).forEach(field => {
        fields[field].addEventListener("input", () => validateField(field));
        fields[field].addEventListener("blur", () => validateField(field));
    });

    // EmailJS initialization
    if (window.emailjs) emailjs.init("qfm15fP7kAwGRCLID");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let isValid = true;
        Object.keys(fields).forEach(field => {
            if (!validateField(field)) isValid = false;
        });
        if (!isValid) {
            formStatus.textContent = "Fix errors above.";
            return;
        }
        formStatus.textContent = "";
        submitText.style.display = "none";
        submitSpinner.style.display = "inline-block";
        submitBtn.disabled = true;

        emailjs.sendForm("service_8ivk16p", "template_yja8nnz", form)
        .then(function () {
            successMessage.style.display = "block";
            form.reset();
            submitText.style.display = "inline";
            submitSpinner.style.display = "none";
            submitBtn.disabled = false;
            Object.values(errors).forEach(e => e.textContent = "");
            formStatus.textContent = "";
            setTimeout(() => { successMessage.style.display = "none"; }, 5000);
        }, function (error) {
            console.error("EmailJS error:", error);
            formStatus.textContent = "Failed to send. Try again later.";
            submitText.style.display = "inline";
            submitSpinner.style.display = "none";
            submitBtn.disabled = false;
        });
    });
});

// Footer year auto update
document.addEventListener("DOMContentLoaded", function () {
    const yearSpan = document.getElementById("year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});

// Footer: update year
document.addEventListener("DOMContentLoaded", function () {
    const yearSpan = document.getElementById("year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});

// Professional Dialogflow Messenger Initialization & Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const dfMessenger = document.querySelector('df-messenger');
    
    if (dfMessenger) {
        // Professional loading animation
        dfMessenger.style.opacity = '0';
        dfMessenger.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            dfMessenger.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            dfMessenger.style.opacity = '1';
            dfMessenger.style.transform = 'translateY(0)';
            
            if (dfMessenger.shadowRoot) {
                console.log('✅ Professional Dialogflow widget loaded successfully');
                initializeProfessionalFeatures(dfMessenger);
            } else {
                console.log('⏳ Dialogflow widget initializing...');
            }
        }, 1000);
    }
    
    // Professional features initialization
    function initializeProfessionalFeatures(widget) {
        // Add professional welcome message
        setTimeout(() => {
            const welcomeEvent = new CustomEvent('df-messenger-loaded', {
                detail: {
                    message: "👋 Welcome! I'm your AI assistant. How can I help you today?",
                    type: 'welcome'
                }
            });
            widget.dispatchEvent(welcomeEvent);
        }, 1500);
        
        // Add professional interaction tracking
        widget.addEventListener('df-messenger-user-input', function(e) {
            console.log('User interaction detected:', e.detail);
            // You can add analytics tracking here
        });
        
        // Add professional response handling
        widget.addEventListener('df-messenger-response', function(e) {
            console.log('Bot response:', e.detail);
            // Add professional response animations
            addResponseAnimation(widget);
        });
    }
    
    // Professional response animation
    function addResponseAnimation(widget) {
        const messages = widget.shadowRoot?.querySelectorAll('.message');
        if (messages && messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            lastMessage.style.animation = 'messageSlideIn 0.3s ease-out';
        }
    }
    
    // Professional error handling
    window.addEventListener('error', function(e) {
        if (e.message.includes('df-messenger')) {
            console.warn('Dialogflow widget error detected, attempting recovery...');
            setTimeout(() => {
                const dfMessenger = document.querySelector('df-messenger');
                if (dfMessenger) {
                    dfMessenger.style.display = 'block';
                    dfMessenger.style.visibility = 'visible';
                }
            }, 2000);
        }
    });
    
    // Professional mobile optimization
    if (window.innerWidth <= 768) {
        const dfMessenger = document.querySelector('df-messenger');
        if (dfMessenger) {
            dfMessenger.style.width = '320px';
            dfMessenger.style.height = '450px';
            dfMessenger.style.bottom = '15px';
            dfMessenger.style.right = '15px';
        }
    }
});

// Professional analytics tracking (optional)
function trackChatbotInteraction(action, data) {
    // You can integrate with Google Analytics, Mixpanel, etc.
    if (typeof gtag !== 'undefined') {
        gtag('event', 'chatbot_interaction', {
            'event_category': 'engagement',
            'event_label': action,
            'value': data
        });
    }
}

// Professional status indicator management
document.addEventListener('DOMContentLoaded', function() {
    const statusIndicator = document.getElementById('chatbot-status');
    const statusDot = statusIndicator?.querySelector('.status-dot');
    const statusText = statusIndicator?.querySelector('.status-text');
    
    if (statusIndicator) {
        // Update status based on chatbot state
        function updateStatus(status, color = '#00ff88') {
            if (statusDot) statusDot.style.background = color;
            if (statusText) {
                switch(status) {
                    case 'online':
                        statusText.textContent = 'AI Assistant Online';
                        break;
                    case 'typing':
                        statusText.textContent = 'AI Assistant Typing...';
                        break;
                    case 'offline':
                        statusText.textContent = 'AI Assistant Offline';
                        break;
                    case 'error':
                        statusText.textContent = 'Connection Error';
                        break;
                }
            }
        }
        
        // Professional status updates
        setTimeout(() => updateStatus('online'), 3000);
        
        // Hide status indicator when chatbot is opened
        const dfMessenger = document.querySelector('df-messenger');
        if (dfMessenger) {
            dfMessenger.addEventListener('click', () => {
                statusIndicator.style.opacity = '0';
                statusIndicator.style.transform = 'translateY(20px)';
            });
        }
        
        // Show status indicator when chatbot is closed
        document.addEventListener('click', (e) => {
            if (!e.target.closest('df-messenger')) {
                setTimeout(() => {
                    statusIndicator.style.opacity = '1';
                    statusIndicator.style.transform = 'translateY(0)';
                }, 1000);
            }
        });
    }
});

// Professional performance optimization
window.addEventListener('load', function() {
    // Lazy load chatbot resources
    const dfMessenger = document.querySelector('df-messenger');
    if (dfMessenger && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Chatbot is visible, ensure it's fully loaded
                    dfMessenger.style.opacity = '1';
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(dfMessenger);
    }
});

// Hide chatbot tooltip when chat icon is clicked
document.addEventListener('DOMContentLoaded', function() {
    var tooltip = document.getElementById('chatbot-tooltip');
    var dfMessenger = document.querySelector('df-messenger');
    if (tooltip && dfMessenger) {
        // Listen for click on the chat icon (button inside shadowRoot)
        const tryAttach = () => {
            const shadow = dfMessenger.shadowRoot;
            if (!shadow) {
                setTimeout(tryAttach, 300);
                return;
            }
            const fab = shadow.querySelector('df-messenger-chat-open-icon, .chat-open-icon, button');
            if (fab) {
                fab.addEventListener('click', function() {
                    tooltip.style.opacity = '0';
                    setTimeout(() => { tooltip.style.display = 'none'; }, 350);
                }, { once: true });
            } else {
                // Try again if not found yet
                setTimeout(tryAttach, 300);
            }
        };
        tryAttach();
    }
});