const starsEl = document.getElementById('stars');
const STAR_COUNT = window.innerWidth < 600 ? 70 : 120;

for (let i = 0; i < STAR_COUNT; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  const size = Math.random() * 2.5 + 0.5;
  s.style.width = size + 'px'; 
  s.style.height = size + 'px';
  s.style.left = Math.random() * 100 + '%'; 
  s.style.top = Math.random() * 100 + '%';
  s.style.animationDelay = Math.random() * 3 + 's';
  s.style.animationDuration = (Math.random() * 2 + 2) + 's';
  starsEl.appendChild(s);
}

const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let W, H;

function resize() {
  const dpr = window.devicePixelRatio || 1;
  W = window.innerWidth; 
  H = window.innerHeight;
  canvas.width = W * dpr; 
  canvas.height = H * dpr;
  canvas.style.width = W + 'px'; 
  canvas.style.height = H + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resize();
window.addEventListener('resize', resize);

window.addEventListener('orientationchange', () => {
  setTimeout(() => { 
    resize(); 
    if (noBtn.classList.contains('runaway')) clampNoButtonToScreen(); 
  }, 300);
});

const COLORS = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff8e53', '#c78bff', '#ff4d9d', '#00e5ff'];
const particles = [];
const MAX_PARTICLES = window.innerWidth < 600 ? 500 : 1200;

class Particle {
  constructor(x, y, vx, vy, color) {
    this.x = x; this.y = y; this.vx = vx; this.vy = vy; this.color = color;
    this.size = Math.random() * 6 + 3; 
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.3; 
    this.shape = Math.random() < 0.5 ? 'rect' : 'circle';
    this.gravity = 0.12; 
    this.drag = 0.99; 
    this.opacity = 1;
    this.fadeDelay = Math.random() * 40 + 40; 
    this.age = 0;
  }
  update() {
    this.vx *= this.drag; 
    this.vy *= this.drag; 
    this.vy += this.gravity;
    this.x += this.vx; 
    this.y += this.vy; 
    this.rotation += this.rotSpeed;
    this.age++; 
    if (this.age > this.fadeDelay) this.opacity -= 0.012;
    return this.opacity > 0 && this.y < H + 50;
  }
  draw() {
    ctx.save(); 
    ctx.globalAlpha = Math.max(0, this.opacity);
    ctx.translate(this.x, this.y); 
    ctx.rotate(this.rotation); 
    ctx.fillStyle = this.color;
    if (this.shape === 'rect') { 
      ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2); 
    } else { 
      ctx.beginPath(); 
      ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2); 
      ctx.fill(); 
    }
    ctx.restore();
  }
}

function burst(x, y, count = 80, force = 9) {
  if (particles.length > MAX_PARTICLES) return;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
    const speed = force * (0.5 + Math.random() * 0.8);
    const vx = Math.cos(angle) * speed; 
    const vy = Math.sin(angle) * speed;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    particles.push(new Particle(x, y, vx, vy, color));
  }
}

function launchConfetti() {
  const bursts = [
    { x: W * 0.2, y: H * 0.35 }, 
    { x: W * 0.8, y: H * 0.35 }, 
    { x: W * 0.5, y: H * 0.25 }, 
    { x: W * 0.35, y: H * 0.55 }, 
    { x: W * 0.65, y: H * 0.55 }
  ];
  bursts.forEach((b, i) => setTimeout(() => burst(b.x, b.y, 70, 9), i * 180));
  setTimeout(() => burst(W / 2, H / 2.5, 150, 12), 900);
  setTimeout(() => { 
    for (let i = 0; i < 8; i++) 
      setTimeout(() => burst(Math.random() * W, Math.random() * H * 0.5, 50, 8), i * 100); 
  }, 1400);
}

function loop() {
  ctx.clearRect(0, 0, W, H);
  for (let i = particles.length - 1; i >= 0; i--) {
    if (!particles[i].update()) particles.splice(i, 1);
    else particles[i].draw();
  }
  requestAnimationFrame(loop);
}
loop();

const questionScreen = document.getElementById('questionScreen');
const greetingScreen = document.getElementById('greetingScreen');
const yesBtn = document.getElementById('yesBtn');
const againBtn = document.getElementById('againBtn');
const noBtn = document.getElementById('noBtn');

function showGreeting() {
  questionScreen.classList.add('hidden');
  setTimeout(() => greetingScreen.classList.remove('hidden'), 300);
  launchConfetti();
}

yesBtn.addEventListener('click', showGreeting);
againBtn.addEventListener('click', launchConfetti);

const NO_PADDING = 20;

function moveNoButton() {
  const btnRect = noBtn.getBoundingClientRect();
  const w = btnRect.width; 
  const h = btnRect.height;
  const maxX = window.innerWidth - w - NO_PADDING; 
  const maxY = window.innerHeight - h - NO_PADDING;
  const x = NO_PADDING + Math.random() * Math.max(0, maxX - NO_PADDING);
  const y = NO_PADDING + Math.random() * Math.max(0, maxY - NO_PADDING);
  noBtn.classList.add('runaway');
  noBtn.style.left = x + 'px'; 
  noBtn.style.top = y + 'px';
}

function clampNoButtonToScreen() {
  const r = noBtn.getBoundingClientRect();
  const maxX = window.innerWidth - r.width - NO_PADDING; 
  const maxY = window.innerHeight - r.height - NO_PADDING;
  let x = Math.min(Math.max(r.left, NO_PADDING), maxX);
  let y = Math.min(Math.max(r.top, NO_PADDING), maxY);
  noBtn.style.left = x + 'px'; 
  noBtn.style.top = y + 'px';
}

noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', (e) => { 
  e.preventDefault(); 
  moveNoButton(); 
}, { passive: false });

noBtn.addEventListener('click', (e) => { 
  e.preventDefault(); 
  moveNoButton(); 
});

document.body.addEventListener('pointerdown', (e) => {
  const isButton = e.target.closest('button');
  const greetingVisible = !greetingScreen.classList.contains('hidden');
  if (!isButton && greetingVisible) burst(e.clientX, e.clientY, 40, 7);
});

document.addEventListener('gesturestart', (e) => e.preventDefault());

let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) e.preventDefault();
  lastTouchEnd = now;
}, { passive: false });