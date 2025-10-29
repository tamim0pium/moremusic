// Intro hide and start particles + audio
window.addEventListener("load",()=>{
  setTimeout(()=>{
    document.getElementById("intro").style.display="none";
    startParticles();
    playAudio();
  },3000); // intro 3s
});

// Blood particles
const canvas=document.getElementById("bg");
const ctx=canvas.getContext("2d");
let w,h,particles=[];
function resize(){w=canvas.width=window.innerWidth;h=canvas.height=window.innerHeight;initParticles();}
window.addEventListener("resize",resize);

function initParticles(){
  particles=[];
  const count=Math.floor((w*h)/3000); // more particles
  for(let i=0;i<count;i++){
    particles.push({
      x:Math.random()*w,
      y:Math.random()*h,
      r:Math.random()*2+1,
      vx:(Math.random()-0.5)*4, // faster
      vy:(Math.random()-0.5)*4,
      alpha:0.4+Math.random()*0.6
    });
  }
}

function animate(){
  ctx.clearRect(0,0,w,h);
  for(let p of particles){
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<0)p.x=w;if(p.x>w)p.x=0;
    if(p.y<0)p.y=h;if(p.y>h)p.y=0;
    ctx.beginPath();
    ctx.fillStyle=`rgba(130,0,0,${p.alpha})`;
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
  }
  requestAnimationFrame(animate);
}
function startParticles(){resize();animate();}

// ENTER button
const enterBtn = document.getElementById("enter-btn");
const loading = document.getElementById("loading");
const msg = document.getElementById("message");

enterBtn.addEventListener("click", () => {
  msg.classList.add("hidden");
  loading.style.display = "flex";
  setTimeout(()=>{
    loading.style.display = "none";
    msg.classList.remove("hidden");
  },2000); // 2s loader
});

// NOTIFY ME button
const notifyBtn=document.getElementById("notify-btn");
const emailSection=document.getElementById("email-section");
notifyBtn.addEventListener("click",()=>{
  emailSection.style.display=emailSection.style.display==='flex'?'none':'flex';
});

// SUBMIT demo
document.getElementById("submit-email").addEventListener("click",()=>{
  const email=document.getElementById("email").value;
  if(email) alert(`We'll notify ${email} when the cure drops 😈`);
  else alert("Enter your email first!");
});

// Audio
const audio = document.getElementById("bg-audio");
function playAudio(){
  audio.volume=0;
  audio.play().then(()=>{
    let vol=0;
    const fade = setInterval(()=>{
      vol+=0.01;
      if(vol>=0.4){ vol=0.4; clearInterval(fade);}
      audio.volume=vol;
    },100);
  }).catch(()=>{
    document.body.addEventListener('click', ()=>{audio.play();}, {once:true});
  });
}