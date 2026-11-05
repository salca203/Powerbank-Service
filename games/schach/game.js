// Schach
function chess(o){const s=bar(()=>chess(o)),g=$('div','ch8'),V={p:1,n:3,b:3,r:5,q:9,k:0};let b=[...'rnbqkbnr'+'p'.repeat(8)+'.'.repeat(32)+'P'.repeat(8)+'RNBQKBNR'],cur=0,sel=null,over=0,bz=0;g.style.position='relative';app.append(g);
const own=(q,w)=>q!='.'&&(q==q.toUpperCase())==w;
const gen=(b,w)=>{const m=[];for(let i=0;i<64;i++){const p=b[i];if(!own(p,w))continue;const x=i%8,y=i>>3,t=p.toLowerCase(),add=(nx,ny)=>{if(nx<0||nx>7||ny<0||ny>7)return 0;const q=b[ny*8+nx];if(own(q,w))return 0;m.push([i,ny*8+nx]);return q=='.'};
if(t=='p'){const d=w?-1:1;if(b[(y+d)*8+x]=='.'){m.push([i,(y+d)*8+x]);if(y==(w?6:1)&&b[(y+2*d)*8+x]=='.')m.push([i,(y+2*d)*8+x])}for(const dx of[-1,1]){const nx=x+dx,ny=y+d;if(nx>=0&&nx<8&&ny>=0&&ny<8){const q=b[ny*8+nx];if(q!='.'&&!own(q,w))m.push([i,ny*8+nx])}}}
else if(t=='n')[[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]].forEach(([a,c])=>add(x+a,y+c));
else if(t=='k'){for(let a=-1;a<2;a++)for(let c=-1;c<2;c++)if(a||c)add(x+a,y+c)}
else{const D=[];if(t!='b')D.push([1,0],[-1,0],[0,1],[0,-1]);if(t!='r')D.push([1,1],[1,-1],[-1,1],[-1,-1]);D.forEach(([a,c])=>{let k=1;while(add(x+a*k,y+c*k))k++})}}return m};
const ap=(b,[f,t])=>{const n=[...b];n[t]=n[f];n[f]='.';if(n[t]=='P'&&t<8)n[t]='Q';if(n[t]=='p'&&t>55)n[t]='q';return n},chk=(b,w)=>{const k=b.indexOf(w?'K':'k');return gen(b,!w).some(m=>m[1]==k)},legal=(b,w)=>gen(b,w).filter(m=>!chk(ap(b,m),w)),
ev=b=>b.reduce((a,p)=>a+(p=='.'?0:(own(p,true)?-1:1)*V[p.toLowerCase()]),0);
const mk=m=>{if(bz)return;bz=1;const q=g.children,f=q[m[0]],e=q[m[1]],gr=g.getBoundingClientRect(),a=f.getBoundingClientRect(),z=e.getBoundingClientRect(),d=$('div','sq',f.textContent),rt=f.style.transform?' rotate(180deg)':'';
d.style.cssText=`position:absolute;left:${a.left-gr.left}px;top:${a.top-gr.top}px;width:${a.width}px;height:${a.height}px;background:none;color:${f.style.color};text-shadow:${f.style.textShadow};z-index:3;pointer-events:none;transform:${rt?'rotate(180deg)':'none'}`;
g.append(d);f.textContent='';d.getBoundingClientRect();d.style.transition='transform .3s ease';d.style.transform=`translate(${z.left-a.left}px,${z.top-a.top}px)${rt}`;
later(()=>{bz=0;b=ap(b,m);sel=null;cur=1-cur;if(!legal(b,cur==0).length)over=chk(b,cur==0)?(cur==0?2:1):3;draw();if(!over&&o.m==1&&cur==1)later(ai,200)},320)};
const ai=()=>{let best=-1e9,bm;for(const m of legal(b,false)){const x=ap(b,m),r=legal(x,true);let v=r.length?Math.min(...r.map(t=>ev(ap(x,t)))):chk(x,true)?1e4:0;v+=Math.random()*.4;if(v>best){best=v;bm=m}}if(bm)mk(bm)};
const tap=i=>{if(over||bz||(o.m==1&&cur==1))return;if(sel!=null&&legal(b,cur==0).some(m=>m[0]==sel&&m[1]==i))return mk([sel,i]);sel=own(b[i],cur==0)?i:null;draw()};
const draw=()=>{g.innerHTML='';const T=sel!=null?legal(b,cur==0).filter(m=>m[0]==sel).map(m=>m[1]):[];b.forEach((p,i)=>{const e=$('button','sq'+((i+(i>>3))%2?' dk':'')+(sel==i?' sl':'')+(T.includes(i)?' tg':''),p=='.'?'':'♚♛♜♝♞♟'['kqrbnp'.indexOf(p.toLowerCase())]+'\uFE0E');
e.style.color=own(p,true)?'#fff':'#111';if(own(p,true))e.style.textShadow='0 0 3px #000,0 0 3px #000';if(own(p,false)&&o.m==2)e.style.transform='rotate(180deg)';e.onclick=()=>tap(i);g.append(e)});
s.innerHTML=over?(over==3?'Patt – Unentschieden':dot(+(over==2))+names[+(over==2)]+' gewinnt durch Schachmatt! 🏆'):`${dot(cur)}${names[cur]}${chk(b,cur==0)?' · Schach!':''}`};draw()}

registerGame({"id": "schach", "n": "Schach", "i": "♟️", "cat": "Brettspiele", "c": ["#1d4ed8", "#7e22ce"], "fl": "t", "pl": "1–2", "rules": "Wer den gegnerischen König mattsetzt, gewinnt. Figur antippen, dann Zielfeld. Ohne Rochade und En passant.", "o": [["m", "Gegner", [["Computer", 1], ["Zu zweit", 2]]]], "css": true,f:chess});
