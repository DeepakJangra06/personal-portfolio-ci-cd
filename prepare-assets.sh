#!/bin/bash

# Script to prepare assets for deployment
# This script copies all required assets to the dist folder

echo "📁 Preparing assets for deployment..."

DIST_DIR="Personal Portfolio/Personal Portfolio/dist"
SOURCE_DIR="."

# Check if dist directory exists
if [ ! -d "$DIST_DIR" ]; then
    echo "❌ Error: $DIST_DIR directory not found!"
    exit 1
fi

# Copy assets
echo "Copying assets to $DIST_DIR..."

# Copy images
[ -f "$SOURCE_DIR/hero-bg.png" ] && cp "$SOURCE_DIR/hero-bg.png" "$DIST_DIR/" && echo "✅ hero-bg.png copied"
[ -f "$SOURCE_DIR/about-photo.png" ] && cp "$SOURCE_DIR/about-photo.png" "$DIST_DIR/" && echo "✅ about-photo.png copied"
[ -f "$SOURCE_DIR/Updated_Resume_page-0001.jpg" ] && cp "$SOURCE_DIR/Updated_Resume_page-0001.jpg" "$DIST_DIR/" && echo "✅ Resume copied"
[ -f "$SOURCE_DIR/web-development1.jpg" ] && cp "$SOURCE_DIR/web-development1.jpg" "$DIST_DIR/" && echo "✅ web-development1.jpg copied"
[ -f "$SOURCE_DIR/IMG_20241111_144910.png" ] && cp "$SOURCE_DIR/IMG_20241111_144910.png" "$DIST_DIR/" && echo "✅ IMG_20241111_144910.png copied"
[ -f "$SOURCE_DIR/7e3aaade-4be8-47a8-aa6c-fe6f0c220316-cover.png" ] && cp "$SOURCE_DIR/7e3aaade-4be8-47a8-aa6c-fe6f0c220316-cover.png" "$DIST_DIR/" && echo "✅ Cover image copied"

# Copy JavaScript
[ -f "$SOURCE_DIR/main.js" ] && cp "$SOURCE_DIR/main.js" "$DIST_DIR/" && echo "✅ main.js copied"

echo ""
echo "✅ Asset preparation complete!"
echo "📋 Files in dist folder:"
ls -lh "$DIST_DIR"

