// Block-Blitz
function blk(o){const s=bar(()=>blk(o)),W=400,H=560,C=46,GX=16,GY=16,cv=$('canvas','hk'),PAL=['#ef476f','#118ab2','#2dc26b','#ffd166','#5ad8e6','#b44fd8','#f97316'],key='bk'+o.d,
SH='1 11 1/1 111 1/1/1 1111 1/1/1/1 11/11 111/111/111 10/11 11/10 01/11 11/01 100/100/111 111/100/100 011/110 110/011'.split(' ').map(p=>{const a=[];p.split('/').forEach((r,i)=>[...r].forEach((c,j)=>{if(c=='1')a.push([i,j])}));return a});
cv.width=W;cv.height=H;app.append(cv);const x=cv.getContext('2d');let best=0;try{best=+localStorage.getItem(key)||0}catch(e){}
let g=Array.from({length:8},()=>Array(8).fill(-1)),ps=[],dr=null,sc=0,over=0;
const fresh=()=>{ps=[0,1,2].map(()=>{const pool=SH.filter(a=>o.d==0?a.length<=4:true);let a=pool[R(pool.length)];if(o.d==2){const b=pool[R(pool.length)];if(b.length>a.length)a=b}return{a,c:R(7),u:0}})},dim=a=>[Math.max(...a.map(p=>p[0]))+1,Math.max(...a.map(p=>p[1]))+1];
const fits=(a,r,c)=>a.every(([i,j])=>r+i>=0&&r+i<8&&c+j>=0&&c+j<8&&g[r+i][c+j]<0),any=()=>ps.some(p=>!p.u&&g.some((row,r)=>row.some((_,c)=>fits(p.a,r,c)))),u=()=>s.innerHTML=`Punkte ${sc} · 🏆 ${best}`;fresh();u();
const place=(p,r,c)=>{p.a.forEach(([i,j])=>g[r+i][c+j]=p.c);p.u=1;sc+=p.a.length;const rs=[],cs=[];for(let i=0;i<8;i++){if(g[i].every(v=>v>=0))rs.push(i);if(g.every(row=>row[i]>=0))cs.push(i)}rs.forEach(i=>g[i].fill(-1));cs.forEach(j=>g.forEach(row=>row[j]=-1));const n=rs.length+cs.length;sc+=n*n*10;
if(ps.every(q=>q.u))fresh();if(!any()){over=1;if(sc>best){best=sc;try{localStorage.setItem(key,best)}catch(e){}}}u()};
const pos=e=>{const r=cv.getBoundingClientRect();return{x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*H/r.height}},tg=()=>{const p=ps[dr.i],[h,w]=dim(p.a);return[p,Math.round((dr.y-80-h*C/2-GY)/C),Math.round((dr.x-w*C/2-GX)/C)]};
cv.onpointerdown=e=>{if(over){clear();blk(o);return}const p=pos(e);if(p.y>400){const i=Math.floor((p.x-5)/130);if(i>=0&&i<3&&!ps[i].u){dr={i,x:p.x,y:p.y};cv.setPointerCapture(e.pointerId)}}};
cv.onpointermove=e=>{if(dr){const p=pos(e);dr.x=p.x;dr.y=p.y}};cv.onpointerup=()=>{if(!dr)return;const[p,r,c]=tg();if(fits(p.a,r,c))place(p,r,c);dr=null};
const cell=(px,py,c,z)=>{x.fillStyle=PAL[c];x.beginPath();if(x.roundRect)x.roundRect(px+1,py+1,z-2,z-2,7);else x.rect(px+1,py+1,z-2,z-2);x.fill();x.fillStyle='#fff3';x.fillRect(px+5,py+4,z-10,5)};
const draw=()=>{x.fillStyle='#1b1640';x.fillRect(0,0,W,H);for(let r=0;r<8;r++)for(let c=0;c<8;c++){x.fillStyle='#2a2358';x.fillRect(GX+c*C+2,GY+r*C+2,C-4,C-4);if(g[r][c]>=0)cell(GX+c*C,GY+r*C,g[r][c],C)}
if(dr){const[p,r,c]=tg();if(fits(p.a,r,c)){x.globalAlpha=.35;p.a.forEach(([i,j])=>cell(GX+(c+j)*C,GY+(r+i)*C,p.c,C));x.globalAlpha=1}}
ps.forEach((p,k)=>{if(p.u||(dr&&dr.i==k))return;const[h,w]=dim(p.a);p.a.forEach(([i,j])=>cell(70+k*130-w*14+j*28,480-h*14+i*28,p.c,28))});
if(dr){const p=ps[dr.i],[h,w]=dim(p.a);p.a.forEach(([i,j])=>cell(dr.x-w*C/2+j*C,dr.y-80-h*C/2+i*C,p.c,C))}
if(over){x.fillStyle='#000b';x.fillRect(0,0,W,H);x.fillStyle='#fff';x.textAlign='center';x.font='800 34px ui-rounded,system-ui,sans-serif';x.fillText('Keine Züge mehr',W/2,230);x.font='700 26px ui-rounded,system-ui,sans-serif';x.fillText(`Punkte ${sc}`,W/2,280);x.fillText(`Bestwert ${best}`,W/2,320);x.font='600 18px ui-rounded,system-ui,sans-serif';x.fillText('Tippen für neues Spiel',W/2,370)}};
const go=()=>{draw();raf=requestAnimationFrame(go)};go()}

registerGame({"id": "block-blitz", "n": "Block-Blitz", "i": "🧱", "cat": "Puzzle", "c": ["#7c3aed", "#2563eb"], "fl": "nt", "pl": "1", "rules": "Ziehe die Blöcke aufs Feld. Volle Reihen und Spalten verschwinden. Wenn nichts mehr passt, ist Schluss.", "o": [["d", "Schwierigkeit", [["Leicht · kleine Blöcke", 0], ["Mittel", 1], ["Schwer · große Blöcke", 2]], 1]],f:blk});
