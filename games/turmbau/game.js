// Turmbau
function stk(o){const s=bar(()=>stk(o)),W=400,H=640,BH=28,cv=$('canvas','hk'),key='sk2'+o.d;cv.width=W;cv.height=H;app.append(cv);const x=cv.getContext('2d');let best=0;try{best=+localStorage.getItem(key)||0}catch(e){}
let L,cur,dir,cam,tc,sc,st,deb,combo,lt=0,cd=0,nb=0;
const hue=i=>(i*14+200)%360,reset=()=>{L=[{x:100,w:200}];sc=0;st=0;nb=0;deb=[];combo=0;cam=0;tc=0;mkc()},mkc=()=>{const p=L[L.length-1];cur={x:0,w:p.w};dir=1},u=()=>s.innerHTML=`Höhe ${sc} · 🏆 ${best}`;reset();u();
const tap=()=>{if(st==2){if(Date.now()>cd){reset();u()}return}if(st==0){st=1;return}const p=L[L.length-1],ov=Math.min(cur.x+cur.w,p.x+p.w)-Math.max(cur.x,p.x);
if(ov<=0){st=2;cd=Date.now()+600;deb.push({x:cur.x,w:cur.w,y:L.length,vy:0,h:hue(L.length)});if(sc>best){best=sc;nb=1;try{localStorage.setItem(key,best)}catch(e){}}u();return}
if(Math.abs(cur.x-p.x)<[9,5,3][o.d]){cur.x=p.x;cur.w=Math.min(cur.w+(combo>2?6:0),200);combo++}else{combo=0;const nx=Math.max(cur.x,p.x);if(cur.x<p.x)deb.push({x:cur.x,w:p.x-cur.x,y:L.length,vy:0,h:hue(L.length)});else deb.push({x:p.x+p.w,w:cur.x+cur.w-(p.x+p.w),y:L.length,vy:0,h:hue(L.length)});cur.x=nx;cur.w=ov}
L.push({x:cur.x,w:cur.w});sc++;u();mkc()};
cv.onpointerdown=tap;onkeydown=e=>{if(e.key==' '||e.key=='ArrowDown'){e.preventDefault();tap()}};
const yy=i=>H-150-(i*BH)+cam,blk=(a,w,i,h)=>{x.fillStyle=`hsl(${h} 70% 58%)`;x.fillRect(a,yy(i),w,BH-2);x.fillStyle=`hsl(${h} 70% 70%)`;x.fillRect(a,yy(i),w,6);x.fillStyle=`hsl(${h} 70% 42%)`;x.fillRect(a,yy(i)+BH-8,w,6)};
const draw=()=>{const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,`hsl(${(220+sc*5)%360} 60% 22%)`);g.addColorStop(1,`hsl(${(270+sc*5)%360} 60% 10%)`);x.fillStyle=g;x.fillRect(0,0,W,H);
L.forEach((b,i)=>{if(yy(i)<H&&yy(i)>-BH)blk(b.x,b.w,i,hue(i))});deb.forEach(d=>blk(d.x,d.w,d.y,d.h));if(st==1)blk(cur.x,cur.w,L.length,hue(L.length));
x.textAlign='center';x.lineWidth=6;x.strokeStyle='#14213d';x.fillStyle='#fff';x.lineJoin='round';x.font='800 54px ui-rounded,system-ui,sans-serif';if(st){x.strokeText(sc,W/2,80);x.fillText(sc,W/2,80)}
x.font='800 22px ui-rounded,system-ui,sans-serif';if(st==0){x.strokeText('Tippen zum Starten und Bauen',W/2,H/2);x.fillText('Tippen zum Starten und Bauen',W/2,H/2)}
if(st==2){x.fillStyle='#14213de6';x.fillRect(40,H/2-110,W-80,200);x.fillStyle='#fff';x.font='800 32px ui-rounded,system-ui,sans-serif';x.fillText('Eingestürzt!',W/2,H/2-60);x.font='700 24px ui-rounded,system-ui,sans-serif';x.fillText(`Höhe ${sc}`,W/2,H/2-20);x.fillText(nb?'Neuer Bestwert! 🏆':`Bestwert ${best}`,W/2,H/2+15);x.font='600 16px ui-rounded,system-ui,sans-serif';x.fillText('Tippen für neues Spiel',W/2,H/2+60)}};
const go=now=>{const d=Math.min(2.5,(now-(lt||now))/16.67);lt=now;if(st==1){const v=Math.min(7.5,2.6+sc*.12)*[.8,1,1.25][o.d]*d;cur.x+=dir*v;if(cur.x<0){cur.x=0;dir=1}if(cur.x+cur.w>W){cur.x=W-cur.w;dir=-1}}
const tg=Math.max(0,(L.length-6)*BH);cam+=(tg-cam)*.1*d;deb.forEach(b=>{b.vy+=.012*d;b.y-=b.vy*d});deb=deb.filter(b=>b.y>-12);draw();raf=requestAnimationFrame(go)};raf=requestAnimationFrame(go)}

registerGame({"id": "turmbau", "n": "Turmbau", "i": "🏗️", "cat": "Action", "c": ["#0ea5e9", "#7c3aed"], "fl": "n", "pl": "1", "rules": "Tippe im richtigen Moment, damit der Block auf dem Turm landet. Was übersteht, fällt ab. Triffst du genau, wächst der Block wieder.", "o": [["d", "Schwierigkeit", [["Leicht · langsam, großzügig", 0], ["Mittel", 1], ["Schwer · schnell, genau", 2]], 1]],f:stk});
