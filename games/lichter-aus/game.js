// Lichter aus
function lo(o){const N=o.n,s=bar(()=>lo(o)),g=$('div','lg2'),key='lo'+N;let best=0;try{best=+localStorage.getItem(key)||0}catch(e){}
let b=Array(N*N).fill(0),mv=0,done=0,el=[];g.style.gridTemplateColumns=`repeat(${N},1fr)`;app.append(g);
const nbr=i=>{const r=(i/N)|0,c=i%N,a=[i];if(r>0)a.push(i-N);if(r<N-1)a.push(i+N);if(c>0)a.push(i-1);if(c<N-1)a.push(i+1);return a},paint=()=>b.forEach((v,i)=>el[i].classList.toggle('on',!!v)),u=()=>s.innerHTML=`Züge ${mv}${best?' · 🏆 '+best:''}`;
const press=i=>{nbr(i).forEach(j=>b[j]^=1)};
for(let i=0;i<N*N;i++){const e=$('button','lt');e.setAttribute('aria-label','Licht');e.onclick=()=>{if(done)return;press(i);mv++;paint();u();if(b.every(v=>!v)){done=1;let m=`🎉 Alles aus in ${mv} Zügen!`;if(!best||mv<best){best=mv;try{localStorage.setItem(key,mv)}catch(e){}m+=' · neuer Bestwert!'}s.innerHTML=m}};el.push(e);g.append(e)}
do{for(let k=0;k<N+R(N)+4;k++)press(R(N*N))}while(b.every(v=>!v));paint();u()}

registerGame({"id": "lichter-aus", "n": "Lichter aus", "i": "💡", "cat": "Puzzle", "c": ["#eab308", "#78350f"], "fl": "n", "pl": "1", "rules": "Mit jedem Tipp wechseln das Feld und seine vier Nachbarn zwischen an und aus. Mach alle Lichter aus, so wenige Züge wie möglich.", "o": [["n", "Größe", [["4×4", 4], ["5×5", 5], ["6×6", 6]]]], "css": true,f:lo});
