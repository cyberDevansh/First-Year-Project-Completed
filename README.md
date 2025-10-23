<h1 align="center">🔥 Tech Fest Project 🔥</h1>

<p align="center">
  <span style="float:left;">
    <a href="https://deepscan.io/dashboard#view=project&tid=28285&pid=30508&bid=980808">
      <img src="https://deepscan.io/api/teams/28285/projects/30508/branches/980808/badge/grade.svg" alt="DeepScan grade">
    </a>
  </span>

  <span style="float:right;">
    <img src="https://img.shields.io/badge/Status-Active-success">
  </span>
</p>
<br>
<p align="center">
  <a href="https://github.com/cyberDevansh">
    <img src="https://img.shields.io/badge/GitHub-Follow-black?logo=github">
  </a>
</p>

<div style="clear: both;"></div>




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

5. Open the UI in a browser (or click the ctrl+click in terminal link):

- http://127.0.0.1:5000/


6. ## Or Use this :
-$env:FLASK_APP = 'app.py'; python -m flask run --host=0.0.0.0 --port=5000

Notes:
- If PowerShell blocks the venv activation, run ```Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process``` first.
- Keep the demo local and do not run the keylogger or phishing templates on production or shared machines.

## Why this project?

Teach defensive hygiene by demonstrating simple attacks and showing immediate, practical countermeasures.

## Tools (short descriptions)

This project includes several small tools/demos located in the `Project/tools` directory. Each entry below is 1–2 lines describing purpose and risk.
## What each file does (quick)

- **password_generator.py** — Makes secure, random passwords using Python’s `secrets`. Shows why longer + mixed characters matter for strength. Good for learning secure password practices.

- **password_manager.py** — A small encrypted password store that uses a master password and `cryptography.Fernet`. Demonstrates how encryption and safe storage work (not production-ready — for demo/learning).

- **keylogger.py** — A simulated keylogger using `pynput` that writes keystrokes to `log.txt`. Only for controlled demos and learning how keyloggers operate and how to spot or remove them.

- **phishingmodels/** — Static demo pages (Facebook/Google/Instagram/print) plus `warning.js` that shows a caution banner. Used only for simulation and awareness — **do not publish these pages**.

- **steganography/** (demo) — Simple image steganography that hides and recovers short text messages inside images. Educational demo — not meant for large data or real-world secret-keeping.

> ⚠️ **Important:** These are learning tools and demos. They show how techniques work so you can defend against them or understand security. **Do not use them for harmful or illegal activities.**

## Safety & ethics

- All demonstrations are educational. Do not use the keylogger or phishing templates for real attacks or on systems you do not own/authorize.
- If you adapt the code for real use, replace fixed salts, secure master-password handling, and audit cryptography choices.

## Project structure (key files)

- `app.py` — Flask demo UI that serves templates and provides endpoints to start/stop the simulated keylogger and access tools.
- `tools/` — Demo scripts and templates (see Tools above).
- `templates/` and `static/` — Web UI files used by `app.py`.
- `requirements.txt` — Python dependencies for running the demo (Flask, keyboard, python-dotenv, etc.).

