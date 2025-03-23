const axios = require('axios');

// URL base da API
const API_URL = 'http://localhost:3000/api/alunos';

// Listar todos os alunos
exports.listarAlunos = async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    res.render('alunos/lista', { 
      title: 'Lista de Alunos',
      alunos: response.data
    });
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    res.render('error', { 
      message: 'Erro ao buscar lista de alunos',
      error: { status: 500, stack: error.toString() }
    });
  }
};

// Exibir detalhes de um aluno
exports.mostrarAluno = async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/${req.params.id}`);
    res.render('alunos/detalhes', { 
      title: 'Detalhes do Aluno',
      aluno: response.data
    });
  } catch (error) {
    console.error('Erro ao buscar aluno:', error);
    res.render('error', { 
      message: 'Aluno não encontrado',
      error: { status: 404, stack: error.toString() }
    });
  }
};

// Formulário para criar novo aluno
exports.formNovoAluno = (req, res) => {
    // Adicionando console.log para debug
    console.log("Renderizando formulário para novo aluno");
    res.render('alunos/form', {
      title: 'Novo Aluno',
      aluno: {}, // Objeto vazio para não ter problemas com valores indefinidos
      isNew: true
    });
  };
  
  // Criar novo aluno
  exports.criarAluno = async (req, res) => {
    try {
      console.log("Dados do formulário:", req.body);
      await axios.post(API_URL, req.body);
      res.redirect('/alunos');
    } catch (error) {
      console.error('Erro ao criar aluno:', error);
      // Mostrar dados do erro para debug
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Dados:', error.response.data);
      }
      res.render('error', {
        message: 'Erro ao criar aluno',
        error: { status: error.response ? error.response.status : 500, stack: error.toString() }
      });
    }
  };

// Formulário para editar aluno
exports.formEditarAluno = async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/${req.params.id}`);
    res.render('alunos/form', {
      title: 'Editar Aluno',
      aluno: response.data,
      isNew: false
    });
  } catch (error) {
    console.error('Erro ao buscar aluno para edição:', error);
    res.render('error', {
      message: 'Aluno não encontrado',
      error: { status: 404, stack: error.toString() }
    });
  }
};

// Atualizar aluno
exports.atualizarAluno = async (req, res) => {
    try {
      console.log('Tentando atualizar aluno com ID:', req.params.id);
      console.log('Dados enviados para atualização:', req.body);
      
      const response = await axios.put(`${API_URL}/${req.params.id}`, req.body);
      console.log('Resposta da atualização:', response.status);
      
      res.redirect('/alunos');
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
      
      // Log detalhado do erro
      if (error.response) {
        console.error('Status do erro:', error.response.status);
        console.error('Dados do erro:', error.response.data);
        console.error('Headers da resposta:', error.response.headers);
      } else if (error.request) {
        console.error('Erro na requisição:', error.request);
      } else {
        console.error('Erro:', error.message);
      }
      
      res.render('error', {
        message: 'Erro ao atualizar aluno',
        error: { 
          status: error.response ? error.response.status : 400, 
          stack: error.toString(),
          details: error.response ? error.response.data : {}
        }
      });
    }
  };

// Formulário de confirmação para excluir aluno
exports.formExcluirAluno = async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/${req.params.id}`);
    res.render('alunos/delete', {
      title: 'Confirmar Exclusão',
      aluno: response.data
    });
  } catch (error) {
    console.error('Erro ao buscar aluno para exclusão:', error);
    res.render('error', {
      message: 'Aluno não encontrado',
      error: { status: 404, stack: error.toString() }
    });
  }
};

// Excluir aluno
exports.excluirAluno = async (req, res) => {
  try {
    await axios.delete(`${API_URL}/${req.params.id}`);
    res.redirect('/alunos');
  } catch (error) {
    console.error('Erro ao excluir aluno:', error);
    res.render('error', {
      message: 'Erro ao excluir aluno',
      error: { status: 500, stack: error.toString() }
    });
  }
};