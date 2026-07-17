

// ===============================
// Header Background on Scroll
// ===============================
const header = document.querySelector("header");
if (header) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.background = "rgba(0,0,0,.85)";
            header.style.backdropFilter = "blur(18px)";
        } else {
            header.style.background = "rgba(255,255,255,.05)";
            header.style.backdropFilter = "blur(10px)";
        }
    });
}

// ===============================
// Scroll Reveal Animation (AOS alternative or manual)
// ===============================
const revealItems = document.querySelectorAll(".heroText, .heroImage, .about, .card, .contact");
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, {
    threshold: 0.1
});
            
revealItems.forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(40px)";
    item.style.transition = ".8s ease-out";
    observer.observe(item);
});

// ===============================
// Back To Top Button
// ===============================
const topBtn = document.createElement("button");
topBtn.innerHTML = "↑";
topBtn.id = "topBtn";
document.body.appendChild(topBtn);

topBtn.style.cssText = `
position:fixed;
bottom:30px;
right:35px;
width:50px;
height:50px;
border:none;
border-radius:50%;
background:#fff;
color:#000;
font-size:22px;
cursor:pointer;
display:none;
box-shadow:0 0 15px rgba(255,255,255,.25);
z-index:999;
transition:.3s;
`;

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ===============================
// Typing Effect
// ===============================
const texts = [
    "Businessman",
    "Photographer",
    "Entrepreneur"
];
let textIndex = 0;
let charIndex = 0;
const typingSpan = document.getElementById("typing");

function typeEffect() {
    if (!typingSpan) return;
    
    if (charIndex < texts[textIndex].length) {
        typingSpan.innerHTML += texts[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 100);
    } else {
        setTimeout(eraseEffect, 1500);
    }
}

function eraseEffect() {
    if (charIndex > 0) {
        typingSpan.innerHTML = texts[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseEffect, 50);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeEffect, 300);
    }
}

if (typingSpan) {
    typeEffect();
}

// ===============================
// Gallery Lightbox
// ===============================
const galleryImages = document.querySelectorAll(".project-card img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close");

if (galleryImages.length && lightbox && lightboxImg && closeBtn) {
    galleryImages.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt || "";
        });
    });

    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
}

// ===============================
// EmailJS Form Integration
// ===============================
if (typeof emailjs !== "undefined") {
    emailjs.init("NJ3L7oc4K72PMYC0e");
}

const contactForm = document.getElementById("contact-form");
const statusDiv = document.getElementById("status");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (statusDiv) statusDiv.innerHTML = "Sending...";

        emailjs.send(
            "service_0c4p277",
            "template_prx0bjq",
            {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value
            }
        )
        .then(() => {
            if (statusDiv) statusDiv.innerHTML = "✅ Message Sent Successfully!";
            contactForm.reset();
        })
        .catch((error) => {
            console.error("EmailJS Error:", error);
            if (statusDiv) statusDiv.innerHTML = "❌ Failed to send message.";
        });
    });
}

// ===============================
// AOS & Preloader Initialization
// ===============================
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 600);
    }
    
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 120
        });
    }
});

// ===============================
// Skills Dynamic Width Animation
// ===============================
const skillSection = document.querySelector("#skills");
const progressBars = document.querySelectorAll(".progress-bar");
let skillsAnimated = false;

window.addEventListener("scroll", () => {
    if (!skillSection || skillsAnimated) return;

    const sectionTop = skillSection.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 100) {
        progressBars.forEach(bar => {
            const width = bar.dataset.width;
            if (width) {
                bar.style.width = width;
            }
        });
        skillsAnimated = true;
    }
});

// Active Navigation Highlight
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function (e) {

        const href = this.getAttribute("href");

        // Same page section scroll
        if (href.startsWith("#")) {
            e.preventDefault();

            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }

        // Other pages (about.html, gallery.html etc.)
        // browser normally follows the link

    });
});
console.log("%cMAHA Portfolio Loaded Successfully", "color:#00ff99;font-size:16px;font-weight:bold;");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if(menuBtn){
    menuBtn.addEventListener("click",()=>{
        navLinks.classList.toggle("show");
    });
}
