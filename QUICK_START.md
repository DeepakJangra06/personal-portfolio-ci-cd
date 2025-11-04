# Quick Start Guide - Jenkins CI/CD

## 🎯 Quick Setup (5 Minutes)

### 1. Prerequisites Checklist
- [ ] Jenkins server running
- [ ] Node.js installed (or Node.js plugin in Jenkins)
- [ ] Firebase project created
- [ ] Git repository with your code

### 2. One-Time Jenkins Configuration

1. **Install Node.js Plugin**:
   - Jenkins Dashboard → Manage Jenkins → Plugins
   - Search: "NodeJS"
   - Install without restart

2. **Configure Node.js**:
   - Manage Jenkins → Global Tool Configuration
   - Add Node.js (version 18+)
   - Save

3. **Get Firebase Project ID**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Settings → Project Settings
   - Copy **Project ID**

4. **Update Jenkinsfile**:
   - Open `Jenkinsfile`
   - Find: `FIREBASE_PROJECT_ID = 'your-firebase-project-id'`
   - Replace with your actual project ID

### 3. Create Pipeline in Jenkins

1. New Item → Pipeline
2. Name: `portfolio-deploy`
3. Pipeline → Definition: **Pipeline script from SCM**
4. SCM: **Git**
5. Repository URL: Your Git repo URL
6. Script Path: `Jenkinsfile`
7. Save

### 4. Run First Build

1. Click **Build Now**
2. Watch console output
3. Visit Firebase Hosting URL when complete

## 🚀 That's It!

Your pipeline will now:
1. ✅ Checkout code
2. ✅ Install dependencies
3. ✅ Build Tailwind CSS
4. ✅ Copy assets
5. ✅ Deploy to Firebase

## 🔄 Automatic Deployments

Enable automatic builds on Git push:

1. Pipeline settings → **Build Triggers**
2. Check **GitHub hook trigger for GITScm polling**
3. In GitHub: Settings → Webhooks → Add webhook
4. Payload URL: `http://your-jenkins-url/github-webhook/`
5. Save

Now every push to your repository will trigger an automatic deployment!

## 📝 Common Commands

```bash
# Local build (test before pushing)
npm run build

# Deploy manually
npm run deploy

# Preview locally
npm run preview
```

## 🆘 Need Help?

Check `JENKINS_SETUP.md` for detailed documentation.

