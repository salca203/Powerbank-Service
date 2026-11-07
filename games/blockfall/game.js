// Blockfall
function tet(o){const s=bar(()=>tet(o)),W=400,H=560,C=28,key='tt',cv=$('canvas','hk'),PC=['#06b6d4','#facc15','#a855f7','#22c55e','#ef4444','#3b82f6','#f97316'],
SH=[[4,[[1,0],[1,1],[1,2],[1,3]]],[2,[[0,0],[0,1],[1,0],[1,1]]],[3,[[0,1],[1,0],[1,1],[1,2]]],[3,[[0,1],[0,2],[1,0],[1,1]]],[3,[[0,0],[0,1],[1,1],[1,2]]],[3,[[0,0],[1,0],[1,1],[1,2]]],[3,[[0,2],[1,0],[1,1],[1,2]]]];
cv.width=W;cv.height=H;app.append(cv);const x=cv.getContext('2d');let best=0;try{best=+localStorage.getItem(key)||0}catch(e){}
let bd,p,nx,sc,ln,lv,st,acc=0,lt=0,cd=0,nb=0,sd=0,gx=0,gy=0,gt=0,bag=[];
const take=()=>{if(!bag.length)bag=shuf([0,1,2,3,4,5,6]);return bag.pop()},mkp=k=>({k,n:SH[k][0],c:SH[k][1].map(a=>[...a]),r:0,q:Math.floor((10-SH[k][0])/2)});
const fits=(c,r,q)=>c.every(([a,b])=>{const y=r+a,z=q+b;return z>=0&&z<10&&y<20&&(y<0||bd[y][z]<0)});
const reset=()=>{bd=Array.from({length:20},()=>Array(10).fill(-1));sc=0;ln=0;lv=1;st=0;nb=0;acc=0;nx=take();spawn()},u=()=>s.innerHTML=`Punkte ${sc} · Level ${lv} · Linien ${ln} · 🏆 ${best}`;
const spawn=()=>{p=mkp(nx);nx=take();if(!fits(p.c,p.r,p.q)){st=2;cd=Date.now()+600;if(sc>best){best=sc;nb=1;try{localStorage.setItem(key,best)}catch(e){}}u()}};
const lock=()=>{p.c.forEach(([a,b])=>{if(p.r+a>=0)bd[p.r+a][p.q+b]=p.k});let n=0;for(let r=19;r>=0;r--)if(bd[r].every(v=>v>=0)){bd.splice(r,1);bd.unshift(Array(10).fill(-1));n++;r++}
if(n){sc+=[0,100,300,500,800][n]*lv;ln+=n;lv=1+Math.floor(ln/10)}spawn();u()};
const mvx=d=>{if(st==1&&fits(p.c,p.r,p.q+d))p.q+=d},down=()=>{if(st!=1)return;if(fits(p.c,p.r+1,p.q)){p.r++;sc+=1}else lock()},drop=()=>{if(st!=1)return;let n=0;while(fits(p.c,p.r+1,p.q)){p.r++;n++}sc+=n*2;lock()};
const rot=()=>{if(st!=1||p.k==1)return;const c=p.c.map(([a,b])=>[b,p.n-1-a]);for(const k of[0,-1,1,-2,2])if(fits(c,p.r,p.q+k)){p.c=c;p.q+=k;return}};
const go1=()=>{if(st==0){st=1;u()}else if(st==2&&Date.now()>cd){reset();u()}};
cv.onpointerdown=e=>{cv.setPointerCapture(e.pointerId);gx=e.clientX;gy=e.clientY;gt=Date.now();sd=0};
cv.onpointermove=e=>{if(st!=1||gt==0)return;const dx=e.clientX-gx,k=cv.getBoundingClientRect().width/W*C;if(Math.abs(dx)>=k){mvx(Math.sign(dx));gx=e.clientX;sd=1}};
cv.onpointerup=e=>{const dy=e.clientY-gy;if(st!=1){go1();gt=0;return}if(dy>70&&!sd)drop();else if(!sd&&Math.abs(dy)<20)rot();gt=0};
onkeydown=e=>{const k=e.key;if(k=='ArrowLeft'||k=='a')mvx(-1);else if(k=='ArrowRight'||k=='d')mvx(1);else if(k=='ArrowUp'||k=='w'){e.preventDefault();rot()}else if(k=='ArrowDown'||k=='s'){e.preventDefault();down()}else if(k==' '){e.preventDefault();if(st==1)drop();else go1()}};
const cell=(a,b,c,z=C)=>{x.fillStyle=PC[c];x.fillRect(a+1,b+1,z-2,z-2);x.fillStyle='#ffffff55';x.fillRect(a+3,b+3,z-6,4);x.fillStyle='#00000030';x.fillRect(a+1,b+z-6,z-2,4)};
const draw=()=>{x.fillStyle='#17133a';x.fillRect(0,0,W,H);x.fillStyle='#120e2e';x.fillRect(10,0,280,H);for(let r=0;r<20;r++)for(let c=0;c<10;c++){x.fillStyle='#ffffff08';x.fillRect(10+c*C+1,r*C+1,C-2,C-2);if(bd[r][c]>=0)cell(10+c*C,r*C,bd[r][c])}
if(st==1){let g=p.r;while(fits(p.c,g+1,p.q))g++;x.globalAlpha=.25;p.c.forEach(([a,b])=>cell(10+(p.q+b)*C,(g+a)*C,p.k));x.globalAlpha=1;p.c.forEach(([a,b])=>cell(10+(p.q+b)*C,(p.r+a)*C,p.k))}
x.fillStyle='#fff';x.font='700 18px ui-rounded,system-ui,sans-serif';x.textAlign='center';x.fillText('Nächster',345,30);const[nn,nc]=SH[nx];nc.forEach(([a,b])=>cell(345-nn*11+b*22,50+a*22,nx,22));
x.font='600 14px ui-rounded,system-ui,sans-serif';x.fillStyle='#ffffffaa';['Tippen: drehen','Ziehen: bewegen','Wischen runter:','fallen lassen'].forEach((t,i)=>x.fillText(t,345,300+i*20));
if(st==0){x.fillStyle='#000a';x.fillRect(10,H/2-50,280,90);x.fillStyle='#fff';x.font='800 22px ui-rounded,system-ui,sans-serif';x.fillText('Tippen zum Starten',150,H/2+4)}
if(st==2){x.fillStyle='#000c';x.fillRect(10,H/2-110,280,200);x.fillStyle='#fff';x.font='800 30px ui-rounded,system-ui,sans-serif';x.fillText('Game Over',150,H/2-60);x.font='700 22px ui-rounded,system-ui,sans-serif';x.fillText(`Punkte ${sc}`,150,H/2-20);x.fillText(nb?'Neuer Bestwert! 🏆':`Bestwert ${best}`,150,H/2+14);x.font='600 15px ui-rounded,system-ui,sans-serif';x.fillText('Tippen für neues Spiel',150,H/2+56)}};
const go=now=>{const d=Math.min(60,now-(lt||now));lt=now;if(st==1){acc+=d;const iv=Math.max(90,700-lv*55);while(acc>=iv&&st==1){acc-=iv;down()}}draw();raf=requestAnimationFrame(go)};reset();u();raf=requestAnimationFrame(go)}

registerGame({"id": "blockfall", "n": "Blockfall", "i": "🟦", "cat": "Puzzle", "c": ["#06b6d4", "#6d28d9"], "fl": "nt", "pl": "1", "rules": "Tippen dreht den Stein, Ziehen bewegt ihn, Wischen nach unten lässt ihn fallen. Volle Reihen verschwinden, das Tempo steigt mit jedem Level.", "o": [],f:tet});
