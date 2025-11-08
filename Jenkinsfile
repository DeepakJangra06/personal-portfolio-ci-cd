pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
        FIREBASE_TOKEN = credentials('firebase-token')
    }

    stages {
        stage('Checkout') {
            steps {
                echo '📦 Checking out source code...'
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[url: 'https://github.com/DeepakJangra06/personal-portfolio-ci-cd.git']]
                ])
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
                sh '''
                    echo "Building Tailwind CSS for production..."
                    npx tailwindcss -i ./src/input.css -o ./dist/output.css --minify
                    echo "✅ Tailwind CSS built successfully!"
                '''
            }
        }

        stage('Prepare Assets') {
            steps {
                echo '🧰 Preparing assets...'
                sh '''
                    mkdir -p dist
                    cp -r ./public/* ./dist/ || true
                    echo "Assets copied to dist folder."
                '''
            }
        }

        stage('Deploy to Firebase') {
            steps {
                echo '🚀 Deploying to Firebase Hosting...'
                withCredentials([string(credentialsId: 'FIREBASE_TOKEN', variable: 'FIREBASE_TOKEN')]) {
                    sh '''
                        echo "Starting Firebase deployment..."
                        npx firebase deploy --only hosting --token "$FIREBASE_TOKEN"
                        echo "✅ Firebase deployment completed!"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
        always {
            echo '🧹 Cleaning up temporary files...'
        }
    }
}
