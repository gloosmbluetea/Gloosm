// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Close menu after clicking a link (mobile)
mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Highlight nav link matching the section in view
const sections = ['top', 'about', 'product', 'benefits', 'contact']
  .map((id) => document.getElementById(id))
  .filter(Boolean);
const navLinks = [...mainNav.querySelectorAll('a')];

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((a) =>
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`)
        );
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);

sections.forEach((s) => observer.observe(s));
