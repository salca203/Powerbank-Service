// Farbland
function pio(o){const s=bar(()=>pio(o)),G=44,CS=11,W=G*CS,STEP=o.sp,cv=$('canvas','hk'),key='pio',COL=['#ef476f','#118ab2','#ffd166','#2dc26b'],NB=o.b;cv.width=cv.height=W;app.append(cv);const x=cv.getContext('2d');
let ow,tr,P,st,kills,peak=0,best=0,lt=0,acc=0,cd=0,nb=0,sx=0,sy=0;try{best=+localStorage.getItem(key)||0}catch(e){}
const pct=()=>{let n=0;for(let i=0;i<G*G;i++)if(ow[i]==0)n++;return Math.round(n*100/(G*G))},u=()=>s.innerHTML=`Land ${pct()}% · Besiegt ${kills} · 🏆 ${best}%`;
const spawn=p=>{for(let t=0;t<300;t++){const cx=2+R(G-4),cy=2+R(G-4);let ok=1;for(let a=-2;a<=2;a++)for(let b=-2;b<=2;b++)if(ow[(cy+b)*G+cx+a]>=0||tr[(cy+b)*G+cx+a]>=0)ok=0;
if(ok){for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)ow[(cy+b)*G+cx+a]=p.id;Object.assign(p,{x:cx,y:cy,px:cx,py:cy,dx:R(2)?1:-1,dy:0,nd:null,alive:1,out:0,lim:6+R(12),hx:cx,hy:cy,ht:0});return}}};
const reset=()=>{ow=Array(G*G).fill(-1);tr=Array(G*G).fill(-1);P=[...Array(NB+1).keys()].map(id=>({id,alive:0,rt:0}));P.forEach(spawn);st=0;kills=0;nb=0;acc=0;peak=0;u()};reset();
const die=(p,by)=>{if(!p.alive)return;p.alive=0;for(let i=0;i<G*G;i++){if(tr[i]==p.id)tr[i]=-1;if(ow[i]==p.id)ow[i]=-1}if(by==0&&p.id)kills++;if(p.id)p.rt=2500};

const endIt=()=>later(()=>scoreEnd({title:nb?'Neuer Bestwert!':'Eingekreist!',emoji:nb?'🏆':'🟥',best:nb,sub:nb?'Besser warst du hier noch nie!':'Deine Spur wurde getroffen.',stats:[['Höchster Landanteil %',peak],['Besiegt',kills]]}),700);
const fin=()=>{st=2;endIt();cd=Date.now()+500;if(peak>best){best=peak;nb=1;try{localStorage.setItem(key,best)}catch(e){}}u()};
const capture=p=>{const id=p.id,bar=new Uint8Array(G*G),out=new Uint8Array(G*G),q=[];for(let i=0;i<G*G;i++)if(ow[i]==id||tr[i]==id)bar[i]=1;const push=i=>{if(!bar[i]&&!out[i]){out[i]=1;q.push(i)}};
for(let k=0;k<G;k++){push(k);push((G-1)*G+k);push(k*G);push(k*G+G-1)}for(let h=0;h<q.length;h++){const i=q[h],cx=i%G,cy=(i/G)|0;if(cx>0)push(i-1);if(cx<G-1)push(i+1);if(cy>0)push(i-G);if(cy<G-1)push(i+G)}
for(let i=0;i<G*G;i++){if(tr[i]==id)tr[i]=-1;if(bar[i]||!out[i])ow[i]=id}};
const bot=b=>{const ds=[[1,0],[-1,0],[0,1],[0,-1]].filter(([a,c])=>!(a==-b.dx&&c==-b.dy)&&b.x+a>=0&&b.y+c>=0&&b.x+a<G&&b.y+c<G&&tr[(b.y+c)*G+b.x+a]!=b.id);if(!ds.length)return[b.dx,b.dy];
if(b.out>b.lim){ds.sort((p,q)=>Math.hypot(b.x+p[0]-b.hx,b.y+p[1]-b.hy)-Math.hypot(b.x+q[0]-b.hx,b.y+q[1]-b.hy));return ds[0]}
const sd=ds.find(([a,c])=>a==b.dx&&c==b.dy);return sd&&R(100)<88?[b.dx,b.dy]:ds[R(ds.length)]};
const step=p=>{if(!p.alive)return;let dx=p.dx,dy=p.dy;if(p.id){[dx,dy]=bot(p)}else if(p.nd){const[a,c]=p.nd;if(!(a==-p.dx&&c==-p.dy)){dx=a;dy=c}p.nd=null}p.dx=dx;p.dy=dy;p.px=p.x;p.py=p.y;const nx=p.x+dx,ny=p.y+dy;if(nx<0||ny<0||nx>=G||ny>=G)return;
p.x=nx;p.y=ny;const i=ny*G+nx;if(tr[i]>=0){const v=P[tr[i]];die(v,p.id);if(!p.alive)return}
if(ow[i]==p.id){if(p.ht){capture(p);p.ht=0}p.out=0;p.hx=nx;p.hy=ny}else{tr[i]=p.id;p.ht=1;p.out++}};
const dir=(a,c)=>{P[0].nd=[a,c]};
cv.onpointerdown=e=>{sx=e.clientX;sy=e.clientY};cv.onpointerup=e=>{const dx=e.clientX-sx,dy=e.clientY-sy;if(st==2&&Date.now()>cd){reset();return}if(Math.abs(dx)<14&&Math.abs(dy)<14)return;if(st==0)st=1;if(Math.abs(dx)>Math.abs(dy))dir(Math.sign(dx),0);else dir(0,Math.sign(dy))};
onkeydown=e=>{const m={ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1],ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0]}[e.key];if(m){e.preventDefault();if(st==0)st=1;dir(...m)}else if(e.key==' '&&st==2&&Date.now()>cd)reset()};
const draw=()=>{x.fillStyle='#161233';x.fillRect(0,0,W,W);for(let i=0;i<G*G;i++){const cx=i%G*CS,cy=((i/G)|0)*CS;if(ow[i]>=0){x.fillStyle=COL[ow[i]]+'bb';x.fillRect(cx,cy,CS,CS)}if(tr[i]>=0){x.fillStyle=COL[tr[i]]+'77';x.fillRect(cx+2,cy+2,CS-4,CS-4)}}
const t=Math.min(1,acc/STEP);P.forEach(p=>{if(!p.alive)return;const qx=(p.px+(p.x-p.px)*t)*CS,qy=(p.py+(p.y-p.py)*t)*CS;x.fillStyle='#0004';x.fillRect(qx,qy+2,CS,CS);x.fillStyle=COL[p.id];x.fillRect(qx-1,qy-1,CS+2,CS+2);x.fillStyle='#fff';x.fillRect(qx+2,qy+3,3,3);x.fillRect(qx+6,qy+3,3,3)});
x.textAlign='center';x.fillStyle='#fff';x.font='800 22px ui-rounded,system-ui,sans-serif';if(st==0)x.fillText('Wischen oder Pfeiltasten: Land einkreisen!',W/2,W-30);
};
const go=now=>{const d=Math.min(60,now-(lt||now));lt=now;if(st==1){acc+=d;while(acc>=STEP){acc-=STEP;P.forEach(step);if(!P[0].alive){fin();break}const c=pct();if(c>peak)peak=c;u()}P.forEach(p=>{if(!p.alive&&p.id&&p.rt>0){p.rt-=d;if(p.rt<=0)spawn(p)}})}draw();raf=requestAnimationFrame(go)};
raf=requestAnimationFrame(go)}

registerGame({"id": "farbland", "n": "Farbland", "i": "🟥", "cat": "Action", "c": ["#f43f5e", "#f59e0b"], "fl": "nt", "pl": "1", "rules": "Wische oder nutze die Pfeiltasten. Zieh eine Spur und kehre zu deinem Land zurück, um die Fläche zu erobern. Wer auf eine Spur trifft, verliert: Schütze deine eigene und kreuze fremde.", "o": [["b", "Gegner", [["2 Gegner", 2], ["3 Gegner", 3], ["4 Gegner", 4]]], ["sp", "Tempo", [["Gemütlich", 165], ["Normal", 130], ["Schnell", 100]], 1]],f:pio});
