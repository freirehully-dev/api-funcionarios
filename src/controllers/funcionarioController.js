import db from '../config/db.js';

const validarFuncionario = ({ nome, cargo, salario }) => {
    const erros = [];

    if (typeof nome !== 'string' || nome.trim() === '') {
        erros.push('O nome é obrigatório');
    }
    if (typeof cargo !== 'string' || cargo.trim() === '') {
        erros.push('O cargo é obrigatório');
    }

    const valor = Number(salario);
    if (salario === undefined || salario === null || salario === '' || Number.isNaN(valor) || valor < 0) {
        erros.push('O salário deve ser um número maior ou igual a zero');
    }

    return erros;
};

const idValido = (id) => Number.isInteger(Number(id)) && Number(id) > 0;

export const listarFuncionarios = (req, res) => {
    db.query('SELECT * FROM funcionarios', (err, results) => {
        if (err) {
            console.error('Erro ao buscar funcionários:', err);
            return res.status(500).json({ error: 'Erro ao buscar funcionários' });
        }
        res.json(results);
    });
};

export const inserirFuncionario = (req, res) => {
    const dados = req.body || {};
    const erros = validarFuncionario(dados);
    if (erros.length > 0) {
        return res.status(400).json({ error: erros.join('. ') });
    }

    const { nome, cargo, salario } = dados;
    const sql = 'INSERT INTO funcionarios (nome, cargo, salario) VALUES (?, ?, ?)';
    db.query(sql, [nome.trim(), cargo.trim(), Number(salario)], (err, result) => {
        if (err) {
            console.error('Erro ao inserir funcionário:', err);
            return res.status(500).json({ error: 'Erro ao inserir funcionário' });
        }
        res.status(201).json({ mensagem: 'Funcionário inserido com sucesso', id: result.insertId });
    });
};

export const atualizarFuncionario = (req, res) => {
    const { id } = req.params;
    if (!idValido(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    const dados = req.body || {};
    const erros = validarFuncionario(dados);
    if (erros.length > 0) {
        return res.status(400).json({ error: erros.join('. ') });
    }

    const { nome, cargo, salario } = dados;
    const sql = 'UPDATE funcionarios SET nome = ?, cargo = ?, salario = ? WHERE id = ?';
    db.query(sql, [nome.trim(), cargo.trim(), Number(salario), id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar funcionário:', err);
            return res.status(500).json({ error: 'Erro ao atualizar funcionário' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }
        res.json({ mensagem: 'Funcionário atualizado com sucesso' });
    });
};

export const excluirFuncionario = (req, res) => {
    const { id } = req.params;
    if (!idValido(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    const sql = 'DELETE FROM funcionarios WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir funcionário:', err);
            return res.status(500).json({ error: 'Erro ao excluir funcionário' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }
        res.json({ mensagem: 'Funcionário excluído com sucesso' });
    });
};