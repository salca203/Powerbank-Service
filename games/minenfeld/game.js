// Minenfeld
function mine(o){const[RO,CO,M]=[[9,9,10],[12,12,25],[16,16,40]][o.l],s=bar(()=>mine(o)),g=$('div','mf'),tb=$('button','sm','⛏ Aufdecken'),key='mn'+o.l;let best=0;try{best=+localStorage.getItem(key)||0}catch(e){}
let cells=[],mines=0,rev=0,flags=0,over=0,t0=0,fm=0,tk=0;g.style.gridTemplateColumns=`repeat(${CO},1fr)`;app.append(tb,g);
const nb=(r,c)=>{const a=[];for(let i=-1;i<2;i++)for(let j=-1;j<2;j++)if((i||j)&&r+i>=0&&c+j>=0&&r+i<RO&&c+j<CO)a.push(cells[(r+i)*CO+c+j]);return a};
const u=()=>s.innerHTML=`💣 ${M-flags} · ⏱ ${t0?Math.floor((Date.now()-t0)/1000):0}${best?' · 🏆 '+best+' s':''}`;
const tick=()=>{if(t0&&!over){u();later(tick,1000)}};
const paint=c=>{const e=c.e;e.className='mc'+(c.o?' open n'+c.n:'');e.textContent=c.f?'🚩':c.o?(c.m?'💣':c.n||''):''};
const place=c0=>{const ex=new Set([c0,...nb(c0.r,c0.c)]);let k=0;while(k<M){const c=cells[R(RO*CO)];if(!c.m&&!ex.has(c)){c.m=1;k++}}cells.forEach(c=>{c.n=nb(c.r,c.c).filter(z=>z.m).length});mines=1;t0=Date.now();tick()};
const lose=()=>{over=1;cells.forEach((c,i)=>{if(c.m){c.o=1;paint(c);later(()=>c.e.classList.add('boom'),(i%7)*70)}});s.innerHTML='💥 Boom!';later(()=>endScreen({kind:'lose',emoji:'💣',title:'Boom!',sub:'Du hast eine Mine erwischt.',stats:[['Aufgedeckt',rev],['Minen',M]],review:true}),1100)};
const open=c=>{if(over||c.f)return;if(c.o){if(c.n&&nb(c.r,c.c).filter(z=>z.f).length==c.n)nb(c.r,c.c).forEach(z=>{if(!z.f&&!z.o)open(z)});return}if(!mines)place(c);if(c.m){c.o=1;paint(c);return lose()}const st=[c];while(st.length){const z=st.pop();if(z.o||z.f)continue;z.o=1;rev++;paint(z);if(!z.n)nb(z.r,z.c).forEach(y=>{if(!y.o&&!y.m)st.push(y)})}
if(rev==RO*CO-M){over=1;const t=Math.floor((Date.now()-t0)/1000);let m=`🎉 Geschafft in ${t} s`;if(!best||t<best){best=t;try{localStorage.setItem(key,t)}catch(e){}m+=' · neue Bestzeit!'}cells.forEach(z=>{if(z.m){z.f=1;paint(z)}});s.innerHTML=m;later(()=>endScreen({kind:'win',emoji:'🎉',best:m.includes('Bestzeit'),title:'Alle Minen entdeckt!',sub:m.includes('Bestzeit')?'Neue Bestzeit!':'Kein Feld ohne Mine bleibt übrig.',stats:[['Sekunden',t],['Bestzeit',best]],review:true}),800)}};
const flag=c=>{if(over||c.o)return;c.f=!c.f;flags+=c.f?1:-1;paint(c);u()};
for(let r=0;r<RO;r++)for(let c=0;c<CO;c++){const e=$('button','mc'),z={r,c,e,m:0,n:0,o:0,f:false};let lp=0,tm=0;
e.onpointerdown=()=>{lp=0;tm=setTimeout(()=>{lp=1;flag(z)},420)};e.onpointerup=()=>{clearTimeout(tm);if(!lp){if(fm)flag(z);else open(z)}};e.onpointerleave=()=>clearTimeout(tm);e.oncontextmenu=ev=>{ev.preventDefault();clearTimeout(tm);lp=1;flag(z)};cells.push(z);g.append(e)}
tb.onclick=()=>{fm=1-fm;tb.textContent=fm?'🚩 Flagge':'⛏ Aufdecken'};u()}

registerGame({"id": "minenfeld", "n": "Minenfeld", "i": "💣", "cat": "Puzzle", "c": ["#64748b", "#1e293b"], "fl": "n", "pl": "1", "rules": "Decke alle Felder ohne Mine auf. Die Zahl zeigt, wie viele Minen angrenzen. Flaggen setzt du mit langem Drücken, Rechtsklick oder über den Schalter oben.", "o": [["l", "Größe", [["Leicht · 9×9", 0], ["Mittel · 12×12", 1], ["Schwer · 16×16", 2]]]], "css": true,f:mine});
