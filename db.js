/**
 * Conectare la baza de date
 */

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'pwa_db',
    dialect: 'mysql'
});

/**
 * Tabele
 */
const Memes = sequelize.define('Memes', {
    src: {
        type: DataTypes.STRING
    },
    src_img: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
}
);


async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    };
}

testConnection();

const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    memesTable: Memes
};

module.exports = db;