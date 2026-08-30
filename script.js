// ============ Mobile navigation toggle ============
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ============ Active nav link (multi-page) ============
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.main-nav a').forEach((a) => {
  const href = a.getAttribute('href');
  a.classList.toggle('active', href === currentPage);
});

// ============ Reviews Carousel ============
(function () {
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.review-card');
  const dotsContainer = document.querySelector('.carousel-dots');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  if (!track || cards.length === 0) return;

  let current = 0;
  let autoInterval;
  const total = cards.length;

  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to review ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.carousel-dot');

  function goTo(index) {
    current = ((index % total) + total) % total;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAuto(); });

  // Auto-scroll
  function startAuto() { autoInterval = setInterval(next, 5000); }
  function stopAuto() { clearInterval(autoInterval); }
  function resetAuto() { stopAuto(); startAuto(); }
  startAuto();

  // Pause on hover (desktop)
  const wrapper = document.querySelector('.carousel-track-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopAuto);
    wrapper.addEventListener('mouseleave', startAuto);
  }

  // Touch / swipe support (mobile)
  let touchStartX = 0;
  let touchEndX = 0;

  if (wrapper) {
    wrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAuto();
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) next();
        else prev();
      }
      startAuto();
    }, { passive: true });
  }
})();

// ============ FAQ Accordion ============
(function () {
  const items = document.querySelectorAll('.faq-item');
  if (items.length === 0) return;

  items.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all items
      items.forEach((other) => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
})();
