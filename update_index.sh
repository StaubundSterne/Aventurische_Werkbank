
#!/bin/bash
set -euo pipefail

# Immer vom Projektverzeichnis aus arbeiten
cd "$(dirname "$0")"

mkdir -p js

python3 <<'PY'
import json
from pathlib import Path

output = Path("js/data-index.js")

directories = [
    ("ingame-information", "INGAME_INFORMATION_FILES"),
    ("sc", "SC_FILES"),
    ("nsc", "NSC_FILES"),
    ("venues", "VENUES_FILES"),
    ("items", "ITEMS_FILES"),
    ("playcards", "PLAYCARDS_FILES"),
    ("recaps", "RECAPS_FILES"),
]

lines = [
    "/** Automatisch generierter Index **/",
    ""
]

for directory, export_name in directories:
    lines.append(f"export const {export_name} = [")

    folder = Path("data") / directory

    if folder.exists():
        files = sorted(
            folder.glob("*.json"),
            key=lambda path: path.name.casefold()
        )

        for file in files:
            filename = json.dumps(
                file.name,
                ensure_ascii=False
            )
            lines.append(f"  {filename},")

    lines.extend([
        "];",
        ""
    ])

lines.append(
    "export const CAMPAIGN_FILE = 'campaign/campaign.md';"
)

output.write_text(
    "\n".join(lines) + "\n",
    encoding="utf-8"
)

print("Index für statische Daten wurde aktualisiert!")

for directory, export_name in directories:
    folder = Path("data") / directory
    count = len(list(folder.glob("*.json"))) if folder.exists() else 0
    print(f"  {export_name}: {count}")
PY
