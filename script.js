// Elements
const intro = document.getElementById('intro');
const main = document.getElementById('main');
const enterBtn = document.getElementById('enterBtn');
const notifyBtn = document.getElementById('notifyBtn');
const notifyModal = document.getElementById('notifyModal');
const closeModal = document.getElementById('closeModal');
const submitEmail = document.getElementById('submitEmail');
const emailInput = document.getElementById('emailInput');
const loader = document.getElementById('loader');
const message = document.getElementById('message');
const statusEl = document.getElementById('notifyStatus');
const bgLayer = document.getElementById('bg-layer');
const pCanvas = document.getElementById('particle-canvas');
const pCtx = pCanvas.getContext('2d');

let W, H, particles=[];

function resize(){
  W=pCanvas.width=window.innerWidth;
  H=pCanvas.height=window.innerHeight;
  initParticles();
}
window.addEventListener('resize',resize);

function initParticles(){
  particles=[];
  const count=Math.floor((W*H)/5000);
  for(let i=0;i<count;i++){
    particles.push({
      x:Math.random()*W,
      y:Math.random()*H,
      r:Math.random()*2+0.8,
      vx:(Math.random()-0.5)*3.5,
      vy:(Math.random()-0.5)*3.5,
      alpha:0.3+Math.random()*0.7
    });
  }
}

function animateParticles(){