#!/usr/bin/env node

/**
 * Setup Verification Script
 * Verifies all components are ready for CI/CD deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Verifying CI/CD Setup...\n');

let allChecksPassed = true;
const checks = [];

// Check 1: Verify required files exist
function checkFiles() {
    console.log('📁 Checking required files...');
    const requiredFiles = [
        'Jenkinsfile',
        'package.json',
        'firebase.json',
        'prepare-assets.js',
        'prepare-assets.sh',
        'prepare-assets.bat',
        'Personal Portfolio/dist/index.html'
    ];
    
    requiredFiles.forEach(file => {
        if (fs.existsSync(file)) {
            console.log(`  ✅ ${file}`);
            checks.push({ name: file, status: 'pass' });
        } else {
            console.log(`  ❌ ${file} - MISSING`);
            checks.push({ name: file, status: 'fail' });
            allChecksPassed = false;
        }
    });
    console.log('');
}

// Check 2: Verify Firebase Project ID
function checkFirebaseConfig() {
    console.log('🔥 Checking Firebase configuration...');
    try {
        const jenkinsfile = fs.readFileSync('Jenkinsfile', 'utf8');
        if (jenkinsfile.includes('your-firebase-project-id')) {
            console.log('  ⚠️  Firebase Project ID not updated in Jenkinsfile');
            console.log('  📝 Please update FIREBASE_PROJECT_ID in Jenkinsfile');
            checks.push({ name: 'Firebase Project ID', status: 'warning' });
        } else {
            console.log('  ✅ Firebase Project ID configured');
            checks.push({ name: 'Firebase Project ID', status: 'pass' });
        }
    } catch (error) {
        console.log('  ❌ Could not read Jenkinsfile');
        checks.push({ name: 'Firebase Project ID', status: 'fail' });
        allChecksPassed = false;
    }
    console.log('');
}

// Check 3: Verify npm scripts
function checkNpmScripts() {
    console.log('📦 Checking npm scripts...');
    try {
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        const requiredScripts = ['build', 'build:css', 'prepare:assets', 'deploy:firebase', 'deploy'];
        
        requiredScripts.forEach(script => {
            if (packageJson.scripts && packageJson.scripts[script]) {
                console.log(`  ✅ npm run ${script}`);
                checks.push({ name: `npm run ${script}`, status: 'pass' });
            } else {
                console.log(`  ❌ npm run ${script} - MISSING`);
                checks.push({ name: `npm run ${script}`, status: 'fail' });
                allChecksPassed = false;
            }
        });
    } catch (error) {
        console.log('  ❌ Could not read package.json');
        checks.push({ name: 'npm scripts', status: 'fail' });
        allChecksPassed = false;
    }
    console.log('');
}

// Check 4: Verify dist folder and assets
function checkDistFolder() {
    console.log('📂 Checking dist folder...');
    // Try multiple possible paths
    let distPath = 'Personal Portfolio/Personal Portfolio/dist';
    if (!fs.existsSync(distPath)) {
        distPath = 'Personal Portfolio/dist';
    }
    
    if (fs.existsSync(distPath)) {
        console.log(`  ✅ ${distPath} exists`);
        
        const requiredAssets = [
            'index.html',
            'output.css',
            'hero-bg.png',
            'about-photo.png',
            'main.js'
        ];
        
        requiredAssets.forEach(asset => {
            const assetPath = path.join(distPath, asset);
            if (fs.existsSync(assetPath)) {
                console.log(`  ✅ ${asset}`);
                checks.push({ name: `dist/${asset}`, status: 'pass' });
            } else {
                console.log(`  ⚠️  ${asset} - Run: npm run prepare:assets`);
                checks.push({ name: `dist/${asset}`, status: 'warning' });
            }
        });
    } else {
        console.log(`  ❌ ${distPath} not found`);
        checks.push({ name: 'dist folder', status: 'fail' });
        allChecksPassed = false;
    }
    console.log('');
}

// Check 5: Verify Node.js and npm
function checkNode() {
    console.log('🔧 Checking Node.js environment...');
    try {
        const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
        console.log(`  ✅ Node.js: ${nodeVersion}`);
        checks.push({ name: 'Node.js', status: 'pass' });
        
        const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
        console.log(`  ✅ npm: ${npmVersion}`);
        checks.push({ name: 'npm', status: 'pass' });
    } catch (error) {
        console.log('  ❌ Node.js or npm not found');
        checks.push({ name: 'Node.js', status: 'fail' });
        allChecksPassed = false;
    }
    console.log('');
}

// Check 6: Verify Firebase CLI (optional)
function checkFirebaseCLI() {
    console.log('🔥 Checking Firebase CLI...');
    try {
        const firebaseVersion = execSync('firebase --version', { encoding: 'utf8' }).trim();
        console.log(`  ✅ Firebase CLI: ${firebaseVersion}`);
        checks.push({ name: 'Firebase CLI', status: 'pass' });
    } catch (error) {
        console.log('  ⚠️  Firebase CLI not installed (will be installed during pipeline)');
        checks.push({ name: 'Firebase CLI', status: 'warning' });
    }
    console.log('');
}

// Check 7: Verify Git repository
function checkGit() {
    console.log('📦 Checking Git repository...');
    try {
        execSync('git --version', { encoding: 'utf8' });
        console.log('  ✅ Git is installed');
        checks.push({ name: 'Git', status: 'pass' });
        
        try {
            const gitRemote = execSync('git remote -v', { encoding: 'utf8' });
            if (gitRemote.trim()) {
                console.log('  ✅ Git remote configured');
                checks.push({ name: 'Git remote', status: 'pass' });
            } else {
                console.log('  ⚠️  No Git remote configured');
                checks.push({ name: 'Git remote', status: 'warning' });
            }
        } catch (error) {
            console.log('  ⚠️  Not a Git repository or no remote configured');
            checks.push({ name: 'Git remote', status: 'warning' });
        }
    } catch (error) {
        console.log('  ❌ Git not found');
        checks.push({ name: 'Git', status: 'fail' });
        allChecksPassed = false;
    }
    console.log('');
}

// Run all checks
checkFiles();
checkFirebaseConfig();
checkNpmScripts();
checkDistFolder();
checkNode();
checkFirebaseCLI();
checkGit();

// Summary
console.log('📊 Summary:');
console.log('═══════════════════════════════════════');

const passed = checks.filter(c => c.status === 'pass').length;
const warnings = checks.filter(c => c.status === 'warning').length;
const failed = checks.filter(c => c.status === 'fail').length;

console.log(`✅ Passed: ${passed}`);
console.log(`⚠️  Warnings: ${warnings}`);
console.log(`❌ Failed: ${failed}`);
console.log('═══════════════════════════════════════\n');

if (allChecksPassed && warnings === 0) {
    console.log('🎉 All checks passed! Your setup is ready for CI/CD!');
    console.log('\n📝 Next steps:');
    console.log('  1. Update Firebase Project ID in Jenkinsfile');
    console.log('  2. Push code to Git repository');
    console.log('  3. Set up Jenkins pipeline');
    console.log('  4. Run your first build!');
    process.exit(0);
} else if (allChecksPassed) {
    console.log('✅ Core checks passed! Some warnings noted above.');
    console.log('\n📝 Please address warnings before proceeding.');
    process.exit(0);
} else {
    console.log('❌ Some checks failed. Please fix the issues above.');
    console.log('\n📝 Refer to setup-checklist.md for detailed instructions.');
    process.exit(1);
}

