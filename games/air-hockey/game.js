// Air Hockey (Querformat: Spieler 1 links, Spieler 2 oder Computer rechts)
function hockey(o){const s=bar(()=>hockey(o)),W=700,H=400,GH=70,WIN=o.w,SPD=[3.6,5.6,8.2][o.d??1],cv=$('canvas','hk');cv.width=W;cv.height=H;app.append(cv);const x=cv.getContext('2d'),cl=[0,1].map(i=>getComputedStyle(document.documentElement).getPropertyValue('--p'+i));
let pk={x:W/2,y:H/2,vx:0,vy:0},pd=[{x:90,y:H/2,px:90,py:H/2,vx:0,vy:0},{x:W-90,y:H/2,px:W-90,py:H/2,vx:0,vy:0}],sc=[0,0],hold=60,ids={},over=0;
const u=()=>s.innerHTML=over?`${dot(over-1)}${names[over-1]} gewinnt! 🏆`:`${dot(0)}${names[0]} ${sc[0]} : ${sc[1]} ${names[1]}${dot(1)}`;u();
const pos=e=>{const r=cv.getBoundingClientRect();return{x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*H/r.height}};
const mvp=e=>{const i=ids[e.pointerId];if(i==null)return;const p=pos(e),q=pd[i];q.y=Math.max(35,Math.min(H-35,p.y));q.x=i?Math.max(W/2+35,Math.min(W-35,p.x)):Math.max(35,Math.min(W/2-35,p.x))};
cv.onpointerdown=e=>{cv.setPointerCapture(e.pointerId);ids[e.pointerId]=o.m==1?0:pos(e).x<W/2?0:1;mvp(e)};cv.onpointermove=e=>{if(e.pointerType=='mouse'&&o.m==1)ids[e.pointerId]=0;mvp(e)};cv.onpointerup=cv.onpointercancel=e=>delete ids[e.pointerId];
const ball=(px,py,r,c)=>{x.fillStyle=c;x.beginPath();x.arc(px,py,r,0,7);x.fill()};
const tick=()=>{pd.forEach(p=>{p.vx=p.x-p.px;p.vy=p.y-p.py;p.px=p.x;p.py=p.y});
if(o.m==1){const a=pd[1];let tx,ty;if(pk.x>W/2-20){tx=Math.min(W-35,Math.max(W/2+35,pk.x+46));ty=pk.y}else{tx=W-80;ty=H/2+(pk.y-H/2)*.35}
const dx=tx-a.x,dy=ty-a.y,d=Math.hypot(dx,dy)||1,m=Math.min(SPD,d);a.x+=dx/d*m;a.y+=dy/d*m;a.x=Math.max(W/2+35,Math.min(W-35,a.x));a.y=Math.max(35,Math.min(H-35,a.y))}
if(hold>0)hold--;else if(!over){pk.x+=pk.vx;pk.y+=pk.vy;pk.vx*=.995;pk.vy*=.995;const g=Math.abs(pk.y-H/2)<GH;
if(pk.y<14||pk.y>H-14){pk.y=Math.max(14,Math.min(H-14,pk.y));pk.vy*=-1}if(pk.x<14&&!g){pk.x=14;pk.vx*=-1}if(pk.x>W-14&&!g){pk.x=W-14;pk.vx*=-1}
pd.forEach(p=>{const dx=pk.x-p.x,dy=pk.y-p.y,d=Math.hypot(dx,dy);if(d<49&&d>0){const nx=dx/d,ny=dy/d;pk.x=p.x+nx*49;pk.y=p.y+ny*49;const v=(pk.vx-p.vx)*nx+(pk.vy-p.vy)*ny;if(v<0){pk.vx-=2*v*nx;pk.vy-=2*v*ny}}});
const m=Math.hypot(pk.vx,pk.vy);if(m>18){pk.vx*=18/m;pk.vy*=18/m}
if(pk.x<-14||pk.x>W+14){const w=pk.x<0?1:0;sc[w]++;pk={x:W/2,y:H/2,vx:0,vy:0};hold=80;if(sc[w]>=WIN)over=w+1;u()}}
x.clearRect(0,0,W,H);x.fillStyle='#ffffff10';x.fillRect(0,0,W/2,H);x.strokeStyle='#fff8';x.lineWidth=4;x.beginPath();x.moveTo(W/2,0);x.lineTo(W/2,H);x.stroke();x.beginPath();x.arc(W/2,H/2,60,0,7);x.stroke();
x.strokeStyle=cl[0];x.beginPath();x.moveTo(2,H/2-GH);x.lineTo(2,H/2+GH);x.stroke();x.strokeStyle=cl[1];x.beginPath();x.moveTo(W-2,H/2-GH);x.lineTo(W-2,H/2+GH);x.stroke();
pd.forEach((p,i)=>{ball(p.x,p.y,35,cl[i]);ball(p.x,p.y,18,'#0003')});ball(pk.x,pk.y,14,'#fff');
x.fillStyle='#ffffffaa';x.font='800 40px ui-rounded,system-ui,sans-serif';x.textAlign='center';x.fillText(sc[0],W/2-60,50);x.fillText(sc[1],W/2+60,50);
if(hold>0&&!over&&sc[0]+sc[1]==0){x.font='700 18px ui-rounded,system-ui,sans-serif';x.fillText(o.m==1?'Du spielst links: Finger oder Maus bewegt den Schläger':'Linke Seite: Spieler 1 · rechte Seite: Spieler 2',W/2,H-24)}
if(over){x.fillStyle='#000a';x.fillRect(W/2-170,H/2-60,340,120);x.fillStyle='#fff';x.font='800 32px ui-rounded,system-ui,sans-serif';x.fillText(`${names[over-1]} gewinnt! 🏆`,W/2,H/2+10);x.font='600 16px ui-rounded,system-ui,sans-serif';x.fillText('Neu starten mit ↻',W/2,H/2+40)}
raf=requestAnimationFrame(tick)};tick()}

registerGame({"id": "air-hockey", "n": "Air Hockey", "i": "🏒", "cat": "Action", "c": ["#0ea5e9", "#1e3a8a"], "fl": "t", "pl": "1–2", "rules": "Schiebe deinen Schläger und schieße den Puck ins gegnerische Tor. Spieler 1 sitzt links, Spieler 2 (oder der Computer) rechts.", "o": [["m", "Gegner", [["Computer", 1], ["Zu zweit", 2]]], ["d", "Computer-Stärke", [["Leicht", 0], ["Mittel", 1], ["Schwer", 2]], 1], ["w", "Tore bis zum Sieg", [["3", 3], ["5", 5], ["7", 7]], 1]],f:hockey});
