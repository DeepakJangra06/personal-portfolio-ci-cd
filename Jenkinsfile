pipeline {
    agent any

    parameters {
        string(name: 'FIREBASE_PROJECT_ID', defaultValue: 'personal-portfolio-7b1a4', description: 'Firebase project ID')
        string(name: 'FIREBASE_TOKEN_CREDENTIALS_ID', defaultValue: 'firebase-token', description: 'Jenkins Credentials ID that stores your Firebase token')
        string(name: 'DEPLOY_BRANCH', defaultValue: 'main', description: 'Branch name that triggers deployment (multibranch only)')
    }

    environment {
        FIREBASE_PROJECT_ID = "${params.FIREBASE_PROJECT_ID}"
        DEPLOY_BRANCH = "${params.DEPLOY_BRANCH}"
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
                script {
                    if (isUnix()) {
                        sh 'npm install'
                    } else {
                        bat 'npm install'
                    }
                }
            }
        }

        stage('Build Project') {
            steps {
                echo "⚙️ Building portfolio project..."
                script {
                    if (isUnix()) {
                        sh 'npm run build'
                    } else {
                        bat 'npm run build'
                    }
                }
            }
        }

        stage('Deploy to Firebase Hosting') {
            when {
                anyOf {
                    // If this is not a multibranch pipeline, BRANCH_NAME may be empty → allow deploy
                    expression { return !env.BRANCH_NAME }
                    expression { return env.BRANCH_NAME == env.DEPLOY_BRANCH }
                }
            }
            steps {
                echo "🚀 Deploying project to Firebase Hosting..."
                withCredentials([string(credentialsId: params.FIREBASE_TOKEN_CREDENTIALS_ID, variable: 'FIREBASE_TOKEN')]) {
                    script {
                        if (isUnix()) {
                            sh 'npx firebase-tools deploy --project "$FIREBASE_PROJECT_ID" --token "$FIREBASE_TOKEN"'
                        } else {
                            bat 'npx firebase-tools deploy --project %FIREBASE_PROJECT_ID% --token %FIREBASE_TOKEN%'
                        }
                    }
                }
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

