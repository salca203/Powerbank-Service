// Farbfolge
function simon(o){const s=bar(()=>simon(o)),P=o.p,T=[820,620,420][o.s],g=$('div','sp'),key='fo'+P+o.s,PAL=['#ef476f','#2dc26b','#ffd166','#38bdf8','#a855f7','#f97316','#14b8a6','#f472b6','#e5e7eb'].slice(0,P);g.style.gridTemplateColumns=`repeat(${P==4?2:3},1fr)`;let best=0;try{best=+localStorage.getItem(key)||0}catch(e){}
let seq=[],i=0,busy=1,over=0;app.append(g);const pads=PAL.map((c,k)=>{const e=$('button','pd');e.style.background=c;e.setAttribute('aria-label','Feld '+(k+1));e.onclick=()=>tap(k);g.append(e);return e});
const lit=(k,ms=380)=>{pads[k].classList.add('lit');later(()=>pads[k].classList.remove('lit'),ms)},u=()=>s.innerHTML=`Runde ${seq.length} · 🏆 ${best}`;
const play=()=>{busy=1;i=0;seq.push(R(P));u();seq.forEach((k,j)=>later(()=>lit(k),700+j*T));later(()=>{busy=0;s.innerHTML=`Du bist dran · Runde ${seq.length}`},700+seq.length*T)};
const tap=k=>{if(busy||over)return;lit(k,220);if(k!=seq[i]){over=1;const r=seq.length-1;if(r>best){best=r;try{localStorage.setItem(key,r)}catch(e){}}s.innerHTML=`Falsch! Geschafft: ${r} Runden · 🏆 ${best}. Nochmal mit ↻`;return}i++;if(i==seq.length){busy=1;later(play,700)}};
s.innerHTML='Merke dir die Reihenfolge …';later(play,600)}

registerGame({"id": "farbfolge", "n": "Farbfolge", "i": "🔴", "cat": "Puzzle", "c": ["#ef4444", "#3b82f6"], "fl": "n", "pl": "1", "rules": "Merke dir die Reihenfolge der leuchtenden Felder und tippe sie nach. Jede Runde kommt ein Feld dazu.", "o": [["p", "Felder", [["4 Felder", 4], ["6 Felder", 6], ["9 Felder", 9]]], ["s", "Tempo", [["Langsam", 0], ["Normal", 1], ["Schnell", 2]], 1]], "css": true,f:simon});
