// Neon-Dash: Level, Flug-Abschnitte, Sprungfelder, Gruben, Sägeblätter
function dash(o){const s=bar(()=>dash(o)),W=800,H=400,GY=320,CE=80,PX=150,cv=$('canvas','hk'),key='nd'+o.d+o.sl,SM=[.88,1,1.1][o.d],GM=[1.3,1,.85][o.d];cv.width=W;cv.height=H;app.append(cv);const x=cv.getContext('2d');
let best=0;try{best=+localStorage.getItem(key)||0}catch(e){}
let st,mode,y,vy,rot,ob,dist,nxt,lvl,slv,lvEnd,pStart,queue,lastShip,banner,ceil,parts,shake,flash,att=0,cd=0,nb=0,lt=0,hold=0,lm=-1;
// Hintergrund-Daten (einmal erzeugt): Sterne und Skyline
const stars=Array.from({length:46},()=>({x:R(W),y:R(GY-40),r:.6+Math.random()*1.4,p:.03+Math.random()*.05}));
const sky=[];for(let i=0,px=0;px<1400;i++){const w=34+R(46),h=50+R(120);sky.push({x:px,w,h,win:Array.from({length:Math.floor(h/18)*3},()=>Math.random()<.35)});px+=w+R(10)}
const SKW=1400,LEN=l=>3000+500*Math.min(l,12),spd=()=>Math.min(10.4,5.8+.4*lvl)*SM;
const INTRO=['Spitzen & Blöcke','Gruben & erster Flug-Abschnitt','Sprungfelder & Türme','Sägeblätter & Kombinationen','Flug-Wellen','Volles Tempo!'];
const reset=()=>{st=0;mode=0;y=GY-36;vy=0;rot=0;ob=[];dist=0;nxt=420;lvl=slv=o.sl;lvEnd=LEN(lvl);pStart=0;queue=FORCE[slv]?[...FORCE[slv]]:[];lastShip=slv>=2?0:9;banner=170;ceil=0;parts=[];shake=0;flash=0;nb=0;lm=-1},u=()=>s.innerHTML=`Level ${lvl} · ${Math.floor(dist/10)} m · Versuch ${att} · 🏆 ${best} m`;
const endIt=()=>later(()=>scoreEnd({title:nb?'Neuer Bestwert!':'Crash!',emoji:nb?'🏆':'💥',best:nb,sub:nb?'Besser warst du hier noch nie!':'Der Würfel hat ein Hindernis getroffen.',stats:[['Level',lvl],['Meter',Math.floor(dist/10)],['Bestwert',best]]}),700);
const die=()=>{if(st!=1)return;st=2;endIt();cd=Date.now()+600;shake=16;flash=.6;for(let i=0;i<30;i++)parts.push({x:PX+18,y:y+18,vx:(Math.random()-.5)*12,vy:(Math.random()-.8)*10,l:40+R(30),c:i%3?'#ffd54a':'#fff',s:3+R(5)});const m=Math.floor(dist/10);if(m>best){best=m;nb=1;try{localStorage.setItem(key,best)}catch(e){}}u()};
const press=v=>{hold=v;if(v){if(st==0){st=1;att++;u()}else if(st==2&&Date.now()>cd){reset();att++;st=1;u()}}};
cv.onpointerdown=e=>{try{cv.setPointerCapture(e.pointerId)}catch(_){}press(1)};cv.onpointerup=cv.onpointercancel=()=>press(0);addEventListener('blur',()=>press(0));
onkeydown=e=>{if(e.key==' '||e.key=='ArrowUp'||e.key=='w'){e.preventDefault();if(!e.repeat)press(1)}};onkeyup=e=>{if(e.key==' '||e.key=='ArrowUp'||e.key=='w')press(0)};
// ---- Bausteine (dx = Abstand vom Abschnittsanfang). Typen: 0 Spitze, 1 Block, 2 Sprungfeld, 7 Grube, 10 Säge, 3/4 Portal Flug/Würfel, 5/6 Säule unten/oben, 9 Level-Ziel
const SP=(dx,n)=>({t:0,dx,w:36*n,h:36}),BL=(dx,w,h)=>({t:1,dx,w,h}),SW=dx=>({t:10,dx,w:44,h:44}),sp=()=>spd(),J=()=>36*sp();
const PITF=()=>[.8,1,1.1][o.d];
const CH={
s1:()=>({e:[SP(0,1)],len:36}),s2:()=>({e:[SP(0,2)],len:72}),s3:()=>({e:[SP(0,3)],len:108}),
b1:()=>({e:[BL(0,60,40+R(3)*20)],len:60}),
stairs:()=>({e:[BL(0,60,40),BL(60,60,80),BL(120,60,40)],len:180}),
gs:()=>({e:[SP(0,1),SP(J()+70*GM,1)],len:J()+70*GM+36}),
gs3:()=>({e:[SP(0,1),SP(J()+70*GM,1),SP(2*(J()+70*GM),1)],len:2*(J()+70*GM)+36}),
saw:()=>({e:[SW(0)],len:44}),
saw2:()=>({e:[SW(0),SW(J()+60*GM)],len:J()+60*GM+44}),
pit:()=>{const w=Math.round(J()*.6*PITF());return{e:[{t:7,dx:0,w}],len:w}},
pitspk:()=>{const w=Math.round(J()*.55*PITF()),d=w+J()*.55+50;return{e:[{t:7,dx:0,w},SP(d,1)],len:d+36}},
padspk:()=>{const n=Math.max(3,Math.round(24*sp()/36)),d=12*sp();return{e:[{t:2,dx:0,w:40,h:8},SP(d,n)],len:d+36*n+40}},
padtow:()=>{const d=14*sp()+4,w=Math.round(30*sp()+40);return{e:[{t:2,dx:0,w:40,h:8},BL(d,w,120+R(2)*20)],len:d+w}},
blkspk:()=>({e:[BL(0,120,40),SP(120,3)],len:228}),
ship:()=>{const n=6+Math.min(slv,10),sx=Math.max(200,340-slv*14),g=Math.max(122,176-slv*5)+[22,0,-8][o.d],e=[{t:3,dx:0,w:40,h:0}];let cy=230;
for(let i=0;i<n;i++){cy=Math.max(CE+g/2+10,Math.min(GY-g/2-10,cy+(R(2)?1:-1)*(30+R(70))));const dx=300+i*sx,f=GY-(cy+g/2),c=cy-g/2-CE;if(f>8)e.push({t:5,dx,w:54,h:f});if(c>8)e.push({t:6,dx,w:54,h:c})}
const len=300+n*sx+260;e.push({t:4,dx:len-40,w:40,h:0});return{e,len:len+20}},
wave:()=>{const n=16+Math.min(slv,10)*2,g=Math.max(130,176-slv*3)+[22,0,-6][o.d],lo=CE+g/2+6,hi=GY-g/2-6,mid=(lo+hi)/2,am=(hi-lo)/2*.92,e=[{t:3,dx:0,w:40,h:0}];
for(let i=0;i<n;i++){const cy=mid+am*Math.sin(i*.34),dx=280+i*58,f=GY-(cy+g/2),c=cy-g/2-CE;if(f>8)e.push({t:5,dx,w:58,h:f});if(c>8)e.push({t:6,dx,w:58,h:c})}
const len=280+n*58+240;e.push({t:4,dx:len-40,w:40,h:0});return{e,len:len+20}}};
const FORCE={2:['pit','ship'],3:['padspk','padtow'],4:['saw','blkspk'],5:['wave'],6:['gs3','ship']};
const spawn=()=>{const X=W+40,swx=dist+X-PX;
if(swx>=lvEnd){const mx=Math.max(X,PX+lvEnd-dist);ob.push({t:9,x:mx,w:20,h:0});slv++;lvEnd+=LEN(slv);queue=FORCE[slv]?[...FORCE[slv]]:[];nxt=dist+(mx-X)+90;return}
const l=slv,pool=['s1','s2','b1','s3'];if(l>=2)pool.push('pit','stairs','gs');if(l>=3)pool.push('padspk','padtow');if(l>=4)pool.push('saw','blkspk','pitspk');if(l>=5)pool.push('gs3','saw2');if(l>=7)pool.push('padtow','pitspk','saw2');
let k;if(queue.length)k=queue.shift();else if(l>=2&&lastShip>=4&&R(100)<38)k=(l>=5&&R(2))?'wave':'ship';else k=pool[R(pool.length)];lastShip=(k=='ship'||k=='wave')?0:lastShip+1;
const c=CH[k]();c.e.forEach(b=>ob.push({...b,x:X+b.dx}));nxt=dist+c.len+(J()+40+R(Math.max(10,120-slv*10)))*GM*Math.max(.62,1-.05*Math.max(0,slv-5))};
// ---- Zeichnen
const poly=(...p)=>{x.beginPath();x.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)x.lineTo(p[i][0],p[i][1]);x.closePath()};
const glow=(c,w)=>{x.globalAlpha=.28;x.strokeStyle=c;x.lineWidth=w+7;x.stroke();x.globalAlpha=1;x.strokeStyle=c;x.lineWidth=w;x.stroke()};
const tile=(bx,by,bw,bh,hu,acc)=>{x.fillStyle=`hsl(${hu} 55% 17%)`;x.fillRect(bx,by,bw,bh);x.strokeStyle=`hsl(${hu} 60% 28%)`;x.lineWidth=1;const nx=Math.max(1,Math.round(bw/30)),ny=Math.max(1,Math.round(bh/30));
for(let i=1;i<nx;i++){x.beginPath();x.moveTo(bx+i*bw/nx,by);x.lineTo(bx+i*bw/nx,by+bh);x.stroke()}for(let j=1;j<ny;j++){x.beginPath();x.moveTo(bx,by+j*bh/ny);x.lineTo(bx+bw,by+j*bh/ny);x.stroke()}
x.fillStyle=`hsl(${hu} 80% 60% / .16)`;x.fillRect(bx+3,by+3,bw-6,Math.min(10,bh-6));x.beginPath();x.rect(bx+1.5,by+1.5,bw-3,bh-3);glow(acc,3)};
const draw=()=>{const hu=(lvl*47+dist/60)%360,acc=`hsl(${hu} 100% 64%)`,dk=`hsl(${hu} 55% 10%)`;x.save();if(shake>0)x.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);
const g=x.createLinearGradient(0,0,0,GY);g.addColorStop(0,`hsl(${hu} 65% 9%)`);g.addColorStop(1,`hsl(${(hu+35)%360} 70% 26%)`);x.fillStyle=g;x.fillRect(-10,-10,W+20,H+20);
stars.forEach(s2=>{const sx=((s2.x-dist*s2.p)%W+W)%W;x.fillStyle='#ffffff88';x.fillRect(sx,s2.y,s2.r,s2.r)});
const off=(dist*.22)%SKW;x.fillStyle=`hsl(${hu} 55% 14%)`;for(let rep=-1;rep<2;rep++)sky.forEach(b=>{const bx=b.x-off+rep*SKW;if(bx>W||bx+b.w<0)return;x.fillRect(bx,GY-b.h,b.w,b.h);x.fillStyle=`hsl(${hu} 100% 70% / .22)`;b.win.forEach((on,i)=>{if(on)x.fillRect(bx+5+(i%3)*((b.w-10)/3),GY-b.h+6+Math.floor(i/3)*18,5,8)});x.fillStyle=`hsl(${hu} 55% 14%)`});
// Boden
const gg=x.createLinearGradient(0,GY,0,H);gg.addColorStop(0,`hsl(${hu} 60% 24%)`);gg.addColorStop(1,`hsl(${hu} 60% 9%)`);x.fillStyle=gg;x.fillRect(-10,GY,W+20,H-GY+10);x.strokeStyle=`hsl(${hu} 60% 34%)`;x.lineWidth=2;for(let i=0;i<20;i++){const gx=((i*50-dist)%1000+1000)%1000-50;x.beginPath();x.moveTo(gx,GY);x.lineTo(gx-20,H);x.stroke()}
ob.forEach(b=>{if(b.t==7){const lg=x.createLinearGradient(0,GY,0,H);lg.addColorStop(0,dk);lg.addColorStop(1,'#ff2d55aa');x.fillStyle=lg;x.fillRect(b.x,GY,b.w,H-GY);x.strokeStyle='#ff6b8b';x.lineWidth=3;x.beginPath();x.moveTo(b.x,GY);x.lineTo(b.x,H);x.moveTo(b.x+b.w,GY);x.lineTo(b.x+b.w,H);x.stroke()}});
x.fillStyle=acc;x.fillRect(-10,GY,W+20,3);ob.forEach(b=>{if(b.t==7){x.fillStyle=dk;x.fillRect(b.x,GY-1,b.w,5)}});
if(ceil>1){x.fillStyle=`hsl(${hu} 60% 15%)`;x.fillRect(-10,0,W+20,ceil);x.fillStyle=acc;x.fillRect(-10,ceil-3,W+20,3)}
ob.forEach(b=>{const t=b.t;
if(t==0)for(let i=0;i<b.w/36;i++){const a=[b.x+i*36,GY],c=[b.x+i*36+18,GY-36],d=[b.x+i*36+36,GY];poly(a,c,d);x.fillStyle='#0a0a14';x.fill();poly([a[0]+7,GY-3],[c[0],c[1]+10],[d[0]-7,GY-3]);x.fillStyle=`hsl(${hu} 100% 60% / .35)`;x.fill();poly(a,c,d);glow(acc,2.5)}
else if(t==10){const cx=b.x+22,cy=GY-22,a=dist*.06;x.save();x.translate(cx,cy);x.rotate(a);x.beginPath();for(let k=0;k<16;k++){const r=k%2?15:23,an=k*Math.PI/8;x.lineTo(Math.cos(an)*r,Math.sin(an)*r)}x.closePath();x.fillStyle='#0a0a14';x.fill();glow('#ff4d6d',2.5);x.fillStyle='#ff4d6d';x.beginPath();x.arc(0,0,5,0,7);x.fill();x.restore()}
else if(t==1)tile(b.x,GY-b.h,b.w,b.h,hu,acc);
else if(t==5)tile(b.x,GY-b.h,b.w,b.h,hu,acc);
else if(t==6)tile(b.x,CE,b.w,b.h,hu,acc);
else if(t==2){x.fillStyle='#ffd54a';x.beginPath();x.moveTo(b.x,GY);x.quadraticCurveTo(b.x+b.w/2,GY-22,b.x+b.w,GY);x.closePath();x.fill();x.globalAlpha=.3;x.fillStyle='#ffd54a';x.fillRect(b.x-6,GY-4,b.w+12,4);x.globalAlpha=1;x.strokeStyle='#14213d';x.lineWidth=2.5;for(let i=0;i<2;i++){x.beginPath();x.moveTo(b.x+10+i*10,GY-5);x.lineTo(b.x+b.w/2,GY-12-i*0);x.lineTo(b.x+b.w-10-i*10,GY-5);x.stroke()}}
else if(t==3||t==4){const a=t==3?'#ff4fd8':'#4fffd0',top=t==3?GY-130:CE,hh=t==3?130:GY-CE,cx=b.x+20,cy=top+hh/2;for(let k=0;k<3;k++){x.beginPath();x.ellipse(cx,cy,16-k*4,hh/2-k*6,0,0,7);glow(a,k?2:4)}x.fillStyle=a;x.globalAlpha=.9;poly([cx-5,cy-9],[cx+7,cy],[cx-5,cy+9]);x.fill();x.globalAlpha=1}
else if(t==9){for(let i=0;i<H/20;i++){x.fillStyle=i%2?'#fff':'#14213d';x.fillRect(b.x,i*20,10,20);x.fillStyle=i%2?'#14213d':'#fff';x.fillRect(b.x+10,i*20,10,20)}}});
parts.forEach(p=>{x.globalAlpha=Math.max(0,Math.min(1,p.l/30));x.fillStyle=p.c;const z=p.s||3;x.fillRect(p.x-z/2,p.y-z/2,z,z)});x.globalAlpha=1;
if(st!=2){x.save();x.translate(PX+18,y+18);x.rotate(rot);
if(mode==0){x.fillStyle='#ffd54a';x.fillRect(-18,-18,36,36);x.fillStyle='#fff6';x.fillRect(-14,-14,28,8);x.strokeStyle='#14213d';x.lineWidth=3;x.strokeRect(-16.5,-16.5,33,33);x.fillStyle='#14213d';x.fillRect(-9,-7,7,9);x.fillRect(4,-7,7,9);x.fillRect(-8,8,16,3)}
else{x.fillStyle='#ff7a3c';poly([-24,-4],[-30,0],[-24,4]);x.fill();poly([-20,-18],[22,0],[-20,18]);x.fillStyle='#ffd54a';x.fill();x.strokeStyle='#14213d';x.lineWidth=3;x.stroke();x.fillStyle='#4fffd0';x.beginPath();x.ellipse(2,-1,8,5,0,0,7);x.fill();x.strokeStyle='#14213d';x.lineWidth=2;x.stroke()}x.restore()}
x.restore();if(flash>0){x.fillStyle=`rgba(255,255,255,${flash})`;x.fillRect(0,0,W,H)}
// Anzeigen
const pr=Math.min(1,Math.max(0,(dist-pStart)/LEN(lvl)));x.fillStyle='#0008';x.fillRect(20,12,W-40,12);x.fillStyle=acc;x.fillRect(20,12,(W-40)*pr,12);x.fillStyle='#fff';x.textAlign='left';x.font='800 15px ui-rounded,system-ui,sans-serif';x.fillText(`Level ${lvl}`,22,44);x.textAlign='right';x.fillText(`${Math.round(pr*100)} %`,W-22,44);
x.textAlign='center';x.fillStyle='#fff';
if(st==0){x.fillStyle='#000a';x.fillRect(180,70,440,150);x.fillStyle='#fff';x.font='900 40px ui-rounded,system-ui,sans-serif';x.fillText('NEON-DASH',W/2,118);x.font='700 20px ui-rounded,system-ui,sans-serif';x.fillText('Tippen = springen · Halten = Dauersprung',W/2,152);x.font='600 17px ui-rounded,system-ui,sans-serif';x.fillText(`Level ${lvl}: ${INTRO[Math.min(lvl,6)-1]}`,W/2,182);x.fillText(`Bestwert ${best} m`,W/2,206)}
if(st==1&&banner>0){x.globalAlpha=Math.min(1,banner/40);x.font='900 46px ui-rounded,system-ui,sans-serif';x.fillStyle='#fff';x.fillText(`Level ${lvl}`,W/2,120);x.font='700 22px ui-rounded,system-ui,sans-serif';x.fillText(INTRO[Math.min(lvl,6)-1],W/2,152);x.globalAlpha=1}
};
// ---- Spielschleife
const cr=(cx,cy,r,rx,ry,rw,rh)=>{const nx=Math.max(rx,Math.min(cx,rx+rw)),ny=Math.max(ry,Math.min(cy,ry+rh));return Math.hypot(cx-nx,cy-ny)<r};
reset();u();
const go=now=>{const d=Math.min(2.5,(now-(lt||now))/16.67);lt=now;
parts.forEach(p=>{p.x+=p.vx*d;p.y+=p.vy*d;p.vy+=.35*d;p.l-=d});parts=parts.filter(p=>p.l>0);if(shake>0)shake=Math.max(0,shake-d);if(flash>0)flash=Math.max(0,flash-.05*d);
if(st==1){const v=spd()*d;dist+=v;if(banner>0)banner-=d;ob.forEach(b=>b.x-=v);ceil+=((mode?CE:0)-ceil)*.08*d;
if(mode==0){vy+=.62*d;y+=vy*d;let fl=GY,pd=0;const cx=PX+18;
ob.forEach(b=>{const ov=PX+36>b.x+4&&PX<b.x+b.w-4;
if(b.t==1&&ov){if(y+36<=GY-b.h+16)fl=Math.min(fl,GY-b.h);else die()}
else if(b.t==0&&ov&&y+36>GY-26)die();
else if(b.t==10&&cr(b.x+22,GY-22,21,PX+5,y+5,26,26))die();
else if(b.t==2&&ov&&y+36>=GY-6&&vy>=0&&!b.u){b.u=1;pd=1;shake=5;for(let i=0;i<12;i++)parts.push({x:PX+18,y:GY-4,vx:(Math.random()-.5)*6,vy:-Math.random()*6,l:25,c:'#ffd54a'})}
else if(b.t==7&&cx>b.x&&cx<b.x+b.w&&y+36>=GY-2)fl=H+300});
if(y+36>=fl){y=fl-36;vy=0;rot=Math.round(rot/(Math.PI/2))*(Math.PI/2);if(hold)vy=-11.2;if(st==1&&Math.random()<.5)parts.push({x:PX+2,y:fl-3,vx:-2-Math.random()*2,vy:-Math.random()*1.5,l:14,c:'#ffd54a99',s:4})}else rot+=.085*d;if(pd)vy=-15.5;
if(y>GY+10)die()}
else{vy+=(hold?-.5:.42)*d;vy=Math.max(-6.5,Math.min(6.5,vy));y+=vy*d;if(y<ceil){y=ceil;vy=0}if(y>GY-36){y=GY-36;vy=0}rot=vy*.06;
ob.forEach(b=>{if(b.t!=5&&b.t!=6)return;if(PX+31>b.x&&PX+5<b.x+b.w){if(b.t==5&&y+31>GY-b.h)die();if(b.t==6&&y+5<CE+b.h)die()}});
if(st==1&&Math.random()<.7)parts.push({x:PX-12,y:y+18+(Math.random()-.5)*6,vx:-3-Math.random()*2,vy:(Math.random()-.5),l:16,c:Math.random()<.5?'#ff7a3c':'#ffd54a',s:5})}
ob.forEach(b=>{if(b.t==3&&!b.d&&b.x<PX+18){b.d=1;mode=1;rot=0;flash=.25}if(b.t==4&&!b.d&&b.x<PX+18){b.d=1;mode=0;vy=Math.min(vy,2);flash=.25}if(b.t==9&&!b.d&&b.x<PX){b.d=1;lvl++;pStart=dist;banner=170;flash=.3}});
ob=ob.filter(b=>b.x+b.w>-120);if(dist>=nxt)spawn();
const m=Math.floor(dist/10);if(m!=lm){lm=m;u()}}
draw();raf=requestAnimationFrame(go)};raf=requestAnimationFrame(go)}

registerGame({"id": "neon-dash", "n": "Neon-Dash", "i": "🟨", "cat": "Action", "c": ["#06b6d4", "#6d28d9"], "fl": "nt", "pl": "1", "rules": "Springe über Spitzen, Gruben und Sägeblätter, nutze gelbe Sprungfelder und fliege durch Röhren. Mit jedem Level wird es schneller und gemeiner.", "o": [["d", "Schwierigkeit", [["Leicht", 0], ["Mittel", 1], ["Schwer", 2]], 1], ["sl", "Starten bei", [["Level 1", 1], ["Level 2 (Flug)", 2], ["Level 3", 3], ["Level 5", 5], ["Level 8", 8], ["Level 10", 10]]]],f:dash});
