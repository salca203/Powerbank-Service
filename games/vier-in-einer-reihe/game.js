// Vier in einer Reihe
function c4(o){const s=bar(()=>c4(o)),C=7,H=6,g=$('div','c4'),fr=o.md==1,cl=[];let b=Array.from({length:C},()=>Array(H).fill(null)),cur=0,over=0,bz=0;g.style.position='relative';g.style.overflow='hidden';app.append(g);
const win=(c,r,p)=>[[1,0],[0,1],[1,1],[1,-1]].some(([dx,dy])=>{let n=1;for(const k of[1,-1])for(let i=1;i<4;i++){if(b[c+k*i*dx]?.[r+k*i*dy]===p)n++;else break}return n>=4});
const low=c=>b[c].indexOf(null),u=()=>s.innerHTML=`${dot(cur)}${names[cur]} ist dran`,paint=()=>b.forEach((col,c)=>col.forEach((v,r)=>cl[c][r].style.background=v==null?'':`var(--p${v})`));
b.forEach((_,c)=>{const e=$('button','col');cl[c]=[];e.onclick=()=>tap(c,null);for(let r=H-1;r>=0;r--){const x=$('i','cell');x.onclick=ev=>{if(fr){ev.stopPropagation();tap(c,r)}};cl[c][r]=x;e.append(x)}g.append(e)});
const tap=(c,r)=>{if(over||bz||(o.m==1&&cur==1))return;if(fr){if(r==null)return}else r=low(c);if(r<0||b[c][r]!=null)return;put(c,r)};
const put=(c,r)=>{bz=1;const gr=g.getBoundingClientRect(),er=cl[c][r].getBoundingClientRect(),d=$('i','cell'),y=er.top-gr.top,t=fr?.22:.2+y/1100;
d.style.cssText=`position:absolute;width:${er.width}px;height:${er.height}px;left:${er.left-gr.left}px;top:${fr?y:-er.height-6}px;background:var(--p${cur});z-index:2;pointer-events:none`;
if(fr)d.style.transform='scale(0)';g.append(d);d.getBoundingClientRect();
d.style.transition=fr?`transform ${t}s cubic-bezier(.3,1.7,.5,1)`:`transform ${t}s cubic-bezier(.55,0,1,.65)`;d.style.transform=fr?'scale(1)':`translateY(${y+er.height+6}px)`;
later(()=>{d.remove();b[c][r]=cur;paint();bz=0;if(win(c,r,cur)){over=1;s.innerHTML=dot(cur)+names[cur]+' gewinnt! 🏆';return}if(b.every(k=>k.every(v=>v!=null))){over=1;s.textContent='Unentschieden';return}cur=1-cur;u();if(o.m==1&&cur==1)later(ai,300)},t*1000+40)};
const WN=[];for(let c=0;c<C;c++)for(let r=0;r<H;r++)[[1,0],[0,1],[1,1],[1,-1]].forEach(([dx,dy])=>{const e=[];for(let i=0;i<4;i++){const a=c+dx*i,d=r+dy*i;if(a<0||a>=C||d<0||d>=H)return;e.push([a,d])}WN.push(e)});
const ev=p=>{let t=0;for(const w of WN){let m=0,q=0;for(const[c,r]of w){const v=b[c][r];if(v===p)m++;else if(v!=null)q++}if(m&&q)continue;t+=m?[0,1,4,30][m]:q?-[0,1,4,30][q]:0}return t+(b[3].filter(v=>v===p).length*2)};
const mvs=()=>{const a=[];for(let c=0;c<C;c++)for(let r=0;r<H;r++)if(b[c][r]==null&&(fr||r==low(c)))a.push([c,r]);return a.sort((x,y)=>Math.abs(x[0]-3)+Math.abs(x[1]-2.5)-Math.abs(y[0]-3)-Math.abs(y[1]-2.5))};
const nm=(dp,al,be,p)=>{const m=mvs();if(!m.length)return 0;let best=-1e9;for(const[c,r]of m){b[c][r]=p;let v;if(win(c,r,p))v=1e5+dp;else if(dp==0)v=ev(p)-ev(1-p);else v=-nm(dp-1,-be,-al,1-p);b[c][r]=null;if(v>best)best=v;if(v>al)al=v;if(al>=be)break}return best};
const ai=()=>{const d=o.d??1,ok=mvs(),t=p=>ok.find(([c,r])=>{b[c][r]=p;const w=win(c,r,p);b[c][r]=null;return w});
if(d==0){const m=(R(100)<55&&(t(1)||t(0)))||ok[R(ok.length)];return put(...m)}
const D=d==1?(fr?2:3):(fr?3:6);let bs=-1e9,bm=[];for(const[c,r]of ok){b[c][r]=1;let v=win(c,r,1)?1e6:-nm(D-1,-1e9,1e9,0);b[c][r]=null;v+=Math.random()*.5;if(v>bs){bs=v;bm=[[c,r]]}}put(...bm[0])};u()}

registerGame({"id": "vier-in-einer-reihe", "n": "Vier in einer Reihe", "i": "🔴", "cat": "Brettspiele", "c": ["#2563eb", "#db2777"], "fl": "t", "pl": "1–2", "rules": "Klassisch fallen die Steine nach unten. Im Modus „Freies Feld“ setzt du Steine überall hin. Wer zuerst vier in einer Reihe hat, gewinnt.", "o": [["m", "Gegner", [["Computer", 1], ["Zu zweit", 2]]], ["md", "Modus", [["Klassisch: Steine fallen", 0], ["Freies Feld: überall setzen", 1]]], ["d", "Computer-Stärke", [["Leicht", 0], ["Mittel", 1], ["Schwer", 2]], 1]], "css": true,f:c4});
