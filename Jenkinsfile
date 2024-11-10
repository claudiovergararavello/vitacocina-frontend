pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'unset CI && npm install'
                sh 'unset CI && npm run build'
                sh 'ls -la build'
            }
        }
        stage('S3 Upload') {
            steps {
                withAWS(region: 'us-east-1', credentials: '050372a5-6b77-4393-8439-8baf423784df') {
                    sh 'aws s3 cp build s3://vitacocina-jenkins/ --recursive'
                }
            }
        }
    }
}
