// Shikaku
function shi(o){const s=bar(()=>shi(o)),N=o.n,C=Math.floor(540/N),W=C*N,cv=$('canvas','hk'),key='sk'+N,num=Array.from({length:N},()=>Array(N).fill(0));cv.width=cv.height=W;app.append(cv);const x=cv.getContext('2d');
const sp=(r,c,h,w)=>{if(h*w<=4||(h*w<=9&&R(3)==0)||(h*w<=14&&R(6)==0)){num[r+R(h)][c+R(w)]=h*w;return}if(h>1&&(w==1||R(2))){const k=1+R(h-1);sp(r,c,k,w);sp(r+k,c,h-k,w)}else{const k=1+R(w-1);sp(r,c,h,k);sp(r,c+k,h,w-k)}};sp(0,0,N,N);
let rs=[],dr=null,t0=Date.now(),done=0,best=0;try{best=+localStorage.getItem(key)||0}catch(e){}s.innerHTML='Ziehe Rechtecke um die Zahlen';
const ok=q=>{let k=0,v=0;for(let i=q.r;i<q.r+q.h;i++)for(let j=q.c;j<q.c+q.w;j++)if(num[i][j]){k++;v=num[i][j]}return k==1&&v==q.h*q.w};
const check=()=>{if(rs.every(ok)&&rs.reduce((a,q)=>a+q.h*q.w,0)==N*N){done=1;const t=Math.round((Date.now()-t0)/1000);let m=`✅ Gelöst in ${Math.floor(t/60)}:${String(t%60).padStart(2,'0')}`;if(!best||t<best){best=t;try{localStorage.setItem(key,t)}catch(e){}m+=' · neue Bestzeit!'}s.innerHTML=m}else s.innerHTML=`Rechtecke: ${rs.length} · richtig: ${rs.filter(ok).length}`};
const cell=e=>{const b=cv.getBoundingClientRect(),f=v=>Math.min(N-1,Math.max(0,Math.floor(v/C)));return[f((e.clientY-b.top)*W/b.height),f((e.clientX-b.left)*W/b.width)]};
cv.onpointerdown=e=>{if(done)return;cv.setPointerCapture(e.pointerId);const[r,c]=cell(e);dr={r0:r,c0:c,r1:r,c1:c}};cv.onpointermove=e=>{if(dr){const[r,c]=cell(e);dr.r1=r;dr.c1=c}};
cv.onpointerup=()=>{if(!dr)return;const r=Math.min(dr.r0,dr.r1),c=Math.min(dr.c0,dr.c1),h=Math.abs(dr.r1-dr.r0)+1,w=Math.abs(dr.c1-dr.c0)+1;dr=null;
if(h*w==1){const i=rs.findIndex(q=>r>=q.r&&r<q.r+q.h&&c>=q.c&&c<q.c+q.w);if(i>=0){rs.splice(i,1);check();return}}
rs=rs.filter(q=>q.r+q.h<=r||q.r>=r+h||q.c+q.w<=c||q.c>=c+w);rs.push({r,c,h,w,t:performance.now()});check()};
const draw=now=>{x.fillStyle='#fdf6e3';x.fillRect(0,0,W,W);x.strokeStyle='#cfc3a3';x.lineWidth=1;for(let i=0;i<=N;i++){x.beginPath();x.moveTo(i*C,0);x.lineTo(i*C,W);x.moveTo(0,i*C);x.lineTo(W,i*C);x.stroke()}
rs.forEach(q=>{const p=Math.min(1,(now-q.t)/170),sc=.82+.18*(1-Math.pow(1-p,3)),cx=(q.c+q.w/2)*C,cy=(q.r+q.h/2)*C,g=ok(q);x.save();x.translate(cx,cy);x.scale(sc,sc);x.translate(-cx,-cy);x.fillStyle=g?'#2dc26b88':'#6842ff44';x.fillRect(q.c*C+2,q.r*C+2,q.w*C-4,q.h*C-4);x.strokeStyle=g?'#1f9d55':'#6842ff';x.lineWidth=4;x.strokeRect(q.c*C+3,q.r*C+3,q.w*C-6,q.h*C-6);x.restore()});
if(dr){const r=Math.min(dr.r0,dr.r1),c=Math.min(dr.c0,dr.c1);x.fillStyle='#ffd16699';x.fillRect(c*C+2,r*C+2,(Math.abs(dr.c1-dr.c0)+1)*C-4,(Math.abs(dr.r1-dr.r0)+1)*C-4)}
x.fillStyle='#14213d';x.textAlign='center';x.textBaseline='middle';x.font=`800 ${C*.5}px ui-rounded,system-ui,sans-serif`;num.forEach((row,r)=>row.forEach((v,c)=>{if(v)x.fillText(v,c*C+C/2,r*C+C/2+1)}));raf=requestAnimationFrame(draw)};raf=requestAnimationFrame(draw)}

registerGame({"id": "shikaku", "n": "Shikaku", "i": "▦", "cat": "Puzzle", "c": ["#0d9488", "#1e40af"], "fl": "nt", "pl": "1", "rules": "Teile das Feld in Rechtecke. Jedes Rechteck enthält genau eine Zahl, und die Zahl ist seine Fläche. Ziehen zeichnet ein Rechteck, Antippen löscht es.", "o": [["n", "Größe", [["5×5", 5], ["7×7", 7], ["9×9", 9]]]],f:shi});
