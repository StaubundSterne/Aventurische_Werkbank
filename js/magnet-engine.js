/**
 * Magnet-Engine 2.0 (Context-Aware Ranking System)
 */

// --- TOKENIZER ---
function holeWortstamm(wort) {
    if (!wort || wort.length < 3) return wort;
    let stamm = wort.toLowerCase();
    // Entfernt typische deutsche Endungen
    stamm = stamm.replace(/(em|ern|er|en|es|e|s)$/, '');
    // Macht Umlaute vergleichbar
    return stamm.replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ß/g, 'ss');
}

function generiereTokens(text) {
    if (!text) return [];
    return text.toLowerCase()
        .replace(/[.,!?;:()]/g, "") // Satzzeichen entfernen
        .split(/\s+/)
        .filter(wort => wort.length > 2)
        .map(wort => holeWortstamm(wort)); // Jedes Wort wird auf den Stamm gekürzt
}

// --- CAMPAIGN-PARSING-MODUL ---

// --- EPISODE-PARSING-MODUL ---

// --- RECAP-PARSING-MODUL ---

// --- INGAME-INFORMATION-PARSING-MODUL ---

// --- NSC-PARSING-MODUL ---

// --- VENUE-PARSING-MODUL ---

// --- OBJECTS-PARSING-MODUL ---


// --- BASISGEWICHTUNG ---

const GEWICHTE = {
    SITUATION: 5.0,
    INGAME_INFO: 5.0,
    NSC: 5.0,
    VENUES: 5.0,
    OBJECTS: 5.0,
    RECAP: 4.0,
    EPISODE: 3.0,
    CAMPAIGN: 1.0
};

// --- SCORE-CALCULATION-MODUL ---

export function berechneMagnetismus(situationstext, karte, aktuelleSitzung, g) {
    if (!karte) return 0;
    let score = 0;

    // --- RANK 1: SITUATION (situation-input) ---
    if (situationstext && situationstext.trim().length > 0) {
        const situationStämme = generiereTokens(situationstext);
        situationStämme.forEach(sStamm => {
            if (kartenStämme.includes(sStamm)) score += (10 * g.SITUATION);
            if (titelStämme.includes(sStamm)) score += (25 * g.SITUATION);
            if (beschreibungsStämme.includes(sStamm)) score += (5 * g.SITUATION);
        });
    }

    // --- RANK 2: INGAME_INFO (ingame-information-stream) ---

    // --- RANK 3: NSC (NSC-stream) ---

    // --- RANK 3: VENUE (venue-stream) ---

    // --- RANK 4: OBJECTS (objects-stream) ---

    // --- RANK 5: RECAP (recaps) ---

    // --- RANK 6: EPISODE (episodes) ---

    // --- RANK 7: CAMPAIGNE (campaign) ---

    return score;
}