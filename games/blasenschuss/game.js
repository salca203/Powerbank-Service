// Blasenschuss
function bub(o){const s=bar(()=>bub(o)),W=400,H=640,BR=20,RH=34.64,SX=200,SY=585,NX=90,NY=598,N=o.n,LIM=11-N,PAL=['#ef476f','#118ab2','#2dc26b','#ffd166','#5ad8e6','#b44fd8'],key='bs'+N,cv=$('canvas','hk');cv.width=W;cv.height=H;app.append(cv);const x=cv.getContext('2d');
let best=0;try{best=+localStorage.getItem(key)||0}catch(e){}
let g,par,sc,lv,miss,cur,nxt,mv,fx=[],ang=Math.PI/2,st,turn=0,res=[],cd=0,nb=0,lt=0,sw=0,ta=0;const seed=1+R(1e6),TT={4:18000,5:15000,6:12000}[N],dead=()=>g.some((row,p)=>p>=14&&row.some(v=>v>=0));
const len=r=>(r+par)%2?9:10,cx=(r,c)=>BR+c*2*BR+((r+par)%2?BR:0),cy=r=>BR+r*RH;
const present=()=>{const a=new Set();g.forEach(r=>r.forEach(v=>{if(v>=0)a.add(v)}));return[...a]},pick=()=>{const a=present();return a.length?a[R(a.length)]:0};
const board=()=>{let a=seed+lv*7919;const rn=()=>(a=(a*1664525+1013904223)>>>0)/4294967296;par=0;g=[];for(let r=0;r<16;r++)g.push(Array(len(r)).fill(-1).map(()=>r<5+Math.min(lv,5)?Math.floor(rn()*N):-1));cur=pick();nxt=pick();miss=0;ta=0;mv=null};
const u=()=>s.innerHTML=(o.m==2?`${dot(turn)}${names[turn]} · `:'')+`Level ${lv} · Punkte ${sc} · 🏆 ${best}`;
const newGame=()=>{sc=0;lv=1;st=1;nb=0;fx=[];board();u()};
const near=(px,py)=>{const r0=Math.round((py-BR)/RH);for(let r=Math.max(0,r0-1);r<=Math.min(g.length-1,r0+1);r++)for(let c=0;c<len(r);c++)if(g[r][c]>=0&&Math.hypot(cx(r,c)-px,cy(r)-py)<34)return 1;return 0};
const nbr=(r,c)=>{const o2=(r+par)%2,a=[[r,c-1],[r,c+1]];for(const rr of[r-1,r+1])(o2?[c,c+1]:[c-1,c]).forEach(cc=>a.push([rr,cc]));return a.filter(([p,q])=>p>=0&&p<g.length&&q>=0&&q<len(p))};
const flood=(r,c,f)=>{const seen=new Set([r*20+c]),q=[[r,c]];for(let i=0;i<q.length;i++)nbr(...q[i]).forEach(([p,t])=>{if(!seen.has(p*20+t)&&f(g[p][t])){seen.add(p*20+t);q.push([p,t])}});return q};
const pop=l=>l.forEach(([p,q])=>{fx.push({x:cx(p,q),y:cy(p),vx:(Math.random()-.5)*5,vy:-2-Math.random()*4,c:g[p][q]});g[p][q]=-1});
const endIt=()=>later(()=>{if(o.m!=2)return scoreEnd({title:nb?'Neuer Bestwert!':'Spiel vorbei',emoji:nb?'🏆':'🔮',best:nb,sub:'Die Kugeln haben die rote Linie erreicht.',stats:[['Punkte',sc],['Level',lv],['Bestwert',best]]});
 if(st==2)return endScreen({kind:'draw',emoji:'🔮',title:names[0]+': '+sc+' Punkte',sub:names[1]+' ist jetzt dran – schlag dieses Ergebnis!',againLabel:'▶ '+names[1]+' spielt',again:()=>{turn=1;newGame()}});
 duelEnd(res[0]==res[1]?-1:+(res[1]>res[0]),{stats:[[names[0],res[0]],[names[1],res[1]]]})},800);
const fin=()=>{st=o.m==2&&turn==1?3:2;cd=Date.now()+700;if(sc>best){best=sc;nb=1;try{localStorage.setItem(key,best)}catch(e){}}res[turn]=sc;u();endIt()};
const addRow=()=>{par^=1;g.unshift(Array(len(0)).fill(-1).map(()=>R(N)))};
const land=()=>{let b=null,bd=1e9;const r0=Math.round((mv.y-BR)/RH);for(let r=Math.max(0,r0-1);r<=r0+1;r++){if(r>=g.length)continue;for(let c=0;c<len(r);c++)if(g[r][c]<0){const d=Math.hypot(cx(r,c)-mv.x,cy(r)-mv.y);if(d<bd){bd=d;b=[r,c]}}}
const col=mv.c;mv=null;if(!b)return;const[r,c]=b;g[r][c]=col;const grp=flood(r,c,v=>v==col);
if(grp.length>=3){pop(grp);sc+=grp.length*10+(grp.length-3)*10;const live=new Set();g[0].forEach((v,c2)=>{if(v>=0)flood(0,c2,v2=>v2>=0).forEach(([p,q])=>live.add(p*20+q))});const fl=[];g.forEach((row,p)=>row.forEach((v,q)=>{if(v>=0&&!live.has(p*20+q))fl.push([p,q])}));pop(fl);sc+=fl.length*20}
if(++miss>=LIM){addRow();miss=0;ta=0}
if(g.every(row=>row.every(v=>v<0))){lv++;sc+=500;board()}else if(dead())return fin();
const ps=present();if(!ps.includes(cur))cur=pick();if(!ps.includes(nxt))nxt=pick();u()};
const step=d=>{if(!mv)return;for(let i=0,n=Math.ceil(4*d);i<n&&mv;i++){mv.x+=mv.vx*4;mv.y+=mv.vy*4;if(mv.x<BR){mv.x=BR;mv.vx*=-1}if(mv.x>W-BR){mv.x=W-BR;mv.vx*=-1}if(mv.y<=BR||near(mv.x,mv.y))land()}};
const shoot=()=>{if(st==1&&!mv){mv={x:SX,y:SY,vx:Math.cos(ang),vy:-Math.sin(ang),c:cur};cur=nxt;nxt=pick()}},swap=()=>{if(st==1&&!mv)[cur,nxt]=[nxt,cur]},next=()=>{if(st==1)shoot()};
const pos=e=>{const r=cv.getBoundingClientRect();return{x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*H/r.height}},aim=e=>{const p=pos(e);ang=Math.max(.14,Math.min(Math.PI-.14,Math.atan2(SY-p.y,p.x-SX)))};
cv.onpointerdown=e=>{cv.setPointerCapture(e.pointerId);const p=pos(e);if(st==1&&Math.hypot(p.x-NX,p.y-NY)<34){sw=1;swap();return}aim(e)};cv.onpointermove=aim;cv.onpointerup=e=>{if(sw){sw=0;return}aim(e);next()};
onkeydown=e=>{if(e.key=='ArrowLeft')ang=Math.min(Math.PI-.14,ang+.05);if(e.key=='ArrowRight')ang=Math.max(.14,ang-.05);if(e.key=='ArrowDown')swap();if(e.key==' '){e.preventDefault();next()}};
const ball=(px,py,c,r=BR-1)=>{x.fillStyle=PAL[c];x.beginPath();x.arc(px,py,r,0,7);x.fill();const q=x.createRadialGradient(px-r*.35,py-r*.4,1,px,py,r);q.addColorStop(0,'rgba(255,255,255,.85)');q.addColorStop(.35,'rgba(255,255,255,0)');q.addColorStop(1,'rgba(0,0,0,.3)');x.fillStyle=q;x.fill()};
const tx=(m,yy,f)=>{x.font=`800 ${f}px ui-rounded,system-ui,sans-serif`;x.fillText(m,W/2,yy)};
const draw=()=>{const bg=x.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#1b2a52');bg.addColorStop(1,'#46307a');x.fillStyle=bg;x.fillRect(0,0,W,H);x.fillStyle='#ffffff22';x.fillRect(0,0,W,6);x.fillStyle='#ef476f';x.fillRect(0,0,W*Math.min(1,ta/TT),6);
g.forEach((row,r)=>row.forEach((v,c)=>{if(v>=0)ball(cx(r,c),cy(r),v)}));
x.strokeStyle='#ef476f';x.lineWidth=2;x.setLineDash([8,8]);x.beginPath();x.moveTo(0,cy(14)-RH/2);x.lineTo(W,cy(14)-RH/2);x.stroke();x.setLineDash([]);
if(st==1&&!mv){let px=SX,py=SY,vx=Math.cos(ang),vy=-Math.sin(ang);x.fillStyle='#ffffffaa';for(let i=0;i<80;i++){px+=vx*7;py+=vy*7;if(px<BR){px=BR;vx=-vx}if(px>W-BR){px=W-BR;vx=-vx}if(py<BR||near(px,py))break;if(i%2){x.beginPath();x.arc(px,py,2.5,0,7);x.fill()}}}
fx.forEach(f=>ball(f.x,f.y,f.c));if(mv)ball(mv.x,mv.y,mv.c);
x.save();x.translate(SX,SY);x.rotate(-ang);x.fillStyle='#8d99c9';x.fillRect(0,-7,50,14);x.restore();
x.fillStyle='#2a3566';x.beginPath();x.arc(SX,SY,30,0,7);x.fill();if(st==1&&!mv)ball(SX,SY,cur);
x.beginPath();x.arc(NX,NY,24,0,7);x.fill();ball(NX,NY,nxt,15);
x.fillStyle='#fff';x.textAlign='center';tx('tauschen',NY+40,13);x.fillText(`Neue Reihe in ${LIM-miss} Schüssen`,W-85,SY+10)};
const go=now=>{const d=Math.min(2.5,(now-(lt||now))/16.67);lt=now;if(st==1&&!mv){ta+=d*16.67;if(ta>=TT){addRow();miss=0;ta=0;if(dead())fin();else{const ps=present();if(!ps.includes(cur))cur=pick();if(!ps.includes(nxt))nxt=pick()}}}step(d);fx.forEach(f=>{f.vy+=.5*d;f.y+=f.vy*d;f.x+=f.vx*d});fx=fx.filter(f=>f.y<H+30);draw();raf=requestAnimationFrame(go)};
newGame();raf=requestAnimationFrame(go)}

registerGame({"id": "blasenschuss", "n": "Blasenschuss", "i": "🔮", "cat": "Puzzle", "c": ["#8b5cf6", "#ec4899"], "fl": "t", "pl": "1", "rules": "Zielen, loslassen, schießen. Drei oder mehr gleiche Kugeln platzen, lose hängende fallen. Reservekugel antippen zum Tauschen. Alle paar Schüsse und alle paar Sekunden kommt oben eine neue Reihe dazu. Erreichen die Kugeln die rote Linie unten, ist das Spiel vorbei.", "o": [["n", "Schwierigkeit", [["Leicht · 4 Farben", 4], ["Mittel · 5 Farben", 5], ["Schwer · 6 Farben", 6]]]],f:bub});
