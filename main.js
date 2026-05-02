// ── PARALLAX BACKGROUND ──────────────────────────────────────
const bg = document.getElementById('parallaxBg');
let ticking = false;

function updateParallax() {
  const y = window.scrollY;
  bg.style.transform = `translateY(${y * 0.3}px)`;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}, { passive: true });

// ── SCROLL REVEAL ─────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.project, .about-strip').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.04}s`;
  observer.observe(el);
});

// ── REVIEW CAROUSEL ───────────────────────────────────────────
const track = document.getElementById('reviewTrack');
const dotsContainer = document.getElementById('carouselDots');
const total = 7;
let current = 0;

for (let i = 0; i < total; i++) {
  const dot = document.createElement('div');
  dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
}

function goTo(idx) {
  current = (idx + total) % total;
  track.style.transform = `translateX(-${current * 100}%)`;
  document.querySelectorAll('#carouselDots .carousel-dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
}

document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));
setInterval(() => goTo(current + 1), 4000);

// ── CAMP SLIDER ───────────────────────────────────────────────
const campSlides = document.querySelectorAll('.camp-slide');
const campDotsList = document.querySelectorAll('.camp-dot');
let campIdx = 0;

function showCampSlide(idx) {
  campSlides.forEach(s => s.classList.remove('active'));
  campDotsList.forEach(d => d.classList.remove('active'));
  campIdx = (idx + campSlides.length) % campSlides.length;
  campSlides[campIdx].classList.add('active');
  campDotsList[campIdx].classList.add('active');
}

document.querySelector('.camp-prev').addEventListener('click', () => showCampSlide(campIdx - 1));
document.querySelector('.camp-next').addEventListener('click', () => showCampSlide(campIdx + 1));
campDotsList.forEach((dot, i) => dot.addEventListener('click', () => showCampSlide(i)));
setInterval(() => showCampSlide(campIdx + 1), 4000);
