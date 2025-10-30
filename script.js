/* Plan-D fresh hostable landing page script */

/* ---------- animated background (soft orbs + subtle waves) ---------- */
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let W, H, orbs = [];

function resize() {
  W = canvas.width = innerWidth;
  H = canvas.height = innerHeight;
  initOrbs();
}
window.addEventListener('resize', resize);

function initOrbs() {
  orbs = [];
  const count = Math.max(8, Math.floor((W * H) / 90000)); // scales with screen
  for (let i = 0; i < count; i++) {
    orbs.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 60 + Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      hue: 200 + Math.random() * 40,
      alpha: 0.08 + Math.random() * 0.12
    });
  }
}

function drawBackground() {
  ctx.clearRect(0, 0, W, H);
  // soft gradient underlay
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, '#f7fbff');
  g.addColorStop(1, '#e6f1ff');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // orbs
  for (let o of orbs) {
    o.x += o.vx;
    o.y += o.vy;
    if (o.x < -o.r) o.x = W + o.r;
    if (o.x > W + o.r) o.x = -o.r;
    if (o.y < -o.r) o.y = H + o.r;
    if (o.y > H + o.r) o.y = -o.r;

    const orb = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
    orb.addColorStop(0, `hsla(${o.hue},90%,65%,${o.alpha})`);
    orb.addColorStop(1, `hsla(${o.hue},90%,60%,0)`);
    ctx.fillStyle = orb;
    ctx.beginPath();
    ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(drawBackground);
}

/* ------ UI interactions: enter loader + join modal + email storage ------- */
const enterBtn = document.getElementById('enterBtn');
const joinBtn  = document.getElementById('joinBtn');
const loaderOverlay = document.getElementById('loaderOverlay');
const progressBar = document.getElementById('progressBar');
const joinModal = document.getElementById('joinModal');
const closeModal = document.getElementById('closeModal');
const submitEmail = document.getElementById('submitEmail');
const emailInput = document.getElementById('emailInput');
const joinNote = document.getElementById('joinNote');
const message = document.getElementById('message');

enterBtn.addEventListener('click', () => {
  showLoader(1600, () => {
    // after loader completes
    showMessage('THE CURE IS COMING');
  });
});

function showLoader(duration = 1600, cb) {
  loaderOverlay.classList.remove('hidden');
  progressBar.style.width = '0%';
  const start = performance.now();
  function tick(now) {
    const pct = Math.min(1, (now - start) / duration);
    progressBar.style.width = `${Math.round(pct * 100)}%`;
    if (pct < 1) requestAnimationFrame(tick);
    else {
      setTimeout(()=>{ loaderOverlay.classList.add('hidden'); }, 220);
      if (typeof cb === 'function') cb();
    }
  }
  requestAnimationFrame(tick);
}

function showMessage(text) {
  // create ephemeral message element inside the card
  let el = document.getElementById('planMessage');
  if (!el) {
    el = document.createElement('h2');
    el.id = 'planMessage';
    el.style.marginTop = '22px';
    el.style.color = '#093247';
    el.style.fontWeight = '700';
    document.getElementById('card')?.appendChild(el);
  }
  el.textContent = text;
}

/* Join modal */
joinBtn.addEventListener('click', () => {
  joinModal.classList.remove('hidden');
  joinNote.classList.add('hide');
  emailInput.value = '';
});
closeModal?.addEventListener('click', () => joinModal.classList.add('hidden'));

submitEmail.addEventListener('click', () => {
  const val = (emailInput.value || '').trim();
  if (!val || !val.includes('@')) {
    joinNote.textContent = 'Please enter a valid email';
    joinNote.classList.remove('hide'); return;
  }
  // save to localStorage as demo
  const list = JSON.parse(localStorage.getItem('moremusic_list')||'[]');
  list.push({email: val, t: (new Date()).toISOString()});
  localStorage.setItem('moremusic_list', JSON.stringify(list));
  joinNote.textContent = 'Thanks — you are on the list!';
  joinNote.classList.remove('hide');
  setTimeout(()=> joinModal.classList.add('hidden'), 1000);
});

/* keyboard / escape close */
window.addEventListener('keydown', (e)=>{
  if (e.key === 'Escape') joinModal.classList.add('hidden');
});

/* start it */
window.addEventListener('load', ()=>{
  resize();
  drawBackground();
  // small delayed message to ensure card exists
  setTimeout(()=> {
    // no initial messages
  }, 250);
});