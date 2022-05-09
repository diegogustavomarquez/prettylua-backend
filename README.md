# prettylua-backend

Para instalar localmente: 

npm install 

npm install -g nodemon 

docker pull mongo:5.0.8 

docker run -p 27017:27017 --name mongodbdev -e MONGO_INITDB_ROOT_USERNAME=mongodev -e MONGO_INITDB_ROOT_PASSWORD=secret -d mongo:5.0.8  

abrir 2 consolas y ejecutar los siguientes comandos: 

tsc -w 

nodemon dist
