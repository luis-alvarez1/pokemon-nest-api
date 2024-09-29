pipeline {
    agent any

    environment {
        AZURE_CREDENTIALS = credentials('ba65f07a-6809-4133-9a8e-516b720ae4ae')
        RESOURCE_GROUP = 'rg-pokemon-demo'
        APP_NAME = 'pokemon-api-demo'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/luis-alvarez1/pokemon-nest-api.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Package') {
			
            steps {
                sh 'zip -r target/poke-app.zip dist'
            }
        }

        stage('Deploy to Azure') {
            steps {
                withCredentials([azureServicePrincipal(
                    credentialsId: 'ba65f07a-6809-4133-9a8e-516b720ae4ae',
                    subscriptionIdVariable: 'AZURE_SUBSCRIPTION_ID',
                    clientIdVariable: 'AZURE_CLIENT_ID',
                    clientSecretVariable: 'AZURE_CLIENT_SECRET',
                    tenantIdVariable: 'AZURE_TENANT_ID'
                )]) {
                    sh '''
                        az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID
                        az webapp deployment source config-zip --resource-group $RESOURCE_GROUP --name $APP_NAME --src target/poke-app.zip
                    '''
                }
            }
        }
    }
}
