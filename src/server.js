import express from "express";
import dotenv from "dotenv";
import funcionarioRoutes from "./routes/funcionarioRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use('/funcionarios', funcionarioRoutes);

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});