# Spielezimmer

Browserspiele für ein Gerät: allein, gegen den Computer oder zu zweit. Läuft als reine statische Seite
(ohne Server, ohne Build-Schritt), zum Beispiel auf GitHub Pages.

## Ordnerstruktur

```
index.html              Startseite (lädt alles Weitere)
impressum.html          Impressum  (Platzhalter in gelb ausfüllen!)
datenschutz.html        Datenschutzerklärung (Platzhalter ausfüllen, prüfen lassen)
css/
  base.css              Farben, Grundstile
  shell.css             Kopfleiste, Seitenleiste, Karten, Dialoge
  games-common.css      Stile, die mehrere Spiele teilen (Canvas, Brettgrößen, Reaktionsspiele)
  legal.css             Stile der Rechtstexte
js/
  core.js               Hilfsfunktionen, Spiele-Register (registerGame)
  flags.js              Geteilte Daten: Länderliste mit Schwierigkeitsstufe (Flaggen-Quiz, Paare finden)
  help.js               Anleitungen aller Spiele (Ziel, Schritte, Steuerung, Tipps)
  shell.js              Oberfläche: Startseite, Suche, Profil, Favoriten, Feedback
  main.js               Lädt alle Spiele und startet die Startseite
games/
  games.js              Reihenfolge der Spiele (Liste der Ordnernamen)
  <spiel>/
    game.js             Spiel-Logik + Eintrag (Name, Kategorie, Regeln, Optionen)
    style.css           Nur falls das Spiel eigene Stile braucht
    thumb.webp          Vorschaubild (echter Screenshot aus dem Spiel)
tools/
  make_thumbnails.py    Erzeugt Vorschaubilder aus echten Spielszenen (Screenshots)
  thumbs-svg/           Vektor-Vorlagen der gezeichneten Vorschaubilder (Quelle der thumb.webp)
```

## Neues Spiel hinzufügen

1. Ordner `games/mein-spiel/` anlegen.
2. `game.js` schreiben. Das Spiel ist eine Funktion `function meinSpiel(o){ ... }`, die in `app` zeichnet
   (Vorlage: `games/tic-tac-toe/game.js`). Am Ende der Datei anmelden:
   ```js
   registerGame({id:'mein-spiel', n:'Mein Spiel', i:'🎯', cat:'Puzzle', c:['#7c3aed','#2563eb'],
     fl:'n', pl:'1', rules:'Kurze Anleitung.', o:[], f:meinSpiel});
   ```
   `cat`: Brettspiele, Puzzle, Wörter & Quiz oder Action. `fl`: `n` = NEU, `t` = Empfohlen. `pl`: `1`, `1–2` oder `2`.
   Optionen (`o`) erscheinen vor dem Start, z. B. `['n','Größe',[['5×5',5],['7×7',7]]]`. Ein vierter Eintrag wählt die vorausgewählte Stufe, z. B. `['d','Schwierigkeit',[['Leicht',0],['Mittel',1],['Schwer',2]],1]` (Mittel).
   Eigene Stile: `style.css` anlegen und `css:true` in `registerGame` setzen.
3. ID in `games/games.js` eintragen.
   Anleitung in `js/help.js` ergänzen (Schlüssel = Spielname): `z` Ziel, `s` Schritte, `k` Steuerung, `r` Besonderheiten, `t` Tipp.
4. Vorschaubild erzeugen: `python tools/make_thumbnails.py` (dafür muss das Spiel in dem Skript einmal
   „vorgespielt“ werden) oder einfach eine eigene `thumb.webp` (400×250) in den Ordner legen.
   Fehlt das Bild, zeigt die Seite automatisch ein Ersatzbild.

## Hinweise zur Darstellung

* Ausgelegt auf das iPad im Querformat. Im Spiel verschwinden Kopfzeile und Seitenleiste, damit das Spiel den ganzen Bildschirm nutzt.
* Canvas-Spiele zeichnen in ihren festen Koordinaten, `js/core.js` rechnet sie automatisch auf die echte Bildschirmauflösung hoch (scharfe Darstellung).
* Zwei-Spieler-Spiele mit getrennten Seiten (Air Hockey, Tap-Duell, Tauziehen) teilen den Bildschirm links/rechts.

## Update-Hinweis (Browser-Cache)

Nach jedem Update in `games/games.js` die Konstante `VER` erhöhen und die `?v=`-Nummern in `index.html` anpassen, sonst zeigen Browser (vor allem Safari auf dem iPad) manchmal noch alte Dateien. Auf dem iPad hilft zusätzlich: Seite neu laden oder Website-Daten für die Seite löschen.

## Lokal ansehen

Die Seite läuft direkt per Doppelklick auf `index.html`. Alternativ: `python -m http.server` im Ordner.

## Veröffentlichen (GitHub Pages)

Alle Dateien samt Ordnern in ein Repository legen, unter Settings → Pages den Branch `main` auswählen und
„Enforce HTTPS“ aktivieren. Das Hochladen ganzer Ordner geht am Computer im Browser, auf dem iPad am besten
mit einer App wie Working Copy.

## Wichtig vor der Veröffentlichung

* `impressum.html` und `datenschutz.html`: gelbe Platzhalter durch echte Angaben ersetzen und die Texte rechtlich prüfen lassen.
* Feedback-Formular: öffnet das Mailprogramm mit der Adresse aus `js/shell.js` (Konstante `MAIL`).
* Profil, Favoriten und Bestwerte liegen nur im Browser des Besuchers (localStorage).
