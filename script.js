// year
document.getElementById('y') && (document.getElementById('y').textContent = new Date().getFullYear());

// theme toggle
const toggle = document.getElementById('themeToggle');
const applyTheme = t => document.documentElement.setAttribute('data-theme', t);
const saved = localStorage.getItem('theme') || 'dark';
applyTheme(saved);
toggle && toggle.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

// hero tilt (only when element exists)
const tilt = document.getElementById('tilt');
if (tilt) {
  tilt.addEventListener('mousemove', e => {
    const r = tilt.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    tilt.style.transform = `perspective(1200px) rotateX(${(-y*4).toFixed(2)}deg) rotateY(${(x*6).toFixed(2)}deg)`;
  });
  tilt.addEventListener('mouseleave', () => tilt.style.transform = 'perspective(1200px) rotateX(0) rotateY(0)');
}

// reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('show'); io.unobserve(en.target); }
  });
},{ threshold:.12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));
