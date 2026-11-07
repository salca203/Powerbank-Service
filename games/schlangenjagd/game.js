// Schlangenjagd
function snk(o){const s=bar(()=>snk(o)),N=20,C=20,W=N*C,cv=$('canvas','hk'),key='sn'+o.t,TICK=[150,110,80][o.t];cv.width=cv.height=W;app.append(cv);const x=cv.getContext('2d');let best=0;try{best=+localStorage.getItem(key)||0}catch(e){}
let sn,dir,nd,food,sc,st,acc=0,lt=0,cd=0,nb=0,sx=0,sy=0,pop=0;
const put=()=>{do{food=[R(N),R(N)]}while(sn.some(p=>p[0]==food[0]&&p[1]==food[1]))},reset=()=>{sn=[[10,10],[9,10],[8,10]];dir=[1,0];nd=[1,0];sc=0;st=0;nb=0;acc=0;put()},u=()=>s.innerHTML=`Punkte ${sc} · 🏆 ${best}`;reset();u();
const set=(a,b)=>{if(st==0)st=1;if(!(a==-dir[0]&&b==-dir[1]))nd=[a,b]};
cv.onpointerdown=e=>{sx=e.clientX;sy=e.clientY};cv.onpointerup=e=>{const dx=e.clientX-sx,dy=e.clientY-sy;if(st==2&&Date.now()>cd){reset();u();return}if(Math.abs(dx)<14&&Math.abs(dy)<14)return;if(Math.abs(dx)>Math.abs(dy))set(Math.sign(dx),0);else set(0,Math.sign(dy))};
onkeydown=e=>{const m={ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1],ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0]}[e.key];if(m){e.preventDefault();set(...m)}else if(e.key==' '&&st==2&&Date.now()>cd){reset();u()}};
const tick=()=>{dir=nd;const h=[sn[0][0]+dir[0],sn[0][1]+dir[1]];if(h[0]<0||h[1]<0||h[0]>=N||h[1]>=N||sn.some(p=>p[0]==h[0]&&p[1]==h[1])){st=2;cd=Date.now()+500;if(sc>best){best=sc;nb=1;try{localStorage.setItem(key,best)}catch(e){}}u();return}
sn.unshift(h);if(h[0]==food[0]&&h[1]==food[1]){sc++;pop=1;put();u()}else sn.pop()};
const draw=()=>{x.fillStyle='#14301f';x.fillRect(0,0,W,W);for(let i=0;i<N;i++)for(let j=0;j<N;j++)if((i+j)%2){x.fillStyle='#ffffff08';x.fillRect(i*C,j*C,C,C)}
const t=st==1?Math.min(1,acc/TICK):0;x.fillStyle='#ef4444';x.beginPath();x.arc(food[0]*C+C/2,food[1]*C+C/2+1,C/2-2+Math.sin(performance.now()/180)*1.2,0,7);x.fill();x.fillStyle='#22c55e';x.fillRect(food[0]*C+C/2-1,food[1]*C+1,2,4);
x.lineCap='round';x.lineJoin='round';const pts=sn.map(p=>[p[0]*C+C/2,p[1]*C+C/2]);if(st==1&&pts.length>1){const h=pts[0],pd=[dir[0]*C*(t-1),dir[1]*C*(t-1)];pts[0]=[h[0]+pd[0]*0,h[1]+pd[1]*0]}
x.strokeStyle='#16a34a';x.lineWidth=C-4;x.beginPath();pts.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.stroke();x.strokeStyle='#4ade80';x.lineWidth=C-10;x.beginPath();pts.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.stroke();
const h=pts[0];x.fillStyle='#fff';x.beginPath();x.arc(h[0]+dir[1]*4+dir[0]*3,h[1]-dir[0]*4+dir[1]*3,3,0,7);x.arc(h[0]-dir[1]*4+dir[0]*3,h[1]+dir[0]*4+dir[1]*3,3,0,7);x.fill();x.fillStyle='#111';x.beginPath();x.arc(h[0]+dir[1]*4+dir[0]*4,h[1]-dir[0]*4+dir[1]*4,1.4,0,7);x.arc(h[0]-dir[1]*4+dir[0]*4,h[1]+dir[0]*4+dir[1]*4,1.4,0,7);x.fill();
x.textAlign='center';x.fillStyle='#fff';x.font='800 20px ui-rounded,system-ui,sans-serif';if(st==0)x.fillText('Wischen oder Pfeiltasten zum Starten',W/2,W-24);
if(st==2){x.fillStyle='#0a1f14e6';x.fillRect(60,W/2-90,W-120,170);x.fillStyle='#fff';x.font='800 30px ui-rounded,system-ui,sans-serif';x.fillText('Autsch!',W/2,W/2-45);x.font='700 22px ui-rounded,system-ui,sans-serif';x.fillText(`Punkte ${sc}`,W/2,W/2-10);x.fillText(nb?'Neuer Bestwert! 🏆':`Bestwert ${best}`,W/2,W/2+22);x.font='600 15px ui-rounded,system-ui,sans-serif';x.fillText('Tippen für neues Spiel',W/2,W/2+58)}};
const go=now=>{const d=Math.min(60,now-(lt||now));lt=now;if(st==1){acc+=d;while(acc>=TICK&&st==1){acc-=TICK;tick()}}draw();raf=requestAnimationFrame(go)};raf=requestAnimationFrame(go)}

registerGame({"id": "schlangenjagd", "n": "Schlangenjagd", "i": "🐍", "cat": "Action", "c": ["#16a34a", "#065f46"], "fl": "n", "pl": "1", "rules": "Wische oder nutze die Pfeiltasten. Friss die Äpfel, wachse und stoße weder an die Wand noch an dich selbst.", "o": [["t", "Tempo", [["Gemütlich", 0], ["Normal", 1], ["Schnell", 2]]]],f:snk});
