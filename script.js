// iOS26 purple glass landing — with blood-red chaotic particles
// Elements
const intro = document.getElementById('intro');
const main = document.getElementById('main');
const enterBtn = document.getElementById('enterBtn');
const enterBtn2 = document.getElementById('enterBtn2');
const notifyBtn = document.getElementById('notifyBtn');
const notifyBtn2 = document.getElementById('notifyBtn2');
const notifyModal = document.getElementById('notifyModal');
const closeModal = document.getElementById('closeModal');
const submitEmail = document.getElementById('submitEmail');
const emailInput = document.getElementById('emailInput');
const loader = document.getElementById('loader');
const message = document.getElementById('message');
const statusEl = document.getElementById('notifyStatus');
const bgLayer = document.getElementById('bg-layer');
const audio = document.getElementById('bg-audio');

// Particles canvas (blood-red chaotic)
const pCanvas = document.createElement('canvas');
pCanvas.id = 'particle-canvas';
document.body.appendChild(pCanvas);
const pCtx = pCanvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = pCanvas.width = window.innerWidth;
  H = pCanvas.height = window.innerHeight;
  initParticles();
}
window.addEventListener('resize', resize);

function initParticles() {
  particles = [];
  const count = Math.floor((W * H) / 6000); // dense
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.6,
      vx: (Math.random() - 0.5) * 3.2, // faster chaotic
      vy: (Math.random() - 0.5) * 3.2,
      alpha: 0.25 + Math.random() * 0.7
    });
  }
}

function animateParticles() {
  pCtx.clearRect(0, 0, W, H);
  // subtle translucent overlay to create motion trails
  pCtx.fillStyle = 'rgba(6,2,12,0.12)';
  pCtx.fillRect(0, 0, W, H);

  for (let p of particles) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < -10) p.x = W + 10;
    if (p.x > W + 10) p.x = -10;
    if (p.y < -10) p.y = H + 10;
    if (p.y > H + 10) p.y = -10;

    pCtx.beginPath();
    pCtx.fillStyle = `rgba(180,8,8,${p.alpha})`; // blood-red tint
    pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    pCtx.fill();
  }
  requestAnimationFrame(animateParticles);
}

// Parallax light effect based on pointer
function setLight(x, y) {
  const tx = (x - 0.5) * 40;
  const ty = (y - 0.5) * 24;
  bgLayer.style.transform = `translate(${tx}px, ${ty}px)`;
}
window.addEventListener('pointermove', (e) => {
  setLight(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
});
window.addEventListener('touchmove', (e) => {
  if (!e.touches || e.touches.length === 0) return;
  setLight(e.touches[0].clientX / window.innerWidth, e.touches[0].clientY / window.innerHeight);
});

// Intro flow: when ENTER clicked, show loader 2s then reveal main and message
function showLoaderThenMessage() {
  loader.classList.remove('hidden');
  setTimeout(() => {
    loader.classList.add('hidden');
    intro.classList.add('hidden');
    main.classList.remove('hidden');
    message.classList.remove('hidden');
    message.animate([{opacity:0},{opacity:1}], {duration:420, fill:'forwards'});
  }, 2000);
}

enterBtn?.addEventListener('click', ()=>{ playAudio(); showLoaderThenMessage(); });
enterBtn2?.addEventListener('click', ()=>{ playAudio(); showLoaderThenMessage(); });

// Notify modal
function openNotify(){ notifyModal.classList.remove('hidden'); statusEl.textContent = ''; emailInput.value = ''; emailInput.focus(); }
function closeNotify(){ notifyModal.classList.add('hidden'); }
notifyBtn?.addEventListener('click', openNotify);
notifyBtn2?.addEventListener('click', openNotify);
closeModal?.addEventListener('click', closeNotify);

submitEmail?.addEventListener('click', ()=>{
  const val = (emailInput.value||'').trim();
  if(!val || !val.includes('@')){ statusEl.textContent = 'Enter valid email'; return; }
  const arr = JSON.parse(localStorage.getItem('mm_emails')||'[]');
  arr.push({email:val, t:(new Date()).toISOString()});
  localStorage.setItem('mm_emails', JSON.stringify(arr));
  statusEl.textContent = 'Thanks — you are on the list';
  setTimeout(()=> closeNotify(), 900);
});

// Audio autoplay with fallback to first interaction
function playAudio(){
  audio.volume = 0;
  audio.play().then(()=>{
    let vol = 0;
    const f = setInterval(()=>{ vol += 0.02; if(vol>=0.35){ vol=0.35; clearInterval(f);} audio.volume = vol; }, 100);
  }).catch(()=>{
    document.body.addEventListener('click', ()=>{ audio.play(); }, {once:true});
  });
}

// start everything
window.addEventListener('load', ()=>{
  resize();
  animateParticles();
  // keep intro visible on load; main hidden until user enters
});

