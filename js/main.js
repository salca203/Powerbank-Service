// Lädt alle Spiele aus games/<id>/game.js und startet danach die Startseite.
(function(){let n=GAME_IDS.length;const done=()=>{if(--n)return;GAMES.sort((a,b)=>GAME_IDS.indexOf(a.id)-GAME_IDS.indexOf(b.id));menu('home')};
GAME_IDS.forEach(id=>{const s=document.createElement('script');s.src='games/'+id+'/game.js';s.onload=s.onerror=done;document.head.append(s)})})();
