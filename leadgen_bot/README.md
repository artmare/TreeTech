# LeadGen Bot

A production-ready Python lead generation tool for finding local businesses that appear not to have a website. It is designed for manual review and compliant prospect research, not automated outreach.

## Features

- Google Places API support when `GOOGLE_PLACES_API_KEY` is configured.
- OpenStreetMap / Overpass fallback when Google is unavailable.
- Website status detection: `NO_WEBSITE`, `HAS_WEBSITE`, `UNKNOWN`.
- Default export includes only `NO_WEBSITE` leads.
- Deduplication by business name plus address, with fallback location matching.
- Phone normalization, email validation, and address cleanup.
- Lead scoring from 0 to 100.
- CSV, JSON, and Excel exports.
- Typer CLI, typed Pydantic models, logging, retries, and rate limiting.

## Installation

```bash
cd leadgen_bot
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

On macOS or Linux, activate with:

```bash
source .venv/bin/activate
```

## Configuration

Edit `.env`:

```env
GOOGLE_PLACES_API_KEY=
OVERPASS_URL=https://overpass-api.de/api/interpreter
OVERPASS_FALLBACK_URLS=https://maps.mail.ru/osm/tools/overpass/api/interpreter,https://overpass.kumi.systems/api/interpreter,https://overpass.osm.ch/api/interpreter
NOMINATIM_URL=https://nominatim.openstreetmap.org/search
PHOTON_URL=https://photon.komoot.io/api/
HTTP_TIMEOUT_SECONDS=20
REQUESTS_PER_SECOND=1.0
MAX_RETRIES=3
USER_AGENT=LeadGenBot/1.0 (manual-review; contact@example.com)
```

Use a real contact in `USER_AGENT` when calling OpenStreetMap/Nominatim. This is expected by public infrastructure operators.

## Google Places API Key Setup

1. Create or select a Google Cloud project.
2. Enable the Places API.
3. Create an API key.
4. Restrict the key by API and, where practical, by IP or application.
5. Add it to `.env` as `GOOGLE_PLACES_API_KEY`.

When the key exists, `--source auto` uses Google Places first. Without a key, it uses OpenStreetMap/Overpass.

## Usage

```bash
python main.py ^
  --city "Vienna" ^
  --country "Austria" ^
  --category "restaurant" ^
  --radius 5000 ^
  --limit 500
```

PowerShell also supports a single line:

```bash
python main.py --city "Vienna" --country "Austria" --category "restaurant" --radius 5000 --limit 500
```

Add keywords:

```bash
python main.py --city "Graz" --country "Austria" --category "cafe" -k specialty -k brunch
```

Force a source:

```bash
python main.py --city "Vienna" --country "Austria" --category "dentist" --source overpass
```

Include uncertain records:

```bash
python main.py --city "Vienna" --country "Austria" --category "gym" --include-unknown
```

## Exports

Each run writes three files to `output/` unless `--output-dir` is provided:

- `*.csv`
- `*.json`
- `*.xlsx`

Columns include:

```csv
name,category,address,phone,email,latitude,longitude,source_url,website_url,website_status,rating,review_count,source_platform,lead_score
```

Example:

```csv
name,category,address,phone,email,website_status,lead_score
Joe's Cafe,Cafe,Example Street 1,+431234567,,NO_WEBSITE,95
```

## Lead Scoring

- No website: +50
- More than 50 reviews: +20
- Rating above 4.0: +15
- Has phone number: +10
- Has email: +5

Results are sorted by highest score first.

## Project Architecture

```text
leadgen_bot/
├── main.py
├── config.py
├── requirements.txt
├── README.md
├── scrapers/
│   ├── google_places.py
│   ├── overpass.py
│   └── base.py
├── services/
│   ├── lead_filter.py
│   ├── deduplicator.py
│   ├── website_detector.py
│   └── validator.py
├── exporters/
│   ├── csv_exporter.py
│   ├── json_exporter.py
│   └── excel_exporter.py
├── models/
│   └── business.py
├── utils/
│   ├── logger.py
│   ├── helpers.py
│   └── rate_limiter.py
└── tests/
```

## Compliance Notes

- Respect Google Places API terms and quota limits.
- Respect OpenStreetMap, Nominatim, and Overpass usage policies.
- Do not bypass CAPTCHAs.
- Do not scrape sites that disallow it in `robots.txt`.
- Do not automate outreach or messaging.
- Treat output as leads for manual review only.

## Troubleshooting

`GOOGLE_PLACES_API_KEY is required`
: Set the key in `.env` or run with `--source overpass`.

`Could not geocode location`
: Check city and country spelling, or try a larger nearby city.

`429` or rate-limit errors
: Lower `REQUESTS_PER_SECOND` in `.env` and reduce `--limit`.

`406` or Overpass endpoint rejected
: Try a different `OVERPASS_URL` or add mirrors to `OVERPASS_FALLBACK_URLS`.

No exported rows
: The tool exports only `NO_WEBSITE` records by default. Try `--include-unknown` to inspect uncertain data.

Excel export fails
: Ensure `openpyxl` is installed with `pip install -r requirements.txt`.

## Tests

```bash
pytest
```
