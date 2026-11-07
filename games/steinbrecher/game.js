// Steinbrecher
function brk(o){const s=bar(()=>brk(o)),W=400,H=560,cv=$('canvas','hk'),key='br',CL=['#ef476f','#f97316','#facc15','#2dc26b','#38bdf8','#a855f7'];cv.width=W;cv.height=H;app.append(cv);const x=cv.getContext('2d');let best=0;try{best=+localStorage.getItem(key)||0}catch(e){}
let br,px=W/2,pw=84,bl,lives,sc,lv,st,lt=0,nb=0,cd=0;
const level=()=>{br=[];const rows=Math.min(4+lv,8);for(let r=0;r<rows;r++)for(let c=0;c<8;c++)if(lv<2||(r+c+lv)%7)br.push({x:c*48+8,y:70+r*24,w:44,h:20,c:CL[r%6],r})},ready=()=>{bl={x:px,y:512,vx:0,vy:0,on:1}};
const reset=()=>{lives=3;sc=0;lv=1;st=0;nb=0;level();ready()},u=()=>s.innerHTML=`Punkte ${sc} · Level ${lv} · ${'❤️'.repeat(lives)} · 🏆 ${best}`;reset();u();
const spd=()=>5+lv*.45,launch=()=>{if(st==0)st=1;if(st==1&&bl.on){bl.on=0;bl.vx=spd()*.4*(R(2)?1:-1);bl.vy=-spd()*.92}else if(st==2&&Date.now()>cd){reset();u()}};
const pos=e=>{const r=cv.getBoundingClientRect();px=Math.max(pw/2,Math.min(W-pw/2,(e.clientX-r.left)*W/r.width))};
cv.onpointermove=pos;cv.onpointerdown=e=>{pos(e);launch()};onkeydown=e=>{if(e.key=='ArrowLeft')px=Math.max(pw/2,px-26);if(e.key=='ArrowRight')px=Math.min(W-pw/2,px+26);if(e.key==' '){e.preventDefault();launch()}};
const lose=()=>{lives--;if(lives<=0){st=2;cd=Date.now()+600;if(sc>best){best=sc;nb=1;try{localStorage.setItem(key,best)}catch(e){}}}else ready();u()};
const step=d=>{if(st!=1)return;if(bl.on){bl.x=px;return}const sp=Math.hypot(bl.vx,bl.vy),n=Math.ceil(sp*d/4);for(let i=0;i<n;i++){const ox=bl.x,oy=bl.y;bl.x+=bl.vx*d/n;bl.y+=bl.vy*d/n;
if(bl.x<8){bl.x=8;bl.vx=Math.abs(bl.vx)}if(bl.x>W-8){bl.x=W-8;bl.vx=-Math.abs(bl.vx)}if(bl.y<8){bl.y=8;bl.vy=Math.abs(bl.vy)}
if(bl.vy>0&&bl.y+8>=516&&oy+8<=520&&bl.x>px-pw/2-6&&bl.x<px+pw/2+6){const rel=(bl.x-px)/(pw/2+6),a=rel*1.05;const v=Math.min(11,sp*1.01);bl.vx=Math.sin(a)*v;bl.vy=-Math.cos(a)*v}
const k=br.findIndex(b=>bl.x>b.x-8&&bl.x<b.x+b.w+8&&bl.y>b.y-8&&bl.y<b.y+b.h+8);if(k>=0){const b=br[k];if(oy<=b.y-8||oy>=b.y+b.h+8)bl.vy*=-1;else bl.vx*=-1;br.splice(k,1);sc+=10+(5-Math.min(b.r,5))*2;u();break}}
if(bl.y>H+10)lose();if(!br.length){lv++;sc+=100;level();ready();u()}};
const draw=()=>{const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#1b1550');g.addColorStop(1,'#2a1a5e');x.fillStyle=g;x.fillRect(0,0,W,H);br.forEach(b=>{x.fillStyle=b.c;x.fillRect(b.x,b.y,b.w,b.h);x.fillStyle='#ffffff40';x.fillRect(b.x,b.y,b.w,5);x.fillStyle='#00000030';x.fillRect(b.x,b.y+b.h-4,b.w,4)});
x.fillStyle='#e5e7eb';x.fillRect(px-pw/2,520,pw,12);x.fillStyle='#8b5cf6';x.fillRect(px-pw/2,520,pw,4);x.fillStyle='#fff';x.beginPath();x.arc(bl.x,bl.y,8,0,7);x.fill();
x.textAlign='center';x.fillStyle='#fff';x.font='800 20px ui-rounded,system-ui,sans-serif';if(st==0||(st==1&&bl.on))x.fillText('Tippen zum Abschuss · Finger bewegt den Schläger',W/2,H/2+70);
if(st==2){x.fillStyle='#000c';x.fillRect(40,H/2-110,W-80,200);x.fillStyle='#fff';x.font='800 32px ui-rounded,system-ui,sans-serif';x.fillText('Game Over',W/2,H/2-60);x.font='700 24px ui-rounded,system-ui,sans-serif';x.fillText(`Punkte ${sc}`,W/2,H/2-20);x.fillText(nb?'Neuer Bestwert! 🏆':`Bestwert ${best}`,W/2,H/2+15);x.font='600 16px ui-rounded,system-ui,sans-serif';x.fillText('Tippen für neues Spiel',W/2,H/2+60)}};
const go=now=>{const d=Math.min(2.5,(now-(lt||now))/16.67);lt=now;step(d);draw();raf=requestAnimationFrame(go)};raf=requestAnimationFrame(go)}

registerGame({"id": "steinbrecher", "n": "Steinbrecher", "i": "🏓", "cat": "Action", "c": ["#ec4899", "#6366f1"], "fl": "n", "pl": "1", "rules": "Bewege den Schläger mit dem Finger oder der Maus und lass den Ball alle Steine zerstören. Du hast drei Leben, jedes Level wird schneller.", "o": [],f:brk});
