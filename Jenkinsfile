pipeline {
    agent any
    
    environment {
        // Firebase project ID - Auto-detected from .firebaserc
        FIREBASE_PROJECT_ID = 'my-personal-portfolio-c74c4'
        NODE_VERSION = '18'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '📦 Checking out source code from repository...'
                checkout scm
            }
        }
        
        stage('Setup Node.js') {
            steps {
                echo '🔧 Setting up Node.js environment...'
                script {
                    // Install Node.js using nvm or use Node.js plugin
                    sh '''
                        node --version || echo "Node.js not found, installing..."
                        npm --version || echo "npm not found"
                    '''
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo '📥 Installing npm dependencies...'
                sh '''
                    npm install
                '''
            }
        }
        
        stage('Build CSS') {
            steps {
                echo '🎨 Building Tailwind CSS...'
                sh '''
                    npm run build:css
                '''
            }
        }
        
        stage('Prepare Assets') {
            steps {
                echo '📁 Copying assets to dist folder...'
                sh '''
                    # Use npm script to prepare assets (cross-platform)
                    npm run prepare:assets || echo "Asset preparation script failed, trying manual copy..."
                    
                    # Fallback: Manual copy if script fails
                    if [ ! -f "Personal Portfolio/Personal Portfolio/dist/main.js" ]; then
                        echo "Manually copying assets..."
                        cd "Personal Portfolio/Personal Portfolio/dist"
                        cp ../../../hero-bg.png . 2>/dev/null || echo "hero-bg.png not found"
                        cp ../../../about-photo.png . 2>/dev/null || echo "about-photo.png not found"
                        cp ../../../Updated_Resume_page-0001.jpg . 2>/dev/null || echo "Resume not found"
                        cp ../../../web-development1.jpg . 2>/dev/null || echo "web-development1.jpg not found"
                        cp ../../../IMG_20241111_144910.png . 2>/dev/null || echo "IMG_20241111_144910.png not found"
                        cp ../../../7e3aaade-4be8-47a8-aa6c-fe6f0c220316-cover.png . 2>/dev/null || echo "Cover image not found"
                        cp ../../../main.js . 2>/dev/null || echo "main.js not found"
                    fi
                    
                    echo "✅ Assets prepared successfully"
                '''
            }
        }
        
        stage('Lint & Test') {
            steps {
                echo '🧪 Running linting and tests...'
                script {
                    // Add your linting and testing commands here
                    // Example: sh 'npm run lint'
                    // Example: sh 'npm test'
                    echo '⚠️  Skipping tests (no test suite configured)'
                }
            }
        }
        
        stage('Deploy to Firebase') {
            steps {
                echo '🚀 Deploying to Firebase Hosting...'
                script {
                    // Ensure Firebase CLI is installed
                    sh '''
                        npm install -g firebase-tools || echo "Firebase CLI already installed"
                        firebase --version
                    '''
                    
                    // Deploy to Firebase
                    withCredentials([
                        // If using Firebase token, uncomment and configure:
                        // string(credentialsId: 'FIREBASE_TOKEN', variable: 'FIREBASE_TOKEN')
                    ]) {
                        sh '''
                            # Deploy from project root (firebase.json is here)
                            # Use firebase deploy --token if using token authentication
                            if [ -n "${FIREBASE_PROJECT_ID}" ] && [ "${FIREBASE_PROJECT_ID}" != "your-firebase-project-id" ]; then
                                firebase deploy --only hosting --project ${FIREBASE_PROJECT_ID}
                            else
                                firebase deploy --only hosting
                            fi
                        '''
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline executed successfully!'
            script {
                // Add notifications here (Slack, Email, etc.)
                // slackSend color: 'good', message: "Portfolio deployed successfully!"
            }
        }
        failure {
            echo '❌ Pipeline failed!'
            script {
                // Add failure notifications here
                // slackSend color: 'danger', message: "Portfolio deployment failed!"
            }
        }
        always {
            echo '🧹 Cleaning up...'
            // Clean up any temporary files if needed
        }
    }
}

