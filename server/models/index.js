const {Sequelize} = require('sequelize');
const Config = require('./../config');

const sequelize = new Sequelize({
    database: Config.DB_NAME,
    username: Config.DB_USERNAME,
    password: Config.DB_PWD,
    dialect: Config.POSTGRES,
    host: Config.DB_HOST,
    port: Config.DB_PORT,
    pool: 40, retry: 3, logging: true
});

const CONNECT_DB = async () => {
    try {
        await sequelize.authenticate();
        console.log(`DB connection success. ${Config.APP_NAME} is running on ${Config.DB_HOST}:${Config.DB_PORT}`);
    } catch(error) { console.log(`${error.message}`) }
}

const REFRESH_DB = async = () => {
    try {
        sequelize.sync({alter: true}).then(() => console.log('DB Resynced'));
    } catch(error) { console.log(`${error.message}`)}
}

let db = {};

db.CONNECT_DB = CONNECT_DB;
db.REFRESH_DB = REFRESH_DB;
db.sequelize = sequelize;

db.Product = require('./product') (sequelize);

module.exports = db;