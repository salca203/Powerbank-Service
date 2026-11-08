// Ultimate Tic-Tac-Toe
function uttt(o){const s=bar(()=>uttt(o),'.ut');let B=Array(81).fill(null),W=Array(9).fill(null),cur=0,nx=-1,over=0;const g=$('div','ut');app.append(g);
const L=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],wn=a=>{for(const[x,y,z]of L)if(a[x]!=null&&a[x]<2&&a[x]==a[y]&&a[y]==a[z])return a[x];return a.every(v=>v!=null)?2:null};
const st=()=>s.innerHTML=`${dot(cur)}${names[cur]}${nx<0?' · beliebiges Feld':''}`;
const draw=()=>{g.innerHTML='';for(let i=0;i<9;i++){const d=$('div','sb'+((nx<0||nx==i)&&W[i]==null&&!over?' act':''));
if(W[i]!=null&&W[i]<2)d.innerHTML=`<em style="color:var(--p${W[i]})">${'✕○'[W[i]]}</em>`;else for(let j=0;j<9;j++){const v=B[i*9+j],c=$('button','uc',v==null?'':'✕○'[v]);c.style.color=`var(--p${v})`;c.onclick=()=>{if(!(o.m==1&&cur==1))play(i,j)};d.append(c)}g.append(d)}};
const play=(i,j)=>{if(over||W[i]!=null||B[i*9+j]!=null||(nx>=0&&nx!=i))return;B[i*9+j]=cur;W[i]=wn(B.slice(i*9,i*9+9));const w=wn(W);
if(w!=null){over=1;s.innerHTML=w==2?'Unentschieden':dot(w)+names[w]+' gewinnt! 🏆'}else{cur=1-cur;nx=W[j]==null?j:-1;st();if(o.m==1&&cur==1)later(ai,600)}draw()};const ai=()=>{const d=o.d??1,m=[];for(let i=0;i<9;i++)if(W[i]==null&&(nx<0||nx==i))for(let j=0;j<9;j++)if(B[i*9+j]==null)m.push([i,j]);if(d==0)return play(...m[R(m.length)]);
const sc=([i,j])=>{const a=B.slice(i*9,i*9+9);a[j]=1;let v=(wn(a)===1?5:0)+(j==4?1:0)+(W[j]==null?0:-2)+Math.random();
if(d==2){const W2=[...W];W2[i]=wn(a);if(wn(W2)===1)v+=100;if(W[j]==null){const t=B.slice(j*9,j*9+9);if(i==j)t[j]=1;for(let k=0;k<9;k++)if(t[k]==null){t[k]=0;if(wn(t)===0)v-=6;t[k]=null}}
const c=B.slice(i*9,i*9+9);c[j]=0;if(wn(c)===0)v+=4;if(wn(a)===1&&W[j]!=null)v+=1}return v};
m.sort((p,q)=>sc(q)-sc(p));play(...m[0])};draw();st()}

registerGame({"id": "ultimate-tic-tac-toe", "n": "Ultimate Tic-Tac-Toe", "i": "❌", "cat": "Brettspiele", "c": ["#c026d3", "#4f46e5"], "fl": "", "pl": "1–2", "rules": "Dein Zug bestimmt das Feld des Gegners. Gewinne drei kleine Felder in einer Reihe.", "o": [["m", "Gegner", [["Computer", 1], ["Zu zweit", 2]]], ["d", "Computer-Stärke", [["Leicht", 0], ["Mittel", 1], ["Schwer", 2]], 1]], "css": true,f:uttt});
