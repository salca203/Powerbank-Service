// Mühle
function mu(o){const s=bar(()=>mu(o),'.mu'),NS='http://www.w3.org/2000/svg',g=document.createElementNS(NS,'svg');g.setAttribute('viewBox','-.5 -.5 7 7');g.setAttribute('class','mu');app.append(g);
const P=[],M=[];for(let r=0;r<3;r++){const a=r,b=3,c=6-r;P.push([a,a],[b,a],[c,a],[c,b],[c,c],[b,c],[a,c],[a,b]);for(let i=0;i<8;i+=2)M.push([r*8+i,r*8+(i+1)%8,r*8+(i+2)%8])}for(let i=1;i<8;i+=2)M.push([i,i+8,i+16]);
const nb=i=>{const r=i>>3,j=i&7,a=[r*8+(j+1)%8,r*8+(j+7)%8];if(j%2){if(r)a.push(i-8);if(r<2)a.push(i+8)}return a};let b=Array(24).fill(null),hand=[9,9],cur=0,sel=null,rem=0,over=-1;
const cnt=p=>b.filter(v=>v===p).length+hand[p],mill=(i,p)=>M.some(l=>l.includes(i)&&l.every(x=>b[x]===p)),fly=p=>!hand[p]&&cnt(p)==3,
rm=p=>{const a=[...b.keys()].filter(i=>b[i]===p),f=a.filter(i=>!mill(i,p));return f.length?f:a},
mv=p=>{const r=[];b.forEach((v,i)=>{if(v===p)(fly(p)?[...b.keys()].filter(j=>b[j]==null):nb(i).filter(j=>b[j]==null)).forEach(j=>r.push([i,j]))});return r};
const end=()=>{const n=1-cur;if(cnt(n)<3||(!hand[n]&&!mv(n).length))over=cur;else cur=n},after=()=>{draw();if(over<0&&o.m==1&&cur==1)later(ai,650)};
const click=i=>{if(over>=0)return;
if(rem){if(!rm(1-cur).includes(i))return;b[i]=null;rem=0;end();after();return}
if(hand[cur]){if(b[i]!=null)return;b[i]=cur;hand[cur]--;if(mill(i,cur))rem=1;else end();sel=null;after();return}
if(b[i]===cur){sel=i;draw();return}
if(sel!=null&&b[i]==null&&(fly(cur)||nb(sel).includes(i))){b[i]=cur;b[sel]=null;sel=null;if(mill(i,cur))rem=1;else end();after()}};
const thr=i=>M.filter(l=>l.includes(i)&&l.filter(k=>b[k]===0).length==2&&l.filter(k=>b[k]==null).length==1).length*3+nb(i).filter(k=>b[k]==null).length*.5;
const ai=()=>{if(over>=0)return;const lv=o.d??1;if(rem){const a=rm(0);click(lv==0?a[R(a.length)]:a.sort((p,q)=>thr(q)-thr(p)+Math.random()-.5)[0]);return}const m=hand[1]?[...b.keys()].filter(i=>b[i]==null).map(i=>[null,i]):mv(1);if(!m.length)return;
const sc=([f,t])=>{const x=[...b];if(f!=null)x[f]=null;x[t]=1;const mi=M.some(l=>l.includes(t)&&l.every(k=>x[k]===1))?10:0;if(lv==0)return(R(2)?mi:0)+Math.random()*9;
let v=mi+(M.some(l=>l.includes(t)&&l.filter(k=>b[k]===0).length==2)?6:0)+Math.random()*3;
if(lv==2){v+=M.filter(l=>l.includes(t)&&l.filter(k=>x[k]===1).length==2&&l.filter(k=>x[k]==null).length==1).length*4+nb(t).filter(k=>x[k]==null).length*.6;if(f!=null&&M.some(l=>l.includes(f)&&l.filter(k=>b[k]===0).length==2&&l.filter(k=>b[k]==null).length==1))v-=3}return v};
m.sort((p,q)=>sc(q)-sc(p));const[f,t]=m[0];if(f!=null)sel=f;click(t)};
const draw=()=>{g.innerHTML='';const sv=(t,a)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);g.append(e);return e},l={fill:'none',stroke:'currentColor','stroke-width':.08};
[0,1,2].forEach(r=>sv('rect',{...l,x:r,y:r,width:6-2*r,height:6-2*r}));[[3,0,3,2],[3,4,3,6],[0,3,2,3],[4,3,6,3]].forEach(([a,c,d,e])=>sv('line',{...l,x1:a,y1:c,x2:d,y2:e}));
const RM=rem?rm(1-cur):[];P.forEach(([x,y],i)=>{const h=sel===i||RM.includes(i),c=sv('circle',{cx:x,cy:y,r:.32});c.style.fill=b[i]==null?'var(--bg)':`var(--p${b[i]})`;c.style.stroke=h?'#ffd166':'currentColor';c.style.strokeWidth=h?.16:.06;c.onclick=()=>{if(!(o.m==1&&cur==1))click(i)}});
s.innerHTML=over>=0?`${dot(over)}${names[over]} gewinnt! 🏆`:`${dot(cur)}${names[cur]}: ${rem?'Stein entfernen!':hand[cur]?`setzen (${hand[cur]} übrig)`:fly(cur)?'springen!':'ziehen'}`};draw()}

registerGame({"id": "muehle", "n": "Mühle", "i": "⭕", "cat": "Brettspiele", "c": ["#b45309", "#7c2d12"], "fl": "", "pl": "1–2", "rules": "Je 9 Steine setzen, dann ziehen. Drei in einer Reihe: gegnerischen Stein entfernen. Mit nur 3 Steinen darfst du springen.", "o": [["m", "Gegner", [["Computer", 1], ["Zu zweit", 2]]], ["d", "Computer-Stärke", [["Leicht", 0], ["Mittel", 1], ["Schwer", 2]], 1]], "css": true,f:mu});
