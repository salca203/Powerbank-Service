// Steinbrecher: Level-Muster, harte Steine, 10 Power-ups
function brk(o){const s=bar(()=>brk(o)),W=400,H=560,cv=$('canvas','hk'),key='br'+o.d,CL=['#ef476f','#f97316','#facc15','#2dc26b','#38bdf8','#a855f7'],DM=[.9,1,1.1][o.d],LV0=[5,3,2][o.d],DR=[.24,.18,.13][o.d];cv.width=W;cv.height=H;app.append(cv);const x=cv.getContext('2d');let best=0;try{best=+localStorage.getItem(key)||0}catch(e){}
// Power-ups: Buchstabe, Farbe, Dauer in Sekunden (0 = sofort), gut/schlecht
const PU={W:['W','#2dc26b',14,1,'Breiter Schläger'],N:['N','#ef476f',10,0,'Schmaler Schläger'],M:['M','#38bdf8',0,1,'Multiball'],F:['F','#f97316',9,1,'Feuerball'],L:['L','#a855f7',10,1,'Laser'],S:['S','#22d3ee',10,1,'Langsamer Ball'],K:['K','#facc15',15,1,'Klebriger Schläger'],Z:['Z','#be123c',8,0,'Schneller Ball'],H:['♥','#ff6b8b',0,1,'Extra Leben'],B:['B','#e5e7eb',0,1,'Schutzschild']};
const GOOD='WWMMFLSKHB',BAD='NZ';
let br,px=W/2,pw=84,bl,caps,shots,E,lives,sc,lv,st,shield,lt=0,nb=0,cd=0,la=0,msg='',mt=0;
const LAY=[()=>1,(r,c)=>(r+c)%2?1:0,(r,c)=>Math.abs(c-3.5)<=r+.5?1:0,(r,c)=>c%2==0||r==0?1:0,(r,c)=>Math.abs(c-3.5)+Math.abs(r-3)<=4?1:0,(r,c)=>r==0||r==5||c==0||c==7?1:(r>1&&r<4&&c>1&&c<6?2:0)];
const level=()=>{br=[];const p=(lv-1)%6,rows=p==2?6:p==4||p==5?6:Math.min(4+Math.floor(lv/2),8);for(let r=0;r<rows;r++)for(let c=0;c<8;c++){let h=LAY[p](r,c);if(!h)continue;if(lv>=2&&R(100)<8+lv*3)h=Math.min(3,h+1);br.push({x:c*48+8,y:70+r*24,w:44,h:20,c:CL[r%6],r,hp:h})}if(!br.length)br.push({x:176,y:100,w:44,h:20,c:CL[0],r:0,hp:1})};
const ready=()=>{bl=[{x:px,y:512,vx:0,vy:0,on:1,off:0}]};
const reset=()=>{lives=LV0;sc=0;lv=1;st=0;nb=0;shield=0;caps=[];shots=[];E={W:0,N:0,F:0,L:0,S:0,K:0,Z:0};level();ready()},u=()=>s.innerHTML=`Punkte ${sc} · Level ${lv} · ${'❤️'.repeat(lives)} · 🏆 ${best}`;reset();u();
const spd=()=>Math.min(9.5,4.8+lv*.4)*DM*(E.S>0?.7:1)*(E.Z>0?1.3:1);
const launch=()=>{if(st==0)st=1;if(st==1&&bl.some(b=>b.on)){bl.forEach(b=>{if(b.on){b.on=0;const a=b.off?b.off/(pw/2)*.9:(R(2)?1:-1)*.4;b.vx=Math.sin(a)*spd();b.vy=-Math.cos(a)*spd()}})}else if(st==2&&Date.now()>cd){reset();u()}};
const pos=e=>{const r=cv.getBoundingClientRect();px=Math.max(pw/2,Math.min(W-pw/2,(e.clientX-r.left)*W/r.width))};
cv.onpointermove=pos;cv.onpointerdown=e=>{pos(e);launch()};onkeydown=e=>{if(e.key=='ArrowLeft')px=Math.max(pw/2,px-28);if(e.key=='ArrowRight')px=Math.min(W-pw/2,px+28);if(e.key==' '){e.preventDefault();launch()}};
const say=m=>{msg=m;mt=1400};
const give=k=>{const p=PU[k];sc+=25;say(p[4]);if(k=='H'){lives=Math.min(6,lives+1)}else if(k=='B')shield=1;else if(k=='M'){const src=bl.filter(b=>!b.on);if(src.length){const b=src[0],sp=Math.hypot(b.vx,b.vy)||spd(),a=Math.atan2(b.vy,b.vx);[-.45,.45].forEach(da=>bl.push({x:b.x,y:b.y,vx:Math.cos(a+da)*sp,vy:Math.sin(a+da)*sp,on:0,off:0}))}}
else{if(k=='W')E.N=0;if(k=='N')E.W=0;if(k=='S')E.Z=0;if(k=='Z')E.S=0;E[k]=p[2]*1000}u()};
const hit=(b,dmg)=>{b.hp-=dmg;if(b.hp<=0){br.splice(br.indexOf(b),1);sc+=10+(5-Math.min(b.r,5))*2;if(Math.random()<DR){const pl=R(100)<22?BAD:GOOD;caps.push({x:b.x+b.w/2,y:b.y+10,k:pl[R(pl.length)]})}}else sc+=3};
const lose=()=>{lives--;E={W:0,N:0,F:0,L:0,S:0,K:0,Z:0};shield=0;caps=[];shots=[];if(lives<=0){st=2;cd=Date.now()+600;if(sc>best){best=sc;nb=1;try{localStorage.setItem(key,best)}catch(e){}}}else ready();u()};
const step=d=>{if(st!=1)return;for(const k in E)if(E[k]>0)E[k]=Math.max(0,E[k]-16.67*d);pw=84*(E.W>0?1.5:1)*(E.N>0?.65:1);px=Math.max(pw/2,Math.min(W-pw/2,px));
if(E.L>0){la-=16.67*d;if(la<=0){la=380;shots.push({x:px-pw/2+6,y:516},{x:px+pw/2-6,y:516})}}
shots.forEach(sh=>sh.y-=9*d);shots=shots.filter(sh=>{if(sh.y<0)return 0;const b=br.find(b=>sh.x>b.x&&sh.x<b.x+b.w&&sh.y>b.y&&sh.y<b.y+b.h);if(b){hit(b,1);return 0}return 1});
caps.forEach(c=>c.y+=2.4*d);caps=caps.filter(c=>{if(c.y>H+20)return 0;if(c.y>508&&c.y<540&&c.x>px-pw/2-14&&c.x<px+pw/2+14){give(c.k);return 0}return 1});
const T=spd();bl.forEach(b=>{if(b.on){b.x=Math.max(8,Math.min(W-8,px+b.off));b.y=512;return}const n=Math.ceil(T*d/4);let sp=Math.hypot(b.vx,b.vy)||1;b.vx*=T/sp;b.vy*=T/sp;
for(let i=0;i<n;i++){const ox=b.x,oy=b.y;b.x+=b.vx*d/n;b.y+=b.vy*d/n;
if(b.x<8){b.x=8;b.vx=Math.abs(b.vx)}if(b.x>W-8){b.x=W-8;b.vx=-Math.abs(b.vx)}if(b.y<8){b.y=8;b.vy=Math.abs(b.vy)}
if(b.vy>0&&b.y+8>=516&&oy+8<=522&&b.x>px-pw/2-6&&b.x<px+pw/2+6){if(E.K>0){b.on=1;b.off=b.x-px;b.vx=b.vy=0;break}const rel=(b.x-px)/(pw/2+6),a=rel*1.05;b.vx=Math.sin(a)*T;b.vy=-Math.cos(a)*T}
if(shield&&b.vy>0&&b.y+8>=548){shield=0;b.vy=-Math.abs(b.vy);b.y=538}
const k=br.find(q=>b.x>q.x-8&&b.x<q.x+q.w+8&&b.y>q.y-8&&b.y<q.y+q.h+8);if(k){if(E.F>0){hit(k,9)}else{if(oy<=k.y-8||oy>=k.y+k.h+8)b.vy*=-1;else b.vx*=-1;hit(k,1);u();break}u()}}});
bl=bl.filter(b=>b.y<H+10);if(!bl.length)lose();
if(st==1&&!br.length){lv++;sc+=100;level();caps=[];shots=[];ready();say('Level '+lv);u()}};
const draw=()=>{const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#1b1550');g.addColorStop(1,'#2a1a5e');x.fillStyle=g;x.fillRect(0,0,W,H);
br.forEach(b=>{x.fillStyle=b.hp>1?(b.hp>2?'#d4a72c':'#9aa5b8'):b.c;x.fillRect(b.x,b.y,b.w,b.h);x.fillStyle='#ffffff40';x.fillRect(b.x,b.y,b.w,5);x.fillStyle='#00000030';x.fillRect(b.x,b.y+b.h-4,b.w,4);if(b.hp>1){x.strokeStyle='#fff';x.lineWidth=2;x.strokeRect(b.x+2,b.y+2,b.w-4,b.h-4)}});
if(shield){x.fillStyle='#e5e7eb';x.fillRect(0,546,W,4)}
shots.forEach(sh=>{x.fillStyle='#e9d5ff';x.fillRect(sh.x-1.5,sh.y,3,12)});
x.font='900 15px ui-rounded,system-ui,sans-serif';x.textAlign='center';caps.forEach(c=>{const p=PU[c.k];x.fillStyle=p[1];x.beginPath();if(x.roundRect)x.roundRect(c.x-16,c.y-9,32,18,9);else x.rect(c.x-16,c.y-9,32,18);x.fill();x.fillStyle=p[3]?'#14213d':'#fff';x.fillText(p[0],c.x,c.y+5)});
x.fillStyle=E.K>0?'#facc15':'#e5e7eb';x.fillRect(px-pw/2,520,pw,12);x.fillStyle=E.L>0?'#a855f7':'#8b5cf6';x.fillRect(px-pw/2,520,pw,4);
bl.forEach(b=>{x.fillStyle=E.F>0?'#fb923c':'#fff';x.shadowColor=E.F>0?'#f97316':'#fff';x.shadowBlur=E.F>0?14:0;x.beginPath();x.arc(b.x,b.y,8,0,7);x.fill();x.shadowBlur=0});
let ax=8;x.font='800 12px ui-rounded,system-ui,sans-serif';x.textAlign='left';for(const k in E)if(E[k]>0){const p=PU[k];x.fillStyle=p[1];x.fillRect(ax,H-18,34,14);x.fillStyle=p[3]?'#14213d':'#fff';x.fillText(p[0]+' '+Math.ceil(E[k]/1000),ax+3,H-7);ax+=38}
x.textAlign='center';x.fillStyle='#fff';x.font='800 20px ui-rounded,system-ui,sans-serif';
if(st==0||(st==1&&bl.some(b=>b.on)))x.fillText('Tippen zum Abschuss · Finger bewegt den Schläger',W/2,H/2+70);
if(mt>0){x.globalAlpha=Math.min(1,mt/400);x.font='900 26px ui-rounded,system-ui,sans-serif';x.fillText(msg,W/2,H/2+30);x.globalAlpha=1}
if(st==2){x.fillStyle='#000c';x.fillRect(40,H/2-110,W-80,200);x.fillStyle='#fff';x.font='800 32px ui-rounded,system-ui,sans-serif';x.fillText('Game Over',W/2,H/2-60);x.font='700 24px ui-rounded,system-ui,sans-serif';x.fillText(`Punkte ${sc} · Level ${lv}`,W/2,H/2-20);x.fillText(nb?'Neuer Bestwert! 🏆':`Bestwert ${best}`,W/2,H/2+15);x.font='600 16px ui-rounded,system-ui,sans-serif';x.fillText('Tippen für neues Spiel',W/2,H/2+60)}};
const go=now=>{const d=Math.min(2.5,(now-(lt||now))/16.67);lt=now;if(mt>0)mt-=16.67*d;step(d);draw();raf=requestAnimationFrame(go)};raf=requestAnimationFrame(go)}

registerGame({"id": "steinbrecher", "n": "Steinbrecher", "i": "🏓", "cat": "Action", "c": ["#ec4899", "#6366f1"], "fl": "n", "pl": "1", "rules": "Lenke den Ball mit dem Schläger und zerstöre alle Steine. Aus zerstörten Steinen fallen Power-ups, die du mit dem Schläger auffängst. Jedes Level hat ein neues Muster und harte Steine.", "o": [["d", "Schwierigkeit", [["Leicht · 5 Leben", 0], ["Mittel · 3 Leben", 1], ["Schwer · 2 Leben", 2]], 1]],f:brk});
