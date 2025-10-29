// Particles
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
let w,h,particles=[];
function resizeCanvas(){w=canvas.width=window.innerWidth;h=canvas.height=window.innerHeight; initParticles();}
window.addEventListener("resize", resizeCanvas);
function initParticles(){
  particles=[];
  const count=Math.floor((w*h)/5000);
  for(let i=0;i<count;i++){
    particles.push({
      x:Math.random()*w,
      y:Math.random()*h,
      r:Math.random()*2+1,
      vx:(Math.random()-0.5)*4,
      vy:(Math.random()-0.5)*4,
      alpha:0.3+Math.random()*0.7
    });
  }
}
function animate(){
  ctx.clearRect(0,0,w,h);
  for(let p of particles){
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0)p.x=w;if(p.x>w)p.x=0;
    if(p.y<0)p.y=h;if(p.y>h)p.y=0;
    ctx.beginPath();
    ctx.fillStyle=`rgba(255,0,0,${p.alpha})`;
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
  }
  requestAnimationFrame(animate);
}
function startParticles(){resizeCanvas();animate();}

// Buttons
const enterBtn=document.getElementById("enter-btn");
const loader=document.getElementById("loader");
const message=document.getElementById("message");
enterBtn.addEventListener("click", ()=>{
  message.classList.add("hidden");
  loader.style.display="flex";
  setTimeout(()=>{
    loader.style.display="none";
    message.classList.remove("hidden");
  },2000);
});

const notifyBtn=document.getElementById("notify-btn");
const emailSection=document.getElementById("email-section");
notifyBtn.addEventListener("click", ()=>{
  emailSection.style.display=emailSection.style.display==="flex"?"none":"flex";
});

document.getElementById("submit-email").addEventListener("click", ()=>{
  const email=document.getElementById("email").value;
  if(email) alert(`We'll notify ${email} when the cure drops 😈`);
  else alert("Enter your email first!");
});

// Audio
const audio=document.getElementById("bg-audio");
function playAudio(){
  audio.volume=0;
  audio.play().then(()=>{
    let vol=0;
    const fade=setInterval(()=>{
      vol+=0.01;
      if(vol>=0.4){vol=0.4; clearInterval(fade);}
      audio.volume=vol;
    },100);
  }).catch(()=>{document.body.addEventListener('click', ()=>audio.play(), {once:true});});
}

// Start everything
window.addEventListener("load", ()=>{
  startParticles();
  playAudio();
});