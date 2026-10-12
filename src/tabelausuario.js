import db from './config/db.js';

const sql = `
    CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        senha_hash VARCHAR(255) NOT NULL,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

db.query(sql, (err) => {
    if (err) {
        console.error('Erro ao criar a tabela:', err.message);
    } else {
        console.log('Tabela usuarios criada (ou já existia).');
    }
    db.end();
});