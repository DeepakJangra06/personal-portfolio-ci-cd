# 🚀 Push Code to GitHub - Instructions

## ✅ Repository Created!

Now let's push your code to GitHub.

---

## 📋 Step 1: Get Your Repository URL

After creating the repository on GitHub, you should see a page with setup instructions.

**Copy the repository URL** - it looks like:
```
https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

**Where to find it:**
- On the repository page, click the green **Code** button
- Copy the HTTPS URL shown

---

## 📤 Step 2: Push Your Code

### Option A: Use the Helper Script (Easiest)

1. **Double-click** `push-to-remote.bat` in your project folder
2. **Paste** your repository URL when prompted
3. **Follow** the prompts

### Option B: Manual Commands

Open Command Prompt in this folder and run:

```bash
# Step 1: Add remote (replace with YOUR repository URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Step 2: Rename branch to main
git branch -M main

# Step 3: Push code
git push -u origin main
```

**Example** (if your username is "DeepakJangra06" and repo is "personal-portfolio-ci-cd"):
```bash
git remote add origin https://github.com/DeepakJangra06/personal-portfolio-ci-cd.git
git branch -M main
git push -u origin main
```

---

## 🔐 Step 3: Authentication

When you run `git push`, you'll be prompted for credentials:

**Username**: Your GitHub username

**Password**: 
- ⚠️ **DO NOT use your GitHub password**
- Use a **Personal Access Token** instead

### How to Create Personal Access Token:

1. **Go to**: https://github.com/settings/tokens
2. **Click**: "Generate new token" → "Generate new token (classic)"
3. **Name**: `CI/CD Pipeline` (or any name)
4. **Expiration**: Choose your preference (90 days recommended)
5. **Scopes**: Check **`repo`** (this gives full control of private repositories)
6. **Click**: "Generate token"
7. **Copy the token** - You'll only see it once!

**Important**: Save this token somewhere safe. You'll use it as your password when pushing.

---

## ✅ Step 4: Verify

After pushing successfully:

1. **Go to your GitHub repository page**
2. **Refresh the page**
3. **You should see all your files:**
   - Jenkinsfile
   - package.json
   - All documentation files
   - Source files
   - etc.

---

## 🆘 Troubleshooting

### Error: "remote origin already exists"
**Solution**: 
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### Error: "Authentication failed"
**Solution**: 
- Make sure you're using Personal Access Token, not password
- Verify token has `repo` scope
- Try generating a new token

### Error: "Permission denied"
**Solution**: 
- Verify repository URL is correct
- Check if repository is private and you have access
- Verify your GitHub username is correct

---

## 🎯 What Happens Next?

After successfully pushing:

1. ✅ Your code is on GitHub
2. ✅ Ready for Jenkins to access
3. ✅ Next step: Set up Jenkins (see STEP_BY_STEP_GUIDE.md)

---

**Ready to push?** Share your repository URL and I'll help you with the exact commands!

