// Reversi
function rev(o){const s=bar(()=>rev(o)),g=$('div','rv');let b=Array(64).fill(null),cur=0;b[27]=b[36]=1;b[28]=b[35]=0;app.append(g);
const fl2=(i,p)=>{if(b[i]!=null)return[];let r=[];const x=i%8,y=i>>3;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){let t=[],cx=x+dx,cy=y+dy;while(cx>=0&&cx<8&&cy>=0&&cy<8&&b[cy*8+cx]==1-p){t.push(cy*8+cx);cx+=dx;cy+=dy}if(t.length&&cx>=0&&cx<8&&cy>=0&&cy<8&&b[cy*8+cx]==p)r.push(...t)}return r};
const mvs=p=>[...Array(64).keys()].filter(i=>fl2(i,p).length),w=i=>fl2(i,1).length+([0,7,56,63].includes(i)?10:0);
const draw=()=>{g.innerHTML='';const m=cur>=0?mvs(cur):[],n0=b.filter(v=>v===0).length,n1=b.filter(v=>v===1).length;
b.forEach((v,i)=>{const c=$('button','rc');if(v!=null)c.innerHTML=`<i style="background:var(--p${v})"></i>`;else if(m.includes(i)&&!(o.m==1&&cur==1))c.innerHTML='<u></u>';c.onclick=()=>{if(!(o.m==1&&cur==1))go(i)};g.append(c)});
s.innerHTML=cur<0?(n0==n1?'Unentschieden':dot(+(n1>n0))+names[+(n1>n0)]+' gewinnt! 🏆')+` (${n0}:${n1})`:`${dot(cur)}${names[cur]} · ${n0}:${n1}`};
const go=i=>{const f=fl2(i,cur);if(!f.length)return;b[i]=cur;f.forEach(j=>b[j]=cur);cur=1-cur;if(!mvs(cur).length){cur=1-cur;if(!mvs(cur).length)cur=-1}draw();if(cur==1&&o.m==1)later(()=>go(mvs(1).sort((p,q)=>w(q)-w(p)+Math.random()-.5)[0]),600)};draw()}

registerGame({"id": "reversi", "n": "Reversi", "i": "⚫", "cat": "Brettspiele", "c": ["#047857", "#064e3b"], "fl": "", "pl": "1–2", "rules": "Gegnerische Steine einkesseln und umdrehen. Wer am Ende mehr Steine hat, gewinnt.", "o": [["m", "Gegner", [["Computer", 1], ["Zu zweit", 2]]]], "css": true,f:rev});
