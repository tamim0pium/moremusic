// Background floating shapes
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
let w,h,shapes=[];
function resizeCanvas(){w=canvas.width=window.innerWidth;h=canvas.height=window.innerHeight; initShapes();}
window.addEventListener("resize", resizeCanvas);
function initShapes(){
  shapes=[];
  const count=Math.floor((w*h)/5000);
  for(let i=0;i<count;i++){
    shapes.push({
      x:Math.random()*w,
      y:Math.random()*h,
      r:Math.random()*20+10,
      vx:(Math.random()-0.5)*1.5,
      vy:(Math.random()-0.5)*1.5,
      color:`rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)},0.3)`
    });
  }
}
function animate(){
  ctx.clearRect(0,0,w,h);
  for(let s of shapes){
    s.x+=s.vx; s.y+=s.vy;
    if(s.x<0)s.x=w;if(s.x>w)s.x=0;
    if(s.y<0)s.y=h;if(s.y>h)s.y=0;
    ctx.beginPath();
    ctx.fillStyle=s.color;
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fill();
  }
  requestAnimationFrame(animate);
}
function startShapes(){resizeCanvas();animate();}

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
  if(email) alert(`We'll notify ${email} when the cure drops 🎵`);
  else alert("Enter your email first!");
});

// Start
window.addEventListener("load", ()=>{
  startShapes();
});