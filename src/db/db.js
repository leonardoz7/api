const mysql = require('mysql2/promise');
require(`dotenv`).config();
//Carrega as variaveis de AMBIENTE

//CRIA UM POOL DE CONEXOES PROMISES
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
//TESTANDO A CONEXÃO AO INICIAR A APLICAÇÃO 
(async () => {
    try {
        const connection = await db.getConnection();
        console.log('Conexão com o banco de dados estabelecida com sucesso');
        connection.release(); //Libera a conexão de valia para a pool

    } catch (err) {
        console.error('Erro ao conectar ao banco de dados', err);
    }
})();
module.exports = db;