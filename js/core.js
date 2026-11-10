// Kern: Hilfsfunktionen, Zustand, Spiele-Register. Wird von allen Spielen genutzt.

const $=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
const app=document.getElementById('app'),R=n=>Math.floor(Math.random()*n),shuf=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(x=>x[1]);
const dot=i=>`<i class="dot" style="background:var(--p${i})"></i>`;
const setVH=()=>document.documentElement.style.setProperty('--dvh',window.innerHeight+'px');setVH();addEventListener('resize',setVH);addEventListener('orientationchange',()=>setTimeout(setVH,200));
let tm=[],raf=0,names=['Spieler 1','Spieler 2'],CURG=null;
// Scharfe Darstellung: Canvas wird mit der echten Bildschirmauflösung (bis 3x) gezeichnet, die Spiele rechnen weiter in ihren festen Koordinaten.
(function(){const g=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(t,a){const c=g.call(this,t,a);if(t==='2d'&&c&&!this._hd){this._hd=1;const k=Math.min(2,Math.max(1,window.devicePixelRatio||1)),w=this.width,h=this.height;this.width=Math.round(w*k);this.height=Math.round(h*k);this.style.setProperty('--ar',w/h);this.style.setProperty('--cw',w+'px');this.style.aspectRatio=w+' / '+h;c.setTransform(k,0,0,k,0,0)}return c}})();
const later=(f,ms)=>tm.push(setTimeout(f,ms)),clear=()=>{tm.forEach(clearTimeout);tm=[];cancelAnimationFrame(raf);onresize=onkeydown=onkeyup=null;app.innerHTML='';document.querySelectorAll('.endov,.endpill').forEach(e=>e.remove())};
let RST=null;
function bar(r,fl){RST=r||null;const d=$('div','bar'),b=$('button','sm','← Menü'),s=$('div','st');b.onclick=menu;d.append(b,s);if(r){const n=$('button','sm','↻');n.title='Neu starten';n.onclick=()=>{clear();r()};d.append(n)}if(fl){const f=$('button','sm','⟲ Drehen');f.title='Spielfeld um 180° drehen';f.onclick=()=>{if(typeof fl=='function')fl();else{const e=app.querySelector(fl);if(e)e.classList.toggle('rot180')}};d.append(f)}const q=$('button','sm','?');q.title='Anleitung';q.setAttribute('aria-label','Anleitung');q.onclick=()=>helpModal(CURG);d.append(q);app.append(d);return s}

// ---- Spiele-Register: jedes Spiel meldet sich in games/<ordner>/game.js hier an
const GAMES=[],META={},RULES={};
function registerGame(g){GAMES.push(g);META[g.n]=[g.cat,g.c[0],g.c[1],g.fl,g.pl];RULES[g.n]=g.rules||'';if(g.css){const l=document.createElement('link');l.rel='stylesheet';l.href='games/'+g.id+'/style.css?v='+VER;document.head.append(l)}}

// ---- Ergebnis-Bildschirm: großer, animierter Gewinn-/Verlust-Dialog in der Mitte, mit „Nochmal“ und „Zurück ins Menü“
// opt: kind 'win' | 'lose' | 'draw' · title · sub · emoji · stats [[Name,Wert]] · best (Bestwert? → Konfetti) · again (Funktion) · againLabel · delay (ms) · review (Spielfeld ansehen erlauben) · color
function endScreen(opt){
  const go=()=>{
    document.querySelectorAll('.endov,.endpill').forEach(e=>e.remove());onkeydown=onkeyup=null;
    const k=opt.kind||'win',ov=$('div','endov '+k),card=$('div','endcard');
    if(opt.color)ov.style.setProperty('--ec',opt.color);
    const em=opt.emoji||{win:'🏆',lose:'💥',draw:'🤝'}[k];
    card.append($('div','endem',em),$('h2','endt',opt.title||''));
    if(opt.best){card.append($('div','endbest','⭐ Neuer Bestwert!'))}
    if(opt.sub)card.append($('p','ends',opt.sub));
    if(opt.stats&&opt.stats.length){const st=$('div','endst');opt.stats.forEach(([l,v])=>{const c=$('div','endsc'),n=$('b',0,''),num=typeof v=='number';c.append(n,$('small',0,l));st.append(c);
      if(num){const t0=performance.now(),dur=Math.min(900,300+Math.abs(v)*2);const tick=now=>{const q=Math.min(1,(now-t0)/dur);n.textContent=Math.round(v*(1-Math.pow(1-q,3)));if(q<1&&n.isConnected)requestAnimationFrame(tick)};requestAnimationFrame(tick)}else n.textContent=v});card.append(st)}
    const row=$('div','endbtn'),a=$('button','start endagain',opt.againLabel||'↻ Nochmal'),m=$('button','sm endmenu','← Zurück ins Menü');
    a.onclick=()=>{ov.remove();document.querySelectorAll('.endpill').forEach(e=>e.remove());if(opt.again)opt.again();else{clear();if(RST)RST();else menu()}};
    m.onclick=()=>menu('home');
    row.append(a,m);card.append(row);
    if(opt.review){const r=$('button','endrev','Spielfeld ansehen');r.onclick=()=>{ov.remove();const p=$('button','endpill','🏁 Ergebnis anzeigen');p.onclick=()=>{p.remove();document.body.append(ov)};document.body.append(p)};card.append(r)}
    ov.append(card);
    if(k=='win'||opt.best){const cf=$('div','confetti'),cs=['#ffd166','#ef476f','#06d6a0','#118ab2','#b44fd8','#f97316','#fff'];for(let i=0;i<70;i++){const e=$('i');e.style.cssText=`left:${R(100)}%;background:${cs[R(cs.length)]};animation-delay:${(Math.random()*.9).toFixed(2)}s;animation-duration:${(2.2+Math.random()*2).toFixed(2)}s;--dx:${R(160)-80}px;--rt:${R(900)-450}deg;width:${6+R(7)}px;height:${10+R(10)}px`;cf.append(e)}ov.append(cf)}
    document.body.append(ov);try{a.focus({preventScroll:true})}catch(e){}
  };
  if(opt.delay)later(go,opt.delay);else go()
}
// Zwei-Spieler-/Computer-Ergebnis: w = 0 oder 1 (Sieger), -1 = Unentschieden. names[1]=='Computer' → Spiel gegen den Computer.
function duelEnd(w,o={}){
  const vsC=names[1]=='Computer',base=w<0?{kind:'draw',title:'Unentschieden',emoji:'🤝'}:vsC?(w==0?{kind:'win',title:'Du hast gewonnen!',emoji:'🏆'}:{kind:'lose',title:'Computer gewinnt',emoji:'🤖'}):{kind:'win',title:names[w]+' gewinnt!',emoji:'🏆',color:`var(--p${w})`};
  endScreen({...base,...o})
}
// Punkte-Spiel zu Ende: Bestwert → Konfetti
function scoreEnd(o){endScreen({kind:o.best?'win':'lose',emoji:o.best?'🏆':(o.emoji||'💥'),...o})}

// ---- Partikel-Effekte für Canvas-Spiele
function FX(){const a=[];return{
  burst(x,y,c,n=10,sp=4,life=34,size=4){for(let i=0;i<n;i++){const an=Math.random()*6.283,v=(.4+Math.random())*sp;a.push({x,y,vx:Math.cos(an)*v,vy:Math.sin(an)*v-sp*.3,l:life*(.6+Math.random()*.6),L:life,c,s:size*(.6+Math.random()*.8),g:.18})}},
  text(x,y,t,c='#fff',size=22,life=55){a.push({x,y,vx:0,vy:-1.1,l:life,L:life,c,s:size,t,g:0})},
  ring(x,y,c,r=30,life=22){a.push({x,y,vx:0,vy:0,l:life,L:life,c,s:r,ring:1,g:0})},
  step(d){for(const p of a){p.x+=p.vx*d;p.y+=p.vy*d;p.vy+=p.g*d;p.vx*=.99;p.l-=d}for(let i=a.length-1;i>=0;i--)if(a[i].l<=0)a.splice(i,1)},
  draw(x){x.save();x.textAlign='center';for(const p of a){const q=Math.max(0,p.l/p.L);x.globalAlpha=Math.min(1,q*1.6);
    if(p.t){x.fillStyle=p.c;x.font=`900 ${p.s}px ui-rounded,system-ui,sans-serif`;x.lineWidth=5;x.strokeStyle='#14213d';x.lineJoin='round';x.strokeText(p.t,p.x,p.y);x.fillText(p.t,p.x,p.y)}
    else if(p.ring){x.strokeStyle=p.c;x.lineWidth=4*q+1;x.beginPath();x.arc(p.x,p.y,p.s*(1.6-q),0,7);x.stroke()}
    else{x.fillStyle=p.c;x.fillRect(p.x-p.s*q/2,p.y-p.s*q/2,p.s*q,p.s*q)}}x.restore()},
  get n(){return a.length}}}
