# Portfolio Deployment Guide

## Quick Deployment Options

### 1. GitHub Pages (Free)
1. Create a GitHub repository
2. Upload your files to the repository
3. Go to Settings > Pages
4. Select source branch (usually `main`)
5. Your site will be live at `https://yourusername.github.io/repository-name`

### 2. Netlify (Free)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `dist` folder
3. Your site will be live instantly
4. You can connect to GitHub for automatic deployments

### 3. Vercel (Free)
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Deploy with one click
4. Automatic deployments on code changes

### 4. Firebase Hosting (Free)
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Run `firebase init hosting`
3. Select your `dist` folder as public directory
4. Run `firebase deploy`

## Mobile Optimization Features Added

✅ **Responsive Design**
- Mobile-first approach
- Hamburger menu for mobile navigation
- Optimized typography for different screen sizes
- Touch-friendly buttons and links

✅ **Performance Optimizations**
- Optimized images
- Efficient CSS and JavaScript
- Fast loading times

✅ **Cross-Device Compatibility**
- Works on all screen sizes (320px to 1920px+)
- Touch gestures support
- Mobile-friendly interactions

## File Structure for Deployment
```
dist/
├── index1.html (main file)
├── output.css
├── Deepak_Jangra_Resume.pdf
└── images/
```

## Quick Start Commands
```bash
# For Firebase
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy

# For Netlify (if using CLI)
npm install -g netlify-cli
netlify deploy
netlify deploy --prod
```




