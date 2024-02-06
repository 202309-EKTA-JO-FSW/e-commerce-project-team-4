CONT=$(docker ps -aqf name=node-app)
if [ "$CONT" ]; then 
    docker exec -w /backend-app $CONT npm i
fi