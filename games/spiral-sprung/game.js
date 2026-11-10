// Spiral-Sprung
function spr(o){const s=bar(()=>spr(o)),W=400,H=700,RX=125,RY=26,SP=120,SEG=12,AS=Math.PI*2/SEG,cv=$('canvas','hk'),key='sp',GS=2,RM=1;cv.width=W;cv.height=H;app.append(cv);const x=cv.getContext('2d');let best=0;try{best=+localStorage.getItem(key)||0}catch(e){}
let ps,y,vy,rot,sc,st,cam,nb,cd=0,lt=0,dg=0,lx=0;
const mk=i=>{const sg=Array(SEG).fill(1),a=R(SEG);for(let q=0;q<GS;q++)sg[(a+q)%SEG]=0;for(let k=0,n=i>2?Math.min(8,Math.round((1+(i>>2))*RM)):0;k<n;k++){const j=R(SEG);if(sg[j]==1)sg[j]=2}return{y:300+i*SP,s:sg,p:0,h:(250+i*23)%360}};
const reset=()=>{ps=[];for(let i=0;i<9;i++)ps.push(mk(i));y=100;vy=0;rot=0;sc=0;st=0;cam=0;nb=0},u=()=>s.innerHTML=`Ebenen ${sc} · 🏆 ${best}`;reset();u();
const endIt=()=>later(()=>scoreEnd({title:nb?'Neuer Bestwert!':'Game Over',emoji:nb?'🏆':'🌀',best:nb,sub:nb?'Besser warst du hier noch nie!':'Der Ball ist an einem roten Teil zerplatzt.',stats:[['Ebenen',sc],['Bestwert',best]]}),700);
const die=()=>{if(st!=1)return;st=2;endIt();cd=Date.now()+500;if(sc>best){best=sc;nb=1;try{localStorage.setItem(key,best)}catch(e){}}u()},start=()=>{if(st==0)st=1;else if(st==2&&Date.now()>cd){reset();u()}};
cv.onpointerdown=e=>{dg=1;lx=e.clientX;cv.setPointerCapture(e.pointerId);start()};cv.onpointermove=e=>{if(dg){rot-=(e.clientX-lx)*.014;lx=e.clientX}};cv.onpointerup=cv.onpointercancel=()=>dg=0;
onkeydown=e=>{if(e.key=='ArrowLeft'){rot+=.15;start()}if(e.key=='ArrowRight'){rot-=.15;start()}if(e.key==' '){e.preventDefault();start()}};
const seg=(p,k,f)=>{const a=rot+k*AS;if((Math.sin(a+AS/2)>0)!=f||!p.s[k])return;x.strokeStyle=p.s[k]==2?(f?'#ff4d6d':'#a0243d'):`hsl(${p.h} 70% ${f?62:46}%)`;x.beginPath();x.ellipse(200,p.y-cam,RX,RY,0,a+.02,a+AS-.02);x.stroke()};
const tx=(m,yy,f)=>{x.font=`800 ${f}px ui-rounded,system-ui,sans-serif`;x.fillText(m,W/2,yy)};
const draw=()=>{const bg=x.createLinearGradient(0,0,0,H);bg.addColorStop(0,`hsl(${(260+sc*6)%360} 60% 20%)`);bg.addColorStop(1,`hsl(${(300+sc*6)%360} 60% 10%)`);x.fillStyle=bg;x.fillRect(0,0,W,H);
const vis=ps.filter(p=>p.y-cam>-60&&p.y-cam<H+60);x.lineWidth=20;vis.forEach(p=>{for(let k=0;k<SEG;k++)seg(p,k,false)});
const pg=x.createLinearGradient(172,0,228,0);pg.addColorStop(0,'#2a2358');pg.addColorStop(.5,'#5b4fa8');pg.addColorStop(1,'#2a2358');x.fillStyle=pg;x.fillRect(172,0,56,H);
vis.forEach(p=>{for(let k=0;k<SEG;k++)seg(p,k,true)});
x.fillStyle='#ffd166';x.beginPath();x.arc(200,y-cam,12,0,7);x.fill();x.fillStyle='#fff8';x.beginPath();x.arc(196,y-cam-4,4,0,7);x.fill();
x.textAlign='center';x.fillStyle='#fff';if(st)tx(sc,70,48);if(st==0){tx('Tippen, dann ziehen zum Drehen',H-90,22)}
};
const go=now=>{const d=Math.min(2.5,(now-(lt||now))/16.67);lt=now;
if(st==1){const py=y;vy+=.5*d;y+=vy*d;ps.forEach(p=>{const sf=p.y+RY;if(vy>0&&py+12<=sf&&y+12>=sf){const v=p.s[(((Math.floor((Math.PI/2-rot)/AS))%SEG)+SEG)%SEG];if(v==1){y=sf-12;vy=-9.5}else if(v==2)die()}if(!p.p&&y>sf+6){p.p=1;sc++;u()}});while(ps[ps.length-1].y<y+1000)ps.push(mk(ps.length))}
cam+=(y-250-cam)*.15*Math.min(d,2);draw();raf=requestAnimationFrame(go)};raf=requestAnimationFrame(go)}

registerGame({"id": "spiral-sprung", "n": "Spiral-Sprung", "i": "🔴", "cat": "Action", "c": ["#f43f5e", "#7c3aed"], "fl": "nt", "pl": "1", "rules": "Ziehe nach links und rechts, um den Turm zu drehen. Lass den Ball durch die Lücken fallen und meide rote Teile.", "o": [],f:spr});
