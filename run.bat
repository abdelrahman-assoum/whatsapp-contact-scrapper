@echo off
REM ===================== WhatsApp Chat Scraper Launcher =====================
REM This script always opens a new Command Prompt window that stays open.

REM Start a new window then exit the current (hidden) one
start "" cmd /k "%~dp0\run_inner.bat"
exit /b
