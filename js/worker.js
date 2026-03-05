/**
 * Worker.js - Der Motor der Aventurischen Werkbank
 * Berechnet das Ranking im Hintergrund, um die UI flüssig zu halten.
 */

// --- IMPORTS ---
import { berechneMagnetismus } from './magnet-engine.js';
import { dataLake } from './data-lake.js';

// Ein interner Cache für die aktuelle Spielsitzung (Recap)
let aktuelleSitzung = null;

self.onmessage = function(e) {
    const { type, payload } = e.data;

    if (type === 'SET_CONTEXT') {
        aktuelleSitzung = payload;
    }

    if (type === 'CALCULATE_RANKING') {
        const { situationstext, gewichte } = payload;
        const results = {};

        // Wir loopen durch jede Kategorie im Data Lake
        for (const kategorie in dataLake) {
            results[kategorie] = dataLake[kategorie].map(item => {
                
                // WICHTIG: Die Engine bekommt hier das pure Daten-Objekt (item) 
                // statt eines DOM-Elements.
                const score = berechneMagnetismus(situationstext, item, aktuelleSitzung, gewichte);
                
                return { 
                    id: item.id, 
                    score: score 
                };
            });
            
            results[kategorie].sort((a, b) => b.score - a.score);
        }

        // Ergebnisse zurück an den UI-Controller
        self.postMessage({ type: 'RANKING_RESULTS', payload: results });
    }
};