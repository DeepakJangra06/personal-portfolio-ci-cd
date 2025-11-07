pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
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
                    node --version
                    npm --version
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
                    npm run prepare:assets
                    if [ ! -d dist ]; then
                        mkdir -p dist
                    fi
                '''
            }
        }

        stage('Deploy to Firebase') {
            steps {
                echo '🚀 Deploying to Firebase Hosting...'
                withCredentials([string(credentialsId: 'FIREBASE_TOKEN', variable: 'FIREBASE_TOKEN')]) {
                    sh '''
                        echo "Installing Firebase CLI temporarily..."
                        npx firebase-tools --version
                        echo "Starting Firebase deploy..."
                        npx firebase-tools deploy --only hosting --non-interactive --token "$FIREBASE_TOKEN" --project my-personal-portfolio-c74c4
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful! Your portfolio is live 🎉'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
        always {
            echo '🧹 Cleaning up temporary files...'
        }
    }
}
