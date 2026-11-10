// Blockfall
function tet(o){const s=bar(()=>tet(o)),W=400,H=560,C=28,key='tt'+o.sl,cv=$('canvas','hk'),PC=['#06b6d4','#facc15','#a855f7','#22c55e','#ef4444','#3b82f6','#f97316'],
SH=[[4,[[1,0],[1,1],[1,2],[1,3]]],[2,[[0,0],[0,1],[1,0],[1,1]]],[3,[[0,1],[1,0],[1,1],[1,2]]],[3,[[0,1],[0,2],[1,0],[1,1]]],[3,[[0,0],[0,1],[1,1],[1,2]]],[3,[[0,0],[1,0],[1,1],[1,2]]],[3,[[0,2],[1,0],[1,1],[1,2]]]];
cv.width=W;cv.height=H;app.append(cv);const x=cv.getContext('2d');let best=0;try{best=+localStorage.getItem(key)||0}catch(e){}
const fx=FX();let bd,p,nx,sc,ln,lv,st,acc=0,lt=0,cd=0,nb=0,sd=0,gx=0,gy=0,gt=0,bag=[],clr=null,drop=null,lk=null,shake=0,flash=0,trail=[];
const now=()=>performance.now(),ease=q=>1-Math.pow(1-q,3),cc=(c,r)=>[10+c*C+C/2,r*C+C/2];
const take=()=>{if(!bag.length)bag=shuf([0,1,2,3,4,5,6]);return bag.pop()},mkp=k=>({k,n:SH[k][0],c:SH[k][1].map(a=>[...a]),r:0,q:Math.floor((10-SH[k][0])/2)});
const fits=(c,r,q)=>c.every(([a,b])=>{const y=r+a,z=q+b;return z>=0&&z<10&&y<20&&(y<0||bd[y][z]<0)});
const reset=()=>{bd=Array.from({length:20},()=>Array(10).fill(-1));sc=0;ln=0;lv=o.sl;st=0;nb=0;acc=0;nx=take();spawn()},u=()=>s.innerHTML=`Punkte ${sc} · Level ${lv} · Linien ${ln} · 🏆 ${best}`;
const spawn=()=>{p=mkp(nx);nx=take();if(!fits(p.c,p.r,p.q)){st=2;cd=Date.now()+600;if(sc>best){best=sc;nb=1;try{localStorage.setItem(key,best)}catch(e){}}shake=10;u();later(()=>scoreEnd({title:nb?'Neuer Bestwert!':'Game Over',emoji:nb?'🏆':'🧱',best:nb,sub:nb?'Stark gespielt!':'Die Steine stapeln sich bis oben.',stats:[['Punkte',sc],['Level',lv],['Linien',ln]]}),700)}};
const LB=['','EINFACH','DOPPEL!','DREIFACH!','TETRIS!'];
const lock=()=>{p.c.forEach(([a,b])=>{if(p.r+a>=0)bd[p.r+a][p.q+b]=p.k});lk={cells:p.c.map(([a,b])=>[p.r+a,p.q+b]),t0:now()};const rows=[];for(let r=0;r<20;r++)if(bd[r].every(v=>v>=0))rows.push(r);
 if(rows.length){st=3;clr={rows,t0:now()};const n=rows.length,pts=[0,100,300,500,800][n]*lv;shake=n>=4?14:4+n*2;flash=n>=4?16:n>=2?8:0;
  rows.forEach(r=>{for(let c=0;c<10;c++){const[x0,y0]=cc(c,r);fx.burst(x0,y0,PC[bd[r][c]],n>=3?3:2,4+n,40,5)}});fx.text(150,Math.max(60,rows[0]*C),'+'+pts,'#fff',28,70);if(n>=2)fx.text(150,Math.max(110,rows[0]*C-34),LB[n],'#ffd166',n>=4?44:34,80);clr.pts=pts}
 else{spawn();u()}};
const finishClear=()=>{const rows=clr.rows,n=rows.length,old=lv;const keep=[];for(let r=0;r<20;r++)if(!rows.includes(r))keep.push([r,bd[r]]);const off=Array(20).fill(0);const nb2=[];for(let i=0;i<n;i++)nb2.push(Array(10).fill(-1));keep.forEach(([ro,row],i)=>{off[n+i]=n+i-ro});bd=[...nb2,...keep.map(k=>k[1])];
 sc+=clr.pts;ln+=n;lv=o.sl+Math.floor(ln/10);if(lv>old){fx.text(150,280,'LEVEL '+lv+'!','#5ad8e6',40,90);flash=10}
 drop={t0:now(),off};clr=null;st=1;spawn();u()};
const mvx=d=>{if(st==1&&fits(p.c,p.r,p.q+d))p.q+=d},down=()=>{if(st!=1)return;if(fits(p.c,p.r+1,p.q)){p.r++;sc+=1}else lock()},drp=()=>{if(st!=1)return;let n=0;const r0=p.r;while(fits(p.c,p.r+1,p.q)){p.r++;n++}sc+=n*2;if(n>2){p.c.forEach(([a,b])=>{for(let k=0;k<Math.min(n,8);k++)fx.burst(10+(p.q+b)*C+C/2,(r0+a+k*n/Math.min(n,8))*C+C/2,PC[p.k],1,1.2,18,3)});shake=Math.max(shake,3+n*.2)}lock()};
const rot=()=>{if(st!=1||p.k==1)return;const c=p.c.map(([a,b])=>[b,p.n-1-a]);for(const k of[0,-1,1,-2,2])if(fits(c,p.r,p.q+k)){p.c=c;p.q+=k;return}};
const go1=()=>{if(st==0){st=1;u()}};
cv.onpointerdown=e=>{cv.setPointerCapture(e.pointerId);gx=e.clientX;gy=e.clientY;gt=Date.now();sd=0};
cv.onpointermove=e=>{if(st!=1||gt==0)return;const dx=e.clientX-gx,k=cv.getBoundingClientRect().width/W*C;if(Math.abs(dx)>=k){mvx(Math.sign(dx));gx=e.clientX;sd=1}};
cv.onpointerup=e=>{const dy=e.clientY-gy;if(st!=1){go1();gt=0;return}if(dy>70&&!sd)drp();else if(!sd&&Math.abs(dy)<20)rot();gt=0};
onkeydown=e=>{const k=e.key;if(k=='ArrowLeft'||k=='a')mvx(-1);else if(k=='ArrowRight'||k=='d')mvx(1);else if(k=='ArrowUp'||k=='w'){e.preventDefault();rot()}else if(k=='ArrowDown'||k=='s'){e.preventDefault();down()}else if(k==' '){e.preventDefault();if(st==1)drp();else go1()}};
const cell=(a,b,c,z=C,s2=1,wh=0)=>{const cx=a+z/2,cy=b+z/2,q=z*s2;x.fillStyle=wh?'#fff':PC[c];x.fillRect(cx-q/2+1,cy-q/2+1,q-2,q-2);if(!wh){x.fillStyle='#ffffff55';x.fillRect(cx-q/2+3,cy-q/2+3,q-6,4);x.fillStyle='#00000030';x.fillRect(cx-q/2+1,cy+q/2-6,q-2,4)}};
const draw=()=>{const tm2=now();x.save();if(shake>.3)x.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);x.fillStyle='#17133a';x.fillRect(-10,-10,W+20,H+20);x.fillStyle='#120e2e';x.fillRect(10,0,280,H);
 const dq=drop?Math.min(1,(tm2-drop.t0)/200):1;if(dq>=1)drop=null;
 for(let r=0;r<20;r++){for(let c=0;c<10;c++){x.fillStyle='#ffffff08';x.fillRect(10+c*C+1,r*C+1,C-2,C-2)}
  const isC=clr&&clr.rows.includes(r);for(let c=0;c<10;c++){if(bd[r][c]<0)continue;
   if(isC){const a=(tm2-clr.t0)/380,dly=Math.abs(c-4.5)/4.5*.35,q=Math.max(0,Math.min(1,(a-dly)/.5));if(q<.35)cell(10+c*C,r*C,bd[r][c],C,1,Math.floor(a*14)%2==0);else cell(10+c*C,r*C,bd[r][c],C,Math.max(0,1-ease((q-.35)/.65)),1)}
   else{const dy=drop?-drop.off[r]*C*(1-ease(dq)):0;cell(10+c*C,r*C+dy,bd[r][c],C)}}}
 if(clr){const a=Math.min(1,(tm2-clr.t0)/380);clr.rows.forEach(r=>{x.globalAlpha=.5*(1-a);x.fillStyle='#fff';x.fillRect(10,r*C,280,C);x.globalAlpha=1})}
 if(lk){const a=(tm2-lk.t0)/160;if(a<1){x.globalAlpha=.7*(1-a);lk.cells.forEach(([r,c])=>{if(r>=0)cell(10+c*C,r*C,0,C,1,1)});x.globalAlpha=1}else lk=null}
 if(st==1){let g=p.r;while(fits(p.c,g+1,p.q))g++;x.globalAlpha=.25;p.c.forEach(([a,b])=>cell(10+(p.q+b)*C,(g+a)*C,p.k));x.globalAlpha=1;p.c.forEach(([a,b])=>cell(10+(p.q+b)*C,(p.r+a)*C,p.k))}
 fx.draw(x);
 x.fillStyle='#fff';x.font='700 18px ui-rounded,system-ui,sans-serif';x.textAlign='center';x.fillText('Nächster',345,30);const[nn,nc]=SH[nx];nc.forEach(([a,b])=>cell(345-nn*11+b*22,50+a*22,nx,22));
 x.font='600 14px ui-rounded,system-ui,sans-serif';x.fillStyle='#ffffffaa';['Tippen: drehen','Ziehen: bewegen','Wischen runter:','fallen lassen'].forEach((t2,i)=>x.fillText(t2,345,300+i*20));
 if(st==0){x.fillStyle='#000a';x.fillRect(10,H/2-50,280,90);x.fillStyle='#fff';x.font='800 22px ui-rounded,system-ui,sans-serif';x.fillText('Tippen zum Starten',150,H/2+4)}
 if(flash>0){x.globalAlpha=Math.min(.35,flash/30);x.fillStyle='#fff';x.fillRect(0,0,W,H);x.globalAlpha=1}
 x.restore()};
const go=now2=>{const d=Math.min(60,now2-(lt||now2));lt=now2;if(st==1){acc+=d;const iv=Math.max(90,700-lv*55);while(acc>=iv&&st==1){acc-=iv;down()}}if(st==3&&clr&&now()-clr.t0>380)finishClear();fx.step(d/16.67);if(shake>0)shake*=Math.pow(.86,d/16.67);if(flash>0)flash-=d/16.67;draw();raf=requestAnimationFrame(go)};cv.dbg={get bd(){return bd},get p(){return p},drp,get st(){return st},set st(v){st=v}};reset();u();raf=requestAnimationFrame(go)}

registerGame({"id": "blockfall", "n": "Blockfall", "i": "🟦", "cat": "Puzzle", "c": ["#06b6d4", "#6d28d9"], "fl": "nt", "pl": "1", "rules": "Tippen dreht den Stein, Ziehen bewegt ihn, Wischen nach unten lässt ihn fallen. Volle Reihen verschwinden, das Tempo steigt mit jedem Level.", "o": [["sl", "Starten bei", [["Level 1", 1], ["Level 4", 4], ["Level 8", 8]]]],f:tet});
