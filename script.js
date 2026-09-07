// Build hero name letter-by-letter for the block-drop animation
const name = "ATIBA YOUNUS";
const heroName = document.getElementById('hero-name');
[...name].forEach((ch, i) => {
  const span = document.createElement('span');
  if (ch === ' ') {
    span.textContent = '\u00A0';
    span.classList.add('name-space');
  } else {
    span.textContent = ch;
  }
  span.style.animationDelay = (i * 0.06) + 's';
  heroName.appendChild(span);
});

// Smooth scroll + active state for hotbar
const slots = document.querySelectorAll('.slot');
slots.forEach(slot => {
  slot.addEventListener('click', () => {
    document.querySelector(slot.dataset.target).scrollIntoView({ behavior: 'smooth' });
  });
});

const sections = document.querySelectorAll('section[id]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      slots.forEach(s => s.classList.toggle('active', s.dataset.target === '#' + entry.target.id));
    }
  });
}, { threshold: 0.5 });
sections.forEach(s => observer.observe(s));

// Contact form: submits directly in the background via Formspree — no email
// app opens, no page reload, and no backend for you to build or host.
// Endpoint is already wired up to https://formspree.io/f/myeyngkb.
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    formStatus.textContent = 'Sending...';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.textContent = 'Message sent — thanks for reaching out!';
        contactForm.reset();
      } else {
        formStatus.textContent = 'Something went wrong — please try again.';
      }
    } catch (err) {
      formStatus.textContent = 'Something went wrong — please try again.';
    } finally {
      submitBtn.disabled = false;
    }
  });
}