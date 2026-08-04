/* =========================================================
   Portfolio - Jumiel Rey Pacto Siposo
   Interactive Features
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hidden'), 400);
  });

  /* Fallback hide after 3s if load already fired */
  setTimeout(() => preloader.classList.add('hidden'), 3000);

  /* ---------- Navbar scroll effect ---------- */
  const navbar = document.querySelector('.navbar');
  const backToTop = document.getElementById('backToTop');
  const onScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      backToTop.classList.add('show');
    } else {
      navbar.classList.remove('scrolled');
      backToTop.classList.remove('show');
    }

    // Highlight active nav link
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    sections.forEach((section) => {
      const top = window.scrollY + 120;
      if (top >= section.offsetTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', onScroll);

  /* ---------- Mobile navigation toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', navMenu.classList.contains('open'));
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Back to top button ---------- */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Typing effect ---------- */
  const typedText = document.getElementById('typed');
  const roles = [
    'ICT Student',
    'CSS NC2 Holder',
    'Computer Technician',
    'Aspiring IT Professional'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const currentRole = roles[roleIndex];
    if (!deleting) {
      typedText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentRole.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
      setTimeout(type, 80);
    } else {
      typedText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
      setTimeout(type, 45);
    }
  }
  type();

  /* ---------- Scroll reveal (Intersection Observer) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- Skill bars animation when in view ---------- */
  const skillBars = document.querySelectorAll('.skill-bar span');
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progress = entry.target.getAttribute('data-progress');
          entry.target.style.width = `${progress}%`;
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  skillBars.forEach((bar) => barObserver.observe(bar));

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Contact form (mailto fallback) ---------- */
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email-input').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    const mailtoLink = `mailto:jumielsposo@gmail.com?subject=${encodeURIComponent(
      subject || `Portfolio Contact from ${name}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )}`;

    window.location.href = mailtoLink;

    // Show simple feedback
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Opening Email...';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
});

