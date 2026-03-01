/* =========================================
   Custom Cursor Logic
========================================= */
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

// Check if device supports hover
const supportsHover = window.matchMedia("(hover: hover)").matches;

if (supportsHover && cursorDot && cursorOutline) {
  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Update dot immediately
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Update outline with slight delay for smooth effect
    cursorOutline.animate(
      {
        left: `${posX}px`,
        top: `${posY}px`,
      },
      { duration: 500, fill: "forwards" },
    );
  });
}

/* =========================================
   Navbar Scroll Effect
========================================= */
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* =========================================
   Scroll Animation (Fade In)
========================================= */
const faders = document.querySelectorAll(".fade-in-section");
const appearOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const appearOnScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});

// Force-trigger any sections already in view on load (important for mobile)
setTimeout(() => {
  faders.forEach((fader) => {
    const rect = fader.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      fader.classList.add("is-visible");
    }
  });
}, 300);

/* =========================================
   Gallery Data & Generation
========================================= */
const masonryGallery = document.getElementById("masonry-gallery");

const artWorks = [
    { title: 'Storytelling Art', desc: 'Narrative Journey <br> <span class="unique-font">Created by Santhosh & Shamu</span>', src: 'images/storytelling_art.jpg' },
    { title: 'Commissioned Portrait', desc: 'Detailed Pencil Drawing', src: 'images/2026-01-26_10-06-50_UTC_1.jpg' },
    { title: 'XXXTENTACION', desc: 'Portrait Study', src: 'images/2025-10-18_12-25-47_UTC_1.jpg' },
    { title: 'Money Heist Professor', desc: 'Character Sketch', src: 'images/2025-08-17_10-47-55_UTC_1.jpg' },
    { title: 'Justin Bieber', desc: 'Celebrity Portrait', src: 'images/2025-04-26_11-52-36_UTC_1.jpg' },
    { title: 'Priya Bhavani Shankar', desc: 'Detailed Shading', src: 'images/2024-11-24_06-34-48_UTC.jpg' },
    { title: 'Lord Krishna', desc: 'Divine Art', src: 'images/2025-07-09_11-38-21_UTC.jpg' },
    { title: 'Hinata Hyuga', desc: 'Anime Sketch', src: 'images/2024-11-17_05-41-30_UTC.jpg' },
    { title: 'Tamil Iniya', desc: 'Portrait Sketch', src: 'images/2025-07-04_04-22-55_UTC_1.jpg' },
    { title: 'Custom Art Work', desc: 'Personal Commission', src: 'images/akka_portrait_new.jpg' },
    { title: 'Calm Look', desc: 'Expressive Shading', src: 'images/2025-12-06_11-58-00_UTC_1.jpg' }
];

if (masonryGallery) {
  artWorks.forEach((art, index) => {
    const item = document.createElement("div");
    item.classList.add("portfolio-item", "fade-in-section");

    item.innerHTML = `
            <img src="${art.src}" alt="${art.title}" loading="lazy" onclick="openLightbox('${art.src}', '${art.title}')">
            <div class="portfolio-overlay" onclick="openLightbox('${art.src}', '${art.title}')">
                <h3 class="portfolio-title">${art.title}</h3>
                <p class="portfolio-desc">${art.desc}</p>
            </div>
        `;
    masonryGallery.appendChild(item);
    appearOnScroll.observe(item);
  });
}

/* =========================================
   Instagram Feed Mock Data
========================================= */
const igFeed = document.getElementById("ig-feed");

const igPosts = [
    'images/2026-01-26_10-06-50_UTC_1.jpg',
    'images/2025-12-06_11-58-00_UTC_1.jpg',
    'images/2025-10-18_12-25-47_UTC_1.jpg',
    'images/2025-09-13_11-50-43_UTC_1.jpg',
    'images/2025-08-17_10-47-55_UTC_1.jpg',
    'images/portrait_saree.jpg',
    'images/2025-07-09_11-38-21_UTC.jpg',
    'images/2025-07-04_04-22-55_UTC_1.jpg'
];

if (igFeed) {
  igPosts.forEach((postSrc) => {
    const post = document.createElement("a");
    post.href = "https://www.instagram.com/santhosh_dream_drawing";
    post.target = "_blank";
    post.classList.add("ig-item");

    post.innerHTML = `
            <img src="${postSrc}" alt="Instagram Post" loading="lazy">
            <div class="ig-overlay">
                <i class="fa-brands fa-instagram"></i>
            </div>
        `;
    igFeed.appendChild(post);
  });
}

/* =========================================
   Lightbox Logic
========================================= */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementsByClassName("lightbox-close")[0];

function openLightbox(src, title) {
  lightbox.style.display = "flex";
  lightboxImg.src = src;
  lightboxCaption.innerHTML = title;
}

if (lightboxClose) {
  lightboxClose.onclick = function () {
    lightbox.style.display = "none";
  };
}

// Close lightbox on click outside the image
window.onclick = function (event) {
  if (event.target == lightbox) {
    lightbox.style.display = "none";
  }
};

/* =========================================
   Form Submission (Mock)
========================================= */
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button");
    const originalText = btn.innerText;

    btn.innerText = "Sending...";

    setTimeout(() => {
      btn.innerText = "Inquiry Sent!";
      btn.style.backgroundColor = "#4caf50";
      btn.style.borderColor = "#4caf50";
      form.reset();

      setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = "";
        btn.style.borderColor = "";
      }, 3000);
    }, 1500);
  });
}

/* =========================================
   Mobile Menu Toggle
========================================= */
const mobileToggle = document.querySelector(".mobile-toggle");
const navLinksMenu = document.querySelector(".nav-links");

if (mobileToggle) {
  mobileToggle.addEventListener("click", () => {
    navLinksMenu.classList.toggle("active");
    const icon = mobileToggle.querySelector("i");

    // Dynamically set dropdown top based on navbar height
    const navbarHeight = document.querySelector(".navbar").offsetHeight;
    navLinksMenu.style.top = navbarHeight + "px";

    if (navLinksMenu.classList.contains("active")) {
      icon.classList.replace("fa-bars", "fa-xmark");
      document.body.style.overflow = "hidden"; // prevent background scroll
    } else {
      icon.classList.replace("fa-xmark", "fa-bars");
      document.body.style.overflow = "";
    }
  });
}

// Close mobile menu when clicking a nav link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinksMenu && navLinksMenu.classList.contains("active")) {
      navLinksMenu.classList.remove("active");
      mobileToggle.querySelector("i").classList.replace("fa-xmark", "fa-bars");
      document.body.style.overflow = "";
    }
  });
});
