






// Typing effect for hero section
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

// Tab navigation (About section)
const tablinks = document.getElementsByClassName('tab-links');
const tabcontents = document.getElementsByClassName('tab-contents');
function opentab(tabname){
    for(let tablink of tablinks) tablink.classList.remove('active-link');
    for(let tabcontent of tabcontents) tabcontent.classList.remove('active-tab');
    event.currentTarget.classList.add('active-link');
    document.getElementById(tabname).classList.add('active-tab');
}


// ...other JS remains unchanged...

// Modern Navbar: Toggle for mobile
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
// ...other JS remains unchanged...

// Modern Chatbot FAB + Widget Logic
document.addEventListener("DOMContentLoaded", function () {
    const fab = document.getElementById('chatbot-fab');
    const frameWrapper = document.getElementById('chatbot-frame-wrapper');
    const closeBtn = document.getElementById('chatbot-close');
    if (fab && frameWrapper && closeBtn) {
        fab.addEventListener('click', function () {
            frameWrapper.style.display = 'flex';
            setTimeout(()=>{frameWrapper.style.opacity = 1;}, 20);
        });
        closeBtn.addEventListener('click', function () {
            frameWrapper.style.opacity = 0;
            setTimeout(()=>{frameWrapper.style.display = 'none';}, 220);
        });
        // Optional: close on Esc key
        document.addEventListener('keydown', function (e) {
            if (e.key === "Escape" && frameWrapper.style.display === 'flex') {
                frameWrapper.style.opacity = 0;
                setTimeout(()=>{frameWrapper.style.display = 'none';}, 220);
            }
        });
    }
});

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



// ... (previous code remains unchanged)

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

// ... (rest of your script.js code remains unchanged)


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