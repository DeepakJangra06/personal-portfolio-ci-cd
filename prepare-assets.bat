@echo off
REM Script to prepare assets for deployment (Windows version)
REM This script copies all required assets to the dist folder

echo 📁 Preparing assets for deployment...

set "DIST_DIR=Personal Portfolio\Personal Portfolio\dist"
set "SOURCE_DIR=%~dp0"

REM Check if dist directory exists
if not exist "%DIST_DIR%" (
    echo ❌ Error: %DIST_DIR% directory not found!
    exit /b 1
)

echo Copying assets to %DIST_DIR%...

REM Copy images
if exist "%SOURCE_DIR%hero-bg.png" (
    copy "%SOURCE_DIR%hero-bg.png" "%DIST_DIR%\" >nul && echo ✅ hero-bg.png copied
)
if exist "%SOURCE_DIR%about-photo.png" (
    copy "%SOURCE_DIR%about-photo.png" "%DIST_DIR%\" >nul && echo ✅ about-photo.png copied
)
if exist "%SOURCE_DIR%Updated_Resume_page-0001.jpg" (
    copy "%SOURCE_DIR%Updated_Resume_page-0001.jpg" "%DIST_DIR%\" >nul && echo ✅ Resume copied
)
if exist "%SOURCE_DIR%web-development1.jpg" (
    copy "%SOURCE_DIR%web-development1.jpg" "%DIST_DIR%\" >nul && echo ✅ web-development1.jpg copied
)
if exist "%SOURCE_DIR%IMG_20241111_144910.png" (
    copy "%SOURCE_DIR%IMG_20241111_144910.png" "%DIST_DIR%\" >nul && echo ✅ IMG_20241111_144910.png copied
)
if exist "%SOURCE_DIR%7e3aaade-4be8-47a8-aa6c-fe6f0c220316-cover.png" (
    copy "%SOURCE_DIR%7e3aaade-4be8-47a8-aa6c-fe6f0c220316-cover.png" "%DIST_DIR%\" >nul && echo ✅ Cover image copied
)

REM Copy JavaScript
if exist "%SOURCE_DIR%main.js" (
    copy "%SOURCE_DIR%main.js" "%DIST_DIR%\" >nul && echo ✅ main.js copied
)

echo.
echo ✅ Asset preparation complete!
echo 📋 Files in dist folder:
dir "%DIST_DIR%"

