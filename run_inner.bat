@echo off
title WhatsApp Chat Scraper

echo ===========================================================
echo  WhatsApp Chat Scraper
echo ===========================================================
echo  Press any key to start...
pause > nul
echo.

REM ---------- FIRST‑TIME SETUP (simple check) ----------
if not exist node_modules (
    echo First run detected – installing dependencies...
    call npm install
    call npx playwright install
) else (
    echo Dependencies already installed – skipping setup.
)
echo ----------------------------------------------------
echo.

echo Starting the scraper...
echo (Press Ctrl+C to stop)
echo.

call npm start

echo.
echo -------- Scraper exited --------
echo Press any key to close this window...
pause > nul
