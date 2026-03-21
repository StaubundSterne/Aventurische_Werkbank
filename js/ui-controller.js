/**
 * UI-Controller für die Aventurische Werkbank 2.0
 */

// --- IMPORTS AUS DER MAGNET-ENGINE.JS ---
import { berechneMagnetismus } from './magnet-engine.js';


// --- IMPORTS AUS DER DATA-LAKE.JS ---

import { initDataLake } from './data-lake.js';

// --- INITIALISIERUNG (Die Eröffnungszeremonie) ---
function initUI() {
    console.log("Die Werkbank wird vorbereitet...");

    initDataLake().then(() => {
        console.log("Check: Alle Ressourcen sind jetzt im Speicher!");
    });

    // 1. SITUATION-INPUT AKTIVIEREN
    const sitInput = document.getElementById('situation-input');
    sitInput.addEventListener('input', () => {
        aktualisiereRanking();
    });

    // 2. SCHIEBEREGLER FÜR DIE GEWICHTUNG AKTIVIEREN
    // Jedes Mal, wenn ein Regler bewegt wird, soll das Ranking neu berechnet werden
    const sliders = document.querySelectorAll('.weight-controls input');
    sliders.forEach(slider => {
        slider.addEventListener('input', () => {
            aktualisiereRanking();
        });
    });

    // 3. HEADER EIN- UND AUSKLAPPBAR
    const header = document.getElementById('main-header');
    const toggleBtn = document.getElementById('toggle-header');

    if (toggleBtn && header) {
        toggleBtn.addEventListener('click', () => {
            header.classList.toggle('collapsed');

            if (header.classList.contains('collapsed')) {
                toggleBtn.innerHTML = "&#9660;"; // Ein nach unten zeigendes Dreieck (▼)
                toggleBtn.title = "Header zeigen"; // Hilfstext beim Drüberfahren
            } else {
                toggleBtn.innerHTML = "&#9650;"; // Ein nach oben zeigendes Dreieck (▲)
                toggleBtn.title = "Header verbergen";
            }
        });
    }

    // 4. ZONEN B UND D EIN- UND AUSKLAPPBAR

    setupCollapsible('aside-ingame-information', 'toggle-ingame-information', '&#9664;', '&#9654;');
    setupCollapsible('aside-resource', 'toggle-resource', '&#9654;', '&#9664;');

    function setupCollapsible(asideId, btnId, openIcon, closedIcon) {
        const aside = document.getElementById(asideId);
        const btn = document.getElementById(btnId);

        if (btn && aside) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Verhindert, dass der Klick das aside-Event triggert
                const isCollapsed = aside.classList.toggle('collapsed');
                btn.innerHTML = isCollapsed ? closedIcon : openIcon;
            });

            // Klick auf die schmale Leiste öffnet sie wieder
            aside.addEventListener('click', () => {
                if (aside.classList.contains('collapsed')) {
                    aside.classList.remove('collapsed');
                    btn.innerHTML = openIcon;
                }
            });
        }
    }
}

// --- DATEN-LADEN: KAMPAGNE, EPISODEN, RECAP, INGAME-INFORMATION, NSC, SCHAUPLÄTZE, GEGENSTÄNDE ---

// --- HAUPTFUNKTION: RANKING & SORTIERUNG ---

function aktualisiereRanking() {
    // Vorerst leer, damit es keine Fehler wirft
    console.log("Ranking-Update getriggert");
}

// Dieser Befehl startet alles, sobald die Seite im Browser geladen ist
document.addEventListener('DOMContentLoaded', initUI);