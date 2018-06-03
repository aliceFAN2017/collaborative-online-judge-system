#!/bin/bash
fuser -k 3000/tcp

cd ./redis/redis-4.0.9/src/redis-server &
cd ./server
npm install
nodemon server.js &
cd ./clients
npm install
ng build --watch

echo "-----------------------------------------"
read -p 'PRESS [ENTER] TO TERMINATE PROCESSES.' PRESSKEY

fuser -k 3000/tcp
