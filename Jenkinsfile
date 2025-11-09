pipeline {
    agent any

    environment {
        FIREBASE_PROJECT_ID = 'personal-portfolio-7b1a4'   // 🔹 Your Firebase project ID
        FIREBASE_TOKEN = credentials('firebase-token')     // 🔹 Add your Firebase token in Jenkins credentials
        DEPLOY_BRANCH = 'main'                             // 🔹 Branch that triggers deployment
    }

    stages {
        stage('Checkout') {
            steps {
                echo "📦 Fetching latest code from GitHub repository..."
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "📦 Installing Node.js dependencies..."
                bat 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                echo "⚙️ Building portfolio project..."
                bat 'npm run build'
            }
        }

        stage('Deploy to Firebase Hosting') {
            steps {
                echo "🚀 Deploying project to Firebase Hosting..."
                bat """
                npx firebase deploy --project %FIREBASE_PROJECT_ID% --token %FIREBASE_TOKEN%
                """
            }
        }
    }

    post {
        success {
            echo "✅ Deployment completed successfully!"
        }
        failure {
            echo "❌ Deployment failed. Please check logs."
        }
    }
}

