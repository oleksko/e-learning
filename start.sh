#!//bin/bash

#echo "HELLO"
#ls -l
#sleep 2s
#


#array=("api-gateway")
array=("api-gateway" "eureka-server" "lessons-service" "resources-service" "users-service")
for i in "${array[@]}"; do   # The quotes are necessary here
    echo "$i"
    cd "$i"
    mvn clean install -DskipTests
    cd ..
done

echo "DONE"
