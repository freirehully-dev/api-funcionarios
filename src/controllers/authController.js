import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

const emailValido = (email) =>
    typeof email === 'string' && /^\S+@\S+\.\S+$/.test(email.trim());

export const registrar = async (req, res) => {
    const { nome, email, senha } = req.body || {};

    const erros = [];
    if (typeof nome !== 'string' || nome.trim() === '') erros.push('O nome é obrigatório');
    if (!emailValido(email)) erros.push('Informe um e-mail válido');
    if (typeof senha !== 'string' || senha.length < 6) erros.push('A senha deve ter pelo menos 6 caracteres');
    if (erros.length > 0) {
        return res.status(400).json({ error: erros.join('. ') });
    }

    try {
        const senhaHash = await bcrypt.hash(senha, 10);
        const sql = 'INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)';
        db.query(sql, [nome.trim(), email.trim().toLowerCase(), senhaHash], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ error: 'E-mail já cadastrado' });
                }
                console.error('Erro ao cadastrar usuário:', err);
                return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
            }
            res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso', id: result.insertId });
        });
    } catch (error) {
        console.error('Erro ao criptografar a senha:', error);
        res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
};

export const login = (req, res) => {
    const { email, senha } = req.body || {};

    if (!emailValido(email) || typeof senha !== 'string' || senha === '') {
        return res.status(400).json({ error: 'Informe e-mail e senha' });
    }

    const sql = 'SELECT id, nome, email, senha_hash FROM usuarios WHERE email = ?';
    db.query(sql, [email.trim().toLowerCase()], async (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            return res.status(500).json({ error: 'Erro ao fazer login' });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: 'E-mail ou senha inválidos' });
        }

        try {
            const usuario = results[0];
            const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);
            if (!senhaCorreta) {
                return res.status(401).json({ error: 'E-mail ou senha inválidos' });
            }

            const token = jwt.sign(
                { id: usuario.id, nome: usuario.nome },
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );

            res.json({
                token,
                usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }
            });
        } catch (error) {
            console.error('Erro no login:', error);
            res.status(500).json({ error: 'Erro ao fazer login' });
        }
    });
};