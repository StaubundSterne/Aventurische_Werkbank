#!/bin/bash

echo "/** Automatisch generierter Index **/ " > js/data-index.js

# Funktion für die Standard-Ordner (Filtert jetzt explizit auf .json)
generate_list() {
    echo "export const $2 = [" >> js/data-index.js
    # Wir fügen *.json beim ls-Befehl wieder hinzu
    ls data/$1/*.json 2>/dev/null | xargs -n 1 basename 2>/dev/null | sed "s/.*/  '&',/" >> js/data-index.js
    echo "];" >> js/data-index.js
    echo "" >> js/data-index.js
}

# Nur die permanenten Datenbank-Ordner indizieren
generate_list "ingame-information" "INGAME_INFORMATION_FILES"
generate_list "nsc" "NSC_FILES"
generate_list "venues" "VENUES_FILES"
generate_list "items" "ITEMS_FILES"

# Einzelfall Campaign (hier ist die Endung .md fest im Text)
echo "export const CAMPAIGN_FILE = 'campaign/campaign.md';" >> js/data-index.js

echo "Index für statische Daten wurde aktualisiert!"