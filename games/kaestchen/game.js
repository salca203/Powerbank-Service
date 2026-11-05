// Kästchen
function dots(o){const s=bar(()=>dots(o)),n=5,N=11,g=$('div','dg'),E={},ln={};let cur=0,sc=[0,0],tot=0;
g.style.cssText=`grid-template-columns:repeat(${n},18px 1fr) 18px;grid-template-rows:repeat(${n},18px 1fr) 18px;aspect-ratio:1`;
const adj=(y,x)=>(y%2?[[y,x-1],[y,x+1]]:[[y-1,x],[y+1,x]]).filter(([a,b])=>a>0&&b>0&&a<N&&b<N),sd=(a,b)=>[[-1,0],[1,0],[0,-1],[0,1]].filter(([p,q])=>ln[(a+p)+','+(b+q)]!=null).length;
const u=()=>s.innerHTML=`${dot(cur)}${names[cur]} · ${sc[0]} : ${sc[1]}`;
const put=(y,x)=>{const k=y+','+x;if(ln[k]!=null)return;ln[k]=cur;E[k].style.background=`var(--p${cur})`;let got=0;
adj(y,x).forEach(([a,b])=>{if(sd(a,b)==4){got++;sc[cur]++;tot++;const e=E[a+','+b];e.textContent='●';e.style.color=`var(--p${cur})`}});
if(tot==n*n){const w=+(sc[1]>sc[0]);s.innerHTML=sc[0]==sc[1]?'Unentschieden':dot(w)+names[w]+' gewinnt! 🏆';return}
if(!got)cur=1-cur;u();if(o.m==1&&cur==1)later(ai,600)};
const ai=()=>{const f=Object.keys(E).filter(k=>ln[k]==null&&E[k].tagName=='BUTTON').map(k=>k.split(',').map(Number)),w=([y,x])=>adj(y,x).reduce((r,[a,b])=>r+({3:10,2:-5}[sd(a,b)]||0),0);put(...f.sort((p,q)=>w(q)-w(p)+Math.random()-.5)[0])};
for(let y=0;y<N;y++)for(let x=0;x<N;x++){let e;if(y%2==0&&x%2==0)e=$('i','dt');else if((y+x)%2){e=$('button','ln');e.onclick=()=>{if(!(o.m==1&&cur==1))put(y,x)}}else e=$('i','bx');E[y+','+x]=e;g.append(e)}
app.append(g);u()}

registerGame({"id": "kaestchen", "n": "Kästchen", "i": "⬜", "cat": "Puzzle", "c": ["#0891b2", "#4338ca"], "fl": "", "pl": "1–2", "rules": "Linien setzen. Wer ein Kästchen schließt, bekommt es und darf nochmal.", "o": [["m", "Gegner", [["Computer", 1], ["Zu zweit", 2]]]], "css": true,f:dots});
