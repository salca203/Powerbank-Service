// Zahlenfusion
function g48(o){const s=bar(()=>g48(o)),N=o.n,g=$('div','g48'),key='g48'+(N==4?'':N);g.style.gridTemplateColumns=`repeat(${N},1fr)`;g.style.fontSize=`min(${40/N}vw,${224/N}px)`;let best=0;try{best=+localStorage.getItem(key)||0}catch(e){}
let nbz=0,won=0,b=Array.from({length:N},()=>Array(N).fill(null)),sc=0,over=0,lk=0,sx=0,sy=0;for(let i=0;i<N*N;i++)g.append($('div','tb'));app.append(g);
const col=v=>`hsl(${(Math.log2(v)*34+14)%360} 72% ${v<8?66:56}%)`,pos=t=>`translate(${t.c*100}%,${t.r*100}%)`,upd=()=>s.innerHTML=`Punkte ${sc} · 🏆 ${best}`+(won?' · 🎉 2048 erreicht!':'');
const tw=t=>{const i=t.el.firstChild;i.textContent=t.v;i.style.background=col(t.v);i.style.fontSize=t.v>999?'.8em':t.v>99?'1em':'1.25em';i.style.color=t.v<8?'#5b4a2a':'#fff'};
const add=()=>{const e=[];b.forEach((row,r)=>row.forEach((v,c)=>{if(!v)e.push([r,c])}));if(!e.length)return;const[r,c]=e[R(e.length)],t={v:R(10)?2:4,r,c,el:$('div','tl new')};t.el.style.width=t.el.style.height=100/N+'%';t.el.append($('i'));tw(t);t.el.style.transform=pos(t);g.append(t.el);b[r][c]=t};
const can=()=>b.some((row,r)=>row.some((t,c)=>!t||(c<N-1&&row[c+1]&&row[c+1].v==t.v)||(r<N-1&&b[r+1][c]&&b[r+1][c].v==t.v)));
const mv=(dx,dy)=>{if(lk||over)return;let moved=0,gain=0;const mg=[];
for(let k=0;k<N;k++){const co=[];for(let i=0;i<N;i++)co.push(dx?[k,dx<0?i:N-1-i]:[dy<0?i:N-1-i,k]);const ts=co.map(([r,c])=>b[r][c]).filter(Boolean),out=[];
for(let i=0;i<ts.length;i++){if(i+1<ts.length&&ts[i].v==ts[i+1].v){out.push([ts[i],ts[i+1]]);i++}else out.push([ts[i]])}
co.forEach(([r,c])=>b[r][c]=null);out.forEach((u,j)=>{const[r,c]=co[j];u.forEach(t=>{if(t.r!=r||t.c!=c)moved=1;t.r=r;t.c=c});b[r][c]=u[0];if(u[1]){mg.push(u);moved=1}})}
if(!moved)return;lk=1;b.forEach(row=>row.forEach(t=>{if(t)t.el.style.transform=pos(t)}));mg.forEach(([a,c])=>c.el.style.transform=pos(a));
later(()=>{mg.forEach(([a,c])=>{c.el.remove();a.v*=2;gain+=a.v;if(a.v>=2048)won=1;tw(a);a.el.classList.remove('new','mg');void a.el.offsetWidth;a.el.classList.add('mg')});sc+=gain;if(sc>best){best=sc;nbz=1;try{localStorage.setItem(key,best)}catch(e){}}add();upd();lk=0;if(!can()){over=1;s.innerHTML=`Keine Züge mehr · ${sc} Punkte · 🏆 ${best}`;const mx=Math.max(...b.flat().map(t=>t?t.v:0));later(()=>scoreEnd({title:nbz?'Neuer Bestwert!':won?'2048 erreicht!':'Keine Züge mehr',emoji:nbz||won?'🏆':'🔢',best:nbz||won,sub:'Größte Kachel: '+mx,stats:[['Punkte',sc],['Größte Kachel',mx],['Bestwert',best]]}),700)}},130)};
g.onpointerdown=e=>{sx=e.clientX;sy=e.clientY};g.onpointerup=e=>{const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.abs(dx)<24&&Math.abs(dy)<24)return;if(Math.abs(dx)>Math.abs(dy))mv(Math.sign(dx),0);else mv(0,Math.sign(dy))};
onkeydown=e=>{const m={ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1],ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0]}[e.key];if(m){e.preventDefault();mv(...m)}};add();add();upd()}

registerGame({"id": "zahlenfusion", "n": "Zahlenfusion", "i": "🔢", "cat": "Puzzle", "c": ["#f59e0b", "#b45309"], "fl": "nt", "pl": "1", "rules": "Wische in eine Richtung, alle Kacheln rutschen. Zwei gleiche Zahlen verschmelzen zur doppelten. Wie hoch kommst du?", "o": [["n", "Spielfeld", [["Klassisch 4×4", 4], ["Leicht 5×5", 5], ["Schwer 3×3", 3]]]], "css": true,f:g48});
