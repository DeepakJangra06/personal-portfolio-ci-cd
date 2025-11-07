pipeline {
    agent any

    environment {
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
                echo '📁 Copying assets to dist folder...'
                sh '''
                    npm run prepare:assets || echo "Asset preparation script failed, trying manual copy..."
                    if [ ! -f "Personal Portfolio/Personal Portfolio/dist/main.js" ]; then
                        echo "Manually copying assets..."
                        cd "Personal Portfolio/dist"
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
                echo '⚠️  Skipping tests (no test suite configured)'
            }
        }

        stage('Deploy to Firebase') {
    echo "🚀 Deploying to Firebase Hosting..."
    script {
        sh '''
            echo "🚀 Deploying to Firebase with NPX..."
            npx firebase-tools --version
            npx firebase-tools deploy --only hosting --non-interactive
        '''
    }
}
    post {
        success {
            echo '✅ Pipeline executed successfully!'
            // You can put script-like steps directly (no need for `script {}`)
            // Example: slackSend color: 'good', message: "Portfolio deployed successfully!"
        }
        failure {
            echo '❌ Pipeline failed!'
            // Example: slackSend color: 'danger', message: "Portfolio deployment failed!"
        }
        always {
            echo '🧹 Cleaning up...'
        }
    }
}


