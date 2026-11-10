// Block-Blitz: Blöcke aufs Feld ziehen, volle Reihen/Spalten lösen sich mit Animation auf
function blk(o){const s=bar(()=>blk(o)),W=400,H=560,C=46,GX=16,GY=16,cv=$('canvas','hk'),PAL=['#ef476f','#118ab2','#2dc26b','#ffd166','#5ad8e6','#b44fd8','#f97316'],key='bk'+o.d,
SH='1 11 1/1 111 1/1/1 1111 1/1/1/1 11/11 111/111/111 10/11 11/10 01/11 11/01 100/100/111 111/100/100 011/110 110/011'.split(' ').map(p=>{const a=[];p.split('/').forEach((r,i)=>[...r].forEach((c,j)=>{if(c=='1')a.push([i,j])}));return a});
cv.width=W;cv.height=H;app.append(cv);const x=cv.getContext('2d'),fx=FX();let best=0;try{best=+localStorage.getItem(key)||0}catch(e){}
let g=Array.from({length:8},()=>Array(8).fill(-1)),pop=Array.from({length:8},()=>Array(8).fill(0)),ps=[],dr=null,sc=0,over=0,clr=[],shake=0,flash=0,flc='#fff',nb=0,disp=0,lt=0;
const now=()=>performance.now(),ease=q=>1-Math.pow(1-q,3),back=q=>{const c=1.9;return 1+(c+1)*Math.pow(q-1,3)+c*Math.pow(q-1,2)};
const fresh=()=>{ps=[0,1,2].map((_,k)=>{const pool=SH.filter(a=>o.d==0?a.length<=4:true);let a=pool[R(pool.length)];if(o.d==2){const b=pool[R(pool.length)];if(b.length>a.length)a=b}return{a,c:R(7),u:0,born:now()+k*110}})},dim=a=>[Math.max(...a.map(p=>p[0]))+1,Math.max(...a.map(p=>p[1]))+1];
const fits=(a,r,c)=>a.every(([i,j])=>r+i>=0&&r+i<8&&c+j>=0&&c+j<8&&g[r+i][c+j]<0),any=()=>ps.some(p=>!p.u&&g.some((row,r)=>row.some((_,c)=>fits(p.a,r,c)))),u=()=>s.innerHTML=`Punkte ${sc} · 🏆 ${best}`;fresh();u();
const ctr=(r,c)=>[GX+c*C+C/2,GY+r*C+C/2];
// Welche Reihen/Spalten würden durch diesen Block voll?
const would=(a,r,c)=>{const t=g.map(row=>[...row]);a.forEach(([i,j])=>t[r+i][c+j]=0);const rs=[],cs=[];for(let i=0;i<8;i++){if(t[i].every(v=>v>=0))rs.push(i);if(t.every(row=>row[i]>=0))cs.push(i)}return{rs,cs}};
const place=(p,r,c,ox,oy)=>{const t=now();p.a.forEach(([i,j])=>{g[r+i][c+j]=p.c;pop[r+i][c+j]=t});p.u=1;let gain=p.a.length;sc+=gain;
 const rs=[],cs=[];for(let i=0;i<8;i++){if(g[i].every(v=>v>=0))rs.push(i);if(g.every(row=>row[i]>=0))cs.push(i)}
 const n=rs.length+cs.length,seen=new Set();let k=0;
 const add=(rr,cc,dl)=>{const key=rr*8+cc;if(seen.has(key))return;seen.add(key);clrCol[key]=g[rr][cc];clr.push({r:rr,c:cc,col:g[rr][cc],t0:t+dl});};
 rs.forEach(i=>{for(let j=0;j<8;j++)add(i,j,j*28)});cs.forEach(j=>{for(let i=0;i<8;i++)add(i,j,i*28)});
 rs.forEach(i=>g[i].fill(-1));cs.forEach(j=>g.forEach(row=>row[j]=-1));
 const bonus=n*n*10;sc+=bonus;gain+=bonus;
 const mx=GX+(c+dim(p.a)[1]/2)*C,my=GY+(r+dim(p.a)[0]/2)*C;
 if(n){shake=n>1?5+n*3:3;flash=n>1?10:0;flc=PAL[p.c];const lab=['','','DOPPEL!','DREIFACH!','VIERFACH!','MEGA!'][Math.min(n,5)];
  later(()=>{seen.forEach(key=>{const[rr,cc]=[key>>3,key&7],[px,py]=ctr(rr,cc);fx.burst(px,py,PAL[(clrCol[key]??p.c)],4,4.5,34,5)})},120);
  if(lab)fx.text(W/2,GY+4*C,lab,'#ffd166',n>2?46:38,80);fx.text(mx,my-10,'+'+gain,'#fff',26,60);fx.ring(mx,my,PAL[p.c],40,26)}
 else fx.text(mx,my-6,'+'+gain,'#fff',20,40);
 if(ps.every(q=>q.u))fresh();
 if(!any()){over=1;if(sc>best){best=sc;nb=1;try{localStorage.setItem(key,best)}catch(e){}}later(()=>scoreEnd({title:nb?'Neuer Bestwert!':'Keine Züge mehr',emoji:nb?'🏆':'🧱',best:nb,sub:nb?'Stark gespielt!':'Das Feld ist voll – versuch es nochmal.',stats:[['Punkte',sc],['Bestwert',best]]}),n?1100:650)}u()};
const clrCol={};
cv.dbg={get g(){return g},get ps(){return ps},place,get over(){return over}};
const pos=e=>{const r=cv.getBoundingClientRect();return{x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*H/r.height}},tg=()=>{const p=ps[dr.i],[h,w]=dim(p.a);return[p,Math.round((dr.y-80-h*C/2-GY)/C),Math.round((dr.x-w*C/2-GX)/C)]};
cv.onpointerdown=e=>{if(over)return;const p=pos(e);if(p.y>400){const i=Math.floor((p.x-5)/130);if(i>=0&&i<3&&!ps[i].u){dr={i,x:p.x,y:p.y,t:now()};cv.setPointerCapture(e.pointerId)}}};
cv.onpointermove=e=>{if(dr){const p=pos(e);dr.x=p.x;dr.y=p.y}};cv.onpointerup=()=>{if(!dr)return;const[p,r,c]=tg();if(fits(p.a,r,c)){place(p,r,c)}else if(dr.y<400){const[h,w]=dim(p.a);fx.text(dr.x,dr.y-80,'Passt nicht',"#ffb4c0",18,30)}dr=null};
const cell=(px,py,c,z,sc2=1,wh=0)=>{const cx=px+z/2,cy=py+z/2,q=z*sc2;x.fillStyle=wh?'#fff':PAL[c];x.beginPath();if(x.roundRect)x.roundRect(cx-q/2+1,cy-q/2+1,q-2,q-2,7*sc2);else x.rect(cx-q/2+1,cy-q/2+1,q-2,q-2);x.fill();if(!wh){x.fillStyle='#fff3';x.fillRect(cx-q/2+5*sc2,cy-q/2+4*sc2,q-10*sc2,5*sc2)}};
const draw=()=>{const t=now();x.save();if(shake>.3)x.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);x.fillStyle='#1b1640';x.fillRect(-10,-10,W+20,H+20);
 let gl=null;if(dr){const[p,r,c]=tg();if(fits(p.a,r,c))gl=would(p.a,r,c)}
 for(let r=0;r<8;r++)for(let c=0;c<8;c++){x.fillStyle='#2a2358';x.fillRect(GX+c*C+2,GY+r*C+2,C-4,C-4);
  if(gl&&(gl.rs.includes(r)||gl.cs.includes(c))){x.fillStyle='#ffd16633';x.fillRect(GX+c*C+2,GY+r*C+2,C-4,C-4)}
  if(g[r][c]>=0){const age=(t-pop[r][c])/240;cell(GX+c*C,GY+r*C,g[r][c],C,age<1?Math.max(.15,back(Math.max(0,age))):1,0)}}
 // sich auflösende Zellen
 clr=clr.filter(k=>t-k.t0<420);clr.forEach(k=>{const a=t-k.t0;if(a<0){cell(GX+k.c*C,GY+k.r*C,k.col,C,1,0);return}
  if(a<120){cell(GX+k.c*C,GY+k.r*C,k.col,C,1+a/120*.12,1)}else{const q=(a-120)/300;cell(GX+k.c*C,GY+k.r*C,k.col,C,Math.max(0,1.12*(1-ease(q))),q<.4);}});
 if(dr){const[p,r,c]=tg();if(fits(p.a,r,c)){x.globalAlpha=.4;p.a.forEach(([i,j])=>cell(GX+(c+j)*C,GY+(r+i)*C,p.c,C));x.globalAlpha=1}}
 ps.forEach((p,k)=>{if(p.u||(dr&&dr.i==k))return;const q=Math.max(0,Math.min(1,(t-p.born)/380));if(q<=0)return;const sc2=back(q),[h,w]=dim(p.a);p.a.forEach(([i,j])=>cell(70+k*130-w*14+j*28,480-h*14+i*28,p.c,28,Math.max(.01,sc2)))});
 if(dr){const p=ps[dr.i],[h,w]=dim(p.a),lift=Math.min(1,(t-dr.t)/120);p.a.forEach(([i,j])=>cell(dr.x-w*C/2+j*C,dr.y-80*lift-h*C/2+i*C,p.c,C,1.04))}
 fx.draw(x);
 if(flash>0){x.globalAlpha=flash/36;x.fillStyle=flc;x.fillRect(0,0,W,H);x.globalAlpha=1}
 x.restore()};
const go=now2=>{const d=Math.min(2.5,(now2-(lt||now2))/16.67);lt=now2;fx.step(d);if(shake>0)shake*=Math.pow(.86,d);if(flash>0)flash-=d;draw();raf=requestAnimationFrame(go)};raf=requestAnimationFrame(go)}

registerGame({"id": "block-blitz", "n": "Block-Blitz", "i": "🧱", "cat": "Puzzle", "c": ["#7c3aed", "#2563eb"], "fl": "nt", "pl": "1", "rules": "Ziehe die Blöcke aufs Feld. Volle Reihen und Spalten verschwinden. Wenn nichts mehr passt, ist Schluss.", "o": [["d", "Schwierigkeit", [["Leicht · kleine Blöcke", 0], ["Mittel", 1], ["Schwer · große Blöcke", 2]], 1]],f:blk});
