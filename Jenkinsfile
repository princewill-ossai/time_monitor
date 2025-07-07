pipeline {
    agent any

    tools {
        nodejs 'NODE_JS'
    }

    environment {
        REPO_DIR = "${env.WORKSPACE}"
        LOCAL_REGISTRY = "localhost:32000"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    def gitUrl = sh(script: "git config --get remote.origin.url", returnStdout: true).trim()
                    env.repoName = gitUrl.tokenize('/').last().replaceAll(/\\.git$/, '')
                    echo "Repository Name: ${env.repoName}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                sh 'npm ci'
            }
        }

        stage('Build React App') {
            steps {
                echo 'Building React application...'
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image..."
                    sh """
                        docker build -t ${env.repoName}:latest .
                        docker tag ${env.repoName}:latest ${LOCAL_REGISTRY}/${env.repoName}:latest
                    """
                }
            }
        }

        stage('Push to MicroK8s Registry') {
            steps {
                echo "Pushing image to MicroK8s registry..."
                sh "docker push ${LOCAL_REGISTRY}/${env.repoName}:latest"
            }
        }

        stage('Restart Deployment') {
            steps {
                script {
                    def timestamp = sh(script: 'date +%Y-%m-%dT%H:%M:%S', returnStdout: true).trim()

                    def patchCommand = """
                        microk8s kubectl patch deployment ${env.repoName} -n staging \\
                        -p '{"spec":{"template":{"metadata":{"annotations":{"kubectl.kubernetes.io/restartedAt":"${timestamp}"}}}}}'
                    """.stripIndent().trim()

                    echo "Patching deployment to trigger restart..."
                    sh patchCommand
                }
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        cleanup {
            echo "Cleaning up workspace..."
            cleanWs()
        }
    }
}



