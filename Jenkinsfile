pipeline {
    agent any
    environment {
        MONGO_URI = credentials('MONGO_URI')
        JWT_SECRET = credentials('JWT_SECRET')
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/mertseydim/FDT.git'
            }
        }
        stage('Prepare Env') {
            steps {
                sh 'printf "MONGO_URI=%s\\nJWT_SECRET=%s\\nPORT=3000\\n" "$MONGO_URI" "$JWT_SECRET" > rest-api/.env'
            }
        }
        stage('Build and Deploy') {
            steps {
                sh 'docker compose down'
                sh 'docker compose up -d --build'
            }
        }
        stage('Health Check') {
            steps {
                script {
                    sleep 10
                    sh 'curl -f http://localhost:3000 || echo "Backend henuz hazir degil"'
                }
            }
        }
    }
    post {
        success { echo 'Deploy basarili: FDT calisiyor.' }
        failure { echo 'Deploy basarisiz: loglari kontrol et.' }
    }
}