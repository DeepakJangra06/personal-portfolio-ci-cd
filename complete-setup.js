#!/usr/bin/env node

/**
 * Complete Setup Script
 * Automates the setup process for CI/CD pipeline
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}

console.log('🚀 CI/CD Pipeline Complete Setup\n');
console.log('This script will guide you through the complete setup process.\n');

async function setup() {
    // Step 1: Get Firebase Project ID
    console.log('═══════════════════════════════════════');
    console.log('Step 1: Firebase Configuration');
    console.log('═══════════════════════════════════════\n');
    
    console.log('Please get your Firebase Project ID from:');
    console.log('https://console.firebase.google.com/');
    console.log('1. Select your project');
    console.log('2. Click Settings → Project Settings');
    console.log('3. Copy the Project ID\n');
    
    const projectId = await question('Enter your Firebase Project ID (or press Enter to skip): ');
    
    if (projectId && projectId.trim() && projectId !== 'your-firebase-project-id') {
        try {
            let jenkinsfile = fs.readFileSync('Jenkinsfile', 'utf8');
            jenkinsfile = jenkinsfile.replace(
                /FIREBASE_PROJECT_ID = 'your-firebase-project-id'/g,
                `FIREBASE_PROJECT_ID = '${projectId.trim()}'`
            );
            fs.writeFileSync('Jenkinsfile', jenkinsfile);
            console.log('✅ Firebase Project ID updated in Jenkinsfile\n');
        } catch (error) {
            console.log('⚠️  Could not update Jenkinsfile:', error.message);
            console.log('Please update it manually.\n');
        }
    } else {
        console.log('⚠️  Skipping Firebase Project ID update.');
        console.log('Please update Jenkinsfile manually before deployment.\n');
    }
    
    // Step 2: Test build
    console.log('═══════════════════════════════════════');
    console.log('Step 2: Testing Build Process');
    console.log('═══════════════════════════════════════\n');
    
    const testBuild = await question('Would you like to test the build process now? (y/n): ');
    
    if (testBuild.toLowerCase() === 'y') {
        console.log('\n📦 Running build...\n');
        const { execSync } = require('child_process');
        
        try {
            console.log('Building CSS...');
            execSync('npm run build:css', { stdio: 'inherit' });
            
            console.log('\nPreparing assets...');
            execSync('npm run prepare:assets', { stdio: 'inherit' });
            
            console.log('\n✅ Build test completed successfully!\n');
        } catch (error) {
            console.log('\n❌ Build test failed. Please check the errors above.\n');
        }
    } else {
        console.log('Skipping build test. You can run it later with: npm run build\n');
    }
    
    // Step 3: Git setup
    console.log('═══════════════════════════════════════');
    console.log('Step 3: Git Repository Setup');
    console.log('═══════════════════════════════════════\n');
    
    const setupGit = await question('Would you like to initialize Git repository? (y/n): ');
    
    if (setupGit.toLowerCase() === 'y') {
        const { execSync } = require('child_process');
        
        try {
            // Check if already a git repo
            try {
                execSync('git rev-parse --git-dir', { stdio: 'ignore' });
                console.log('✅ Git repository already initialized\n');
            } catch {
                console.log('Initializing Git repository...');
                execSync('git init', { stdio: 'inherit' });
                console.log('✅ Git repository initialized\n');
            }
            
            // Create .gitignore if not exists
            if (!fs.existsSync('.gitignore')) {
                const gitignore = `node_modules/
.firebase/
dist/
*.log
.DS_Store
.env
.env.local
`;
                fs.writeFileSync('.gitignore', gitignore);
                console.log('✅ Created .gitignore file\n');
            }
            
            console.log('📝 Next steps for Git:');
            console.log('  1. git add .');
            console.log('  2. git commit -m "Initial commit with CI/CD pipeline"');
            console.log('  3. Create repository on GitHub/GitLab/Bitbucket');
            console.log('  4. git remote add origin <your-repo-url>');
            console.log('  5. git push -u origin main\n');
        } catch (error) {
            console.log('⚠️  Git setup encountered an error:', error.message);
            console.log('Please set up Git manually.\n');
        }
    } else {
        console.log('Skipping Git setup.\n');
    }
    
    // Step 4: Summary
    console.log('═══════════════════════════════════════');
    console.log('Setup Summary');
    console.log('═══════════════════════════════════════\n');
    
    console.log('✅ Setup script completed!\n');
    console.log('📋 Next Steps:');
    console.log('  1. Review setup-checklist.md for detailed instructions');
    console.log('  2. Set up Jenkins server (see JENKINS_SETUP.md)');
    console.log('  3. Create Jenkins pipeline job');
    console.log('  4. Run your first build!\n');
    
    console.log('📚 Documentation:');
    console.log('  - QUICK_START.md - Quick 5-minute setup guide');
    console.log('  - JENKINS_SETUP.md - Detailed Jenkins configuration');
    console.log('  - setup-checklist.md - Complete step-by-step checklist');
    console.log('  - CI_CD_OVERVIEW.md - Pipeline architecture overview\n');
    
    console.log('🎉 You\'re ready to deploy! Good luck!\n');
    
    rl.close();
}

setup().catch(error => {
    console.error('Error during setup:', error);
    rl.close();
    process.exit(1);
});

