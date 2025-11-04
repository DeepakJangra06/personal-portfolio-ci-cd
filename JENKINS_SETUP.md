# Jenkins CI/CD Pipeline Setup Guide

This guide will help you set up a complete CI/CD pipeline for your Personal Portfolio project using Jenkins.

## 📋 Prerequisites

1. **Jenkins Server** (installed and running)
   - Download from: https://www.jenkins.io/download/
   - Or use Docker: `docker run -p 8080:8080 jenkins/jenkins:lts`

2. **Node.js** (for building Tailwind CSS)
   - Version 18 or higher recommended
   - Install Node.js plugin in Jenkins: `Manage Jenkins > Plugins > NodeJS Plugin`

3. **Firebase CLI** (for deployment)
   - Will be installed automatically during pipeline execution

4. **Git Repository** (GitHub, GitLab, Bitbucket, etc.)
   - Your project should be in a Git repository

## 🚀 Step-by-Step Setup

### 1. Install Required Jenkins Plugins

Go to `Manage Jenkins > Plugins` and install:
- **NodeJS Plugin** (for Node.js support)
- **Pipeline** (usually pre-installed)
- **Git Plugin** (usually pre-installed)
- **Credentials Plugin** (usually pre-installed)

### 2. Configure Node.js in Jenkins

1. Go to `Manage Jenkins > Global Tool Configuration`
2. Find **NodeJS** section
3. Click **Add NodeJS**
4. Name: `NodeJS-18`
5. Version: Select `18.x` or latest LTS
6. Click **Save**

### 3. Configure Firebase Credentials (Optional but Recommended)

**Option A: Using Firebase Token (Recommended for CI/CD)**

1. Generate a Firebase token:
   ```bash
   firebase login:ci
   ```
   Copy the generated token.

2. In Jenkins:
   - Go to `Manage Jenkins > Credentials`
   - Click **Add Credentials**
   - Kind: **Secret text**
   - Secret: Paste your Firebase token
   - ID: `FIREBASE_TOKEN`
   - Description: `Firebase CI Token`
   - Click **OK**

**Option B: Using Firebase Login (Alternative)**

The pipeline can use `firebase login` interactively, but this is less ideal for automated CI/CD.

### 4. Update Firebase Project ID

Edit `Jenkinsfile` and update the `FIREBASE_PROJECT_ID` environment variable:

```groovy
environment {
    FIREBASE_PROJECT_ID = 'your-actual-firebase-project-id'
    NODE_VERSION = '18'
}
```

To find your Firebase project ID:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon > Project Settings
4. Your Project ID is displayed there

### 5. Create Jenkins Pipeline

**Option A: Pipeline from SCM (Recommended)**

1. In Jenkins, click **New Item**
2. Name: `Personal-Portfolio-CI-CD`
3. Select **Pipeline**
4. Click **OK**
5. In **Pipeline** section:
   - Definition: **Pipeline script from SCM**
   - SCM: **Git**
   - Repository URL: Your Git repository URL
   - Credentials: Add if repository is private
   - Branch: `*/main` or `*/master`
   - Script Path: `Jenkinsfile`
6. Click **Save**

**Option B: Pipeline Script (Direct)**

1. In Jenkins, click **New Item**
2. Name: `Personal-Portfolio-CI-CD`
3. Select **Pipeline**
4. Click **OK**
5. In **Pipeline** section:
   - Definition: **Pipeline script**
   - Paste the contents of `Jenkinsfile`
6. Click **Save**

### 6. Run Your First Build

1. Click on your pipeline job
2. Click **Build Now**
3. Watch the build progress in **Console Output**
4. Check the build stages:
   - ✅ Checkout
   - ✅ Setup Node.js
   - ✅ Install Dependencies
   - ✅ Build CSS
   - ✅ Prepare Assets
   - ✅ Deploy to Firebase

### 7. Verify Deployment

After successful build:
1. Check the build console for Firebase deployment URL
2. Visit the URL to verify your portfolio is live
3. Check Firebase Console > Hosting for deployment history

## 🔧 Pipeline Stages Explained

### Stage 1: Checkout
- Checks out your code from Git repository

### Stage 2: Setup Node.js
- Verifies Node.js is available
- Uses Node.js plugin if configured

### Stage 3: Install Dependencies
- Runs `npm install`
- Installs Tailwind CSS and other dependencies

### Stage 4: Build CSS
- Compiles Tailwind CSS using `npm run build:css`
- Outputs minified CSS to `dist/output.css`

### Stage 5: Prepare Assets
- Copies images, JavaScript, and other assets to `dist` folder
- Ensures all files are in place for deployment

### Stage 6: Deploy to Firebase
- Installs Firebase CLI globally
- Deploys to Firebase Hosting
- Your site goes live!

## 🔄 Triggering Builds

### Manual Trigger
- Click **Build Now** in Jenkins

### Automatic Triggers (Recommended)

1. **GitHub Webhook** (if using GitHub):
   - In Jenkins pipeline settings, enable **GitHub hook trigger for GITScm polling**
   - In GitHub repository: Settings > Webhooks > Add webhook
   - Payload URL: `http://your-jenkins-url/github-webhook/`
   - Content type: `application/json`
   - Events: Select **Just the push event**

2. **Poll SCM**:
   - In pipeline configuration, enable **Poll SCM**
   - Schedule: `H/5 * * * *` (every 5 minutes)

3. **Scheduled Builds**:
   - Use **Build periodically**
   - Schedule: `0 2 * * *` (daily at 2 AM)

## 📊 Monitoring & Notifications

### View Build History
- Click on your pipeline job
- View **Build History** on the left sidebar

### Build Status
- ✅ **Blue**: Success
- 🟡 **Yellow**: Unstable (warnings)
- 🔴 **Red**: Failed

### Console Output
- Click on any build number
- Click **Console Output** to see detailed logs

### Add Notifications (Optional)

Uncomment notification code in `Jenkinsfile` post section:

```groovy
post {
    success {
        slackSend color: 'good', message: "Portfolio deployed successfully!"
    }
    failure {
        slackSend color: 'danger', message: "Portfolio deployment failed!"
    }
}
```

## 🐛 Troubleshooting

### Issue: Node.js not found
**Solution**: Install and configure Node.js plugin in Jenkins

### Issue: Firebase deploy fails
**Solution**: 
- Check Firebase credentials are configured
- Verify Firebase project ID is correct
- Ensure Firebase CLI is installed: `npm install -g firebase-tools`

### Issue: Assets not found
**Solution**: 
- Check file paths in `prepare-assets.sh` script
- Verify all assets exist in the repository root

### Issue: Build fails on CSS compilation
**Solution**:
- Check Tailwind config file exists
- Verify input.css file path is correct
- Check npm dependencies are installed

## 🔒 Security Best Practices

1. **Never commit credentials** to Git
2. Use Jenkins **Credentials** for sensitive data
3. Use **Firebase tokens** instead of interactive login
4. Restrict Jenkins access with proper authentication
5. Use **Secrets Manager** for production environments

## 📚 Additional Resources

- [Jenkins Pipeline Documentation](https://www.jenkins.io/doc/book/pipeline/)
- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [Node.js Plugin Documentation](https://plugins.jenkins.io/nodejs/)

## 🎯 Next Steps

1. Set up automatic builds on Git push
2. Add email/Slack notifications
3. Add automated testing (if you add tests)
4. Set up staging and production environments
5. Add performance monitoring

---

**Happy Deploying! 🚀**

