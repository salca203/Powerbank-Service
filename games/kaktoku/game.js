// Kaktoku
function kak(o){const s=bar(()=>kak(o)),N=o.n,key='kk'+N,PAL=['#f2cc8f','#e07a5f','#a7c957','#8ecae6','#cdb4db','#f4a261','#90be6d','#e9c46a','#b5838d'],g=$('div','kk'),cells=[],mk=Array.from({length:N},()=>Array(N).fill(0));let rg=null,done=0,t0=Date.now(),best=0;try{best=+localStorage.getItem(key)||0}catch(e){}
const cnt=(rg,lim)=>{let n=0;const cs=[],ur=new Set,uc=new Set,go=r=>{if(n>=lim)return;if(r==N){n++;return}for(let c=0;c<N;c++){const k=rg[r][c];if(uc.has(c)||ur.has(k)||(r&&Math.abs(cs[r-1]-c)<2))continue;uc.add(c);ur.add(k);cs[r]=c;go(r+1);uc.delete(c);ur.delete(k)}};go(0);return n};
for(let tr=0;tr<400&&!(rg&&cnt(rg,2)==1);tr++){const q=[],fill=r=>{if(r==N)return 1;for(const c of shuf([...Array(N).keys()])){if(q.includes(c)||(r&&Math.abs(q[r-1]-c)<2))continue;q.push(c);if(fill(r+1))return 1;q.pop()}return 0};fill(0);rg=Array.from({length:N},()=>Array(N).fill(-1));q.forEach((c,r)=>rg[r][c]=r);
for(let left=N*N-N;left;left--){const cd=[];for(let r=0;r<N;r++)for(let c=0;c<N;c++)if(rg[r][c]<0)for(const[a,b]of[[1,0],[-1,0],[0,1],[0,-1]]){const v=rg[r+a]?.[c+b];if(v>=0)cd.push([r,c,v])}const[r,c,v]=cd[R(cd.length)];rg[r][c]=v}}
const fm=t=>Math.floor(t/60)+':'+String(t%60).padStart(2,'0');
const chk=()=>{const cs=[];mk.forEach((row,r)=>row.forEach((v,c)=>{if(v==2)cs.push([r,c])}));const bad=new Set;cs.forEach(([r,c],i)=>cs.forEach(([r2,c2],j)=>{if(i<j&&(r==r2||c==c2||rg[r][c]==rg[r2][c2]||(Math.abs(r-r2)<2&&Math.abs(c-c2)<2))){bad.add(i);bad.add(j)}}));
cells.forEach(row=>row.forEach(e=>e.classList.remove('bad')));cs.forEach(([r,c],i)=>{if(bad.has(i))cells[r][c].classList.add('bad')});
if(cs.length==N&&!bad.size){done=1;const t=Math.round((Date.now()-t0)/1000);let m='🌵 Geschafft in '+fm(t);if(!best||t<best){best=t;try{localStorage.setItem(key,t)}catch(e){}m+=' · neue Bestzeit!'}s.innerHTML=m}};
g.style.gridTemplateColumns=`repeat(${N},1fr)`;
for(let r=0;r<N;r++){cells[r]=[];for(let c=0;c<N;c++){const e=$('button','kc'),d=(a,b)=>rg[r+a]?.[c+b]!==rg[r][c]?3:.5;e.style.background=PAL[rg[r][c]%PAL.length];e.style.borderWidth=`${d(-1,0)}px ${d(0,1)}px ${d(1,0)}px ${d(0,-1)}px`;
e.onclick=()=>{if(done)return;mk[r][c]=(mk[r][c]+1)%3;e.innerHTML=mk[r][c]==1?'<small>✖</small>':mk[r][c]==2?'<b>🌵</b>':'';chk()};cells[r][c]=e;g.append(e)}}
app.append(g);const tick=()=>{if(!done){s.innerHTML='🌵 '+fm(Math.round((Date.now()-t0)/1000))+(best?' · Bestzeit '+fm(best):'');later(tick,1000)}};tick()}

registerGame({"id": "kaktoku", "n": "Kaktoku", "i": "🌵", "cat": "Puzzle", "c": ["#d97706", "#92400e"], "fl": "nt", "pl": "1", "rules": "Setze in jede Reihe, jede Spalte und jede Farbfläche genau einen Kaktus. Kakteen dürfen sich nicht berühren, auch nicht diagonal. Erster Tipp: ✖ markieren, zweiter Tipp: Kaktus.", "o": [["n", "Größe", [["6×6", 6], ["7×7", 7], ["8×8", 8], ["9×9", 9]]]], "css": true,f:kak});
