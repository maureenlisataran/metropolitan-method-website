/* ============================================
   THE METROPOLITAN METHOD — main.js
   ============================================ */

/* --- Nav: scroll state --- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

/* --- Mobile menu --- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
}

function closeMenu() {
  if (hamburger) hamburger.classList.remove('open');
  if (mobileMenu) mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

/* --- Floating button: hide on contact page, show after scroll elsewhere --- */
const floatingBtn = document.getElementById('floatingBtn');
const isContactPage = window.location.pathname.includes('contact');

if (!isContactPage && floatingBtn) {
  floatingBtn.classList.add('hidden');

  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight * 0.6) {
      floatingBtn.classList.remove('hidden');
    } else {
      floatingBtn.classList.add('hidden');
    }
  }, { passive: true });
}

/* --- Contact form --- */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName    = contactForm.firstName.value.trim();
    const lastName     = contactForm.lastName.value.trim();
    const email        = contactForm.email.value.trim();
    const phone        = contactForm.phone.value.trim();
    const neighborhood = contactForm.neighborhood.value.trim();
    const service      = contactForm.service.value;
    const message      = contactForm.message.value.trim();

    const subject = encodeURIComponent(`New Inquiry from ${firstName} ${lastName} — The Metropolitan Method`);

    const body = encodeURIComponent(
`Hi Maureen,

You have a new inquiry from your website:

Name:         ${firstName} ${lastName}
Email:        ${email}
Phone:        ${phone}
Neighborhood: ${neighborhood}
Service:      ${service}
Message:      ${message}

---
Sent from themetropolitanmethod.com`
    );

    /* Open pre-filled email in their mail app */
    window.location.href = `mailto:maureen@themetropolitanmethod.com?subject=${subject}&body=${body}`;

    /* Show success message */
    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';
    window.scrollTo({ top: formSuccess.offsetTop - 120, behavior: 'smooth' });
  });
}

/* --- Fade-in on scroll (subtle entrance animation) --- */
const fadeEls = document.querySelectorAll(
  '.service-card, .process-step, .testimonial, .intro-strip__item'
);

if ('IntersectionObserver' in window && fadeEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
    observer.observe(el);
  });
}

/* --- Lightbox (GLightbox) --- */
document.querySelectorAll('.gallery-pair__item img').forEach(img => {
  const a = document.createElement('a');
  a.href = img.getAttribute('src');
  a.className = 'glightbox';
  img.parentNode.insertBefore(a, img);
  a.appendChild(img);
});
GLightbox({ selector: 'a.glightbox', touchNavigation: true, closeOnOutsideClick: true });
