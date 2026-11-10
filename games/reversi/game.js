// Reversi
function rev(o){const s=bar(()=>rev(o),'.rv'),g=$('div','rv');let ended=0,b=Array(64).fill(null),cur=0,note='';b[27]=b[36]=1;b[28]=b[35]=0;app.append(g);
const fl2=(i,p)=>{if(b[i]!=null)return[];let r=[];const x=i%8,y=i>>3;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){let t=[],cx=x+dx,cy=y+dy;while(cx>=0&&cx<8&&cy>=0&&cy<8&&b[cy*8+cx]==1-p){t.push(cy*8+cx);cx+=dx;cy+=dy}if(t.length&&cx>=0&&cx<8&&cy>=0&&cy<8&&b[cy*8+cx]==p)r.push(...t)}return r};
const mvs=p=>[...Array(64).keys()].filter(i=>fl2(i,p).length),w=i=>fl2(i,1).length+([0,7,56,63].includes(i)?10:0);
const WT=[100,-20,10,5,5,10,-20,100,-20,-50,-2,-2,-2,-2,-50,-20,10,-2,1,1,1,1,-2,10,5,-2,1,0,0,1,-2,5,5,-2,1,0,0,1,-2,5,10,-2,1,1,1,1,-2,10,-20,-50,-2,-2,-2,-2,-50,-20,100,-20,10,5,5,10,-20,100];
const fx=(bd,i,p)=>{if(bd[i]!=null)return[];let r=[];const x=i%8,y=i>>3;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){let t=[],cx=x+dx,cy=y+dy;while(cx>=0&&cx<8&&cy>=0&&cy<8&&bd[cy*8+cx]==1-p){t.push(cy*8+cx);cx+=dx;cy+=dy}if(t.length&&cx>=0&&cx<8&&cy>=0&&cy<8&&bd[cy*8+cx]==p)r.push(...t)}return r};
const ml=(bd,p)=>{const a=[];for(let i=0;i<64;i++)if(bd[i]==null&&fx(bd,i,p).length)a.push(i);return a};
const ap2=(bd,i,p)=>{const n=[...bd];fx(bd,i,p).forEach(j=>n[j]=p);n[i]=p;return n};
const ev=bd=>{let t=0;bd.forEach((v,i)=>{if(v===1)t+=WT[i];else if(v===0)t-=WT[i]});return t+(ml(bd,1).length-ml(bd,0).length)*6};
const ab=(bd,p,dp,al,be)=>{if(!dp)return ev(bd);const m=ml(bd,p);if(!m.length){if(!ml(bd,1-p).length){const d=bd.filter(v=>v===1).length-bd.filter(v=>v===0).length;return d*1000}return ab(bd,1-p,dp-1,al,be)}
if(p==1){let v=-1e9;for(const i of m){v=Math.max(v,ab(ap2(bd,i,1),0,dp-1,al,be));al=Math.max(al,v);if(al>=be)break}return v}let v=1e9;for(const i of m){v=Math.min(v,ab(ap2(bd,i,0),1,dp-1,al,be));be=Math.min(be,v);if(al>=be)break}return v};
const pick=()=>{const m=mvs(1),d=o.d??1;if(d==0)return m[R(m.length)];if(d==1)return m.sort((p,q)=>w(q)-w(p)+Math.random()-.5)[0];let bs=-1e9,bm=m[0];m.forEach(i=>{const v=ab(ap2(b,i,1),0,3,-1e9,1e9)+Math.random();if(v>bs){bs=v;bm=i}});return bm};
const draw=()=>{g.innerHTML='';const m=cur>=0?mvs(cur):[],n0=b.filter(v=>v===0).length,n1=b.filter(v=>v===1).length;
b.forEach((v,i)=>{const c=$('button','rc');if(v!=null)c.innerHTML=`<i style="background:var(--p${v})"></i>`;else if(m.includes(i)&&!(o.m==1&&cur==1))c.innerHTML='<u></u>';c.onclick=()=>{if(!(o.m==1&&cur==1))go(i)};g.append(c)});
if(cur<0&&!ended){ended=1;later(()=>duelEnd(n0==n1?-1:+(n1>n0),{review:true,sub:'Endstand '+n0+' : '+n1,stats:[[names[0],n0],[names[1],n1]]}),600)}s.innerHTML=cur<0?(n0==n1?'Unentschieden':dot(+(n1>n0))+names[+(n1>n0)]+' gewinnt! 🏆')+` (${n0}:${n1})`:`${note}${dot(cur)}${names[cur]} · ${n0}:${n1}`};
const go=i=>{const f=fl2(i,cur);if(!f.length)return;b[i]=cur;f.forEach(j=>b[j]=cur);cur=1-cur;note='';if(!mvs(cur).length){note=names[cur]+' muss passen · ';cur=1-cur;if(!mvs(cur).length){cur=-1;note=''}}draw();if(cur==1&&o.m==1)later(()=>go(pick()),600)};draw()}

registerGame({"id": "reversi", "n": "Reversi", "i": "⚫", "cat": "Brettspiele", "c": ["#047857", "#064e3b"], "fl": "", "pl": "1–2", "rules": "Gegnerische Steine einkesseln und umdrehen. Wer am Ende mehr Steine hat, gewinnt.", "o": [["m", "Gegner", [["Computer", 1], ["Zu zweit", 2]]], ["d", "Computer-Stärke", [["Leicht", 0], ["Mittel", 1], ["Schwer", 2]], 1]], "css": true,f:rev});
