// Schlangenjagd: flüssige Bewegung (Zwischenbilder zwischen den Schritten), Eingabe-Puffer, Effekte
function snk(o){const s=bar(()=>snk(o)),N=20,C=20,W=N*C,cv=$('canvas','hk'),key='sn'+o.t+o.w+o.ob,TICK=[150,110,80][o.t];cv.width=cv.height=W;app.append(cv);const x=cv.getContext('2d'),fx=FX();let best=0;try{best=+localStorage.getItem(key)||0}catch(e){}
let rk=[],sn,pv,dir,q=[],food,sc,st,acc=0,lt=0,nb=0,sx=0,sy=0,ft=0,shake=0,dead=0,grow=0;
const put=()=>{do{food=[R(N),R(N)]}while(sn.some(p=>p[0]==food[0]&&p[1]==food[1])||rk.some(p=>p[0]==food[0]&&p[1]==food[1]));ft=performance.now()},
reset=()=>{sn=[[10,10],[9,10],[8,10]];pv=sn.map(p=>[...p]);rk=o.ob?Array.from({length:12},()=>[R(N),R(N)]).filter(p=>!(p[1]>=8&&p[1]<=12&&p[0]<18)):[];dir=[1,0];q=[];sc=0;st=0;nb=0;acc=0;dead=0;put()},u=()=>s.innerHTML=`Punkte ${sc} · 🏆 ${best}`;reset();u();
// Richtungswechsel werden gepuffert (max. 2), damit schnelle Wischer nicht verloren gehen
const set=(a,b)=>{if(st==2)return;if(st==0)st=1;const l=q.length?q[q.length-1]:dir;if((a==l[0]&&b==l[1])||(a==-l[0]&&b==-l[1]))return;if(q.length<2)q.push([a,b])};
cv.onpointerdown=e=>{cv.setPointerCapture(e.pointerId);sx=e.clientX;sy=e.clientY};
cv.onpointermove=e=>{if(!(e.buttons||e.pointerType=='touch'))return;const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.hypot(dx,dy)>16){if(Math.abs(dx)>Math.abs(dy))set(Math.sign(dx),0);else set(0,Math.sign(dy));sx=e.clientX;sy=e.clientY}};
onkeydown=e=>{const m={ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1],ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0]}[e.key];if(m){e.preventDefault();set(...m)}};
const cx=p=>p[0]*C+C/2,cy=p=>p[1]*C+C/2;
const die=()=>{st=2;dead=performance.now();shake=9;sn.slice(0,6).forEach(p=>fx.burst(cx(p),cy(p),'#4ade80',8,5,40,5));if(sc>best){best=sc;nb=1;try{localStorage.setItem(key,best)}catch(e){}}u();
 later(()=>scoreEnd({title:nb?'Neuer Bestwert!':'Autsch!',emoji:nb?'🏆':'🐍',best:nb,sub:nb?'Die Schlange ist so lang wie noch nie.':'Die Schlange ist gegen etwas gestoßen.',stats:[['Punkte',sc],['Bestwert',best]]}),800)};
const tick=()=>{if(q.length)dir=q.shift();const h=[sn[0][0]+dir[0],sn[0][1]+dir[1]];if(o.w){h[0]=(h[0]+N)%N;h[1]=(h[1]+N)%N}
 const eat=h[0]==food[0]&&h[1]==food[1],body=eat?sn:sn.slice(0,-1);
 if(h[0]<0||h[1]<0||h[0]>=N||h[1]>=N||body.some(p=>p[0]==h[0]&&p[1]==h[1])||rk.some(p=>p[0]==h[0]&&p[1]==h[1])){die();return}
 pv=sn.map(p=>[...p]);sn.unshift(h);if(eat){sc++;fx.burst(cx(food),cy(food),'#ef4444',14,4.5,34,5);fx.burst(cx(food),cy(food),'#fff',5,3,20,3);fx.text(cx(food),cy(food)-12,'+1','#fff',20,40);if(sc%5==0)fx.ring(cx(h),cy(h),'#4ade80',34);grow=1;put();u()}else{sn.pop();grow=0}};
const lerp=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
const draw=()=>{const now=performance.now();x.save();if(shake>.3)x.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);x.fillStyle='#14301f';x.fillRect(-10,-10,W+20,W+20);for(let i=0;i<N;i++)for(let j=0;j<N;j++)if((i+j)%2){x.fillStyle='#ffffff08';x.fillRect(i*C,j*C,C,C)}
 rk.forEach(p=>{x.fillStyle='#64748b';x.fillRect(p[0]*C+1,p[1]*C+1,C-2,C-2);x.fillStyle='#94a3b8';x.fillRect(p[0]*C+3,p[1]*C+3,C-8,5)});
 // Apfel mit Einblend-Animation und leichtem Pulsieren
 const fa=Math.min(1,(now-ft)/260),fs=fa<1?fa*(2-fa)*1.15:1,pl=Math.sin(now/180)*1.1;x.fillStyle='#ef4444';x.beginPath();x.arc(cx(food),cy(food)+1,Math.max(0,(C/2-2+pl)*fs),0,7);x.fill();x.fillStyle='#ffffff55';x.beginPath();x.arc(cx(food)-3,cy(food)-3,2.4*fs,0,7);x.fill();x.fillStyle='#22c55e';x.fillRect(cx(food)-1,food[1]*C+1,2,4*fs);
 const t=st==1?Math.min(1,acc/TICK):1;
 const pts=sn.map((p,i)=>{const f=pv[Math.min(i,pv.length-1)],far=Math.abs(p[0]-f[0])>1||Math.abs(p[1]-f[1])>1;if(far){const z=t>.5?p:f;return[cx(z),cy(z)]}const a=lerp(f,p,t);return[a[0]*C+C/2,a[1]*C+C/2]});
 // Beim Wachsen bleibt das neue Endstück zunächst am alten Schwanz
 x.lineCap='round';x.lineJoin='round';const path=()=>{x.beginPath();pts.forEach((p,i)=>i&&Math.hypot(p[0]-pts[i-1][0],p[1]-pts[i-1][1])<C*1.6?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]))};
 const red=st==2&&Math.floor((now-dead)/110)%2==0;
 x.strokeStyle=red?'#dc2626':'#16a34a';x.lineWidth=C-4;path();x.stroke();x.strokeStyle=red?'#f87171':'#4ade80';x.lineWidth=C-10;path();x.stroke();
 // Kopf mit Augen in Bewegungsrichtung
 const h=pts[0],d=st==1&&q.length==0?dir:dir;x.fillStyle=red?'#dc2626':'#22c55e';x.beginPath();x.arc(h[0],h[1],C/2-1.5,0,7);x.fill();
 x.fillStyle='#fff';x.beginPath();x.arc(h[0]+d[1]*4+d[0]*3,h[1]-d[0]*4+d[1]*3,3.2,0,7);x.arc(h[0]-d[1]*4+d[0]*3,h[1]+d[0]*4+d[1]*3,3.2,0,7);x.fill();x.fillStyle='#111';x.beginPath();x.arc(h[0]+d[1]*4+d[0]*4,h[1]-d[0]*4+d[1]*4,1.5,0,7);x.arc(h[0]-d[1]*4+d[0]*4,h[1]+d[0]*4+d[1]*4,1.5,0,7);x.fill();
 if(st==1&&Math.floor(now/450)%3==0){x.strokeStyle='#ef4444';x.lineWidth=2;x.beginPath();x.moveTo(h[0]+d[0]*8,h[1]+d[1]*8);x.lineTo(h[0]+d[0]*14,h[1]+d[1]*14);x.stroke()}
 fx.draw(x);x.textAlign='center';x.fillStyle='#fff';x.font='800 20px ui-rounded,system-ui,sans-serif';if(st==0)x.fillText('Wischen oder Pfeiltasten zum Starten',W/2,W-24);
 x.restore()};
const go=now=>{const d=Math.min(60,now-(lt||now));lt=now;if(st==1){acc+=d;while(acc>=TICK&&st==1){acc-=TICK;tick()}}fx.step(d/16.67);if(shake>0)shake*=Math.pow(.86,d/16.67);draw();raf=requestAnimationFrame(go)};cv.dbg={get sn(){return sn},get st(){return st},tick,set};raf=requestAnimationFrame(go)}

registerGame({"id": "schlangenjagd", "n": "Schlangenjagd", "i": "🐍", "cat": "Action", "c": ["#16a34a", "#065f46"], "fl": "n", "pl": "1", "rules": "Wische oder nutze die Pfeiltasten. Friss die Äpfel, wachse und stoße weder an die Wand noch an dich selbst.", "o": [["t", "Tempo", [["Gemütlich", 0], ["Normal", 1], ["Schnell", 2]], 1], ["w", "Wände", [["Wände sind tödlich", 0], ["Durch Wände hindurch", 1]]], ["ob", "Hindernisse", [["Keine", 0], ["Felsen", 1]]]],f:snk});
