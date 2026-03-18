# 📑 00_PROJEKT_STATUS.md (Stand: 18.03.2026)

## 1. Rolle & Funktion des Assistenten
* **Digitaler Chronist:** Fokus auf die Svelltland-Kampagne (Lowangen, Donnerbach, Stoerrebrandt).
* **Architekt:** Fokus auf die Drei-Säulen-Struktur: Data Lake (Speicher), Worker (Rechenleistung) und UI-Controller (Regie).
* **Regel-Anker:** Unterstützung bei DSA-spezifischen Werkzeugen (Kräuter, Kalender, NSCs).

## 2. Erreichte Meilensteine (Zustand Heute)
* [x] **UI-Flexibilität:** Header und Sidebars sind einklappbar; Layout für maximale Fokus-Area optimiert.
* [x] **Aventurisches Design:** Schieberegler im "Holz & Messing"-Look implementiert.
* [x] **Data-Lake-Architektur:** * Bulk-Loading für NSC (113+ Objekte), Ingame-Infos, Venues und Items implementiert.
    * Single-Loading für dynamischen Kontext (Episoden & Recaps) integriert.
* [x] **Narrative Tokenisierung:** * `flattenToText` Funktion implementiert, die JSON-Strukturen (inkl. Zahlen für Stats/Jahre) in einen flachen "Text-Teppich" für die Magnet-Engine verwandelt.
    * Trennung von Datenstruktur (für Anzeige) und Text-Vektor (für Ranking).
* [x] **Infrastruktur:** Klare Trennung der Dateien (`worker.js`, `data-lake.js`, `magnet-engine.js`).

## 3. Laufende Arbeitspakete (To-Do)
* [ ] **Worker-Synchronisation:** Finalisierung der `postMessage`-Schnittstelle, um den geladenen Data-Lake vom UI-Thread an den Worker zu übergeben.
* [ ] **UI-Koppelung:** Implementierung der Auswahlmenüs für Episoden und Recaps (Zonen-A-Anbindung).
* [ ] **Magnet-Tuning:** Validierung der Gewichtung (Situation x 5.0 vs. Recap x 4.0), um sicherzustellen, dass Namen wie "Brenwir" die gewünschte Score-Explosion auslösen.
* [ ] **Stream-Rendering:** Umstellung der Sidebars von statischem HTML auf dynamisches Rendering basierend auf den Ranking-Ergebnissen des Workers.

## 4. Strategische Entscheidungen
* **Performance:** Wir laden ~5000+ Ressourcen einmalig in den RAM (Data-Lake). Der Worker berechnet Scores ohne Server-Latenz.
* **Erzählspiel-Fokus:** YAML-Metadaten werden für das Ranking mit einbezogen, aber nicht priorisiert; der Fokus liegt auf der Übereinstimmung von Begriffen im Fließtext.
* **State-Management:** Der `dataLake` im `ui-controller.js` ist die "Single Source of Truth".