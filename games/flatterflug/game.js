// Flatterflug
function flap(o){const s=bar(()=>flap(o)),W=400,H=700,G=60,PW=60,cv=$('canvas','hk'),C=o.th=='c',gap=o.g,key='fb'+o.th+gap;cv.width=W;cv.height=H;app.append(cv);const x=cv.getContext('2d');
let best=0,st,y,vy,sc,ps,t,nb,turn=0,res=[],cd=0,lt=0;try{best=+localStorage.getItem(key)||0}catch(e){}
const reset=()=>{st=0;y=H/2-40;vy=0;sc=0;ps=[];t=0;nb=0};reset();
const u=()=>s.innerHTML=(o.m==2?`${dot(turn)}${names[turn]} · `:'')+`Punkte ${sc} · 🏆 Bestwert ${best}`;u();
const die=()=>{if(st!=1)return;st=o.m==2&&turn==1?3:2;cd=Date.now()+600;if(sc>best){best=sc;nb=1;try{localStorage.setItem(key,best)}catch(e){}}res[turn]=sc;u()};
const tap=()=>{if(st==1)vy=-7.4;else if(st==0){st=1;vy=-7.4}else if(st==2&&Date.now()>cd){if(o.m==2)turn=1;reset();u()}};
cv.onpointerdown=tap;onkeydown=e=>{if(e.key==' '||e.key=='ArrowUp'){e.preventDefault();tap()}};
const bld=(bx,by,h,k,tp)=>{x.fillStyle=['#2c3e66','#3b4f80','#26355a'][k%3];x.fillRect(bx,by,PW,h);x.fillStyle='#ffd166';for(let j=0;j<h/22-1;j++)for(let i=0;i<3;i++)if((i*5+j*3+k)%4<2)x.fillRect(bx+8+i*18,by+10+j*22,9,12);x.fillStyle='#14213d';x.fillRect(bx-4,tp?by+h-6:by,PW+8,6)};
const pipe=(px,py,h,tp)=>{const cy=tp?py+h-24:py;x.fillStyle='#43b34a';x.fillRect(px,py,PW,h);x.fillStyle='#2f8f38';x.fillRect(px+PW-10,py,10,h);x.fillStyle='#56c85d';x.fillRect(px-6,cy,PW+12,24);x.fillStyle='#2f8f38';x.fillRect(px+PW-4,cy,10,24)};
const tx=(m,yy,f)=>{x.font=`800 ${f}px ui-rounded,system-ui,sans-serif`;x.lineWidth=6;x.strokeText(m,W/2,yy);x.fillText(m,W/2,yy)};
const draw=()=>{const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,C?'#16224a':'#6cc3ee');g.addColorStop(1,C?'#f4936b':'#dff4ff');x.fillStyle=g;x.fillRect(0,0,W,H);
if(C){x.fillStyle='#fff3c4';x.beginPath();x.arc(320,120,34,0,7);x.fill();x.fillStyle='#1d2a52';for(let i=0;i<9;i++)x.fillRect(((i*60-t*.6)%540+540)%540-60,H-G-60-(i*37%70),46,200)}
else{x.fillStyle='#ffffffcc';for(let i=0;i<4;i++){const cx=((i*150-t*.5)%600+600)%600-100,cy=90+i*110%260;x.beginPath();x.arc(cx,cy,26,0,7);x.arc(cx+30,cy+6,20,0,7);x.arc(cx-28,cy+8,18,0,7);x.fill()}}
ps.forEach(q=>{const h2=H-G-q.g-gap;if(C){bld(q.x,0,q.g,q.k,1);bld(q.x,q.g+gap,h2,q.k+1,0)}else{pipe(q.x,0,q.g,1);pipe(q.x,q.g+gap,h2,0)}});
x.fillStyle=C?'#2b2f3a':'#c9a45c';x.fillRect(0,H-G,W,G);if(C){x.fillStyle='#f2c94c';for(let i=0;i<8;i++)x.fillRect(((i*60-t*2.6)%480+480)%480-60,H-G/2,30,4)}else{x.fillStyle='#6abf4b';x.fillRect(0,H-G,W,12)}
x.save();x.translate(100,y+(st?0:Math.sin(t/12)*6));x.rotate(Math.max(-.5,Math.min(1.2,vy*.07)));
if(C){const a=Math.abs(Math.sin(t*.7));x.fillStyle='#f4f7fb';x.beginPath();x.ellipse(0,0,26,10,0,0,7);x.fill();x.fillStyle='#ef476f';x.beginPath();x.moveTo(-22,-2);x.lineTo(-32,-18);x.lineTo(-14,-2);x.fill();x.beginPath();x.moveTo(-8,3);x.lineTo(-20,17);x.lineTo(2,17);x.lineTo(10,3);x.fill();x.fillStyle='#8fd3f4';x.beginPath();x.arc(8,-3,4,0,7);x.fill();x.fillStyle='#14213d';x.fillRect(26,-1,3,2);x.fillRect(27,-11*a,2,22*a)}
else{x.fillStyle='#ffd23f';x.beginPath();x.arc(0,0,15,0,7);x.fill();x.fillStyle='#f4a62a';x.beginPath();x.ellipse(-4,3+Math.sin(t*.4)*5,9,6,0,0,7);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(7,-5,5,0,7);x.fill();x.fillStyle='#111';x.beginPath();x.arc(9,-5,2,0,7);x.fill();x.fillStyle='#ef7a2a';x.beginPath();x.moveTo(13,-1);x.lineTo(24,3);x.lineTo(13,7);x.fill()}
x.restore();x.textAlign='center';x.lineJoin='round';x.strokeStyle='#14213d';x.fillStyle='#fff';
if(st)tx(sc,90,56);if(st==0)tx('Tippen zum Starten',H/2+80,26);
if(st>1){x.fillStyle='#14213dd9';x.fillRect(40,H/2-120,W-80,210);x.fillStyle='#fff';tx(st==3?(res[0]==res[1]?'Unentschieden':names[+(res[1]>res[0])]+' gewinnt!'):'Game Over',H/2-70,34);tx(st==3?`${res[0]} : ${res[1]}`:`Punkte ${sc}`,H/2-20,30);tx(nb?'Neuer Bestwert! 🏆':`Bestwert ${best}`,H/2+25,24);if(st==2)tx(o.m==2?`${names[1]} ist dran – tippen`:'Tippen für neuen Versuch',H/2+70,20)}};
const go=now=>{const d=Math.min(2.5,(now-(lt||now))/16.67);lt=now;t+=d;
if(st==1){vy+=.42*d;y+=vy*d;if(y<12){y=12;vy=0}if(!ps.length||ps[ps.length-1].x<W-210)ps.push({x:W+10,g:70+R(H-G-gap-140),k:R(3),p:0});
const sp=(2.6+Math.min(sc,30)*.04)*d;ps.forEach(q=>q.x-=sp);ps=ps.filter(q=>q.x>-80);
ps.forEach(q=>{if(!q.p&&q.x+PW<87){q.p=1;sc++;u()}if(113>q.x&&87<q.x+PW&&(y-11<q.g||y+11>q.g+gap))die()});if(y>H-G-12)die()}
draw();raf=requestAnimationFrame(go)};raf=requestAnimationFrame(go)}

registerGame({"id": "flatterflug", "n": "Flatterflug", "i": "🐦", "cat": "Action", "c": ["#38bdf8", "#6366f1"], "fl": "t", "pl": "1–2", "rules": "Tippen (oder Leertaste) lässt dich steigen. Fliege durch die Lücken, ohne anzustoßen. Zu zweit spielt ihr abwechselnd. Dein Bestwert wird auf diesem Gerät gespeichert.", "o": [["th", "Thema", [["🐦 Vogel und Rohre", "b"], ["✈️ Flugzeug und Hochhäuser", "c"]]], ["g", "Schwierigkeit", [["Leicht", 190], ["Mittel", 160], ["Schwer", 135]]], ["m", "Spieler", [["Allein", 1], ["Zu zweit", 2]]]],f:flap});
