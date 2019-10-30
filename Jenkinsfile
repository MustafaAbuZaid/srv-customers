 pipeline{
    environment{ 
            def file = readFile("${env.WORKSPACE}/JF.conf");
            def repoName = file.split('repo:');
            def repo = repoName[1].split(';')[0].trim();
            def port = file.split('port:');
            def repoPort = port[1].split(';')[0].trim();
            def slave = file.split('slave:');
            def repoSecondPort = slave[1].split(';')[0].trim();  
            def user = file.split('keyUser:');
            def keyUser = user[1].split(';')[0].trim();   
            def pass = file.split('keyPass:');
            def keyPass = pass[1].split(';')[0].trim();  
            def network = file.split('networkName:');
            def networkName = network[1].split(';')[0].trim();   
            def domain = file.split('domainName:');
            def domainName = domain[1].split(';')[0].trim();   
            def officialDockerImageName = "official-${repo}-image"; 
            def officialDockerContainerName = "${repo}-dev-cont";    
            def tagName = "${BUILD_TAG}";  
        }
 post {
 always {
   sh 'echo "This will always run"'
 }
 success {
  sh 'echo "This will run only if success"'
 }
 failure {
  sh 'echo "This will run only if failed"'
 }
 unstable {
  sh 'echo "This will run only if the run was marked as unstable"'
 }
 changed {
  sh 'echo "This will run only if the state of the Pipeline has changed"'
  sh 'echo "For example, the Pipeline was previously failing but is now successful"'
  sh 'echo "... or the other way around :)"'
 }
}
    agent any
    stages  {
        stage('Build official Docker - B') { 
            steps {
                   script {

                   sh 'docker login -u="${keyUser}" -p="${keyPass}"'
                   echo "repo : ${repo} .... repoPort : ${repoPort} .... keyUser : ${keyUser} .... keyPass : ${keyPass} .... networkName : ${networkName} .... tag : ${tagName}"
  
                   //check the network exists and create it
                   sh "docker network create ${networkName} || true"
                   try{  
                               sh "docker kill ${domainName}/${officialDockerContainerName}" 
                               sh "docker rmi -f ${domainName}/${officialDockerImageName}"  
                               echo "docker official old image ${domainName}/${officialDockerImageName} deleted successfully"
                            }  
                            catch(exc)
                                { 
                                    echo "${domainName}/${officialDockerImageName} old container already deleted"
                                    sh "docker rmi -f ${domainName}/${officialDockerImageName}"  
                                    echo "docker official old image ${domainName}/${officialDockerImageName} deleted successfully"  
                                } 
                             //craete the official docker image  
                            sh "docker build --network ${networkName} --tag ${domainName}/${officialDockerImageName}:${tagName} --tag ${domainName}/${officialDockerImageName}:latest ." 
                            echo "docker image ${officialDockerImageName} within network ${networkName} created successfully"              
                      }
                }
        }
        stage('Docker Integration - C') { 
            steps {  
                script {
                         try{
                               sh "docker kill ${officialDockerContainerName}"
                               sh "docker rm ${officialDockerContainerName}" 
                               echo "docker ${officialDockerContainerName} deleted successfully"
                         }  
                        catch (exc) {
                            echo "${officialDockerContainerName} is ready to build "
                         }
                         try{ 
                           sh "docker run -d --network ${networkName} --name ${officialDockerContainerName} -p ${repoPort}:${repoSecondPort} ${domainName}/${officialDockerImageName}:latest"
                           echo "docker container ${officialDockerContainerName} within network ${networkName} created successfully"            
                         
                         }
                         catch (exc){ 
                             try{
                                    echo "${officialDockerContainerName} is roleback to previous version "
                                    sh "docker pull ${domainName}/${officialDockerContainerName}:latest"
                               }catch(ex){
                                    echo "${officialDockerContainerName} have no previous version " 
                             }

                         } 
                    }
            }
        }  
        stage('Puhsing Official Docker - D') { 
            steps { 
                //push two instance from the docker
                sh "docker push ${domainName}/${officialDockerImageName}" 
            }
        }   
    } 
}