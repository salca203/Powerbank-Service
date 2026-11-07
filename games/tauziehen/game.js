// Tauziehen
function tug(o){const s=bar(()=>tug(o));s.textContent='So schnell wie möglich tippen!';let p=50,ov=0;const w=$('div','duel');app.append(w);
const z=[0,1].map(i=>{const d=$('button','zone','<span style="font-size:52px">👆</span>');d.style.background=`var(--p${i})`;if(!i)d.style.transform='rotate(180deg)';
d.onpointerdown=()=>push(i);w.append(d);return d});const push=i=>{if(ov)return;p+=i?-3:3;z[0].style.flex=p;z[1].style.flex=100-p;if(p>=92||p<=8){ov=1;const t=p>=92?0:1;z[t].innerHTML='🏆 Gewonnen!';z[1-t].innerHTML='Verloren'}};const ai=()=>{if(!ov){push(0);later(ai,140+R(120))}};if(o.m==1)later(ai,1000);onkeydown=e=>{if(e.key=='l'||e.key==' ')push(1);if(e.key=='a'&&o.m==2)push(0)}}

registerGame({"id": "tauziehen", "n": "Tauziehen", "i": "💪", "cat": "Action", "c": ["#ef4444", "#2563eb"], "fl": "", "pl": "1–2", "rules": "Tippe so schnell du kannst auf deine Seite. Tastatur: Leertaste oder L (zweiter Spieler: A).", "o": [["m", "Gegner", [["Computer", 1], ["Zu zweit", 2]]]],f:tug});
