const body = document.body;
const loader = document.querySelector('.page-loader');
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');
const themeToggle = document.getElementById('themeToggle');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('load', () => {
  setTimeout(() => loader.classList.add('hide'), 450);
});

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  backTop.classList.toggle('show', window.scrollY > 500);

  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 180;
    if (window.scrollY >= top) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

backTop.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') {
  body.classList.add('light');
  themeToggle.innerHTML = '<i class="bi bi-sun"></i>';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  const light = body.classList.contains('light');
  localStorage.setItem('portfolio-theme', light ? 'light' : 'dark');
  themeToggle.innerHTML = light ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const glow = document.querySelector('.cursor-glow');
window.addEventListener('mousemove', e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    const nav = document.getElementById('mainNav');
    if (nav.classList.contains('show') && window.bootstrap) {
      bootstrap.Collapse.getOrCreateInstance(nav).hide();
    }
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
