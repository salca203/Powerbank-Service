// Würfelkönig
function kn(o){const s=bar(()=>kn(o)),ai=o.m==3,np=o.m==1?1:2,CT=['Einser','Zweier','Dreier','Vierer','Fünfer','Sechser','Dreierpasch','Viererpasch','Full House','Kleine Straße','Große Straße','Fünferpasch','Chance'],EX=[3,6,9,12,15,18,22,13,13,12,16,18,22];if(ai)names=['Du','Computer'];
const S=[...Array(np)].map(()=>Array(13).fill(null)),box=$('div','kn');let d=[1,1,1,1,1],hd=[0,0,0,0,0],rl=0,cur=0,done=0;app.append(box);
const pts=(k,d)=>{const c=[0,0,0,0,0,0,0];d.forEach(v=>c[v]++);const sm=d.reduce((a,b)=>a+b),mx=Math.max(...c),r=(...a)=>a.every(v=>c[v]);return k<6?c[k+1]*(k+1):k==6?(mx>=3?sm:0):k==7?(mx>=4?sm:0):k==8?(c.includes(3)&&c.includes(2)?25:0):k==9?(r(1,2,3,4)||r(2,3,4,5)||r(3,4,5,6)?30:0):k==10?(r(1,2,3,4,5)||r(2,3,4,5,6)?40:0):k==11?(mx==5?50:0):sm};
const tot=p=>{const u=S[p].slice(0,6).reduce((a,b)=>a+b,0);return S[p].reduce((a,b)=>a+b,0)+(u>=63?35:0)},hum=()=>!(ai&&cur==1);
const roll=()=>{if(rl>=3||!hum()||done)return;d=d.map((v,i)=>hd[i]?v:1+R(6));rl++;draw()};
const pick=k=>{S[cur][k]=pts(k,d);rl=0;hd=[0,0,0,0,0];if(S.every(r=>r.every(v=>v!=null))){done=1;const w=np>1&&tot(1)>tot(0)?1:0;s.innerHTML=np>1?(tot(0)==tot(1)?'Unentschieden':dot(w)+names[w]+' gewinnt! 🏆'):`🎉 ${tot(0)} Punkte`}else{cur=(cur+1)%np;if(!hum())later(aiRoll,800)}draw()};
const aiRoll=()=>{d=d.map((v,i)=>hd[i]?v:1+R(6));rl++;if(rl<3){const c=[0,0,0,0,0,0,0];d.forEach(v=>c[v]++);let b=1;for(let v=2;v<7;v++)if(c[v]>=c[b])b=v;hd=d.map(v=>+(v==b));draw();later(aiRoll,900)}else{draw();later(()=>pick([...Array(13).keys()].filter(k=>S[1][k]==null).sort((a,b)=>pts(b,d)-EX[b]-pts(a,d)+EX[a])[0]),900)}};
const draw=()=>{box.innerHTML='';if(!done)s.innerHTML=`${dot(cur)}${names[cur]} · Wurf ${rl}/3`;const L=$('div','kd'),D=$('div','dice');
d.forEach((v,i)=>{const b=$('button','dc'+(hd[i]?' h':''),'⚀⚁⚂⚃⚄⚅'[v-1]);b.onclick=()=>{if(rl&&rl<3&&hum()&&!done){hd[i]^=1;draw()}};D.append(b)});
const r=$('button','start',rl>=3?'Feld rechts wählen':'Würfeln');r.onclick=roll;r.disabled=rl>=3||!hum()||done;L.append(D,r,$('small',0,'Würfel antippen = behalten'));
const T=$('table','kt');T.innerHTML=`<tr><td></td>${S.map((_,p)=>`<th>${dot(p)}${names[p]}</th>`).join('')}</tr>`;
CT.forEach((n,k)=>{const tr=$('tr',0,`<td>${n}</td>`);S.forEach((_,p)=>{const td=$('td');if(S[p][k]!=null)td.textContent=S[p][k];else if(p==cur&&rl&&hum()&&!done){td.textContent=pts(k,d);td.className='pk';td.onclick=()=>pick(k)}tr.append(td)});T.append(tr)});
T.append($('tr',0,`<td><b>Summe</b> (Bonus +35 ab 63 oben)</td>${S.map((_,p)=>`<td><b>${tot(p)}</b></td>`).join('')}`));box.append(L,T)};draw()}

registerGame({"id": "wuerfelkoenig", "n": "Würfelkönig", "i": "🎲", "cat": "Puzzle", "c": ["#dc2626", "#7f1d1d"], "fl": "", "pl": "1–2", "rules": "Bis zu 3 Würfe pro Runde. Würfel antippen zum Behalten, dann ein Feld wählen. 13 Runden.", "o": [["m", "Modus", [["Allein", 1], ["Zu zweit", 2], ["Gegen Computer", 3]]]], "css": true,f:kn});
