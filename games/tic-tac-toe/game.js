// Tic-Tac-Toe
function ttt(o){const s=bar(()=>ttt(o),'.tt'),g=$('div','tt'),nx=$('button','start','Nächste Runde'),L=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];let b,cur,over,sc=[0,0],first=1;app.append(g,nx);
const win=a=>L.find(l=>a[l[0]]!=null&&a[l[0]]==a[l[1]]&&a[l[1]]==a[l[2]])||0;
const u=()=>s.innerHTML=`${dot(0)}${sc[0]} : ${sc[1]}${dot(1)} · `+(over==1?`${dot(cur)}${names[cur]} gewinnt! 🏆`:over==2?'Unentschieden':`${dot(cur)}${names[cur]} ist dran`);
const draw=()=>{g.innerHTML='';const w=win(b);b.forEach((v,i)=>{const c=$('button','tc'+(w&&w.includes(i)?' win':''),v==null?'':'✕○'[v]);c.style.color=`var(--p${v})`;c.onclick=()=>{if(!over&&b[i]==null&&!(o.m==1&&cur==1))mv(i)};g.append(c)});nx.hidden=!over};
const mv=i=>{b[i]=cur;if(win(b)){over=1;sc[cur]++}else if(b.every(v=>v!=null))over=2;else cur=1-cur;draw();u();if(!over&&o.m==1&&cur==1)later(ai,500)};
const mm=(a,p,dp)=>{const w=win(a);if(w)return a[w[0]]==1?10-dp:dp-10;if(a.every(v=>v!=null))return 0;let r=p==1?-99:99;for(let i=0;i<9;i++)if(a[i]==null){a[i]=p;const v=mm(a,1-p,dp+1);a[i]=null;r=p==1?Math.max(r,v):Math.min(r,v)}return r};
const ai=()=>{const d=o.d??1,e=[...b.keys()].filter(i=>b[i]==null),c=[0,2,6,8].filter(i=>b[i]==null),t=p=>e.find(i=>{b[i]=p;const w=win(b);b[i]=null;return w});
if(d==0&&R(100)<60)return mv(e[R(e.length)]);
if(d==2){let bs=-99,bm=[];e.forEach(i=>{b[i]=1;const v=mm(b,0,1);b[i]=null;if(v>bs){bs=v;bm=[i]}else if(v==bs)bm.push(i)});return mv(bm[R(bm.length)])}
mv(t(1)??t(0)??(b[4]==null?4:c.length?c[R(c.length)]:e[R(e.length)]))};
const nw=()=>{b=Array(9).fill(null);over=0;first=1-first;cur=first;draw();u();if(o.m==1&&cur==1)later(ai,500)};nx.onclick=nw;nw()}

registerGame({"id": "tic-tac-toe", "n": "Tic-Tac-Toe", "i": "✖️", "cat": "Brettspiele", "c": ["#7c3aed", "#2563eb"], "fl": "", "pl": "1–2", "rules": "Drei in einer Reihe gewinnt. Die Punkte zählen über mehrere Runden.", "o": [["m", "Gegner", [["Computer", 1], ["Zu zweit", 2]]], ["d", "Computer-Stärke", [["Leicht", 0], ["Mittel", 1], ["Schwer", 2]], 1]], "css": true,f:ttt});
