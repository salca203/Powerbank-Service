// Mancala
function mnc(o){const s=bar(()=>mnc(o)),g=$('div','mn');let b=[4,4,4,4,4,4,0,4,4,4,4,4,4,0],cur=0,over=0;app.append(g);
const draw=()=>{g.innerHTML='';const add=(i,a,cl)=>{const e=$('button',cl,b[i]);e.style.gridArea=a;if(cl=='pit'){const m=!over&&(cur?i>6:i<6)&&b[i]&&!(o.m==1&&cur==1);e.disabled=!m;if(m)e.style.outline=`3px solid var(--p${cur})`;e.onclick=()=>sow(i)}else e.style.color=`var(--p${i==6?0:1})`;g.append(e)};
add(13,'1/1/3/2','sto');for(let i=0;i<6;i++){add(12-i,`1/${i+2}`,'pit');add(i,`2/${i+2}`,'pit')}add(6,'1/8/3/9','sto');
s.innerHTML=over?(b[6]==b[13]?'Unentschieden':dot(+(b[13]>b[6]))+names[+(b[13]>b[6])]+' gewinnt! 🏆'):`${dot(cur)}${names[cur]} · ${cur?'obere':'untere'} Reihe`};
const sow=i=>{let n=b[i],j=i;b[i]=0;while(n){j=(j+1)%14;if(j==(cur?6:13))continue;b[j]++;n--}
const st=cur?13:6,own=cur?j>6&&j<13:j<6;if(own&&b[j]==1&&b[12-j]){b[st]+=1+b[12-j];b[j]=b[12-j]=0}
if(!b.slice(0,6).some(x=>x)||!b.slice(7,13).some(x=>x)){b[6]+=b.slice(0,6).reduce((p,q)=>p+q);b[13]+=b.slice(7,13).reduce((p,q)=>p+q);for(let k=0;k<6;k++)b[k]=b[k+7]=0;over=1}else if(j!=st)cur=1-cur;
draw();if(!over&&o.m==1&&cur==1)later(ai,700)};
const ai=()=>{const m=[7,8,9,10,11,12].filter(i=>b[i]);sow(m.find(i=>i+b[i]==13)??m[R(m.length)])};draw()}

registerGame({"id": "mancala", "n": "Mancala", "i": "🌰", "cat": "Brettspiele", "c": ["#a16207", "#78350f"], "fl": "", "pl": "1–2", "rules": "Mulde antippen und Steine verteilen. Endet der letzte im eigenen Speicher, bist du nochmal dran.", "o": [["m", "Gegner", [["Computer", 1], ["Zu zweit", 2]]]], "css": true,f:mnc});
