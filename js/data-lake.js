
// ---  DATA-LAKE: Archiv der SPA und Single Source of Truth ---

import * as Index from './data-index.js';

export const dataLake = {
    // Bulk-Daten (Hintergrund-Rauschen)
    nsc: [],
    ingame_information: [],
    venues: [],
    items: [],
    campaign: [],

    // Dynamischer Kontext (Aktueller Fokus)
    episodes: [],
    recaps: []
};


// ---  FLATTENTOTEXT ---
/**
 * Wandelt ein komplexes JSON-Objekt in einen flachen Such-Text um.
 * Extrahiert rekursiv alle Strings aus dem Objekt.
 */
function flattenToText(obj) {
    let text = "";

    for (let key in obj) {
        const value = obj[key];

        // 1. Strings direkt erfassen
        if (typeof value === "string") {
            text += value + " ";
        }
        // 2. Zahlen ebenfalls erfassen
        else if (typeof value === "number") {
            text += value.toString() + " ";
        }
        // 3. Rekursion für Objekte und Arrays
        else if (typeof value === "object" && value !== null) {
            text += flattenToText(value);
        }
    }
    // Wir geben alles in Kleinschreibung zurück für den einfachen Abgleich
    return text.toLowerCase();
}

// ---  BULK-LOADING DER JSON-DATEIEN ---
/**
 * Lädt eine ganze Kategorie von JSON-Dateien (Bulk-Loading)
 */
async function loadJsonCategory(fileList, folder, targetArray) {
    if (!Array.isArray(fileList)) return;
    for (const fileName of fileList) {
        try {
            const response = await fetch(`./data/${folder}/${fileName}`);
            if (!response.ok) continue;
            const data = await response.json();
            data._filename = fileName;
            data._searchText = flattenToText(data);
            targetArray.push(data);
        } catch (e) {
            console.warn(`Fehler beim Laden von JSON (${folder}): ${fileName}`, e);
        }
    }
}

// ---  BULK- UND SINGLE-LOADING FÜR MARKDOWN-DATEIEN ---

async function loadMarkdownFile(filePath, targetArray, isContext = false) {
    try {
        // Falls es kein Kontext-File ist, liegt es im data-Ordner
        const prefix = isContext ? './data/' : './';
        const response = await fetch(`${prefix}${filePath}`);

        if (!response.ok) return;
        const rawText = await response.text();

        const data = {
            _filename: filePath.split('/').pop(),
            content: rawText,
            _searchText: rawText.toLowerCase()
        };

        if (isContext) {
            targetArray[0] = data; // Ersetzt den aktuellen Kontext (nur 1 aktiv)
        } else {
            targetArray.push(data);
        }
    } catch (e) {
        console.warn(`Fehler beim Laden von MD: ${filePath}`, e);
    }
}

// --- INITIALISIERUNG: Wird beim Start der SPA aufgerufen. ---
/**
 * Lädt alle Hintergrund-Ressourcen.
 */
export async function initDataLake() {
    console.log("Data-Lake: Befüllung startet...");
    
    // Reset
    dataLake.nsc = [];
    dataLake.ingame_information = [];
    dataLake.venues = [];
    dataLake.items = [];
    dataLake.campaign = [];

    await Promise.all([
        loadJsonCategory(Index.NSC_FILES, 'nsc', dataLake.nsc),
        loadJsonCategory(Index.INGAME_INFORMATION_FILES, 'ingame-information', dataLake.ingame_information),
        loadJsonCategory(Index.VENUES_FILES, 'venues', dataLake.venues),
        loadJsonCategory(Index.ITEMS_FILES, 'items', dataLake.items),
        Index.CAMPAIGN_FILE ? loadMarkdownFile(Index.CAMPAIGN_FILE, dataLake.campaign) : Promise.resolve()
    ]);

    console.log("Data-Lake: Hintergrund-Rauschen bereit.");
    return dataLake; // Wichtig für den Transfer zum Worker
}

// ---  SINGLE-LOADING FÜR MARKDOWN-DATEIEN ---
/**
 * Wird aufgerufen, wenn du online eine Datei auswählst.
 */
export async function loadContextFile(category, folder, fileName) {
    const targetArray = category === 'episode' ? dataLake.episodes : dataLake.recaps;
    await loadMarkdownFile(`${folder}/${fileName}`, targetArray, true);
    return dataLake;
}