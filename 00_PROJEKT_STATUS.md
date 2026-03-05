📑 00_PROJEKT_STATUS.md (Stand: 02.03.2026)
1. Rolle & Funktion des Assistenten

    Digitaler Chronist: Fokus auf die Svelltland-Kampagne (Lowangen, Donnerbach, Stoerrebrandt).

    Architekt: Fokus auf die Drei-Säulen-Struktur: Data Lake (Speicher), Worker (Rechenleistung) und UI-Controller (Regie).

    Regel-Anker: Unterstützung bei DSA-spezifischen Werkzeugen (Kräuter, Kalender, NSCs).

2. Erreichte Meilensteine (Zustand Heute)

    [x] UI-Flexibilität: Sowohl Header (Vertikal) als auch beide Seitenleisten (Horizontal) sind einklappbar, um der Fokus-Area maximalen Platz zu geben.

    [x] Aventurisches Design: Kompatible, sparsame Schieberegler im "Holz & Messing"-Look implementiert (appearance: none validiert).

    [x] Entkopplung: Die Logik wurde so vorbereitet, dass die magnet-engine.js sowohl DOM-Elemente als auch reine Daten-Objekte verarbeiten kann.

    [x] Infrastruktur: Klare Trennung der Dateien (worker.js, data-lake.js, magnet-engine.js) für eine saubere Modul-Struktur.

3. Laufende Arbeitspakete (To-Do)

    [ ] Data Lake Füllung: Überführung der 113 NSC-Objekte in die data-lake.js.

    [ ] Worker-Integration: Finalisierung der postMessage-Kommunikation zwischen Controller und Worker.

    [ ] Objekt-Validierung: Sicherstellen, dass die Engine die Wortstämme aus den JS-Objekten genauso präzise extrahiert wie zuvor aus dem HTML.

    [ ] Token-Schnittmenge: Debugging, warum spezifische Namen (z.B. "Brenwir") im erzählerischen Content noch keine Score-Explosion auslösen.

4. Strategische Entscheidungen

    Performance: Wir rendern in den Sidebars (Zone B & D) nur noch die Top-Ergebnisse, die der Worker liefert, statt hunderte versteckte Karten im DOM zu halten.

    State-Management: Der Data Lake ist die "Single Source of Truth". Das HTML ist nur noch die Projektionsfläche.

    Navigation: Einklappbare Seitenelemente erhöhen die Immersion und erlauben das Umschalten zwischen "Vorbreitungs-Modus" (alles offen) und "Spiel-Modus" (nur Fokus).