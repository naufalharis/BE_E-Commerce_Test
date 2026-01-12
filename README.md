Install Dependencies:

npm install express sequelize pg pg-hstore dotenv midtrans-client

npm install --save-dev nodemon

first structure:

mkdir src

mkdir src/controllers src/models src/routes src/config

touch index.js


Setup Sequelize:

npx sequelize-cli init


Install & Setup Midtrans Snap:

npm install midtrans-client
