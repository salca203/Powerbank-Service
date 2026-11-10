// Air Hockey (Querformat: Spieler 1 links, Spieler 2 oder Computer rechts)
function hockey(o){const s=bar(()=>hockey(o)),W=700,H=400,GH=70,WIN=o.w,SPD=[3.6,5.6,8.2][o.d??1],PR=14,KR=35,MR=PR+KR,cv=$('canvas','hk');cv.width=W;cv.height=H;app.append(cv);const x=cv.getContext('2d'),cl=[0,1].map(i=>getComputedStyle(document.documentElement).getPropertyValue('--p'+i)),fx=FX();
let pk={x:W/2,y:H/2,vx:0,vy:0},pd=[{x:90,y:H/2,px:90,py:H/2,vx:0,vy:0},{x:W-90,y:H/2,px:W-90,py:H/2,vx:0,vy:0}],sc=[0,0],hold=60,ids={},over=0,still=0,flash=0,flc='#fff',trail=[],shake=0,aiPh=0,aiT=0,aiAim=0,aiRetreat=0;
cv.dbg={get pk(){return pk},pd,get sc(){return sc},set hold(v){hold=v},get over(){return over},put(a,b,c,d){pk={x:a,y:b,vx:c||0,vy:d||0}}};
const u=()=>s.innerHTML=`${dot(0)}${names[0]} ${sc[0]} : ${sc[1]} ${names[1]}${dot(1)}`;u();
const pos=e=>{const r=cv.getBoundingClientRect();return{x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*H/r.height}};
const mvp=e=>{const i=ids[e.pointerId];if(i==null)return;const p=pos(e),q=pd[i];q.y=Math.max(KR,Math.min(H-KR,p.y));q.x=i?Math.max(W/2+KR,Math.min(W-KR,p.x)):Math.max(KR,Math.min(W/2-KR,p.x))};
cv.onpointerdown=e=>{cv.setPointerCapture(e.pointerId);ids[e.pointerId]=o.m==1?0:pos(e).x<W/2?0:1;mvp(e)};cv.onpointermove=e=>{if(e.pointerType=='mouse'&&o.m==1)ids[e.pointerId]=0;mvp(e)};cv.onpointerup=cv.onpointercancel=e=>delete ids[e.pointerId];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),inGoal=()=>Math.abs(pk.y-H/2)<GH-PR*.4;
// Puck bleibt im Spielfeld (außer im Tor)
const wall=()=>{let hit=0;if(pk.y<PR){pk.y=PR;pk.vy=Math.abs(pk.vy);hit=1}if(pk.y>H-PR){pk.y=H-PR;pk.vy=-Math.abs(pk.vy);hit=1}
 if(!inGoal()){if(pk.x<PR){pk.x=PR;pk.vx=Math.abs(pk.vx);hit=1}if(pk.x>W-PR){pk.x=W-PR;pk.vx=-Math.abs(pk.vx);hit=1}}return hit};
// Schläger trifft Puck. Klemmt der Puck an Wand/Ecke fest, rutscht er an der Wand entlang oder wird zur Mitte herausgedrückt.
const hit=p=>{const D=PR+KR;let dx=pk.x-p.x,dy=pk.y-p.y,d=Math.hypot(dx,dy);if(d>=D)return;if(d<.01){dx=p.x<W/2?1:-1;dy=0;d=1}
 const nx=dx/d,ny=dy/d;pk.x=p.x+nx*D;pk.y=p.y+ny*D;const v=(pk.vx-p.vx)*nx+(pk.vy-p.vy)*ny;if(v<0){pk.vx-=2*v*nx;pk.vy-=2*v*ny}
 // Wand-Klemmung prüfen
 const ox=pk.x,oy=pk.y;wall();let d2=Math.hypot(pk.x-p.x,pk.y-p.y);
 if(d2<D-.5){ // an der Wand entlang rutschen
  if(pk.x!=ox&&!inGoal()){const k=Math.sqrt(Math.max(0,D*D-(pk.x-p.x)**2));pk.y=p.y+(pk.y>=p.y?1:-1)*k;if(Math.abs(pk.y-H/2)<1)pk.y+=1}
  else if(pk.y!=oy){const k=Math.sqrt(Math.max(0,D*D-(pk.y-p.y)**2));pk.x=p.x+(pk.x>=p.x?1:-1)*k}
  pk.x=clamp(pk.x,PR,W-PR);pk.y=clamp(pk.y,PR,H-PR);d2=Math.hypot(pk.x-p.x,pk.y-p.y)}
 if(d2<D-.5){ // Ecke: zur Mitte herausquetschen
  let cx=W/2-p.x,cy=H/2-p.y,cm=Math.hypot(cx,cy)||1;cx/=cm;cy/=cm;pk.x=clamp(p.x+cx*(D+1),PR,W-PR);pk.y=clamp(p.y+cy*(D+1),PR,H-PR);const sp=Math.max(7,Math.hypot(pk.vx,pk.vy));pk.vx=cx*sp;pk.vy=cy*sp;shake=Math.max(shake,3)}
 const sp=Math.hypot(pk.vx,pk.vy);if(sp>3)fx.burst(pk.x,pk.y,'#fff',3,2,14,3)};
const reserve=()=>{ // Puck wird neu eingeworfen, falls er festhängt
 fx.ring(pk.x,pk.y,'#ffd166',24);pk={x:W/2,y:H/2,vx:0,vy:0};hold=40;still=0};
const goal=w=>{sc[w]++;fx.burst(w?W:0,H/2,w?cl[1]:cl[0],40,7,50,6);fx.text(w?W-120:120,H/2-40,'TOR!',w?cl[1]:cl[0],46,70);flash=14;flc=w?cl[1]:cl[0];shake=10;pk={x:W/2,y:H/2,vx:0,vy:0};hold=90;trail=[];still=0;u();if(sc[w]>=WIN){over=w+1;hold=999;later(()=>duelEnd(w,{sub:o.m==1?(w==0?'Du hast den Computer besiegt!':'Diesmal war der Computer schneller.'):'',stats:[['Tore '+names[0],sc[0]],['Tore '+names[1],sc[1]]],delay:0}),1100)}};
// Computer-Gegner (rechts): Anlauf hinter den Puck, dann Schlag Richtung Tor. Bei Wand/Ecke: Puck seitlich herausschlagen, nie dauerhaft dagegen drücken.
const ai=()=>{const a=pd[1],mv=(tx,ty,sp)=>{tx=clamp(tx,W/2+KR,W-KR);ty=clamp(ty,KR,H-KR);const dx=tx-a.x,dy=ty-a.y,d=Math.hypot(dx,dy)||1,m=Math.min(sp,d);a.x+=dx/d*m;a.y+=dy/d*m};
 const pv=Math.hypot(pk.vx,pk.vy),mine=pk.x>W/2-12||(pv<2&&pk.x>W/2-52);
 if(aiRetreat>0){aiRetreat--;mv(W-110,H/2+(pk.y<H/2?40:-40),SPD);return}
 if(!mine){ // Puck beim Gegner: verteidigen und in Bereitschaft gehen
  let ty=H/2+(pk.y-H/2)*.55;if(pk.vx>1){ty=pk.y+pk.vy*((W-90-pk.x)/pk.vx)*.4;}mv(W-90-(pk.x<W*.3?0:20),ty,SPD*.9);aiPh=0;return}
 const nearWall=pk.x>W-80||pk.y<40||pk.y>H-40;
 // festgefahrene Lage: kurz zurückziehen
 if(pv<.8&&Math.hypot(pk.x-a.x,pk.y-a.y)<PR+KR+6){aiT++;if(aiT>20){aiT=0;aiRetreat=26;aiPh=0;return}}else aiT=0;
 if(nearWall&&pk.x>W-80){ // Puck an der Rückwand/Ecke: schräg von innen anlaufen und herausschlagen
  const sd=pk.y<H/2?1:-1,ax=clamp(pk.x-50,W/2+KR,W-KR),ay=clamp(pk.y+sd*46,KR,H-KR);
  if(aiPh!=2&&Math.hypot(ax-a.x,ay-a.y)>12){aiPh=1;mv(ax,ay,SPD)}else{aiPh=2;mv(pk.x+8,pk.y-sd*10,SPD*1.3);if(Math.hypot(pk.x-a.x,pk.y-a.y)<PR+KR+3&&pv>2)aiPh=0}
  return}
 // normaler Angriff
 const tgY=H/2+aiAim,dx=0-pk.x,dy=tgY-pk.y,dm=Math.hypot(dx,dy)||1,ux=dx/dm,uy=dy/dm,bx=pk.x-ux*(pv<2?100:60),by=pk.y-uy*(pv<2?100:60);
 const behind=a.x>pk.x+8&&Math.abs(a.y-(pk.y-uy*(a.x-pk.x)/(ux||-1)*0))<42;
 if(aiPh==2||(behind&&Math.hypot(bx-a.x,by-a.y)<40)){aiPh=2;mv(pk.x+ux*26,pk.y+uy*26,SPD*1.3);if(a.x<pk.x-4||pv>5){aiPh=0;aiAim=(Math.random()-.5)*GH*1.6}}
 else{aiPh=1;mv(bx,by,SPD)}};
const ball=(px,py,r,c)=>{x.fillStyle=c;x.beginPath();x.arc(px,py,r,0,7);x.fill()};
const tick=()=>{pd.forEach(p=>{p.vx=p.x-p.px;p.vy=p.y-p.py;p.px=p.x;p.py=p.y});
 if(o.m==1&&!over)ai();
 if(hold>0)hold--;else if(!over){pk.x+=pk.vx;pk.y+=pk.vy;pk.vx*=.995;pk.vy*=.995;wall();pd.forEach(hit);
  const m=Math.hypot(pk.vx,pk.vy);if(m>18){pk.vx*=18/m;pk.vy*=18/m}
  if(m<.5){if(++still>140)reserve()}else still=0;
  trail.push([pk.x,pk.y,m]);if(trail.length>9)trail.shift();
  if(pk.x<-PR)goal(1);else if(pk.x>W+PR)goal(0)}
 fx.step(1);if(flash>0)flash--;if(shake>0)shake*=.85;
 x.clearRect(0,0,W,H);x.save();if(shake>.4)x.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);
 x.fillStyle='#ffffff10';x.fillRect(0,0,W/2,H);x.strokeStyle='#fff8';x.lineWidth=4;x.beginPath();x.moveTo(W/2,0);x.lineTo(W/2,H);x.stroke();x.beginPath();x.arc(W/2,H/2,60,0,7);x.stroke();
 x.strokeStyle=cl[0];x.beginPath();x.moveTo(2,H/2-GH);x.lineTo(2,H/2+GH);x.stroke();x.strokeStyle=cl[1];x.beginPath();x.moveTo(W-2,H/2-GH);x.lineTo(W-2,H/2+GH);x.stroke();
 trail.forEach((t,i)=>{x.globalAlpha=i/trail.length*.35*Math.min(1,t[2]/8);ball(t[0],t[1],PR*(.4+i/trail.length*.6),'#fff')});x.globalAlpha=1;
 pd.forEach((p,i)=>{x.fillStyle='#0004';x.beginPath();x.arc(p.x+3,p.y+5,KR,0,7);x.fill();ball(p.x,p.y,KR,cl[i]);ball(p.x,p.y,KR*.52,'#0003');ball(p.x-8,p.y-9,7,'#fff5')});
 x.shadowColor='#fff';x.shadowBlur=hold>0?0:10;ball(pk.x,pk.y,PR,'#fff');x.shadowBlur=0;
 fx.draw(x);
 x.fillStyle='#ffffffaa';x.font='800 40px ui-rounded,system-ui,sans-serif';x.textAlign='center';x.fillText(sc[0],W/2-60,50);x.fillText(sc[1],W/2+60,50);
 if(hold>0&&!over&&sc[0]+sc[1]==0){x.font='700 18px ui-rounded,system-ui,sans-serif';x.fillText(o.m==1?'Du spielst links: Finger oder Maus bewegt den Schläger':'Linke Seite: Spieler 1 · rechte Seite: Spieler 2',W/2,H-24)}
 if(flash>0){x.globalAlpha=flash/40;x.fillStyle=flc;x.fillRect(0,0,W,H);x.globalAlpha=1}
 x.restore();raf=requestAnimationFrame(tick)};tick()}

registerGame({"id": "air-hockey", "n": "Air Hockey", "i": "🏒", "cat": "Action", "c": ["#0ea5e9", "#1e3a8a"], "fl": "t", "pl": "1–2", "rules": "Schiebe deinen Schläger und schieße den Puck ins gegnerische Tor. Spieler 1 sitzt links, Spieler 2 (oder der Computer) rechts.", "o": [["m", "Gegner", [["Computer", 1], ["Zu zweit", 2]]], ["d", "Computer-Stärke", [["Leicht", 0], ["Mittel", 1], ["Schwer", 2]], 1], ["w", "Tore bis zum Sieg", [["3", 3], ["5", 5], ["7", 7]], 1]],f:hockey});
