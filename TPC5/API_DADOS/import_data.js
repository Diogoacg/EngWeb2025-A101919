const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Aluno = require("./models/aluno_model");
const connectDB = require("./config/db");

// Função para importar dados
async function importData() {
  try {
    // Conectar ao MongoDB
    await connectDB();
    
    // Caminho para o arquivo JSON
    const jsonPath = path.join(__dirname, "..", "alunos.json");
    
    // Verificar se o arquivo existe
    if (!fs.existsSync(jsonPath)) {
      console.error("Arquivo JSON não encontrado:", jsonPath);
      process.exit(1);
    }
    
    // Ler e parsear o arquivo JSON
    const dadosJson = fs.readFileSync(jsonPath, "utf8");
    const dados = JSON.parse(dadosJson);
    
    if (!dados.alunos || !Array.isArray(dados.alunos)) {
      console.error("Formato de dados inválido. Esperava objeto com array 'alunos'");
      process.exit(1);
    }
    
    // Apagar coleção existente
    console.log("Apagar dados anteriores...");
    await Aluno.deleteMany({});
    
    // Inserir novos dados
    console.log(`Importando ${dados.alunos.length} alunos...`);
    await Aluno.insertMany(dados.alunos);
    
    console.log("Dados importados com sucesso!");
    process.exit(0);
    
  } catch (error) {
    console.error("Erro na importação:", error);
    process.exit(1);
  }
}

// Executar importação
importData();