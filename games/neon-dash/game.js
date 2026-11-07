// Neon-Dash: Level mit wachsender Schwierigkeit, Flug-Abschnitte, Sprungfelder, Gruben
function dash(o){const s=bar(()=>dash(o)),W=800,H=400,GY=320,CE=80,PX=150,cv=$('canvas','hk'),key='nd'+o.d+o.sl,SM=[.88,1,1.1][o.d],GM=[1.3,1,.85][o.d];cv.width=W;cv.height=H;app.append(cv);const x=cv.getContext('2d');
let best=0;try{best=+localStorage.getItem(key)||0}catch(e){}
let st,mode,y,vy,rot,ob,dist,nxt,lvl,slv,lvEnd,pStart,first,lastShip,banner,ceil,parts,cd=0,nb=0,lt=0,hold=0,lm=-1;
const LEN=l=>4200+600*Math.min(l,12),spd=()=>Math.min(10.6,5.6+.45*lvl)*SM;
const INTRO=['Spitzen und Blöcke','Treppen und Doppel-Sprünge','Gruben und Sprungfelder','Flug-Abschnitte: Halten = hoch','Starke Kombinationen','Volles Tempo!'];
const reset=()=>{st=0;mode=0;y=GY-36;vy=0;rot=0;ob=[];dist=0;nxt=400;lvl=slv=o.sl;lvEnd=LEN(lvl);pStart=0;first=1;lastShip=0;banner=160;ceil=0;parts=[];nb=0;lm=-1},u=()=>s.innerHTML=`Level ${lvl} · ${Math.floor(dist/10)} m · 🏆 ${best} m`;reset();u();
const die=()=>{if(st!=1)return;st=2;cd=Date.now()+600;for(let i=0;i<26;i++)parts.push({x:PX+18,y:y+18,vx:(Math.random()-.5)*10,vy:(Math.random()-.8)*9,l:40+R(30),c:i%2?'#ffd166':'#fff'});const m=Math.floor(dist/10);if(m>best){best=m;nb=1;try{localStorage.setItem(key,best)}catch(e){}}u()};
const press=v=>{hold=v;if(v){if(st==0)st=1;else if(st==2&&Date.now()>cd){reset();u()}}};
cv.onpointerdown=()=>press(1);cv.onpointerup=cv.onpointercancel=()=>press(0);
onkeydown=e=>{if(e.key==' '||e.key=='ArrowUp'){e.preventDefault();if(!e.repeat)press(1)}};onkeyup=e=>{if(e.key==' '||e.key=='ArrowUp')press(0)};
// ---- Bausteine (dx = Abstand vom Abschnittsanfang). Typen: 0 Spitze, 1 Block, 2 Sprungfeld, 7 Grube, 3/4 Portal Flug/Würfel, 5/6 Säule unten/oben, 9 Level-Ziel
const SP=(dx,n)=>({t:0,dx,w:36*n,h:36}),BL=(dx,w,h)=>({t:1,dx,w,h}),sp=()=>spd(),J=()=>36*sp();
const CH={
s1:()=>({e:[SP(0,1)],len:36}),s2:()=>({e:[SP(0,2)],len:72}),s3:()=>({e:[SP(0,3)],len:108}),
b1:()=>{const h=40+R(3)*20;return{e:[BL(0,60,h)],len:60}},
stairs:()=>({e:[BL(0,60,40),BL(60,60,80),BL(120,60,40)],len:180}),
gs:()=>({e:[SP(0,1),SP(J()+70*GM,1)],len:J()+70*GM+36}),
gs3:()=>({e:[SP(0,1),SP(J()+70*GM,1),SP(2*(J()+70*GM),1)],len:2*(J()+70*GM)+36}),
pit:()=>{const w=Math.round(J()*.6*[.8,1,1.1][o.d]);return{e:[{t:7,dx:0,w}],len:w}},
pitspk:()=>{const w=Math.round(J()*.55*[.8,1,1.1][o.d]),d=w+J()*.55+50;return{e:[{t:7,dx:0,w},SP(d,1)],len:d+36}},
padspk:()=>{const n=Math.max(3,Math.round(24*sp()/36)),d=12*sp();return{e:[{t:2,dx:0,w:40,h:8},SP(d,n)],len:d+36*n+40}},
padtow:()=>{const d=14*sp()+4,w=Math.round(30*sp()+40);return{e:[{t:2,dx:0,w:40,h:8},BL(d,w,120+R(2)*20)],len:d+w}},
blkspk:()=>({e:[BL(0,120,40),SP(120,3)],len:228}),
ship:()=>{const n=6+Math.min(slv,10),sx=Math.max(200,340-slv*14),g=Math.max(122,176-slv*5)+[22,0,-8][o.d],e=[{t:3,dx:0,w:40,h:0}];let cy=230;
for(let i=0;i<n;i++){cy=Math.max(CE+g/2+10,Math.min(GY-g/2-10,cy+(R(2)?1:-1)*(30+R(70))));const dx=300+i*sx,f=GY-(cy+g/2),c=cy-g/2-CE;if(f>8)e.push({t:5,dx,w:54,h:f});if(c>8)e.push({t:6,dx,w:54,h:c})}
const len=300+n*sx+260;e.push({t:4,dx:len-40,w:40,h:0});return{e,len:len+20}}};
const NEW={2:['s3','stairs','gs'],3:['pit','padspk'],4:['ship'],5:['padtow','gs3','pitspk','blkspk']};
const spawn=()=>{const X=W+40,swx=dist+X-PX;
if(swx>=lvEnd){const mx=Math.max(X,PX+lvEnd-dist);ob.push({t:9,x:mx,w:20,h:0});slv++;lvEnd+=LEN(slv);first=1;nxt=dist+(mx-X)+80;return}
const pool=['s1','s2','b1'],l=slv;if(l>=2)pool.push('s3','stairs','gs');if(l>=3)pool.push('pit','pit','padspk');if(l>=5)pool.push('padtow','gs3','pitspk','blkspk');if(l>=7)pool.push('gs3','blkspk','padtow','pitspk');
let k;if(first&&NEW[l])k=NEW[l][R(NEW[l].length)];else if(l>=4&&lastShip>=4&&R(100)<40)k='ship';else k=pool[R(pool.length)];first=0;lastShip=k=='ship'?0:lastShip+1;
const c=CH[k]();c.e.forEach(b=>ob.push({...b,x:X+b.dx}));const rest=(J()+40+R(Math.max(10,120-slv*10)))*GM*Math.max(.62,1-.05*Math.max(0,slv-5));nxt=dist+c.len+rest};
// ---- Zeichnen
const tri=(a,b,c)=>{x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.lineTo(c[0],c[1]);x.closePath()};
const draw=()=>{const hu=(lvl*50+dist/40)%360,cl=`hsl(${hu} 100% 65%)`;x.fillStyle=`hsl(${hu} 55% 13%)`;x.fillRect(0,0,W,H);x.strokeStyle=`hsl(${hu} 70% 30%)`;x.lineWidth=2;for(let i=0;i<14;i++){const gx=((i*70-dist*.4)%980+980)%980-70;x.beginPath();x.moveTo(gx,0);x.lineTo(gx,GY);x.stroke()}
x.fillStyle=`hsl(${hu} 60% 22%)`;x.fillRect(0,GY,W,H-GY);x.fillStyle=cl;x.fillRect(0,GY,W,4);
ob.forEach(b=>{if(b.t==7){x.fillStyle=`hsl(${hu} 55% 8%)`;x.fillRect(b.x,GY,b.w,H-GY);x.fillStyle=cl;x.fillRect(b.x-2,GY,4,H-GY);x.fillRect(b.x+b.w-2,GY,4,H-GY)}});
if(ceil>1){x.fillStyle=`hsl(${hu} 60% 18%)`;x.fillRect(0,0,W,ceil);x.fillStyle=cl;x.fillRect(0,ceil-4,W,4)}
ob.forEach(b=>{const t=b.t;if(t==0)for(let i=0;i<b.w/36;i++){x.fillStyle='#fff';x.shadowColor=cl;x.shadowBlur=8;tri([b.x+i*36,GY],[b.x+i*36+18,GY-36],[b.x+i*36+36,GY]);x.fill();x.shadowBlur=0}
else if(t==1||t==5){const top=GY-b.h;x.fillStyle=`hsl(${hu} 50% 20%)`;x.fillRect(b.x,top,b.w,b.h);x.strokeStyle=cl;x.lineWidth=3;x.strokeRect(b.x+1.5,top+1.5,b.w-3,b.h-3)}
else if(t==6){x.fillStyle=`hsl(${hu} 50% 20%)`;x.fillRect(b.x,CE,b.w,b.h);x.strokeStyle=cl;x.lineWidth=3;x.strokeRect(b.x+1.5,CE+1.5,b.w-3,b.h-3)}
else if(t==2){x.fillStyle='#ffd166';x.shadowColor='#ffd166';x.shadowBlur=14;x.fillRect(b.x,GY-8,b.w,8);x.shadowBlur=0;x.fillStyle='#14213d';for(let i=0;i<3;i++)x.fillRect(b.x+6+i*11,GY-6,6,4)}
else if(t==3||t==4){const a=t==3?'#ff4fd8':'#4fffd0',top=t==3?GY-130:CE,hh=t==3?130:GY-CE;x.strokeStyle=a;x.lineWidth=6;x.shadowColor=a;x.shadowBlur=16;x.beginPath();x.ellipse(b.x+20,top+hh/2,14,hh/2,0,0,7);x.stroke();x.shadowBlur=0}
else if(t==9){for(let i=0;i<H/20;i++){x.fillStyle=i%2?'#fff':'#14213d';x.fillRect(b.x,i*20,10,20);x.fillStyle=i%2?'#14213d':'#fff';x.fillRect(b.x+10,i*20,10,20)}}});
parts.forEach(p=>{x.globalAlpha=Math.max(0,Math.min(1,p.l/30));x.fillStyle=p.c;x.fillRect(p.x-3,p.y-3,6,6)});x.globalAlpha=1;
if(st!=2){x.save();x.translate(PX+18,y+18);x.rotate(rot);x.shadowBlur=18;x.shadowColor='#ffd166';x.fillStyle='#ffd166';
if(mode==0){x.fillRect(-18,-18,36,36);x.shadowBlur=0;x.fillStyle='#14213d';x.fillRect(-9,-9,6,10);x.fillRect(5,-9,6,10)}else{tri([-20,-16],[22,0],[-20,16]);x.fill();x.shadowBlur=0;x.fillStyle='#14213d';x.fillRect(2,-6,8,8)}x.restore()}
const pr=Math.min(1,Math.max(0,(dist-pStart)/LEN(lvl)));x.fillStyle='#0006';x.fillRect(0,0,W,8);x.fillStyle=cl;x.fillRect(0,0,W*pr,8);
x.fillStyle='#fff';x.textAlign='center';x.font='800 30px ui-rounded,system-ui,sans-serif';
if(st==0){x.fillText('Tippen zum Starten · Halten = Dauersprung',W/2,130);x.font='700 20px ui-rounded,system-ui,sans-serif';x.fillText(`Level ${lvl}: ${INTRO[Math.min(lvl,6)-1]}`,W/2,170)}
if(st==1&&banner>0){x.globalAlpha=Math.min(1,banner/40);x.font='900 44px ui-rounded,system-ui,sans-serif';x.fillText(`Level ${lvl}`,W/2,100);x.font='700 22px ui-rounded,system-ui,sans-serif';x.fillText(INTRO[Math.min(lvl,6)-1],W/2,132);x.globalAlpha=1}
if(st==2){x.fillStyle='#000a';x.fillRect(220,70,360,200);x.fillStyle='#fff';x.font='800 30px ui-rounded,system-ui,sans-serif';x.fillText('Crash!',W/2,115);x.font='700 24px ui-rounded,system-ui,sans-serif';x.fillText(`Level ${lvl} · ${Math.floor(dist/10)} m`,W/2,155);x.fillText(nb?'Neuer Bestwert! 🏆':`Bestwert ${best} m`,W/2,192);x.font='600 16px ui-rounded,system-ui,sans-serif';x.fillText('Tippen für neuen Versuch',W/2,235)}};
// ---- Spielschleife
const go=now=>{const d=Math.min(2.5,(now-(lt||now))/16.67);lt=now;
parts.forEach(p=>{p.x+=p.vx*d;p.y+=p.vy*d;p.vy+=.35*d;p.l-=d});parts=parts.filter(p=>p.l>0);
if(st==1){const v=spd()*d;dist+=v;if(banner>0)banner-=d;ob.forEach(b=>b.x-=v);ceil+=((mode?CE:0)-ceil)*.08*d;
if(mode==0){vy+=.62*d;y+=vy*d;let fl=GY,pd=0;const cx=PX+18;
ob.forEach(b=>{const ov=PX+36>b.x+4&&PX<b.x+b.w-4;
if(b.t==1&&ov){if(y+36<=GY-b.h+16)fl=Math.min(fl,GY-b.h);else die()}
else if(b.t==0&&ov&&y+36>GY-26)die();
else if(b.t==2&&ov&&y+36>=GY-6&&vy>=0&&!b.u){b.u=1;pd=1;for(let i=0;i<10;i++)parts.push({x:PX+18,y:GY-4,vx:(Math.random()-.5)*6,vy:-Math.random()*5,l:25,c:'#ffd166'})}
else if(b.t==7&&cx>b.x&&cx<b.x+b.w&&y+36>=GY-2)fl=H+300});
if(y+36>=fl){y=fl-36;vy=0;rot=Math.round(rot/(Math.PI/2))*(Math.PI/2);if(hold)vy=-11.2}else rot+=.085*d;if(pd)vy=-15.5;
if(y>GY+10)die()}
else{vy+=(hold?-.5:.42)*d;vy=Math.max(-6.5,Math.min(6.5,vy));y+=vy*d;if(y<ceil){y=ceil;vy=0}if(y>GY-36){y=GY-36;vy=0}rot=vy*.06;
ob.forEach(b=>{if(b.t!=5&&b.t!=6)return;if(PX+31>b.x&&PX+5<b.x+b.w){if(b.t==5&&y+31>GY-b.h)die();if(b.t==6&&y+5<CE+b.h)die()}});
if(st==1&&Math.random()<.6)parts.push({x:PX-8,y:y+18+(Math.random()-.5)*8,vx:-2,vy:0,l:14,c:'#ff7a3c'})}
ob.forEach(b=>{if(b.t==3&&!b.d&&b.x<PX+18){b.d=1;mode=1;rot=0}if(b.t==4&&!b.d&&b.x<PX+18){b.d=1;mode=0;vy=Math.min(vy,2)}if(b.t==9&&!b.d&&b.x<PX){b.d=1;lvl++;pStart=dist;banner=160}});
ob=ob.filter(b=>b.x+b.w>-120);if(dist>=nxt)spawn();
const m=Math.floor(dist/10);if(m!=lm){lm=m;u()}}
draw();raf=requestAnimationFrame(go)};raf=requestAnimationFrame(go)}

registerGame({"id": "neon-dash", "n": "Neon-Dash", "i": "🟨", "cat": "Action", "c": ["#06b6d4", "#6d28d9"], "fl": "nt", "pl": "1", "rules": "Springe über Spitzen, Gruben und Blöcke, nutze gelbe Sprungfelder und fliege durch Röhren. Mit jedem Level wird es schneller und gemeiner.", "o": [["d", "Schwierigkeit", [["Leicht", 0], ["Mittel", 1], ["Schwer", 2]], 1], ["sl", "Starten bei", [["Level 1", 1], ["Level 3", 3], ["Level 5", 5], ["Level 8", 8]]]],f:dash});
