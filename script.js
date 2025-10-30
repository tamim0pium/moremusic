// iOS26 purple glass experience — interactions + parallax lighting

/* helper DOM */
const canvasLayer = document.getElementById('canvas-layer');
const brand = document.getElementById('brand');
const enterBtn = document.getElementById('enterBtn');
const notifyBtn = document.getElementById('notifyBtn');
const emailWrap = document.getElementById('emailWrap');
const sendEmail = document.getElementById('sendEmail');
const emailInput = document.getElementById('email');
const status = document.getElementById('status');
const loaderOverlay = document.getElementById('loaderOverlay');

/* Parallax light follow (mouse / touch) */
let pointer = { x: 0.5, y: 0.5 };
function setLight(x, y){
  // transform pointer 0..1 into small translate for canvas layer
  const tx = (x - 0.5) * 40;
  const ty = (y - 0.5) * 24;
  canvasLayer.style.transform = `translate(${tx}px, ${ty}px)`;
  // subtle brand tilt
  brand.style.transform = `translate3d(${tx*0.08}px, ${ty*0.08}px, 0)`;
}
window.addEventListener('pointermove', (e)=>{
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  pointer.x = x; pointer.y = y;
  setLight(x, y);
});
window.addEventListener('touchmove', (e)=>{
  if(!e.touches || e.touches.length===0) return;
  const t = e.touches[0];
  const x = t.clientX / window.innerWidth;
  const y = t.clientY / window.innerHeight;
  setLight(x, y);
});

/* ENTER flow: show loader 2s then message */
enterBtn.addEventListener('click', ()=>{
  status.textContent = '';
  loaderOverlay.classList.remove('hidden');
  loaderOverlay.setAttribute('aria-hidden', 'false');

  setTimeout(()=>{
    loaderOverlay.classList.add('hidden');
    loaderOverlay.setAttribute('aria-hidden', 'true');
    status.textContent = 'THE CURE IS COMING';
    // subtle pulse on status
    status.animate([{opacity:0},{opacity:1}], {duration:420, fill:'forwards'});
  }, 2000);
});

/* NOTIFY flow: reveal email input with glass */
notifyBtn.addEventListener('click', () => {
  const isShown = !emailWrap.classList.contains('hidden');
  if(isShown){
    // hide
    emailWrap.classList.add('hidden');
    emailWrap.style.display = 'none';
  } else {
    // show elegantly
    emailWrap.classList.remove('hidden');
    emailWrap.style.display = 'flex';
    emailInput.focus();
  }
});

/* SUBMIT: store in localStorage (demo) and toast */
document.getElementById('sendEmail')?.addEventListener('click', ()=>{
  const val = (emailInput.value || '').trim();
  if(!val || !val.includes('@')){
    status.textContent = 'Enter a valid email';
    return;
  }
  const list = JSON.parse(localStorage.getItem('mm_list') || '[]');
  list.push({email: val, t: new Date().toISOString()});
  localStorage.setItem('mm_list', JSON.stringify(list));
  status.textContent = 'You are on the list — thanks!';
  emailInput.value = '';
  // hide input after success
  setTimeout(()=> {
    emailWrap.classList.add('hidden');
    emailWrap.style.display = 'none';
  }, 900);
});

/* small UX: close email input on Escape */
window.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){
    emailWrap.classList.add('hidden');
    emailWrap.style.display = 'none';
  }
});

/* init positions / small entrance */
window.addEventListener('load', ()=>{
  // start centered light slightly offset
  setLight(0.52, 0.46);

  // ensure emailWrap hidden by default (CSS safe)
  emailWrap.classList.add('hidden');
  emailWrap.style.display = 'none';
});