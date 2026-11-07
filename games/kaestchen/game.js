// Kästchen
function dots(o){const s=bar(()=>dots(o)),n=o.n,N=2*o.n+1,g=$('div','dg'),E={},ln={};let cur=0,sc=[0,0],tot=0;
g.style.cssText=`grid-template-columns:repeat(${n},18px 1fr) 18px;grid-template-rows:repeat(${n},18px 1fr) 18px;aspect-ratio:1`;
const adj=(y,x)=>(y%2?[[y,x-1],[y,x+1]]:[[y-1,x],[y+1,x]]).filter(([a,b])=>a>0&&b>0&&a<N&&b<N),sd=(a,b)=>[[-1,0],[1,0],[0,-1],[0,1]].filter(([p,q])=>ln[(a+p)+','+(b+q)]!=null).length;
const u=()=>s.innerHTML=`${dot(cur)}${names[cur]} · ${sc[0]} : ${sc[1]}`;
const put=(y,x)=>{const k=y+','+x;if(ln[k]!=null)return;ln[k]=cur;E[k].style.background=`var(--p${cur})`;let got=0;
adj(y,x).forEach(([a,b])=>{if(sd(a,b)==4){got++;sc[cur]++;tot++;const e=E[a+','+b];e.textContent='●';e.style.color=`var(--p${cur})`}});
if(tot==n*n){const w=+(sc[1]>sc[0]);s.innerHTML=sc[0]==sc[1]?'Unentschieden':dot(w)+names[w]+' gewinnt! 🏆';return}
if(!got)cur=1-cur;u();if(o.m==1&&cur==1)later(ai,600)};
const chain=(y,x)=>{const seen=new Set(),q=[];adj(y,x).forEach(([a,b])=>{if(sd(a,b)==2)q.push([a,b])});for(let i=0;i<q.length;i++){const[a,b]=q[i],k=a+','+b;if(seen.has(k))continue;seen.add(k);[[-1,0],[1,0],[0,-1],[0,1]].forEach(([p,c])=>{if(ln[(a+p)+','+(b+c)]==null){const na=a+2*p,nb=b+2*c;if(na>0&&nb>0&&na<N&&nb<N&&sd(na,nb)==2)q.push([na,nb])}})}return seen.size};
const ai=()=>{const d=o.d??1,f=Object.keys(E).filter(k=>ln[k]==null&&E[k].tagName=='BUTTON').map(k=>k.split(',').map(Number)),w=([y,x])=>adj(y,x).reduce((r,[a,b])=>r+({3:10,2:-5}[sd(a,b)]||0),0);
if(d==0)return put(...f[R(f.length)]);
if(d==2){const take=f.filter(([y,x])=>adj(y,x).some(([a,b])=>sd(a,b)==3));if(take.length)return put(...take[R(take.length)]);const safe=f.filter(([y,x])=>adj(y,x).every(([a,b])=>sd(a,b)<2));if(safe.length)return put(...safe[R(safe.length)]);
let bs=1e9,bm=f[0];f.forEach(m=>{const c=chain(...m)+Math.random()*.5;if(c<bs){bs=c;bm=m}});return put(...bm)}
put(...f.sort((p,q)=>w(q)-w(p)+Math.random()-.5)[0])};
for(let y=0;y<N;y++)for(let x=0;x<N;x++){let e;if(y%2==0&&x%2==0)e=$('i','dt');else if((y+x)%2){e=$('button','ln');e.onclick=()=>{if(!(o.m==1&&cur==1))put(y,x)}}else e=$('i','bx');E[y+','+x]=e;g.append(e)}
app.append(g);u()}

registerGame({"id": "kaestchen", "n": "Kästchen", "i": "⬜", "cat": "Puzzle", "c": ["#0891b2", "#4338ca"], "fl": "", "pl": "1–2", "rules": "Linien setzen. Wer ein Kästchen schließt, bekommt es und darf nochmal.", "o": [["m", "Gegner", [["Computer", 1], ["Zu zweit", 2]]], ["d", "Computer-Stärke", [["Leicht", 0], ["Mittel", 1], ["Schwer", 2]], 1], ["n", "Spielfeld", [["4×4 Kästchen", 4], ["5×5 Kästchen", 5], ["6×6 Kästchen", 6]], 1]], "css": true,f:dots});
