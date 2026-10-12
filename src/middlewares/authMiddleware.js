import jwt from 'jsonwebtoken';

export const autenticar = (req, res, next) => {
    const cabecalho = req.headers.authorization || '';
    const [tipo, token] = cabecalho.split(' ');

    if (tipo !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Token não informado' });
    }

    try {
        req.usuario = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
};