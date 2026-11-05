// Flaggen-Quiz
function quiz(o){const s=bar(()=>quiz(o)),N=10,q=shuf(FL).slice(0,N),f=$('div','flag'),ch=$('div','ch');let r=0,sc=[0,0];app.append(f,ch);
const next=()=>{if(r==N){f.textContent='🏁';ch.innerHTML='';const w=+(sc[1]>sc[0]);s.innerHTML=o.m==1?`Ergebnis: ${sc[0]} von ${N}`:(sc[0]==sc[1]?'Unentschieden':dot(w)+names[w]+' gewinnt!')+` (${sc[0]}:${sc[1]})`;return}
const cur=o.m==2?r%2:0,c=q[r];f.textContent=fl(c[0]);s.innerHTML=`Frage ${r+1}/${N} · ${o.m==2?dot(cur)+names[cur]+' · ':''}${sc[0]}${o.m==2?':'+sc[1]:''}`;ch.innerHTML='';
shuf([c,...shuf(FL.filter(x=>x!=c)).slice(0,3)]).forEach(a=>{const b=$('button','opt',a[1]);b.onclick=()=>{[...ch.children].forEach(x=>x.disabled=1);if(a==c){sc[cur]++;b.classList.add('good')}else{b.classList.add('bad');[...ch.children].find(x=>x.textContent==c[1]).classList.add('good')}r++;later(next,1100)};ch.append(b)})};next()}

registerGame({"id": "flaggen-quiz", "n": "Flaggen-Quiz", "i": "🏳️", "cat": "Wörter & Quiz", "c": ["#0ea5e9", "#16a34a"], "fl": "t", "pl": "1–2", "rules": "10 Flaggen, vier Antworten. Zu zweit wechselt ihr euch ab.", "o": [["m", "Spieler", [["Allein", 1], ["Zu zweit", 2]]]], "css": true,f:quiz});
