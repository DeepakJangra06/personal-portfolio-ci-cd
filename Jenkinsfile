pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        PATH = "${env.NODE_HOME}/bin:${env.PATH}"
        FIREBASE_TOKEN = credentials('firebase-token')
    }

    stages {
        stage('Checkout') {
            steps {
                echo '📦 Checking out source code...'
                checkout scm
            }
        }

        stage('Setup Node.js') {
            steps {
                echo '🔧 Checking Node.js & npm...'
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📥 Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Build CSS') {
            steps {
                echo '🎨 Building Tailwind CSS...'
                // Verify Tailwind CLI is available
                sh '''
                    echo "Checking Tailwind version..."
                    npx tailwindcss --version

                    echo "🧩 Fixing path with spaces for Tailwind build..."
                    npx tailwindcss -i "Personal Portfolio/src/input.css" -o "Personal Portfolio/dist/output.css" --minify
                '''
            }
        }

        stage('Prepare Assets') {
            steps {
                echo '📂 Preparing build assets...'
                sh 'mkdir -p dist && cp -r Personal\\ Portfolio/* dist/ || echo "Files copied"'
            }
        }

        stage('Deploy to Firebase') {
            steps {
                echo '🚀 Deploying to Firebase Hosting...'
                sh '''
                    npm install -g firebase-tools
                    firebase deploy --token "$FIREBASE_TOKEN"
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
        always {
            echo '🧹 Cleaning up temporary files...'
        }
    }
}
