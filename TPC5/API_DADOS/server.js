const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const alunoRoutes = require("./routes/aluno_router");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar ao MongoDB
connectDB();

// Rotas
app.use("/api/alunos", alunoRoutes);

// Rota básica
app.get("/", (req, res) => {
  res.json({ message: "Bem-vindo à API de Alunos" });
});

// Tratamento de erros
app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor na porta ${PORT}`);
});