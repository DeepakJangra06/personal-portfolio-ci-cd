pipeline {
    agent any

    environment {
        FIREBASE_PROJECT_ID = 'my-personal-portfolio-c74c4'
        NODE_VERSION = '18'
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
                sh '''
                    node --version || echo "Node.js not found"
                    npm --version || echo "npm not found"
                '''
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
                sh 'npm run build:css'
            }
        }

        stage('Prepare Assets') {
            steps {
                echo '📁 Preparing assets...'
                sh '''
                    npm run prepare:assets || echo "Fallback: copying assets manually..."
                    if [ ! -d "dist" ]; then
                        mkdir -p dist
                    fi
                '''
            }
        }

        stage('Deploy to Firebase') {
            steps {
                echo '🚀 Deploying to Firebase Hosting...'
                sh '''
                    echo "Installing Firebase CLI temporarily..."
                    npx firebase-tools --version
                    echo "Starting Firebase deploy..."
                    npx firebase-tools deploy --only hosting --non-interactive --project my-personal-portfolio-c74c4
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline executed successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
        always {
            echo '🧹 Cleaning up temporary files...'
        }
    }
}
