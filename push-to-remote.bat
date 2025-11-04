@echo off
REM Script to push code to remote repository
REM Run this after creating your GitHub/GitLab/Bitbucket repository

echo ========================================
echo   Push Code to Remote Repository
echo ========================================
echo.

echo Please provide your repository URL.
echo Example: https://github.com/username/repository-name.git
echo.

set /p REPO_URL="Enter repository URL: "

if "%REO_URL%"=="" (
    echo Error: Repository URL cannot be empty!
    pause
    exit /b 1
)

echo.
echo Adding remote repository...
git remote add origin "%REPO_URL%"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Warning: Remote might already exist. Trying to update...
    git remote set-url origin "%REPO_URL%"
)

echo.
echo Renaming branch to 'main'...
git branch -M main

echo.
echo Pushing code to remote repository...
echo This may prompt for authentication (username/password or token)
echo.

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   SUCCESS! Code pushed to remote!
    echo ========================================
    echo.
    echo Next steps:
    echo 1. Verify your code is on GitHub/GitLab/Bitbucket
    echo 2. Follow STEP_BY_STEP_GUIDE.md for Jenkins setup
    echo.
) else (
    echo.
    echo ========================================
    echo   PUSH FAILED
    echo ========================================
    echo.
    echo Possible issues:
    echo 1. Authentication failed - check your credentials
    echo 2. Repository URL incorrect - verify the URL
    echo 3. Network issue - check your internet connection
    echo.
    echo For GitHub, you may need to use a Personal Access Token:
    echo https://github.com/settings/tokens
    echo.
)

pause

