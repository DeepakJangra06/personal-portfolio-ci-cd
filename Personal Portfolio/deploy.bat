@echo off
echo Starting Portfolio Deployment...

echo.
echo Choose deployment method:
echo 1. Firebase Hosting
echo 2. Netlify (Manual Upload)
echo 3. GitHub Pages
echo.

set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo Deploying to Firebase...
    cd dist
    firebase deploy
    echo Deployment complete!
) else if "%choice%"=="2" (
    echo.
    echo For Netlify deployment:
    echo 1. Go to https://netlify.com
    echo 2. Drag and drop the 'dist' folder
    echo 3. Your site will be live instantly!
    echo.
    pause
) else if "%choice%"=="3" (
    echo.
    echo For GitHub Pages:
    echo 1. Create a new GitHub repository
    echo 2. Upload all files from 'dist' folder
    echo 3. Go to Settings > Pages
    echo 4. Select source branch and deploy
    echo.
    pause
) else (
    echo Invalid choice. Please run the script again.
)

echo.
echo Deployment guide created! Check deploy.md for detailed instructions.
pause




