// Farbflut
function flood(o){const N=o.n,M=Math.round(N*1.8),PAL=['#ef476f','#ffd166','#2dc26b','#38bdf8','#a855f7','#f97316'],s=bar(()=>flood(o)),g=$('div','fl'),pal=$('div','fp');let b=Array.from({length:N*N},()=>R(6)),mv=0,over=0,el=[];g.style.gridTemplateColumns=`repeat(${N},1fr)`;app.append(g,pal);
const paint=()=>b.forEach((c,i)=>el[i].style.background=PAL[c]),u=()=>s.innerHTML=`Züge ${mv} von ${M}`;
for(let i=0;i<N*N;i++){el[i]=$('i');g.append(el[i])}
const fill=n=>{if(over)return;const old=b[0];if(n==old)return;const q=[0],seen=new Set([0]);for(let h=0;h<q.length;h++){const i=q[h],r=(i/N)|0,c=i%N;b[i]=n;[[r-1,c],[r+1,c],[r,c-1],[r,c+1]].forEach(([a,d])=>{if(a<0||d<0||a>=N||d>=N)return;const j=a*N+d;if(!seen.has(j)&&b[j]==old){seen.add(j);q.push(j)}})}
mv++;paint();u();if(b.every(c=>c==b[0])){over=1;s.innerHTML=`🎉 Geschafft in ${mv} Zügen!`}else if(mv>=M){over=1;s.innerHTML='Keine Züge mehr. Nochmal mit ↻'}};
PAL.forEach((c,i)=>{const e=$('button','pc2');e.style.background=c;e.setAttribute('aria-label','Farbe '+(i+1));e.onclick=()=>fill(i);pal.append(e)});paint();u()}

registerGame({"id": "farbflut", "n": "Farbflut", "i": "🎨", "cat": "Puzzle", "c": ["#a855f7", "#ec4899"], "fl": "n", "pl": "1", "rules": "Färbe das Feld von der oberen linken Ecke aus mit einer Farbe nach der anderen ein, bis alles einfarbig ist. Die Züge sind begrenzt.", "o": [["n", "Größe", [["10×10", 10], ["14×14", 14], ["18×18", 18]]]], "css": true,f:flood});
