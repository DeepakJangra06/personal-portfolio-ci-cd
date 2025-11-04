@echo off
echo ========================================
echo   Push Code to GitHub Repository
echo ========================================
echo.
echo Please provide your GitHub repository URL.
echo.
echo Example: https://github.com/username/repository-name.git
echo.

set /p REPO_URL="Enter your GitHub repository URL: "

if "%REPO_URL%"=="" (
    echo.
    echo Error: Repository URL cannot be empty!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Setting up remote repository...
echo ========================================
echo.

REM Check if remote already exists
git remote get-url origin >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Remote 'origin' already exists. Updating...
    git remote set-url origin "%REPO_URL%"
) else (
    echo Adding remote 'origin'...
    git remote add origin "%REPO_URL%"
)

echo.
echo Renaming branch to 'main'...
git branch -M main

echo.
echo ========================================
echo   Pushing code to GitHub...
echo ========================================
echo.
echo NOTE: You will be prompted for:
echo   - Username: Your GitHub username
echo   - Password: Use a Personal Access Token (not your password)
echo.
echo If you need a token:
echo   https://github.com/settings/tokens
echo.
echo Press any key to continue...
pause >nul

echo.
echo Pushing to GitHub...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   SUCCESS! Code pushed to GitHub!
    echo ========================================
    echo.
    echo Your code is now on GitHub!
    echo Next step: Set up Jenkins (see STEP_BY_STEP_GUIDE.md)
    echo.
) else (
    echo.
    echo ========================================
    echo   PUSH FAILED
    echo ========================================
    echo.
    echo Possible issues:
    echo 1. Authentication failed
    echo    - Make sure you're using Personal Access Token
    echo    - Get token: https://github.com/settings/tokens
    echo.
    echo 2. Repository URL incorrect
    echo    - Verify the URL is correct
    echo    - Make sure repository exists on GitHub
    echo.
    echo 3. Network issue
    echo    - Check your internet connection
    echo.
)

pause

