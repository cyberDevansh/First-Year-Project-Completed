<a href="https://deepscan.io/dashboard#view=project&tid=28285&pid=30508&bid=980808"><img src="https://deepscan.io/api/teams/28285/projects/30508/branches/980808/badge/grade.svg" alt="DeepScan grade"></a>

# Project overview

Tagline: Dharmo rakshite rakshitah — protect the right, teach how to protect yourself.

This repository is an educational demo suite that shows benign, controlled examples of common security concepts, explains how they work, and provides practical defensive advice. Demos are simulated and intended to be run only in isolated, consented environments.

## Quick start (run locally)

1. Open PowerShell (where project is present) and change into the Project folder:



2. (Recommended) Create and activate a virtual environment:

```powershell

.\venv\Scripts\Activate.ps1
```

3. Install dependencies. The project includes a `requirements.txt`. The keylogger demo uses `pynput`, which may need installing separately:

```powershell
pip install -r requirements.txt 
```

4. Start the demo web app:

```powershell
python app.py
```

5. Open the UI in a browser:

- http://127.0.0.1:5000/


6. ## If you do not want to do all these steps then simply use this only after creating the virtual environment:

-$env:FLASK_APP = 'app.py'; python -m flask run --host=0.0.0.0 --port=5000

Notes:
- If PowerShell blocks the venv activation, run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process` first.
- Keep the demo local and do not run the keylogger or phishing templates on production or shared machines.

## Why this project?

Teach defensive hygiene by demonstrating simple attacks and showing immediate, practical countermeasures.

## Tools (short descriptions)

This project includes several small tools/demos located in the `Project/tools` directory. Each entry below is 1–2 lines describing purpose and risk.

- `password_generator.py` — Generates cryptographically-random passwords using secure primitives (`secrets`) and provides a simple strength heuristic; safe and useful for teaching why length/variety matters.
- `password_manager.py` — Example encrypted password store using a master password and `cryptography.Fernet`; demonstrates basic encryption workflows (NOT production-grade: uses fixed salt).
- `keylogger.py` — Simulated keylogger using `pynput` that records keystrokes to a local `log.txt`; intended only for controlled demos and teaching how keyloggers work and how to detect/remove them.
- `phishingmodels/` — A set of static phishing-page templates (Facebook/Google/Instagram/print) plus `warning.js` that shows a caution banner; used only for simulation and awareness (do not deploy these pages publicly).
- `phishingmodels/` — A set of static phishing-page templates (Facebook/Google/Instagram/print) plus `warning.js` that shows a caution banner; used only for simulation and awareness (do not deploy these pages publicly).
- `steganography/` (demo) — Simple image steganography demo used to hide/recover short text messages inside image copies; intended only for educational purposes and not optimized for large payloads.

## Safety & ethics

- All demonstrations are educational. Do not use the keylogger or phishing templates for real attacks or on systems you do not own/authorize.
- If you adapt the code for real use, replace fixed salts, secure master-password handling, and audit cryptography choices.

## Project structure (key files)

- `app.py` — Flask demo UI that serves templates and provides endpoints to start/stop the simulated keylogger and access tools.
- `tools/` — Demo scripts and templates (see Tools above).
- `templates/` and `static/` — Web UI files used by `app.py`.
- `requirements.txt` — Python dependencies for running the demo (Flask, keyboard, python-dotenv, etc.).

## Troubleshooting

- If you get ModuleNotFoundError for `pynput`, run `pip install pynput` inside the activated venv.
- Favicon 404s are harmless if `static/favicon.ico` is missing.

### Why `python app.py` may work on other machines without the full venv steps

- Some systems have the required Python packages installed globally (or the user previously installed `pynput`, `Flask`, etc.), so running `python app.py` works without creating a virtual environment.
- Using a virtual environment keeps dependencies isolated and prevents version conflicts; it's the recommended, reproducible approach. If you prefer the simpler route and your system already has the packages, running `python app.py` is fine — just be aware of potential dependency/version differences.

If you want, I can add a small `favicon.ico`, update `requirements.txt` to include `pynput`, or expand any tool's documentation.
