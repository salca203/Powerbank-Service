// Air Hockey
function hockey(o){const s=bar(()=>hockey(o)),W=400,H=700,cv=$('canvas','hk');cv.width=W;cv.height=H;app.append(cv);const x=cv.getContext('2d'),cl=[0,1].map(i=>getComputedStyle(document.documentElement).getPropertyValue('--p'+i));
let pk={x:W/2,y:H/2,vx:0,vy:0},pd=[{x:200,y:90,px:200,py:90,vx:0,vy:0},{x:200,y:610,px:200,py:610,vx:0,vy:0}],sc=[0,0],hold=60,ids={},over=0;
const u=()=>s.innerHTML=over?`${dot(over-1)}${names[over-1]} gewinnt! 🏆`:`${dot(0)}${sc[0]} : ${sc[1]}${dot(1)}`;u();
const pos=e=>{const r=cv.getBoundingClientRect();return{x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*H/r.height}};
const mvp=e=>{const i=ids[e.pointerId];if(i==null)return;const p=pos(e);pd[i].x=Math.max(35,Math.min(W-35,p.x));pd[i].y=i?Math.max(H/2+35,Math.min(H-35,p.y)):Math.max(35,Math.min(H/2-35,p.y))};
cv.onpointerdown=e=>{cv.setPointerCapture(e.pointerId);ids[e.pointerId]=o.m==1?1:pos(e).y<H/2?0:1;mvp(e)};cv.onpointermove=e=>{if(e.pointerType=='mouse'&&o.m==1)ids[e.pointerId]=1;mvp(e)};cv.onpointerup=cv.onpointercancel=e=>delete ids[e.pointerId];
const ball=(px,py,r,c)=>{x.fillStyle=c;x.beginPath();x.arc(px,py,r,0,7);x.fill()};
const tick=()=>{pd.forEach(p=>{p.vx=p.x-p.px;p.vy=p.y-p.py;p.px=p.x;p.py=p.y});
if(o.m==1){const a=pd[0],ty=pk.y<H/2-20?Math.min(pk.y-45,H/2-40):80;a.x+=Math.max(-6,Math.min(6,pk.x-a.x));a.y+=Math.max(-6,Math.min(6,Math.max(35,ty)-a.y))}
if(hold>0)hold--;else if(!over){pk.x+=pk.vx;pk.y+=pk.vy;pk.vx*=.995;pk.vy*=.995;const g=Math.abs(pk.x-W/2)<70;
if(pk.x<14||pk.x>W-14){pk.x=Math.max(14,Math.min(W-14,pk.x));pk.vx*=-1}if(pk.y<14&&!g){pk.y=14;pk.vy*=-1}if(pk.y>H-14&&!g){pk.y=H-14;pk.vy*=-1}
pd.forEach(p=>{const dx=pk.x-p.x,dy=pk.y-p.y,d=Math.hypot(dx,dy);if(d<49&&d>0){const nx=dx/d,ny=dy/d;pk.x=p.x+nx*49;pk.y=p.y+ny*49;const v=(pk.vx-p.vx)*nx+(pk.vy-p.vy)*ny;if(v<0){pk.vx-=2*v*nx;pk.vy-=2*v*ny}}});
const m=Math.hypot(pk.vx,pk.vy);if(m>18){pk.vx*=18/m;pk.vy*=18/m}
if(pk.y<-14||pk.y>H+14){const w=pk.y<0?1:0;sc[w]++;pk={x:W/2,y:H/2,vx:0,vy:0};hold=80;if(sc[w]>=5)over=w+1;u()}}
x.clearRect(0,0,W,H);x.strokeStyle='#fff8';x.lineWidth=4;x.beginPath();x.moveTo(0,H/2);x.lineTo(W,H/2);x.stroke();x.beginPath();x.arc(W/2,H/2,60,0,7);x.stroke();
x.strokeStyle='#ffd166';x.beginPath();x.moveTo(W/2-70,2);x.lineTo(W/2+70,2);x.moveTo(W/2-70,H-2);x.lineTo(W/2+70,H-2);x.stroke();
pd.forEach((p,i)=>ball(p.x,p.y,35,cl[i]));ball(pk.x,pk.y,14,'#fff');raf=requestAnimationFrame(tick)};tick()}

registerGame({"id": "air-hockey", "n": "Air Hockey", "i": "🏒", "cat": "Action", "c": ["#0ea5e9", "#1e3a8a"], "fl": "t", "pl": "1–2", "rules": "Schläger mit Finger oder Maus bewegen. Wer zuerst 5 Tore schießt, gewinnt.", "o": [["m", "Gegner", [["Computer", 1], ["Zu zweit", 2]]]],f:hockey});
