// =========================================================
// HERO NAME — LETTER BY LETTER
// =========================================================

const heroName = document.getElementById("hero-name");

if (heroName) {
  const name = "ATIBA YOUNUS";

  [...name].forEach((ch, i) => {
    const span = document.createElement("span");

    if (ch === " ") {
      span.textContent = "\u00A0";
      span.classList.add("name-space");
    } else {
      span.textContent = ch;
    }

    span.style.animationDelay = `${i * 0.06}s`;
    heroName.appendChild(span);
  });
}


// =========================================================
// SMOOTH SCROLL + ACTIVE HOTBAR STATE
// =========================================================

const slots = document.querySelectorAll(".slot");

slots.forEach((slot) => {
  slot.addEventListener("click", () => {
    const target = slot.dataset.target;

    if (!target) return;

    const section = document.querySelector(target);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});


// =========================================================
// ACTIVE SECTION OBSERVER
// =========================================================

const sections = document.querySelectorAll("section[id]");

if (sections.length && slots.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          slots.forEach((slot) => {
            slot.classList.toggle(
              "active",
              slot.dataset.target === `#${entry.target.id}`
            );
          });
        }
      });
    },
    {
      threshold: 0.5
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}


// =========================================================
// QUEST CARDS — ACHIEVEMENT UNLOCK CASCADE
// =========================================================

const questCards = document.querySelectorAll(".quest-card");

questCards.forEach((card, i) => {
  card.style.transitionDelay = `${Math.min(i * 0.08, 0.5)}s`;
});

if (questCards.length) {
  const questObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  questCards.forEach((card) => {
    questObserver.observe(card);
  });
}


// =========================================================
// BACKGROUND MUSIC
// =========================================================

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

if (bgMusic && musicBtn) {
  bgMusic.volume = 0.9;

  musicBtn.addEventListener("click", async () => {
    if (bgMusic.paused) {
      try {
        await bgMusic.play();
        musicBtn.textContent = "🔊 Music On";
      } catch (error) {
        console.warn("Music could not start:", error);
      }
    } else {
      bgMusic.pause();
      musicBtn.textContent = "🔇 Music Off";
    }
  });
}


// =========================================================
// EDUCATION PATH — NODE REVEAL
// =========================================================

const eduNodes = document.querySelectorAll(".edu-node");

eduNodes.forEach((node, i) => {
  node.style.transitionDelay = `${Math.min(i * 0.12, 0.5)}s`;
});

if (eduNodes.length) {
  const eduObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  eduNodes.forEach((node) => {
    eduObserver.observe(node);
  });
}


// =========================================================
// CERTIFICATE CARDS — ACHIEVEMENT CASCADE
// =========================================================

const certCards = document.querySelectorAll(".cert-card");

certCards.forEach((card, i) => {
  card.style.transitionDelay = `${Math.min((i % 4) * 0.08, 0.4)}s`;
});

if (certCards.length) {
  const certObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  certCards.forEach((card) => {
    certObserver.observe(card);
  });
}


// =========================================================
// CONTACT FORM
// =========================================================

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector(
      'button[type="submit"]'
    );

    if (!submitBtn) return;

    submitBtn.disabled = true;

    if (formStatus) {
      formStatus.textContent = "Sending...";
    }

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        if (formStatus) {
          formStatus.textContent =
            "Message sent, thanks for reaching out :)";
        }

        contactForm.reset();
      } else {
        if (formStatus) {
          formStatus.textContent =
            "Something went wrong. Please try again.";
        }
      }
    } catch (error) {
      console.error("Contact form error:", error);

      if (formStatus) {
        formStatus.textContent =
          "Something went wrong. Please try again.";
      }
    } finally {
      submitBtn.disabled = false;
    }
  });
}


// =========================================================
// MINECRAFT WORLD LOADING SCREEN
// =========================================================

const loadingScreen = document.getElementById("loading-screen");
const loadingProgress = document.querySelector(".loader-progress");
const loaderPercent = document.getElementById("loader-percent");
const loadingMessage = document.getElementById("loading-message");

const loaderMessages = [
  "Generating terrain...",
  "Loading chunks...",
  "Preparing inventory...",
  "Loading achievements...",
  "Spawning player...",
  "Building world...",
  "Almost ready..."
];

let progress = 0;
let messageIndex = 0;
let loaderComplete = false;


// ---------------------------------------------------------
// UPDATE LOADING UI
// ---------------------------------------------------------

function updateLoadingUI() {
  if (loadingProgress) {
    loadingProgress.style.width = `${progress}%`;
  }

  if (loaderPercent) {
    loaderPercent.textContent = `${progress}%`;
  }

  const newIndex = Math.min(
    Math.floor(progress / 15),
    loaderMessages.length - 1
  );

  if (newIndex !== messageIndex) {
    messageIndex = newIndex;

    if (loadingMessage) {
      loadingMessage.textContent = loaderMessages[messageIndex];
    }
  }
}


// ---------------------------------------------------------
// FAKE WORLD GENERATION
// ---------------------------------------------------------

const loaderInterval = setInterval(() => {
  progress += Math.floor(Math.random() * 4) + 1;

  if (progress >= 100) {
    progress = 100;
    clearInterval(loaderInterval);
  }

  updateLoadingUI();
}, 55);


// ---------------------------------------------------------
// FINISH LOADING SCREEN
// ---------------------------------------------------------

function finishLoadingScreen() {
  if (loaderComplete) return;

  loaderComplete = true;

  clearInterval(loaderInterval);

  progress = 100;

  if (loadingProgress) {
    loadingProgress.style.width = "100%";
  }

  if (loaderPercent) {
    loaderPercent.textContent = "100%";
  }

  if (loadingMessage) {
    loadingMessage.textContent = "World loaded!";
  }

  // Give the final message a moment to display
  setTimeout(() => {
    if (!loadingScreen) return;

    // Supports either .hide or .loaded CSS
    loadingScreen.classList.add("hide");
    loadingScreen.classList.add("loaded");

    // Remove from DOM after fade-out
    setTimeout(() => {
      if (loadingScreen && loadingScreen.parentNode) {
        loadingScreen.remove();
      }
    }, 700);

  }, 500);
}


// ---------------------------------------------------------
// WAIT FOR PAGE + ASSETS
// ---------------------------------------------------------

window.addEventListener("load", () => {
  if (progress >= 100) {
    finishLoadingScreen();
    return;
  }

  const waitForProgress = setInterval(() => {
    if (progress >= 100) {
      clearInterval(waitForProgress);
      finishLoadingScreen();
    }
  }, 50);
});


// =========================================================
// FALLBACK
// =========================================================
// If the loading screen somehow remains for too long,
// prevent it from blocking the portfolio forever.

setTimeout(() => {
  if (!loaderComplete) {
    console.warn("Loading screen fallback triggered.");
    finishLoadingScreen();
  }
}, 10000);
