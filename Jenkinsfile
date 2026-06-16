pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "alexacademy33/pipeline-cero"
    }

    stages {
        stage('1. Checkout del Codigo') {
            steps {
                checkout scm
            }
        }
        stage('2. Contruccion (Build)') {
            steps {
                script {
                    echo "Contruyendo la imagen de Docker...."
                    sh "docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} ."
                    sh "docker tag ${DOCKER_IMAGE}:${BUILD_NUMBER} ${DOCKER_IMAGE}:latest"
                }
            }
        }
        stage('3. Subir a Docker Hub (PUSH)') {
            steps {
               
                    echo "Iniciando session en Docker Hub..."
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'HUB_PSW', usernameVariable: 'HUB_USR')]) {
                        sh 'echo $HUB_PSW | docker login -u $HUB_USR --password-stdin'
                    }
                script {
                    echo "Subiendo imagenes...."
                    sh "docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}"
                    sh "docker push ${DOCKER_IMAGE}:latest"
                }
            }
        }
        stage('4. Despliegue en AWS (Deploy)') {
            steps {
                script {
                    echo "Desplegando en AWS  mediante comandos nativos..."
                    sh "docker pull ${DOCKER_IMAGE}:latest"
                    sh "docker stop app-produccion-cero || true"
                    sh "docker rm app-produccion-cero || true"
                    sh "docker run -d --name app-produccion-cero -p 80:80 --restart always ${DOCKER_IMAGE}:latest"
                    sh "docker system prune -af"
                }
            }
        }

    }
    post {
        always {
            sh "docker logout || true"
        }
    }
}