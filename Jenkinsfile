pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    if [ -s "$NVM_DIR/nvm.sh" ]; then
                        . "$NVM_DIR/nvm.sh"
                    fi
                    nvm use 22.11.0
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
                        if [ -s "$NVM_DIR/nvm.sh" ]; then
                            . "$NVM_DIR/nvm.sh"
                        fi
                        nvm use 22.11.0
                        ls -la build
                        aws s3 cp build s3://vitacocina-jenkins/ --recursive
                    '''
                }
            }
        }
    }
}
