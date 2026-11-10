// Schach: Rochade, En passant, Umwandlung, Zug zurück, drehbares Brett
function chess(o){const s=bar(()=>chess(o),()=>{view^=1;draw()}),g=$('div','ch8'),ctl=$('div','chctl'),V={p:1,n:3,b:3,r:5,q:9,k:0};
let shown=0,b=[...'rnbqkbnr'+'p'.repeat(8)+'.'.repeat(32)+'P'.repeat(8)+'RNBQKBNR'],cur=0,sel=null,over=0,bz=0,think=0,view=0,last=null,hist=[],cr={K:1,Q:1,k:1,q:1},ept=-1;g.style.position='relative';const wr=$('div','chwrap');wr.append(g,ctl);app.append(wr);
/*ENGINE*/
const own=(q,w)=>q!='.'&&(q==q.toUpperCase())==w;
const gen=(b,w,st)=>{const m=[];for(let i=0;i<64;i++){const p=b[i];if(!own(p,w))continue;const x=i%8,y=i>>3,t=p.toLowerCase(),add=(nx,ny)=>{if(nx<0||nx>7||ny<0||ny>7)return 0;const q=b[ny*8+nx];if(own(q,w))return 0;m.push([i,ny*8+nx]);return q=='.'};
if(t=='p'){const d=w?-1:1;if(b[(y+d)*8+x]=='.'){m.push([i,(y+d)*8+x]);if(y==(w?6:1)&&b[(y+2*d)*8+x]=='.')m.push([i,(y+2*d)*8+x])}for(const dx of[-1,1]){const nx=x+dx,ny=y+d;if(nx>=0&&nx<8&&ny>=0&&ny<8){const q=b[ny*8+nx];if(q!='.'&&!own(q,w))m.push([i,ny*8+nx]);else if(st&&st.ept==ny*8+nx&&q=='.')m.push([i,ny*8+nx,'e'])}}}
else if(t=='n')[[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]].forEach(([a,c])=>add(x+a,y+c));
else if(t=='k'){for(let a=-1;a<2;a++)for(let c=-1;c<2;c++)if(a||c)add(x+a,y+c)}
else{const D=[];if(t!='b')D.push([1,0],[-1,0],[0,1],[0,-1]);if(t!='r')D.push([1,1],[1,-1],[-1,1],[-1,-1]);D.forEach(([a,c])=>{let k=1;while(add(x+a*k,y+c*k))k++})}}
if(st){const h=w?60:4,K=w?'K':'k',Rk=w?'R':'r',ks=w?st.cr.K:st.cr.k,qs=w?st.cr.Q:st.cr.q;
if(b[h]==K&&(ks||qs)&&!att(b,h,!w)){if(ks&&b[h+1]=='.'&&b[h+2]=='.'&&b[h+3]==Rk&&!att(b,h+1,!w)&&!att(b,h+2,!w))m.push([h,h+2,'c']);
if(qs&&b[h-1]=='.'&&b[h-2]=='.'&&b[h-3]=='.'&&b[h-4]==Rk&&!att(b,h-1,!w)&&!att(b,h-2,!w))m.push([h,h-2,'c'])}}
return m};
const att=(b,sq,byW)=>{const t=[...b];t[sq]=byW?'n':'N';return gen(t,byW).some(m=>m[1]==sq)};
const ap=(b,m)=>{const f=m[0],t=m[1],n=[...b];n[t]=n[f];n[f]='.';
if(m[2]=='e')n[t+(n[t]=='P'?8:-8)]='.';
if(m[2]=='c'){if(t==62){n[61]=n[63];n[63]='.'}else if(t==58){n[59]=n[56];n[56]='.'}else if(t==6){n[5]=n[7];n[7]='.'}else if(t==2){n[3]=n[0];n[0]='.'}}
if(n[t]=='P'&&t<8)n[t]=(m[3]||'q').toUpperCase();if(n[t]=='p'&&t>55)n[t]=(m[3]||'q').toLowerCase();return n};
const chk=(b,w)=>{const k=b.indexOf(w?'K':'k');return gen(b,!w).some(m=>m[1]==k)},legal=(b,w,st)=>gen(b,w,st).filter(m=>!chk(ap(b,m),w));
const upd=(c0,b,m)=>{const f=m[0],t=m[1],p=b[f],c={...c0};let e=-1;if(p=='K'){c.K=c.Q=0}if(p=='k'){c.k=c.q=0}if(f==63||t==63)c.K=0;if(f==56||t==56)c.Q=0;if(f==7||t==7)c.k=0;if(f==0||t==0)c.q=0;if((p=='P'||p=='p')&&Math.abs(t-f)==16)e=(f+t)/2;return{cr:c,ept:e}};
const promo=(b,m)=>(b[m[0]]=='P'&&m[1]<8)||(b[m[0]]=='p'&&m[1]>55);
/*END*/
const ev=b=>b.reduce((a,p)=>a+(p=='.'?0:(own(p,true)?-1:1)*V[p.toLowerCase()]),0);
const PB=(p,i)=>{const t=p.toLowerCase(),x=i%8,y=i>>3,cx=3.5-Math.abs(x-3.5),cy=3.5-Math.abs(y-3.5),c=(cx+cy)*.04;if(t=='n'||t=='b')return c*2;if(t=='p'){const adv=own(p,true)?6-y:y-1;return adv*.04+c*.5}return t=='q'?c*.3:0};
const evb=b=>b.reduce((a,p,i)=>a+(p=='.'?0:(own(p,true)?-1:1)*(V[p.toLowerCase()]+PB(p,i))),0);
const nm=(b,w,dp,al,be)=>{if(!dp)return w?-evb(b):evb(b);const m=gen(b,w).sort((x,y)=>(b[y[1]]!='.')-(b[x[1]]!='.'));if(!m.length)return 0;let best=-1e9;for(const mv of m){const t=b[mv[1]];let v;if(t=='k'||t=='K')v=1e5+dp;else v=-nm(ap(b,mv),!w,dp-1,-be,-al);if(v>best)best=v;if(v>al)al=v;if(al>=be)break}return best};
const G='♚♛♜♝♞♟',gl=p=>G['kqrbnp'.indexOf(p.toLowerCase())]+'\uFE0E',ci=i=>view?63-i:i;
const thin=()=>{const a=b.filter(p=>p!='.'&&p.toLowerCase()!='k');if(!a.length)return 1;return a.length==1&&'nb'.includes(a[0].toLowerCase())};
const st=()=>({cr,ept});
const ai=()=>{think=0;const d=o.d??1,L=legal(b,false,st());if(!L.length)return;let bm=L[0];
if(d==0){const cp=L.filter(m=>b[m[1]]!='.');bm=cp.length&&R(100)<50?cp.sort((p,q)=>V[b[q[1]].toLowerCase()]-V[b[p[1]].toLowerCase()])[0]:L[R(L.length)]}
else if(d==1){let best=-1e9;for(const m of L){const x=ap(b,m),r=legal(x,true);let v=r.length?Math.min(...r.map(t=>ev(ap(x,t)))):chk(x,true)?1e4:0;v+=Math.random()*.4;if(v>best){best=v;bm=m}}}
else{let best=-1e9;shuf(L).forEach(m=>{const x=ap(b,m);let v=-nm(x,true,3,-1e9,1e9)+Math.random()*.05;if(legal(x,true).length==0)v=chk(x,true)?1e6:0;if(v>best){best=v;bm=m}})}
mk(bm)};
const mk=m=>{if(bz)return;bz=1;think=0;const q=g.children,f=q[ci(m[0])],e=q[ci(m[1])],gr=g.getBoundingClientRect(),a=f.getBoundingClientRect(),z=e.getBoundingClientRect(),pc=f.firstChild,d=$('div','sq',pc.textContent),rt=pc.style.transform?' rotate(180deg)':'';
d.style.cssText=`position:absolute;left:${a.left-gr.left}px;top:${a.top-gr.top}px;width:${a.width}px;height:${a.height}px;background:none;color:${pc.style.color};text-shadow:${pc.style.textShadow};z-index:3;pointer-events:none;transform:${rt?'rotate(180deg)':'none'}`;
g.append(d);pc.textContent='';d.getBoundingClientRect();d.style.transition='transform .3s ease';d.style.transform=`translate(${z.left-a.left}px,${z.top-a.top}px)${rt}`;
later(()=>{bz=0;hist.push({b:[...b],cur,cr:{...cr},ept,last});const u=upd(cr,b,m);b=ap(b,m);cr=u.cr;ept=u.ept;last=[m[0],m[1]];sel=null;cur=1-cur;const L=legal(b,cur==0,st());
if(!L.length)over=chk(b,cur==0)?(cur==0?2:1):3;else if(thin())over=4;if(o.m==2&&o.rot==2&&!over)view=cur;draw();if(!over&&o.m==1&&cur==1){think=1;draw();later(ai,200)}},320)};
const finish=m=>{if(promo(b,m)&&!(o.m==1&&cur==1)){const w=$('div'),h=$('h2',0,'Umwandlung: Wähle eine Figur'),row=$('div','promo');['q','r','b','n'].forEach(k=>{const bt=$('button','sm',gl(k));bt.style.cssText='font-size:56px;padding:4px 14px;color:'+(cur==0?'#fff;text-shadow:0 0 3px #000,0 0 3px #000':'#111');bt.onclick=()=>{md.hidden=true;mk([m[0],m[1],m[2],k])};row.append(bt)});w.append(h,row);modal(w)}else mk(m)};
const tap=i=>{if(over||bz||think||(o.m==1&&cur==1))return;const mv=legal(b,cur==0,st()).find(m=>m[0]==sel&&m[1]==i);if(sel!=null&&mv)return finish(mv);sel=own(b[i],cur==0)?i:null;draw()};
const undo=()=>{if(bz||think||!hist.length)return;let h=hist.pop();if(o.m==1&&h.cur==1&&hist.length)h=hist.pop();else if(o.m==1&&h.cur==1){hist.push(h);return}({b,cur,cr,ept,last}=h);over=0;shown=0;document.querySelectorAll('.endov,.endpill').forEach(e=>e.remove());sel=null;if(o.m==2&&o.rot==2)view=cur;draw()};
const draw=()=>{g.innerHTML='';const L=legal(b,cur==0,st()),T=sel!=null?L.filter(m=>m[0]==sel):[],ck=chk(b,cur==0)?b.indexOf(cur==0?'K':'k'):-1;
for(let k=0;k<64;k++){const i=view?63-k:k,p=b[i],x=i%8,y=i>>3,tg=T.find(m=>m[1]==i);
const e=$('button','sq'+((x+y)%2?' dk':'')+(sel==i?' sl':'')+(tg?(p!='.'||tg[2]=='e'?' tg cp':' tg'):'')+(last&&(last[0]==i||last[1]==i)?' lm':'')+(ck==i?' ck':''));
const pc=$('b','cpc',p=='.'?'':gl(p));pc.style.color=own(p,true)?'#fff':'#111';if(own(p,true))pc.style.textShadow='0 0 3px #000,0 0 3px #000';if(own(p,false)&&o.m==2&&o.rot==1)pc.style.transform='rotate(180deg)';e.append(pc);
if(k%8==0)e.append($('span','crk',String(8-y)));if(k>=56)e.append($('span','cfl','abcdefgh'[x]));e.onclick=()=>tap(i);g.append(e)}
const cnt={P:8,N:2,B:2,R:2,Q:1,p:8,n:2,b:2,r:2,q:1};b.forEach(p=>{if(cnt[p]!=null)cnt[p]--});
const lost=w=>'qrbnp'.split('').map(k=>(w?k.toUpperCase():k).repeat(cnt[w?k.toUpperCase():k]||0)).join('').split('').map(p=>`<span style="color:${w?'#fff':'#111'};${w?'text-shadow:0 0 2px #000,0 0 2px #000':''}">${gl(p)}</span>`).join('');
ctl.innerHTML='';const ub=$('button','sm','↶ Zug zurück');ub.disabled=!hist.length||bz||think;ub.onclick=undo;const cp=$('div','capt',`<div>Geschlagen (Weiß): ${lost(true)||'–'}</div><div>Geschlagen (Schwarz): ${lost(false)||'–'}</div>`);ctl.append(ub,cp);
const mate=over==1||over==2;if(over&&!shown){shown=1;const w=over==2?1:0;const ex={review:true,delay:700,stats:[['Züge',hist.length+1]]};if(over==3)duelEnd(-1,{...ex,sub:'Patt – kein Zug mehr möglich, aber kein Schach.'});else if(over==4)duelEnd(-1,{...ex,sub:'Remis – zu wenig Material für ein Matt.'});else duelEnd(w,{...ex,sub:'Schachmatt!'})}if(!over)shown=0;s.innerHTML=over?(over==3?'Patt – Unentschieden':over==4?'Remis – zu wenig Material':dot(+(over==2))+names[+(over==2)]+' gewinnt durch Schachmatt'):think?`${dot(1)}${names[1]} überlegt …`:`${dot(cur)}${names[cur]} ist dran${ck>=0?' · Schach!':''}`;if(mate)s.classList.add('win')};draw()}

registerGame({"id": "schach", "n": "Schach", "i": "♟️", "cat": "Brettspiele", "c": ["#1d4ed8", "#7e22ce"], "fl": "t", "pl": "1–2", "rules": "Setze den gegnerischen König matt. Mit Rochade, En passant, Umwandlung, Zug zurück und drehbarem Brett.", "o": [["m", "Gegner", [["Computer", 1], ["Zu zweit", 2]]], ["d", "Computer-Stärke", [["Leicht", 0], ["Mittel", 1], ["Schwer", 2]], 1], ["rot", "Ansicht (zu zweit)", [["Fest: Weiß unten", 0], ["Gegenüber: schwarze Figuren gedreht", 1], ["Brett dreht sich nach jedem Zug", 2]]]], "css": true,f:chess});
