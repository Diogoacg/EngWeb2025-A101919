const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const axios = require('axios');

const app = express();

// Configurar view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'gestao-alunos-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 } // 1 minuto
}));

// Middleware para passar mensagens flash para o template
app.use((req, res, next) => {
  res.locals.successMessage = req.session.successMessage;
  res.locals.errorMessage = req.session.errorMessage;
  res.locals.currentPath = req.path;
  
  // Limpar mensagens após serem usadas
  delete req.session.successMessage;
  delete req.session.errorMessage;
  
  next();
});

// API base URL
const API_URL = "http://localhost:3000/api/alunos";

// Rota principal
app.get('/', (req, res) => {
  res.render('index', { title: 'Gestão de Alunos' });
});

// Rotas para alunos
// Listar alunos
app.get('/alunos', async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    res.render('alunos/lista', { 
      title: 'Lista de Alunos', 
      alunos: response.data 
    });
  } catch (error) {
    req.session.errorMessage = 'Erro ao obter lista de alunos';
    res.render('error', { 
      message: 'Erro ao obter alunos', 
      error
    });
  }
});

// Formulário para criar um novo aluno - DEVE VIR ANTES DE :id
app.get('/alunos/novo', (req, res) => {
  res.render('alunos/form', { 
    title: 'Adicionar Novo Aluno',
    aluno: {},
    isNew: true
  });
});

// Processar criação de um novo aluno
app.post('/alunos', async (req, res) => {
    try {
      console.log('Dados enviados para criação:', req.body);
      
      // Certificar-se de que os TPCs estão formatados corretamente
      const formattedData = {
        id: req.body.id,
        name: req.body.name,
        gitlink: req.body.gitlink || '',
        tpc1: req.body.tpc1 === '1' ? '1' : '',
        tpc2: req.body.tpc2 === '1' ? '1' : '',
        tpc3: req.body.tpc3 === '1' ? '1' : '',
        tpc4: req.body.tpc4 === '1' ? '1' : '',
        tpc5: req.body.tpc5 === '1' ? '1' : '',
        tpc6: req.body.tpc6 === '1' ? '1' : ''
      };
      
      console.log('Dados formatados:', formattedData);
      
      const response = await axios.post(API_URL, formattedData);
      console.log('Resposta da API:', response.status);
      
      req.session.successMessage = 'Aluno criado com sucesso';
      res.redirect('/alunos');
    } catch (error) {
      console.error('Erro ao criar aluno:', error);
      
      if (error.response) {
        console.error('Dados do erro:', error.response.data);
        console.error('Status do erro:', error.response.status);
      }
      
      req.session.errorMessage = 'Erro ao criar aluno: ' + 
        (error.response && error.response.data && error.response.data.message ? 
         error.response.data.message : error.message);
      
      res.render('error', { 
        message: 'Erro ao criar aluno', 
        error
      });
    }
  });

// Formulário para editar um aluno - DEVE VIR ANTES DE :id
app.get('/alunos/editar/:id', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/${req.params.id}`);
    res.render('alunos/form', { 
      title: 'Editar Aluno', 
      aluno: response.data,
      isNew: false
    });
  } catch (error) {
    req.session.errorMessage = 'Aluno não encontrado';
    res.render('error', { 
      message: 'Aluno não encontrado', 
      error
    });
  }
});

// Processar edição de um aluno
app.post('/alunos/editar/:id', async (req, res) => {
    try {
      console.log('Dados enviados para atualização:', req.body);
      
      // Certificar-se de que os TPCs estão formatados corretamente
      const formattedData = {
        id: req.body.id,
        name: req.body.name,
        gitlink: req.body.gitlink || '',
        tpc1: req.body.tpc1 === '1' ? '1' : '',
        tpc2: req.body.tpc2 === '1' ? '1' : '',
        tpc3: req.body.tpc3 === '1' ? '1' : '',
        tpc4: req.body.tpc4 === '1' ? '1' : '',
        tpc5: req.body.tpc5 === '1' ? '1' : '',
        tpc6: req.body.tpc6 === '1' ? '1' : ''
      };
      
      console.log('Dados formatados:', formattedData);
      
      await axios.put(`${API_URL}/${req.params.id}`, formattedData);
      req.session.successMessage = 'Aluno atualizado com sucesso';
      res.redirect('/alunos');
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
      
      if (error.response) {
        console.error('Dados do erro:', error.response.data);
        console.error('Status do erro:', error.response.status);
      }
      
      req.session.errorMessage = 'Erro ao atualizar aluno';
      res.render('error', { 
        message: 'Erro ao atualizar aluno', 
        error
      });
    }
  });
// Confirmar exclusão de um aluno - DEVE VIR ANTES DE :id
app.get('/alunos/apagar/:id', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/${req.params.id}`);
    res.render('alunos/delete', { 
      title: 'Confirmar Exclusão', 
      aluno: response.data 
    });
  } catch (error) {
    req.session.errorMessage = 'Aluno não encontrado';
    res.render('error', { 
      message: 'Aluno não encontrado', 
      error
    });
  }
});

// Processar exclusão de um aluno
app.post('/alunos/apagar/:id', async (req, res) => {
  try {
    await axios.delete(`${API_URL}/${req.params.id}`);
    req.session.successMessage = 'Aluno excluído com sucesso';
    res.redirect('/alunos');
  } catch (error) {
    req.session.errorMessage = 'Erro ao excluir aluno';
    res.render('error', { 
      message: 'Erro ao excluir aluno', 
      error
    });
  }
});

// Ver detalhes de um aluno - ESTA ROTA DEVE SER A ÚLTIMA
app.get('/alunos/:id', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/${req.params.id}`);
    res.render('alunos/detalhes', { 
      title: 'Detalhes do Aluno', 
      aluno: response.data 
    });
  } catch (error) {
    req.session.errorMessage = 'Aluno não encontrado';
    res.render('error', { 
      message: 'Aluno não encontrado', 
      error
    });
  }
});

// Capturar erro 404 e encaminhar para o manipulador de erros
app.use(function(req, res, next) {
  res.status(404).render('error', {
    message: 'Página não encontrada',
    error: { status: 404 }
  });
});

// Iniciar o servidor na porta 1234
const PORT = 1234;
app.listen(PORT, () => {
  console.log(`Servidor frontend rodando na porta ${PORT}`);
});

module.exports = app;