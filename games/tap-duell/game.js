// Tap-Duell (Nebeneinander: links Spieler 1, rechts Spieler 2)
function duel(o){const s=bar(()=>duel(o)),WIN=o.w,RT=[[420,800],[300,600],[190,330]][o.d??1];s.textContent=`Erster mit ${WIN} Punkten gewinnt`;let sc=[0,0],go=0,bz=0,fin=0;const w=$('div','duel'+(o.sit?' v':''));app.append(w);
const z=[0,1].map(i=>{const d=$('button','zone');d.style.background=`var(--p${i})`;if(o.sit&&!i)d.style.transform='rotate(180deg)';d.onpointerdown=()=>hit(i);w.append(d);return d});
const show=m=>z.forEach((d,i)=>d.innerHTML=`<small style="opacity:.8;font-size:.55em">${names[i]}</small><span class="big">${sc[i]}</span><span>${m[i]}</span>`);
const round=()=>{go=bz=0;show(['Warten …','Warten …']);later(()=>{go=1;show(['JETZT TIPPEN!','JETZT TIPPEN!']);if(o.m==1)later(()=>hit(1),RT[0]+R(RT[1]-RT[0]))},1500+R(3000))};
const hit=i=>{if(bz||fin)return;bz=1;tm.forEach(clearTimeout);tm=[];const wn=go?i:1-i;sc[wn]++;show([0,1].map(k=>k==wn?(go?'Schneller! ✔':'Gegner war zu früh ✔'):(go?'Zu langsam':'Zu früh! ✖')));
if(sc[wn]>=WIN){fin=1;later(()=>show([0,1].map(k=>k==wn?'🏆 Gewonnen!':'Verloren')),1200)}else later(round,1500)};
onkeydown=e=>{if(e.key=='a')hit(0);else if(e.key=='l')hit(1);else if(e.key==' ')hit(o.m==1?0:1)};round()}

registerGame({"id": "tap-duell", "n": "Tap-Duell", "i": "⚡", "cat": "Action", "c": ["#f59e0b", "#dc2626"], "fl": "", "pl": "1–2", "rules": "Warte, bis JETZT erscheint, und tippe als Erster auf deine Seite. Zu früh tippen gibt dem anderen den Punkt.", "o": [["m", "Gegner", [["Computer", 1], ["Zu zweit", 2]]], ["d", "Computer-Stärke", [["Leicht", 0], ["Mittel", 1], ["Schwer", 2]], 1], ["w", "Punkte bis zum Sieg", [["3", 3], ["5", 5], ["10", 10]], 1], ["sit", "Sitzposition", [["Nebeneinander (links/rechts)", 0], ["Gegenüber (oben/unten)", 1]]]],f:duel});
