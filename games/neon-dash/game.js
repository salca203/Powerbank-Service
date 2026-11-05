// Neon-Dash
function dash(o){const s=bar(()=>dash(o)),W=800,H=400,GY=320,PX=150,cv=$('canvas','hk'),key='nd';cv.width=W;cv.height=H;app.append(cv);const x=cv.getContext('2d');let best=0;try{best=+localStorage.getItem(key)||0}catch(e){}
let st,y,vy,rot,ob,dist,nxt,cd=0,nb=0,lt=0,hold=0,lm=-1;
const reset=()=>{st=0;y=GY-36;vy=0;rot=0;ob=[];dist=0;nxt=500;nb=0},u=()=>s.innerHTML=`Level ${Math.floor(dist/1500)+1} · Distanz ${Math.floor(dist/10)} m · 🏆 ${best} m`;reset();u();
const die=()=>{if(st!=1)return;st=2;cd=Date.now()+500;const m=Math.floor(dist/10);if(m>best){best=m;nb=1;try{localStorage.setItem(key,best)}catch(e){}}u()};
const press=v=>{hold=v;if(v){if(st==0)st=1;else if(st==2&&Date.now()>cd){reset();u()}}};
cv.onpointerdown=()=>press(1);cv.onpointerup=cv.onpointercancel=()=>press(0);
onkeydown=e=>{if(e.key==' '||e.key=='ArrowUp'){e.preventDefault();if(!e.repeat)press(1)}};onkeyup=e=>{if(e.key==' '||e.key=='ArrowUp')press(0)};
const draw=()=>{const hu=(dist/25)%360;x.fillStyle=`hsl(${hu} 55% 13%)`;x.fillRect(0,0,W,H);x.strokeStyle=`hsl(${hu} 70% 35%)`;x.lineWidth=2;for(let i=0;i<14;i++){const gx=((i*70-dist*.4)%980+980)%980-70;x.beginPath();x.moveTo(gx,0);x.lineTo(gx,GY);x.stroke()}
x.fillStyle=`hsl(${hu} 60% 22%)`;x.fillRect(0,GY,W,H-GY);x.fillStyle=`hsl(${hu} 100% 65%)`;x.fillRect(0,GY,W,4);
ob.forEach(b=>{if(b.t){x.fillStyle=`hsl(${hu} 50% 20%)`;x.fillRect(b.x,GY-b.h,b.w,b.h);x.strokeStyle=`hsl(${hu} 100% 65%)`;x.lineWidth=3;x.strokeRect(b.x+1.5,GY-b.h+1.5,b.w-3,b.h-3)}else for(let i=0;i<b.w/36;i++){x.fillStyle='#fff';x.beginPath();x.moveTo(b.x+i*36,GY);x.lineTo(b.x+i*36+18,GY-36);x.lineTo(b.x+i*36+36,GY);x.fill()}});
x.save();x.translate(PX+18,y+18);x.rotate(rot);x.shadowBlur=18;x.shadowColor='#ffd166';x.fillStyle='#ffd166';x.fillRect(-18,-18,36,36);x.fillStyle='#14213d';x.fillRect(-9,-9,6,10);x.fillRect(5,-9,6,10);x.restore();
x.fillStyle='#fff';x.textAlign='center';x.font='800 30px ui-rounded,system-ui,sans-serif';
if(st==0)x.fillText('Tippen zum Starten, halten für Dauersprung',W/2,120);
if(st==2){x.fillStyle='#000a';x.fillRect(220,80,360,170);x.fillStyle='#fff';x.fillText('Crash!',W/2,130);x.font='700 24px ui-rounded,system-ui,sans-serif';x.fillText(`${Math.floor(dist/10)} m`,W/2,170);x.fillText(nb?'Neuer Bestwert! 🏆':`Bestwert ${best} m`,W/2,205);x.font='600 16px ui-rounded,system-ui,sans-serif';x.fillText('Tippen für neuen Versuch',W/2,235)}};
const spawn=()=>{const sp=6+Math.min(dist/2000,6),lv=Math.floor(dist/1500),k=R(3+Math.min(lv,3)),X=W+40,add=(dx,w,h,t)=>ob.push({x:X+dx,w,h,t});
if(k==0)add(0,36,36,0);else if(k==1)add(0,72,36,0);else if(k==2)add(0,60,40+R(3)*20,1);else if(k==3)add(0,108,36,0);else if(k==4){add(0,60,40,1);add(60,60,80,1)}else{add(0,36,36,0);add(36*sp+70,36,36,0)}
nxt=dist+[36,72,60,108,120,36*sp+106][k]+36*sp+60+R(Math.max(20,160-lv*25))};
const go=now=>{const d=Math.min(2.5,(now-(lt||now))/16.67);lt=now;
if(st==1){const sp=(6+Math.min(dist/2000,6))*d;dist+=sp;vy+=.62*d;y+=vy*d;let fl=GY;
ob.forEach(b=>{b.x-=sp;const ov=PX+36>b.x+4&&PX<b.x+b.w-4;if(b.t&&ov){if(y+36<=GY-b.h+16)fl=Math.min(fl,GY-b.h);else die()}else if(!b.t&&ov&&y+36>GY-26)die()});
if(y+36>=fl){y=fl-36;vy=0;rot=Math.round(rot/(Math.PI/2))*(Math.PI/2);if(hold)vy=-11.2}else rot+=.085*d;
ob=ob.filter(b=>b.x>-120);if(dist>=nxt)spawn();
const m=Math.floor(dist/10);if(m!=lm){lm=m;u()}}
draw();raf=requestAnimationFrame(go)};raf=requestAnimationFrame(go)}

registerGame({"id": "neon-dash", "n": "Neon-Dash", "i": "🟨", "cat": "Action", "c": ["#06b6d4", "#6d28d9"], "fl": "nt", "pl": "1", "rules": "Tippen oder Leertaste zum Springen, halten für Dauersprung. Das Tempo steigt, und die Hindernisse werden mit der Zeit gemeiner: Spitzen, Blöcke, Treppen.", "o": [],f:dash});
