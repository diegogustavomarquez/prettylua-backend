# prettylua-backend

## Para instalar localmente: 

npm install 

npm install -g nodemon 

docker pull mongo:5.0.8 

docker run -p 27017:27017 --name mongodbdev -e MONGO_INITDB_ROOT_USERNAME=mongodev -e MONGO_INITDB_ROOT_PASSWORD=secret -d mongo:5.0.8  

## abrir 2 consolas y ejecutar los siguientes comandos: 

tsc -w 

nodemon app/dist

## Para deployar en heroku
Por primera vez si no existe la app en heroku o se borra para volver a crearla:
heroku login (aparece un unavegador y deben hacer login con un user registardo en heroku)
heroku git:clone -a prettylua (o el nombre que le hayan puesto a la app en heroku)
cd prettylua (heroku crea una carpeta con el compilado para levantar el codigo, no la borren si esta vacia)
tsc -w  (para llenar o actualizar la carpeta de compilacion heroku)

Deploy
antes de comenzar se debe ejecutar
heroku config:set NODEMODULESCACHE=false
git add .
git commit -am 'rebuild' --allow-empty
git push heroku main