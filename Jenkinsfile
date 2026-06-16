pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "alexacademy33/pipeline-cero"
        DOCKER_CREDS = "credentials('docker-hub-credentials')"
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
                script {
                    echo "Iniciando session en Docker Hub..."
                    sh "echo ${env.DOCKER_CREDS_PSW} | docker login -u ${env.DOCKER_CREDS_USR} --password-stdin"

                    echo "Subiendo imagenes...."
                    sh "docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}"
                    sh "docker push ${DOCKER_IMAGE}:latest"
                }
            }
        }
        stage('4. Despliegue en AWS (Deploy)') {
            steps {
                script {
                    echo "Desplegando en AWS ..."
                    sh "docker compose pull"
                    sh "docker compose up -d"
                    sh "docker system prune -af"
                }
            }
        }

    }
    post {
        always {
            sh "docker logout"
        }
    }
}