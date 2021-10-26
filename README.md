# ADD CONFIGURATION TO RESOURCE-SERVICE
    /resources-service/src/main/resources/application.properties
## RUN SCRIPT
    * start.sh

## RUN CONTAINERS
    * docker-compose up -d --build
## LOGS
    *  docker-compose logs -f

## STOP CONTAINERS
    *  docker-compose stop

## CLEAN CONTAINERS
    * docker system prune
    
## ENDPOINTS

    User Service: 
    http://localhost:8100/users

    Resources Service:
    http://localhost:8200/resources
        
    Lesson Service
    http://localhost:8200/lessons

    Api Gateway  
    http://localhost:8080  
    
    Eureka Server
    http://localhost:8761

    REACT ENDPOINT
    http://localhost:3000/