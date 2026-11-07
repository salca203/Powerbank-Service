// Tauziehen (Nebeneinander: links Spieler 1, rechts Spieler 2)
function tug(o){const s=bar(()=>tug(o)),IV=[[230,150],[140,120],[85,70]][o.d??1];s.textContent='So schnell wie möglich auf deine Seite tippen!';let p=50,ov=0;const w=$('div','duel'+(o.sit?' v':''));app.append(w);
const z=[0,1].map(i=>{const d=$('button','zone',`<small style="opacity:.8;font-size:.55em">${names[i]}</small><span class="big">👆</span><span>Tippen!</span>`);d.style.background=`var(--p${i})`;if(o.sit&&!i)d.style.transform='rotate(180deg)';d.onpointerdown=()=>push(i);w.append(d);return d});
z[0].style.flex=z[1].style.flex=50;
const push=i=>{if(ov)return;p+=i?-3:3;z[0].style.flex=p;z[1].style.flex=100-p;if(p>=92||p<=8){ov=1;const t=p>=92?0:1;z[t].innerHTML='<span class="big">🏆</span>Gewonnen!';z[1-t].innerHTML='Verloren'}};
const ai=()=>{if(!ov){push(1);later(ai,IV[0]+R(IV[1]))}};if(o.m==1)later(ai,1000);
onkeydown=e=>{if(e.key=='a')push(0);else if(e.key=='l')push(1);else if(e.key==' ')push(o.m==1?0:1)}}

registerGame({"id": "tauziehen", "n": "Tauziehen", "i": "💪", "cat": "Action", "c": ["#ef4444", "#2563eb"], "fl": "", "pl": "1–2", "rules": "Tippe so schnell du kannst auf deine Seite. Wer die Grenze auf die andere Seite schiebt, gewinnt.", "o": [["m", "Gegner", [["Computer", 1], ["Zu zweit", 2]]], ["d", "Computer-Stärke", [["Leicht", 0], ["Mittel", 1], ["Schwer", 2]], 1], ["sit", "Sitzposition", [["Nebeneinander (links/rechts)", 0], ["Gegenüber (oben/unten)", 1]]]],f:tug});
