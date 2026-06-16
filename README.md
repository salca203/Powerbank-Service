# VOLTKONTOR

Eine bewusst zurückhaltende Business-Website für dein Powerbank-Verleih-Mini-Business.

## Auf GitHub veröffentlichen (GitHub Pages)

1. Erstelle ein neues Repository auf GitHub (z. B. `voltkontor`).
2. Lade die Datei `index.html` in dieses Repository hoch (per Drag-and-drop im Browser oder via Git).
3. Gehe zu **Settings → Pages**.
4. Wähle unter „Source" den Branch `main` und den Ordner `/ (root)`.
5. Speichern — nach ein bis zwei Minuten ist die Seite unter
   `https://DEIN-NUTZERNAME.github.io/voltkontor/` erreichbar.

## Anpassen

Alles befindet sich in der einen Datei `index.html`:

- Firmenname „VOLTKONTOR" → einfach per Suchen-und-Ersetzen austauschen.
- Die schwarzen Balken (`<span class="redact">…</span>`) stehen für „vertrauliche" Inhalte. Wenn du später doch echte Infos (Preise, Standorte, Kontakt) zeigen willst, ersetze einfach den Inhalt dieser `<span>`-Elemente durch echten Text und entferne die Klasse `redact`.
- Farben lassen sich oben im `<style>`-Block unter `:root` zentral ändern.
