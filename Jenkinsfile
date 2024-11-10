pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # Cargar nvm
                    nvm use 22.11.0  # Seleccionar la versión de Node.js
                    npm install
                    npm run build
                    ls
                    cd build
                    ls
                '''
            }
        }
        stage('S3 Upload') {
            steps {
                withAWS(region: 'us-east-1', credentials: '050372a5-6b77-4393-8439-8baf423784df') {
                    sh '''
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # Cargar nvm
                        nvm use 22.11.0  # Seleccionar la versión de Node.js
                        ls -la build
                        aws s3 cp build s3://vitacocina-jenkins/ --recursive
                    '''
                }
            }
        }
    }
}
