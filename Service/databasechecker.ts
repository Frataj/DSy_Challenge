const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('test_db', 'root', 'root', {
    host: 'db-dsy', // localhost if not dockerized
    port: 5432, // 5439 for localhost (if not dockerized)
    dialect: 'postgres' 
});

async function authenticate() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

authenticate();
// sequelize.close()
console.log('end of programm');
