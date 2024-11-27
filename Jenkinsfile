pipeline {
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
