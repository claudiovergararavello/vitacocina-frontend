pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
                sh 'ls'
                sh 'cd build'
                sh 'ls'
            }
        }
        stage('S3 Upload') {
            steps {
                withAWS(region: 'us-east-1', credentials: '5e591c69-642d-4cb0-8fc7-042f10dee410') {
                    sh 'ls -la build'
                    sh 'aws s3 cp build s3://vitacocina-jenkins/ --recursive'
                }
            }
        }
    }
}