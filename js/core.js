// Kern: Hilfsfunktionen, Zustand, Spiele-Register. Wird von allen Spielen genutzt.

const $=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
const app=document.getElementById('app'),R=n=>Math.floor(Math.random()*n),shuf=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(x=>x[1]);
const dot=i=>`<i class="dot" style="background:var(--p${i})"></i>`;
let tm=[],raf=0,names=['Spieler 1','Spieler 2'];
const later=(f,ms)=>tm.push(setTimeout(f,ms)),clear=()=>{tm.forEach(clearTimeout);tm=[];cancelAnimationFrame(raf);onresize=onkeydown=onkeyup=null;app.innerHTML=''};
function bar(r){const d=$('div','bar'),b=$('button','sm','← Menü'),s=$('div','st');b.onclick=menu;d.append(b,s);if(r){const n=$('button','sm','↻');n.onclick=()=>{clear();r()};d.append(n)}app.append(d);return s}

// ---- Spiele-Register: jedes Spiel meldet sich in games/<ordner>/game.js hier an
const GAMES=[],META={},RULES={};
function registerGame(g){GAMES.push(g);META[g.n]=[g.cat,g.c[0],g.c[1],g.fl,g.pl];RULES[g.n]=g.rules||'';if(g.css){const l=document.createElement('link');l.rel='stylesheet';l.href='games/'+g.id+'/style.css';document.head.append(l)}}
