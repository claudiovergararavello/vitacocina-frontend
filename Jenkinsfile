/*pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Instalando dependencias y construyendo la aplicación...'
                sh 'unset CI && npm install'
                sh 'unset CI && npm run build'
                sh 'ls -la build'
            }
        }
        stage('Run Selenium Tests') {
            steps {
                echo 'Ejecutando pruebas automatizadas de Selenium...'
                // Instalar dependencias necesarias para Selenium
                sh 'npm install'

                // Ejecutar todos los archivos de pruebas en TestSelenium
                sh 'for file in TestSelenium/*.js; do node $file || exit 1; done'
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
*/

pipeline {
    agent any
    environment {
        S3_BUCKET = 'vitacocina-jenkins'
        S3_BUCKET_BACKUP = 'vitacocina-jenkins-backup'
        S3_REGION = 'sa-east-1'
        BASE_URL = "http://vitacocina-jenkins.s3-website-sa-east-1.amazonaws.com/"
        SLACK_CHANNEL = '#equipo4'
        SLACK_CREDENTIALS = 'jY7WxOguKs3BrvgkB3ClDj2b'
    }
    stages {
        stage('Test Slack Notification') {
            steps {
                slackSend (
                    channel: '#general', // Cambia esto al canal deseado
                    color: 'good',
                    message: "🚀 Slack configurado correctamente desde Jenkins"
                )
            }
        }
        stage('Build') {
            steps {
                echo 'Instalando dependencias y construyendo la aplicación...'
                sh 'unset CI && npm install'
                sh 'unset CI && npm run build'
            }
        }
        stage('Backup Current Build') {
            steps {
                echo 'Respaldando el contenido actual del bucket S3...'
                withAWS(region: "${S3_REGION}", credentials: '050372a5-6b77-4393-8439-8baf423784df') {
                    sh "aws s3 sync s3://${S3_BUCKET}/ s3://${S3_BUCKET_BACKUP}/"
                }
            }
        }
        stage('Deploy to S3') {
            steps {
                echo 'Subiendo artefactos al bucket S3...'
                withAWS(region: "${S3_REGION}", credentials: '050372a5-6b77-4393-8439-8baf423784df') {
                    sh "aws s3 sync build/ s3://${S3_BUCKET}/"
                }
            }
        }
        stage('Run Selenium Tests') {
            steps {
                echo 'Ejecutando pruebas automatizadas de Selenium...'
                sh 'npm install'
                sh "BASE_URL=${BASE_URL} node TestSelenium/seleniumTest.js"
            }
        }
    }
    post {
        always {
            echo 'Pipeline completada, evaluando resultado...'
        }
        success {
            echo 'Despliegue y pruebas exitosas. Notificando a Slack...'
            slackSend (
                channel: "${SLACK_CHANNEL}",
                color: 'good',
                message: "🚀 Despliegue exitoso en *${S3_BUCKET}* y pruebas aprobadas. URL: ${BASE_URL}"
            )
        }
        failure {
            echo 'Error en la pipeline. Revirtiendo cambios y notificando a Slack...'
            withAWS(region: "${S3_REGION}", credentials: '050372a5-6b77-4393-8439-8baf423784df') {
                sh "aws s3 sync s3://${S3_BUCKET_BACKUP}/ s3://${S3_BUCKET}/"
            }
            slackSend (
                channel: "${SLACK_CHANNEL}",
                color: 'good',
                message: "🚀 Despliegue exitoso en *${S3_BUCKET}* y pruebas aprobadas. URL: ${BASE_URL}",
                tokenCredentialId: 'b8db963e-0600-43b4-8d9a-0306b259a16a'
            )
        }
    }
}
