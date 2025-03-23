const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/aluno_controller');

// Listar todos os alunos
router.get('/', alunoController.listarAlunos);

// Formulário para criar novo aluno
router.get('/novo', alunoController.formNovoAluno);

// Criar novo aluno
router.post('/', alunoController.criarAluno);

// Exibir detalhes de um aluno
router.get('/:id', alunoController.mostrarAluno);

// Formulário para editar aluno
router.get('/editar/:id', alunoController.formEditarAluno);

// Atualizar aluno
router.post('/editar/:id', alunoController.atualizarAluno);

// Formulário de confirmação para excluir aluno
router.get('/apagar/:id', alunoController.formExcluirAluno);

// Excluir aluno
router.post('/apagar/:id', alunoController.excluirAluno);

module.exports = router;