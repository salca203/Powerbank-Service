// Kern: Hilfsfunktionen, Zustand, Spiele-Register. Wird von allen Spielen genutzt.

const $=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
const app=document.getElementById('app'),R=n=>Math.floor(Math.random()*n),shuf=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(x=>x[1]);
const dot=i=>`<i class="dot" style="background:var(--p${i})"></i>`;
const setVH=()=>document.documentElement.style.setProperty('--dvh',window.innerHeight+'px');setVH();addEventListener('resize',setVH);addEventListener('orientationchange',()=>setTimeout(setVH,200));
let tm=[],raf=0,names=['Spieler 1','Spieler 2'],CURG=null;
// Scharfe Darstellung: Canvas wird mit der echten Bildschirmauflösung (bis 3x) gezeichnet, die Spiele rechnen weiter in ihren festen Koordinaten.
(function(){const g=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(t,a){const c=g.call(this,t,a);if(t==='2d'&&c&&!this._hd){this._hd=1;const k=Math.min(2,Math.max(1,window.devicePixelRatio||1)),w=this.width,h=this.height;this.width=Math.round(w*k);this.height=Math.round(h*k);this.style.setProperty('--ar',w/h);this.style.setProperty('--cw',w+'px');this.style.aspectRatio=w+' / '+h;c.setTransform(k,0,0,k,0,0)}return c}})();
const later=(f,ms)=>tm.push(setTimeout(f,ms)),clear=()=>{tm.forEach(clearTimeout);tm=[];cancelAnimationFrame(raf);onresize=onkeydown=onkeyup=null;app.innerHTML=''};
function bar(r,fl){const d=$('div','bar'),b=$('button','sm','← Menü'),s=$('div','st');b.onclick=menu;d.append(b,s);if(r){const n=$('button','sm','↻');n.title='Neu starten';n.onclick=()=>{clear();r()};d.append(n)}if(fl){const f=$('button','sm','⟲ Drehen');f.title='Spielfeld um 180° drehen';f.onclick=()=>{if(typeof fl=='function')fl();else{const e=app.querySelector(fl);if(e)e.classList.toggle('rot180')}};d.append(f)}const q=$('button','sm','?');q.title='Anleitung';q.setAttribute('aria-label','Anleitung');q.onclick=()=>helpModal(CURG);d.append(q);app.append(d);return s}

// ---- Spiele-Register: jedes Spiel meldet sich in games/<ordner>/game.js hier an
const GAMES=[],META={},RULES={};
function registerGame(g){GAMES.push(g);META[g.n]=[g.cat,g.c[0],g.c[1],g.fl,g.pl];RULES[g.n]=g.rules||'';if(g.css){const l=document.createElement('link');l.rel='stylesheet';l.href='games/'+g.id+'/style.css?v='+VER;document.head.append(l)}}
