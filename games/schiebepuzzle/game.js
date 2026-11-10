// Schiebepuzzle
function sld(o){const N=o.n,s=bar(()=>sld(o)),g=$('div','sl'),key='sl'+N;let best=0;try{best=+localStorage.getItem(key)||0}catch(e){}
let b=[...Array(N*N).keys()].map(i=>(i+1)%(N*N)),mv=0,t0=0,done=0,tl=[];g.style.setProperty('--n',N);app.append(g);
const rc=p=>[Math.floor(p/N),p%N],place=(el,p)=>{const[r,c]=rc(p);el.style.transform=`translate(${c*100}%,${r*100}%)`},u=()=>s.innerHTML=`Züge ${mv}${best?' · 🏆 '+best:''}`;
for(let v=1;v<N*N;v++){const e=$('button','st2',v);e.style.width=e.style.height=100/N+'%';tl[v]=e;e.onclick=()=>tap(b.indexOf(v));g.append(e)}
const sync=()=>b.forEach((v,p)=>{if(v)place(tl[v],p)});
const tap=p=>{if(done)return;const z=b.indexOf(0),[r,c]=rc(p),[zr,zc]=rc(z);if(r!=zr&&c!=zc)return;const dr=Math.sign(zr-r),dc=Math.sign(zc-c);let q=z;while(q!=p){const n=q-(dr?dr*N:dc);b[q]=b[n];q=n}b[p]=0;sync();if(!t0)t0=Date.now();mv++;u();if(b.slice(0,-1).every((v,i)=>v==i+1)){done=1;const t=Math.floor((Date.now()-t0)/1000);let m=`🎉 Gelöst in ${mv} Zügen · ${t} s`,nb=0;if(!best||mv<best){best=mv;nb=1;try{localStorage.setItem(key,mv)}catch(e){}m+=' · neuer Bestwert!'}s.innerHTML=m;
 tl.forEach((e,v)=>{if(e){e.classList.add('wave');e.style.animationDelay=(v%N+((v-1)/N|0))*60+'ms'}});
 later(()=>endScreen({kind:'win',emoji:'🔟',best:nb,title:'Gelöst!',sub:nb?'Neuer Bestwert für '+N+'×'+N+'!':'Alle Kacheln stehen richtig.',stats:[['Züge',mv],['Sekunden',t],['Bestwert',best]]}),900)}};
let z=N*N-1,last=-1;for(let i=0;i<N*N*30;i++){const[r,c]=rc(z),ns=[[r-1,c],[r+1,c],[r,c-1],[r,c+1]].filter(([a,d])=>a>=0&&d>=0&&a<N&&d<N).map(([a,d])=>a*N+d).filter(q=>q!=last);const q=ns[R(ns.length)];b[z]=b[q];b[q]=0;last=z;z=q}
sync();u()}

registerGame({"id": "schiebepuzzle", "n": "Schiebepuzzle", "i": "🔟", "cat": "Puzzle", "c": ["#14b8a6", "#3b82f6"], "fl": "n", "pl": "1", "rules": "Schiebe die Kacheln in die richtige Reihenfolge. Tippe eine Kachel in der Reihe oder Spalte der Lücke, dann rutschen alle bis dorthin.", "o": [["n", "Größe", [["3×3", 3], ["4×4", 4], ["5×5", 5]]]], "css": true,f:sld});
