// Tap-Duell
function duel(o){const s=bar(()=>duel(o));s.textContent='Erster mit 5 Punkten gewinnt';let sc=[0,0],go=0,bz=0;const w=$('div','duel');app.append(w);
const z=[0,1].map(i=>{const d=$('button','zone');d.style.background=`var(--p${i})`;if(!i)d.style.transform='rotate(180deg)';d.onpointerdown=()=>hit(i);w.append(d);return d});
const show=m=>z.forEach((d,i)=>d.innerHTML=`<span style="font-size:52px">${sc[i]}</span><br>${m[i]}`);
const round=()=>{go=bz=0;show(['Warten … noch nicht tippen','Warten … noch nicht tippen']);later(()=>{go=1;show(['JETZT TIPPEN!','JETZT TIPPEN!']);if(o.m==1)later(()=>hit(0),330+R(330))},1500+R(3000))};
const hit=i=>{if(bz)return;bz=1;tm.forEach(clearTimeout);tm=[];const wn=go?i:1-i;sc[wn]++;show([0,1].map(k=>k==wn?(go?'Schneller! ✔':'Gegner war zu früh ✔'):(go?'Zu langsam':'Zu früh! ✖')));
if(sc[wn]>=5)later(()=>show([0,1].map(k=>k==wn?'🏆 Gewonnen!':'Verloren')),1200);else later(round,1500)};onkeydown=e=>{if(e.key=='l'||e.key==' ')hit(1);if(e.key=='a'&&o.m==2)hit(0)};round()}

registerGame({"id": "tap-duell", "n": "Tap-Duell", "i": "⚡", "cat": "Action", "c": ["#f59e0b", "#dc2626"], "fl": "", "pl": "1–2", "rules": "Warte auf JETZT und tippe als Erster. Zu früh tippen gibt dem anderen den Punkt. Tastatur: Leertaste oder L (zweiter Spieler: A).", "o": [["m", "Gegner", [["Computer", 1], ["Zu zweit", 2]]]],f:duel});
