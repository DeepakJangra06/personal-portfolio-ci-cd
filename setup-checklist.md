# Complete Setup Checklist

Follow these steps in order to complete your CI/CD pipeline project.

## ✅ Pre-Setup Verification

- [x] **Project Structure Verified**
  - All files are in place
  - Asset preparation script tested and working
  - Build scripts configured

## 📋 Step-by-Step Setup

### Step 1: Firebase Configuration

1. **Get Firebase Project ID**
   - [ ] Go to [Firebase Console](https://console.firebase.google.com/)
   - [ ] Select your project (or create a new one)
   - [ ] Click Settings (gear icon) → Project Settings
   - [ ] Copy the **Project ID** (not Project Number)

2. **Update Jenkinsfile**
   - [ ] Open `Jenkinsfile`
   - [ ] Find line: `FIREBASE_PROJECT_ID = 'your-firebase-project-id'`
   - [ ] Replace with your actual Firebase project ID
   - [ ] Save the file

3. **Verify Firebase Setup**
   - [ ] Run: `firebase login` (if not already logged in)
   - [ ] Run: `firebase projects:list` (verify project access)
   - [ ] Run: `firebase use <your-project-id>` (set active project)

### Step 2: Local Build Test

1. **Test Asset Preparation**
   ```bash
   npm run prepare:assets
   ```
   - [ ] Verify all assets copied successfully
   - [ ] Check dist folder has all required files

2. **Test CSS Build**
   ```bash
   npm run build:css
   ```
   - [ ] Verify output.css is generated
   - [ ] Check file size (should be minified)

3. **Test Full Build**
   ```bash
   npm run build
   ```
   - [ ] Verify both CSS build and asset preparation work
   - [ ] Check dist folder is complete

4. **Test Local Deployment (Optional)**
   ```bash
   npm run deploy:firebase
   ```
   - [ ] Verify deployment succeeds
   - [ ] Visit Firebase Hosting URL
   - [ ] Check all images and assets load correctly

### Step 3: Git Repository Setup

1. **Initialize Git (if not already done)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit with CI/CD pipeline"
   ```

2. **Create .gitignore** (if not exists)
   - [ ] Create `.gitignore` file
   - [ ] Add: `node_modules/`, `.firebase/`, `dist/` (if you don't want to track dist)
   - [ ] Commit: `git add .gitignore && git commit -m "Add .gitignore"`

3. **Push to Remote Repository**
   - [ ] Create repository on GitHub/GitLab/Bitbucket
   - [ ] Add remote: `git remote add origin <your-repo-url>`
   - [ ] Push: `git push -u origin main` (or `master`)

### Step 4: Jenkins Installation & Setup

1. **Install Jenkins**
   - [ ] Download Jenkins from https://www.jenkins.io/download/
   - [ ] Install and start Jenkins
   - [ ] Complete initial setup (unlock, install plugins)
   - [ ] Create admin user

2. **Install Required Plugins**
   - [ ] Go to: Manage Jenkins → Plugins
   - [ ] Install: **NodeJS Plugin**
   - [ ] Install: **Pipeline Plugin** (usually pre-installed)
   - [ ] Install: **Git Plugin** (usually pre-installed)
   - [ ] Restart Jenkins if required

3. **Configure Node.js**
   - [ ] Go to: Manage Jenkins → Global Tool Configuration
   - [ ] Find **NodeJS** section
   - [ ] Click **Add NodeJS**
   - [ ] Name: `NodeJS-18`
   - [ ] Version: Select `18.x` or latest LTS
   - [ ] Click **Save**

### Step 5: Create Jenkins Pipeline

1. **Create New Pipeline Job**
   - [ ] Click **New Item** in Jenkins
   - [ ] Name: `Personal-Portfolio-CI-CD`
   - [ ] Select **Pipeline**
   - [ ] Click **OK**

2. **Configure Pipeline**
   - [ ] Scroll to **Pipeline** section
   - [ ] Definition: **Pipeline script from SCM**
   - [ ] SCM: **Git**
   - [ ] Repository URL: Your Git repository URL
   - [ ] Credentials: Add if repository is private
   - [ ] Branch: `*/main` (or `*/master`)
   - [ ] Script Path: `Jenkinsfile`
   - [ ] Click **Save**

3. **Test Pipeline**
   - [ ] Click **Build Now**
   - [ ] Watch console output
   - [ ] Verify all stages complete successfully
   - [ ] Check Firebase deployment URL

### Step 6: Configure Automatic Builds (Optional but Recommended)

1. **GitHub Webhook Setup** (if using GitHub)
   - [ ] Go to your GitHub repository
   - [ ] Settings → Webhooks → Add webhook
   - [ ] Payload URL: `http://your-jenkins-url/github-webhook/`
   - [ ] Content type: `application/json`
   - [ ] Events: Select **Just the push event**
   - [ ] Click **Add webhook**

2. **Enable Webhook Trigger in Jenkins**
   - [ ] Edit your pipeline job
   - [ ] Build Triggers → Check **GitHub hook trigger for GITScm polling**
   - [ ] Save

3. **Test Automatic Build**
   - [ ] Make a small change to your code
   - [ ] Commit and push to repository
   - [ ] Verify Jenkins automatically starts a build
   - [ ] Check deployment completes

### Step 7: Verification & Testing

1. **Verify Deployment**
   - [ ] Visit Firebase Hosting URL
   - [ ] Check homepage loads correctly
   - [ ] Verify all images display
   - [ ] Test navigation links
   - [ ] Check mobile responsiveness
   - [ ] Verify JavaScript functionality

2. **Test Pipeline Stages**
   - [ ] Checkout stage completes
   - [ ] Node.js setup works
   - [ ] Dependencies install correctly
   - [ ] CSS builds successfully
   - [ ] Assets prepare correctly
   - [ ] Deployment succeeds

3. **Monitor Build History**
   - [ ] Check Jenkins build history
   - [ ] Verify build duration (~1-2 minutes)
   - [ ] Check for any warnings or errors

## 🎯 Final Verification

- [ ] All assets present in dist folder
- [ ] CSS compiled and minified
- [ ] HTML file references correct paths
- [ ] Firebase deployment successful
- [ ] Website accessible and functional
- [ ] Jenkins pipeline runs automatically on push
- [ ] Build notifications working (if configured)

## 📊 Success Criteria

Your project is complete when:
- ✅ Code pushed to Git triggers automatic build
- ✅ Jenkins pipeline executes all stages successfully
- ✅ Portfolio deploys to Firebase automatically
- ✅ Website is live and accessible
- ✅ All assets and styles load correctly

## 🆘 Troubleshooting

If you encounter issues, check:
1. **Firebase Project ID** is correct in Jenkinsfile
2. **Node.js** is configured in Jenkins
3. **Git repository** is accessible
4. **Firebase credentials** are set up
5. **Asset paths** are correct in dist folder
6. **Console output** in Jenkins for detailed errors

## 📚 Documentation Files

Reference these files for detailed information:
- `QUICK_START.md` - Quick 5-minute setup
- `JENKINS_SETUP.md` - Detailed Jenkins configuration
- `CI_CD_OVERVIEW.md` - Pipeline overview and architecture

---

**Congratulations! You now have a complete CI/CD pipeline! 🎉**

