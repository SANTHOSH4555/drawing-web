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
   Navbar Scroll Effect & Scrollspy
========================================= */
const navbar = document.querySelector(".navbar");
let lastScrollTop = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  // 1. Transparent/Solid Scrolled state
  if (currentScroll > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // 2. Smart Hide/Show on Scroll Up/Down
  if (currentScroll > lastScrollTop && currentScroll > 200) {
    // Scrolling down & past threshold -> hide
    navbar.style.transform = "translateY(-100%)";
  } else {
    // Scrolling up -> show
    navbar.style.transform = "translateY(0)";
  }
  lastScrollTop = currentScroll;

  // 3. Scrollspy: active section highlight
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  let currentSection = "home"; // default to home

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    // Adjust logic to switch active state mid-section
    if (currentScroll >= sectionTop - 200) {
      currentSection = section.getAttribute("id");
    }
  });

  // Edge case: if at very top, force Home active
  if (currentScroll < 100) {
    currentSection = "home";
  }

  // Apply active class
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

/* =========================================
   Scroll Animation (Fade In)
========================================= */
const faders = document.querySelectorAll(
  ".fade-in-section, .fade-in-up, .fade-in-left, .fade-in-right",
);
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
  {
    title: "Storytelling Art",
    desc: 'Narrative Journey <br> <span class="unique-font">Created by Santhosh & Shamu</span>',
    src: "images/storytelling_art.jpg",
  },
  {
    title: "Commissioned Portrait",
    desc: "Detailed Pencil Drawing",
    src: "images/2026-01-26_10-06-50_UTC_1.jpg",
  },
  {
    title: "XXXTENTACION",
    desc: "Portrait Study",
    src: "images/2025-10-18_12-25-47_UTC_1.jpg",
  },
  {
    title: "Money Heist Professor",
    desc: "Character Sketch",
    src: "images/2025-08-17_10-47-55_UTC_1.jpg",
  },
  {
    title: "Justin Bieber",
    desc: "Celebrity Portrait",
    src: "images/2025-04-26_11-52-36_UTC_1.jpg",
  },
  {
    title: "Priya Bhavani Shankar",
    desc: "Detailed Shading",
    src: "images/2024-11-24_06-34-48_UTC.jpg",
  },
  {
    title: "Lord Krishna",
    desc: "Divine Art",
    src: "images/2025-07-09_11-38-21_UTC.jpg",
  },
  {
    title: "Hinata Hyuga",
    desc: "Anime Sketch",
    src: "images/2024-11-17_05-41-30_UTC.jpg",
  },
  {
    title: "Tamil Iniya",
    desc: "Portrait Sketch",
    src: "images/2025-07-04_04-22-55_UTC_1.jpg",
  },
  {
    title: "Custom Art Work",
    desc: "Personal Commission",
    src: "images/akka_portrait_new.jpg",
  },
  {
    title: "Calm Look",
    desc: "Expressive Shading",
    src: "images/2025-12-06_11-58-00_UTC_1.jpg",
  },
];

if (masonryGallery) {
  artWorks.forEach((art, index) => {
    const item = document.createElement("div");
    item.classList.add("portfolio-item", "fade-in-up");
    // Staggered reveal Delay
    item.style.transitionDelay = `${(index % 4) * 0.1}s`;

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
    'images/portrait_with_child.jpg',
    'images/2025-10-18_12-25-47_UTC_1.jpg',
    'images/mens_portrait.jpg',
    'images/2025-08-17_10-47-55_UTC_1.jpg',
    'images/portrait_saree.jpg',
    'images/2025-07-09_11-38-21_UTC.jpg',
    'images/mens_portrait_latest.jpg'
];

if (igFeed) {
  igPosts.forEach((postSrc, index) => {
    const post = document.createElement("a");
    post.href = "https://www.instagram.com/santhosh_dream_drawing";
    post.target = "_blank";
    post.classList.add("ig-item", "fade-in-up");
    post.style.transitionDelay = `${(index % 4) * 0.1}s`;

    post.innerHTML = `
            <img src="${postSrc}" alt="Instagram Post" loading="lazy">
            <div class="ig-overlay">
                <i class="fa-brands fa-instagram"></i>
            </div>
        `;
    igFeed.appendChild(post);
    appearOnScroll.observe(post);
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
   Form Submission (Firebase)
========================================= */
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector("button");
    const originalText = btn.innerText;

    btn.innerText = "Sending...";

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
      if (window.db) {
        await window.db.collection("inquiries").add({
          name: name,
          email: email,
          message: message,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
      } else {
        console.error("Firebase DB not initialized.");
      }

      btn.innerText = "Inquiry Sent!";
      btn.style.backgroundColor = "#4caf50";
      btn.style.borderColor = "#4caf50";
      form.reset();

      setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = "";
        btn.style.borderColor = "";
      }, 3000);
    } catch (error) {
      console.error("Error adding document: ", error);
      btn.innerText = "Error: " + error.message;
      btn.style.backgroundColor = "#f44336";
      btn.style.borderColor = "#f44336";

      setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = "";
        btn.style.borderColor = "";
      }, 5000);
    }
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

/* =========================================
   Enhanced Shop Order Modal Logic
========================================= */
const orderModal = document.getElementById("order-modal");
const closeOrderModal = document.getElementById("close-order-modal");
const modalArtTitle = document.getElementById("modal-art-title");
const modalArtPrice = document.getElementById("modal-art-price");
const modalArtTypeInput = document.getElementById("modal-art-type");
const sizeSelectionGroup = document.getElementById("size-selection-group");
const artSizeSelect = document.getElementById("art-size");

function orderArt(artType, basePrice = null) {
  if (orderModal) {
    orderModal.style.display = "flex";
    modalArtTitle.innerText = artType;
    modalArtTypeInput.value = artType;

    // reset form
    document.getElementById("order-form-modal").reset();

    // Reset to step 1
    const orderDetailsStep  = document.getElementById("order-details-step");
    const upiPaymentStep    = document.getElementById("upi-payment-step");
    const confirmWrap       = document.getElementById("btn-confirm-paid-wrap");
    const btnSubmit         = document.getElementById("btn-submit-order");
    const btnWA             = document.getElementById("btn-whatsapp-order");

    if (orderDetailsStep) orderDetailsStep.style.display = "block";
    if (upiPaymentStep)   upiPaymentStep.style.display   = "none";
    if (confirmWrap)      confirmWrap.style.display       = "none";
    if (btnSubmit) {
      btnSubmit.innerHTML = '<i class="fa-solid fa-qrcode" style="margin-right:6px; font-size:0.85em;"></i> Proceed to Pay';
      btnSubmit.style.display = "inline-block";
      btnSubmit.removeAttribute("data-step");
    }
    if (btnWA) btnWA.style.display = "inline-block";

    // Portrait → show size picker
    if (artType === "Portrait Drawing") {
      sizeSelectionGroup.style.display = "block";
      updatePriceFromSize();
    } else {
      sizeSelectionGroup.style.display = "none";
      modalArtPrice.innerText = `₹${basePrice || 600}`;
    }
  }
}

if (artSizeSelect) {
  artSizeSelect.addEventListener("change", updatePriceFromSize);
}

function updatePriceFromSize() {
  const selectedOption = artSizeSelect.options[artSizeSelect.selectedIndex];
  modalArtPrice.innerText = `₹${selectedOption.dataset.price}`;
}

if (closeOrderModal) {
  closeOrderModal.onclick = function () {
    orderModal.style.display = "none";
  };
}

// Close on outside click
window.addEventListener("click", function (event) {
  if (event.target == orderModal || event.target == document.getElementById("lightbox")) {
    if(event.target == orderModal) orderModal.style.display = "none";
  }
});

// WhatsApp Order Flow
const btnWhatsappOrder = document.getElementById("btn-whatsapp-order");
if (btnWhatsappOrder) {
  btnWhatsappOrder.addEventListener("click", function() {
    triggerOrder("whatsapp");
  });
}

// Form Submit Flow
const orderFormModal = document.getElementById("order-form-modal");
if (orderFormModal) {
  orderFormModal.addEventListener("submit", function(e) {
    e.preventDefault();
    triggerOrder("firebase");
  });
}

async function triggerOrder(method) {
  const name    = document.getElementById("order-name").value.trim();
  const phone   = document.getElementById("order-phone").value.trim();
  const address = document.getElementById("order-address") ? document.getElementById("order-address").value.trim() : "";
  const notes   = document.getElementById("order-notes").value.trim();
  const artType = document.getElementById("modal-art-type").value;

  let finalDetails = `Art Type: ${artType}`;
  let rawAmount    = 600;

  if (artType === "Portrait Drawing") {
    rawAmount    = parseInt(artSizeSelect.options[artSizeSelect.selectedIndex].dataset.price);
    finalDetails += ` | Size: ${artSizeSelect.value} (₹${rawAmount})`;
  } else {
    rawAmount    = parseInt(modalArtPrice.innerText.replace(/[^0-9]/g, "")) || 600;
    finalDetails += ` | Price: ₹${rawAmount}`;
  }

  const waConfirmText = `Hi! I just paid ₹${rawAmount} for ${artType}.\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nNotes: ${notes}\nUPI ID paid to: santhoshaa2023-1@okhdfcbank\n\n(Sending payment screenshot for confirmation)`;

  // ── WhatsApp direct order (no payment) ───────────────────────
  if (method === "whatsapp") {
    if (!name || !phone) {
      alert("Please enter your Name and Phone number.");
      return;
    }
    const msg = `Hello! I would like to order:\n${finalDetails}\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nNotes: ${notes}\n\nPlease confirm next steps!`;
    window.open(`https://wa.me/919042564940?text=${encodeURIComponent(msg)}`, "_blank");
    orderModal.style.display = "none";
    return;
  }

  // ── UPI payment flow ─────────────────────────────────────────
  if (!name || !phone) {
    alert("Please fill in your Name and Phone number before proceeding.");
    return;
  }

  const detailsStep   = document.getElementById("order-details-step");
  const upiStep       = document.getElementById("upi-payment-step");
  const confirmWrap   = document.getElementById("btn-confirm-paid-wrap");
  const btnSubmit     = document.getElementById("btn-submit-order");
  const btnWA         = document.getElementById("btn-whatsapp-order");

  // ---- STEP 1: Show UPI payment screen ----
  detailsStep.style.display = "none";
  upiStep.style.display     = "block";
  btnWA.style.display       = "none";
  btnSubmit.style.display   = "none";
  confirmWrap.style.display = "block";

  const UPI_ID   = "santhoshaa2023-1@okhdfcbank";
  const UPI_NAME = "Santhosh%20Dream%20Drawing";
  const upiBase  = `upi://pay?pa=${UPI_ID}&pn=${UPI_NAME}&am=${rawAmount}&cu=INR`;

  // Dynamic QR — encodes exact order amount
  const qrData = encodeURIComponent(upiBase);
  document.getElementById("upi-qr-image").src =
    `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${qrData}&bgcolor=ffffff&color=000000&margin=8&qzone=1`;

  // Amount display
  document.getElementById("upi-total-amount").innerText = `₹${rawAmount}`;

  // App-specific deep links
  document.getElementById("gpay-link").href    = `gpay://upi/pay?pa=${UPI_ID}&pn=${UPI_NAME}&am=${rawAmount}&cu=INR`;
  document.getElementById("phonepe-link").href = `phonepe://pay?pa=${UPI_ID}&pn=${UPI_NAME}&am=${rawAmount}&cu=INR`;
  document.getElementById("paytm-link").href   = `paytmmp://pay?pa=${UPI_ID}&pn=${UPI_NAME}&am=${rawAmount}&cu=INR`;

  // ── Smart Redirect: mobile auto-opens UPI app ─────────────────
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const redirectBanner = document.getElementById("upi-redirect-banner");
  const redirectLabel  = document.getElementById("upi-redirect-label");

  if (isMobile && redirectBanner && redirectLabel) {
    redirectBanner.style.display = "flex";
    let secs = 3;
    redirectLabel.textContent = `Opening payment app in ${secs}s…`;

    const timer = setInterval(() => {
      secs--;
      if (secs > 0) {
        redirectLabel.textContent = `Opening payment app in ${secs}s…`;
      } else {
        clearInterval(timer);
        redirectLabel.textContent = "Redirecting…";
        // Try to open the UPI deep link
        window.location.href = upiBase;
        // After 2s, if still on page (app not installed), show QR fallback msg
        setTimeout(() => {
          redirectLabel.textContent = "App not opened? Scan the QR above ↑";
          redirectBanner.style.background = "rgba(255,165,0,0.12)";
          redirectBanner.style.borderColor = "rgba(255,165,0,0.35)";
        }, 2000);
      }
    }, 1000);
  } else if (redirectBanner) {
    redirectBanner.style.display = "none"; // hide on desktop
  }

  // Save order to Firestore
  if (window.db) {
    try {
      await window.db.collection("orders").add({
        artType,
        details:       finalDetails,
        name,
        phone,
        address,
        notes,
        amountExpected: rawAmount,
        paymentMethod:  "UPI-Direct",
        status:         "pending_confirmation",
        timestamp:      firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (err) {
      console.error("Firestore save error:", err);
    }
  }

  // Wire up the WhatsApp confirm button
  const btnConfirm = document.getElementById("btn-confirm-paid");
  const freshConfirm = btnConfirm.cloneNode(true);
  btnConfirm.parentNode.replaceChild(freshConfirm, btnConfirm);

  freshConfirm.addEventListener("click", function () {
    window.open(`https://wa.me/919042564940?text=${encodeURIComponent(waConfirmText)}`, "_blank");
    freshConfirm.innerHTML = "✔ Opening WhatsApp…";
    freshConfirm.style.backgroundColor = "#25d366";
    freshConfirm.style.color = "#fff";
    setTimeout(() => { orderModal.style.display = "none"; }, 1500);
  });
}

/* =========================================
   Copy UPI ID to Clipboard
========================================= */
function copyUpiId() {
  const upiId = "santhoshaa2023-1@okhdfcbank";
  navigator.clipboard.writeText(upiId).then(() => {
    const btn = document.querySelector("button[onclick='copyUpiId()']");
    if (btn) {
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
      btn.style.background = "rgba(76,175,80,0.2)";
      btn.style.borderColor = "#4caf50";
      btn.style.color = "#4caf50";
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = "";
        btn.style.borderColor = "";
        btn.style.color = "";
      }, 2000);
    }
  }).catch(() => {
    alert("UPI ID: " + upiId + "\n\nPlease copy it manually.");
  });
}

/* =========================================
   Hero Parallax on Scroll
========================================= */
const heroSection = document.querySelector(".hero");
window.addEventListener(
  "scroll",
  () => {
    if (!heroSection) return;
    const scrolled = window.scrollY;
    // Subtle parallax – content moves up slower than scroll
    const heroContent = heroSection.querySelector(".hero-content");
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
      heroContent.style.opacity = 1 - scrolled / (window.innerHeight * 0.7);
    }
    // Hero orb drifts slightly
    heroSection.style.setProperty("--parallax-y", `${scrolled * 0.15}px`);
  },
  { passive: true },
);

// Logo reveal effect
document.querySelector(".logo").addEventListener("mouseenter", (e) => {
  e.target.style.letterSpacing = "4px";
  e.target.style.opacity = "0.7";
});

document.querySelector(".logo").addEventListener("mouseleave", (e) => {
  e.target.style.letterSpacing = "2px";
  e.target.style.opacity = "1";
});


