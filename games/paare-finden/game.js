// Paare finden
const TH={a:[...'🐶🐱🐭🐹🐰🦊🐻🐼🐨🐯🦁🐮🐷🐸🐵🐔🐧🦉🦄🐢'],f:[...'🍎🍌🍇🍓🍒🍑🍍🥝🍉🍋🥕🌽🍕🍔🍟🍩🍪🍦🥐🧀'],v:[...'🚗🚕🚌🚎🚓🚑🚒🚜🚲🛵🚂🚁🚀⛵🚤🚢🚙🚚🚛'],fl:FL.map(x=>fl(x[0]))};
function mem(o){const s=bar(()=>mem(o)),n=o.sz/2,c=o.sz==36?6:4,P=shuf(TH[o.th]).slice(0,n),g=$('div','mem');let a=[],cur=0,sc=[0,0],mv=0,lk=0;
app.append(g);const lay=()=>{const W=app.clientWidth,H=innerHeight-120;let z=0,k=4;for(let c=3;c<=10;c++){const q=Math.min((W-8*(c-1))/c,(H-8*(Math.ceil(o.sz/c)-1))/Math.ceil(o.sz/c));if(q>z){z=q;k=c}}z=Math.floor(Math.min(z,130));g.style.gridTemplateColumns=`repeat(${k},${z}px)`;g.style.setProperty('--z',z+'px');g.style.setProperty('--f',z*.62+'px')};lay();onresize=lay;
const u=()=>s.innerHTML=o.m==1?`Züge: ${mv} · Paare: ${sc[0]}/${n}`:`${dot(cur)}${names[cur]} · ${sc[0]} : ${sc[1]}`;
const fin=()=>{const w=+(sc[1]>sc[0]);s.innerHTML=o.m==1?`🎉 Geschafft in ${mv} Zügen!`:sc[0]==sc[1]?'Unentschieden':dot(w)+names[w]+' gewinnt! 🏆'};u();
shuf([...P,...P]).forEach(v=>{const e=$('button','card');e.onclick=()=>{if(lk||e.classList.contains('up'))return;e.className='card up';e.textContent=v;a.push(e);if(a.length<2)return;mv++;
if(a[0].textContent==v){sc[cur]++;a.forEach(x=>x.className='card up ok');a=[];sc[0]+sc[1]==n?fin():u()}
else{lk=1;later(()=>{a.forEach(x=>{x.className='card';x.textContent=''});a=[];lk=0;if(o.m==2)cur=1-cur;u()},900)}};g.append(e)})}

registerGame({"id": "paare-finden", "n": "Paare finden", "i": "🃏", "cat": "Puzzle", "c": ["#db2777", "#f59e0b"], "fl": "t", "pl": "1–2", "rules": "Zwei Karten aufdecken. Paar gefunden? Dann bist du nochmal dran. Das Raster passt sich dem Bildschirm an.", "o": [["th", "Motive", [["🐶 Tiere", "a"], ["🍕 Essen", "f"], ["🚗 Fahrzeuge", "v"], ["🏳️ Flaggen", "fl"]]], ["sz", "Schwierigkeit", [["Leicht · 4×4", 16], ["Mittel · 4×6", 24], ["Schwer · 6×6", 36], ["Experte · 5×8", 40]]], ["m", "Spieler", [["Allein", 1], ["Zu zweit", 2]]]], "css": true,f:mem});
