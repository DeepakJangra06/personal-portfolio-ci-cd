#!/usr/bin/env node

/**
 * Asset preparation script for CI/CD
 * Copies all required assets to the dist folder
 */

const fs = require('fs');
const path = require('path');

// Try multiple possible paths (handle different directory structures)
let DIST_DIR = path.join(__dirname, 'Personal Portfolio', 'Personal Portfolio', 'dist');
if (!fs.existsSync(DIST_DIR)) {
    DIST_DIR = path.join(__dirname, 'Personal Portfolio', 'dist');
}
if (!fs.existsSync(DIST_DIR)) {
    DIST_DIR = path.join(__dirname, 'dist');
}

const SOURCE_DIR = __dirname;

const assets = [
    'hero-bg.png',
    'about-photo.png',
    'Updated_Resume_page-0001.jpg',
    'web-development1.jpg',
    'IMG_20241111_144910.png',
    '7e3aaade-4be8-47a8-aa6c-fe6f0c220316-cover.png',
    'main.js'
];

console.log('📁 Preparing assets for deployment...\n');
console.log(`Looking for dist directory: ${DIST_DIR}`);

// Check if dist directory exists
if (!fs.existsSync(DIST_DIR)) {
    console.error(`❌ Error: ${DIST_DIR} directory not found!`);
    console.error('Please ensure the dist folder exists at one of these locations:');
    console.error('  - Personal Portfolio/Personal Portfolio/dist');
    console.error('  - Personal Portfolio/dist');
    console.error('  - dist');
    process.exit(1);
}

console.log(`✅ Found dist directory: ${DIST_DIR}\n`);

let copiedCount = 0;
let skippedCount = 0;

// Copy assets
assets.forEach(asset => {
    const sourcePath = path.join(SOURCE_DIR, asset);
    const destPath = path.join(DIST_DIR, asset);
    
    if (fs.existsSync(sourcePath)) {
        try {
            fs.copyFileSync(sourcePath, destPath);
            console.log(`✅ ${asset} copied`);
            copiedCount++;
        } catch (error) {
            console.error(`❌ Error copying ${asset}:`, error.message);
        }
    } else {
        console.log(`⚠️  ${asset} not found, skipping...`);
        skippedCount++;
    }
});

console.log(`\n✅ Asset preparation complete!`);
console.log(`📊 Summary: ${copiedCount} copied, ${skippedCount} skipped`);
console.log(`📋 Files in dist folder:`);

// List files in dist
try {
    const files = fs.readdirSync(DIST_DIR);
    files.forEach(file => {
        const filePath = path.join(DIST_DIR, file);
        const stats = fs.statSync(filePath);
        const size = (stats.size / 1024).toFixed(2);
        console.log(`   ${file} (${size} KB)`);
    });
} catch (error) {
    console.error('Error listing files:', error.message);
}
