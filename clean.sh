#!/usr/bin/env sh

array=("api-gateway" "eureka-server" "lessons-service" "resources-service" "users-service")
for i in "${array[@]}"; do   # The quotes are necessary here
    echo "$i"
    cd "$i"
    mvn clean
    cd ..
done

echo "DONE"
