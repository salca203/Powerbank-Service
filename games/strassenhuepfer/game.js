// Straßenhüpfer
function cr(o){const s=bar(()=>cr(o)),T=44,CO=9,W=T*CO,VR=13,H=T*VR,cv=$('canvas','hk'),key='cr'+o.d,DF=[.7,1,1.35][o.d],CC=['#ef476f','#ffd166','#06d6a0','#118ab2','#f4a261'];cv.width=W;cv.height=H;app.append(cv);const x=cv.getContext('2d');let best=0;try{best=+localStorage.getItem(key)||0}catch(e){}
let L,px,pr,pyr,hp,cam,sc,st,cd=0,lt=0,ride,nb,sx=0,sy=0;
const rr=(a,b,w,h,r)=>{x.beginPath();if(x.roundRect)x.roundRect(a,b,w,h,r);else x.rect(a,b,w,h)};
const mk=(i,pv)=>{if(i<3)return{t:'g',tr:[]};const r=R(10);if(r<4||(pv=='w'&&r>=7))return{t:'g',tr:[...Array(CO).keys()].filter(()=>R(5)==0)};const dir=R(2)?1:-1;
if(r<7){const n=1+R(3),v=dir*(1.2+Math.random()*2+Math.min(i/60,1.6))*DF;return{t:'r',v,cars:[...Array(n)].map((_,k)=>({x:k*W/n+R(50),w:T*(1.2+R(2)*.6),c:CC[R(5)]}))}}
return{t:'w',v:dir*(.8+Math.random()*1.2)*(o.d==2?1.2:1),logs:[0,1,2].map(k=>({x:k*W/3+R(40),w:T*(2+R(2))}))}};
const reset=()=>{L=[];for(let i=0;i<VR+8;i++)L.push(mk(i,i?L[i-1].t:'g'));px=W/2;pr=0;pyr=0;hp=null;cam=0;sc=0;st=0;ride=null;nb=0},u=()=>s.innerHTML=`Reihen ${sc} · 🏆 ${best}`;reset();u();
const die=()=>{if(st!=1)return;st=2;cd=Date.now()+500;if(sc>best){best=sc;nb=1;try{localStorage.setItem(key,best)}catch(e){}}u()};
const hop=(dx,dy)=>{if(hp||st==2)return;if(st==0)st=1;const ty=pr+dy;if(ty<0||ty<Math.floor(cam))return;const tl=L[ty];let tx;
if(dx){tx=Math.max(T/2,Math.min(W-T/2,px+dx*T));if(!ride)tx=(Math.floor(tx/T)+.5)*T}else tx=tl.t=='w'?px:(Math.floor(px/T)+.5)*T;
if(tl.t=='g'&&tl.tr.includes(Math.floor(tx/T)))return;hp={t:0,x0:px,y0:pyr,x1:tx,y1:ty};ride=null};
const act=()=>{if(st==2){if(Date.now()>cd){reset();u()}}else hop(0,1)};
cv.onpointerdown=e=>{sx=e.clientX;sy=e.clientY};cv.onpointerup=e=>{const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.abs(dx)<18&&Math.abs(dy)<18)act();else if(Math.abs(dx)>Math.abs(dy))hop(Math.sign(dx),0);else hop(0,dy<0?1:-1)};
onkeydown=e=>{const k=e.key;if(k=='ArrowUp'||k=='w'){e.preventDefault();hop(0,1)}else if(k=='ArrowDown'||k=='s'){e.preventDefault();hop(0,-1)}else if(k=='ArrowLeft'||k=='a')hop(-1,0);else if(k=='ArrowRight'||k=='d')hop(1,0);else if(k==' '){e.preventDefault();act()}};
const draw=()=>{for(let i=Math.max(0,Math.floor(cam)-1);i<cam+VR+1;i++){const l=L[i],y=H-T*(i-cam+1);
if(l.t=='g'){x.fillStyle=i%2?'#58b368':'#4fa860';x.fillRect(0,y,W,T);l.tr.forEach(c=>{x.fillStyle='#7a4b2a';x.fillRect(c*T+19,y+22,7,16);x.fillStyle='#2e7d32';x.beginPath();x.arc(c*T+22,y+18,16,0,7);x.fill();x.fillStyle='#43a047';x.beginPath();x.arc(c*T+18,y+14,9,0,7);x.fill()})}
else if(l.t=='r'){x.fillStyle='#4b5563';x.fillRect(0,y,W,T);x.fillStyle='#ffffff55';for(let k=0;k<W;k+=44)x.fillRect(k+8,y+T/2-2,22,4);l.cars.forEach(c=>{x.fillStyle='#0004';x.fillRect(c.x+3,y+9,c.w,28);x.fillStyle=c.c;rr(c.x,y+6,c.w,30,8);x.fill();x.fillStyle='#e0f2fe';x.fillRect(c.x+(l.v>0?c.w-16:6),y+11,10,20)})}
else{x.fillStyle='#3b82c4';x.fillRect(0,y,W,T);x.fillStyle='#ffffff30';for(let k=0;k<6;k++)x.fillRect(((k*90+performance.now()*.02*Math.sign(l.v))%W+W)%W,y+10+k%3*10,24,3);l.logs.forEach(g=>{x.fillStyle='#8b5a2b';rr(g.x,y+6,g.w,32,10);x.fill();x.fillStyle='#a9743a';x.fillRect(g.x+8,y+12,g.w-16,6)})}}
const by=H-T*(pyr-cam+.5),py=by-Math.sin(Math.PI*(hp?hp.t:0))*14;x.fillStyle='#0003';x.beginPath();x.ellipse(px,by+12,12,6,0,0,7);x.fill();x.fillStyle='#fff';rr(px-12,py-14,24,26,8);x.fill();x.fillStyle='#ef4444';x.fillRect(px-3,py-19,6,7);x.fillStyle='#f59e0b';x.beginPath();x.moveTo(px+12,py-4);x.lineTo(px+19,py);x.lineTo(px+12,py+3);x.fill();x.fillStyle='#111';x.beginPath();x.arc(px+5,py-6,2.5,0,7);x.fill();
x.textAlign='center';x.lineJoin='round';x.strokeStyle='#14213d';x.lineWidth=6;x.font='800 40px ui-rounded,system-ui,sans-serif';x.fillStyle='#fff';if(st){x.strokeText(sc,W/2,52);x.fillText(sc,W/2,52)}
if(st==0){x.font='800 20px ui-rounded,system-ui,sans-serif';x.strokeText('Tippen = vorwärts · Wischen = Seite/zurück',W/2,H-60);x.fillText('Tippen = vorwärts · Wischen = Seite/zurück',W/2,H-60)}
if(st==2){x.fillStyle='#14213de6';x.fillRect(40,H/2-110,W-80,200);x.fillStyle='#fff';x.strokeStyle='#0000';x.font='800 34px ui-rounded,system-ui,sans-serif';x.fillText('Erwischt!',W/2,H/2-60);x.font='700 26px ui-rounded,system-ui,sans-serif';x.fillText(`Reihen ${sc}`,W/2,H/2-15);x.fillText(nb?'Neuer Bestwert! 🏆':`Bestwert ${best}`,W/2,H/2+25);x.font='600 18px ui-rounded,system-ui,sans-serif';x.fillText('Tippen für neuen Versuch',W/2,H/2+65)}};
const go=now=>{const d=Math.min(2.5,(now-(lt||now))/16.67);lt=now;
if(st==1){L.forEach(l=>{if(l.t=='r')l.cars.forEach(c=>{c.x+=l.v*d;if(l.v>0&&c.x>W)c.x=-c.w;if(l.v<0&&c.x<-c.w)c.x=W});if(l.t=='w')l.logs.forEach(g=>{g.x+=l.v*d;if(l.v>0&&g.x>W)g.x=-g.w;if(l.v<0&&g.x<-g.w)g.x=W})});
if(hp){hp.t=Math.min(1,hp.t+d*16.67/120);px=hp.x0+(hp.x1-hp.x0)*hp.t;pyr=hp.y0+(hp.y1-hp.y0)*hp.t;if(hp.t>=1){pr=hp.y1;pyr=pr;px=hp.x1;hp=null;if(pr>sc){sc=pr;u()}const l=L[pr];if(l.t=='w'){const g=l.logs.find(g=>px>=g.x&&px<=g.x+g.w);if(g)ride={g,o:px-g.x};else die()}}}
else if(ride){px=ride.g.x+ride.o;if(px<0||px>W)die()}
const l=L[Math.round(pyr)];if(l&&l.t=='r'&&Math.abs(pyr-Math.round(pyr))<.45)l.cars.forEach(c=>{if(px+13>c.x&&px-13<c.x+c.w)die()});
const tg=Math.max(0,pr-3.4);cam+=Math.max(0,tg-cam)*.08*d+.0025*DF*d*(1+sc/120);if(pyr<cam-.2)die();while(L.length<cam+VR+8)L.push(mk(L.length,L[L.length-1].t))}
draw();raf=requestAnimationFrame(go)};raf=requestAnimationFrame(go)}

registerGame({"id": "strassenhuepfer", "n": "Straßenhüpfer", "i": "🐔", "cat": "Action", "c": ["#22c55e", "#0ea5e9"], "fl": "nt", "pl": "1", "rules": "Tippen hüpft vorwärts, Wischen zur Seite oder zurück. Weiche Autos aus, nutze Baumstämme im Wasser und lass dich nicht vom Bildrand einholen.", "o": [["d", "Schwierigkeit", [["Leicht", 0], ["Mittel", 1], ["Schwer", 2]], 1]],f:cr});
