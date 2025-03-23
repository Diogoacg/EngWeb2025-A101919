const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/aluno_controller");

// Rotas CRUD para alunos
router.get("/", alunoController.getAllAlunos);         // Listar todos os alunos
router.get("/:id", alunoController.getAlunoById);      // Obter um aluno pelo ID
router.post("/", alunoController.createAluno);         // Criar novo aluno
router.put("/:id", alunoController.updateAluno);       // Atualizar aluno
router.delete("/:id", alunoController.deleteAluno);    // Deletar aluno

module.exports = router;