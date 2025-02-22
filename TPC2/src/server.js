const express = require('express');
const axios = require('axios');
const { getMainPage, getAlunosPage, getAlunoPage, getCursosPage, getCursoPage, getInstrumentosPage, getInstrumentoPage } = require('./myPages');
const app = express();
const port = 1234;

app.use(express.static('public'));

const apiUrl = 'http://localhost:3000'; // URL of your JSON server

app.get('/', async (req, res) => {
  try {
    const [alunos, cursos, instrumentos] = await Promise.all([
      axios.get(`${apiUrl}/alunos`),
      axios.get(`${apiUrl}/cursos`),
      axios.get(`${apiUrl}/instrumentos`)
    ]);
    res.send(getMainPage(new Date().getFullYear()));
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.get('/alunos', async (req, res) => {
  try {
    const alunos = await axios.get(`${apiUrl}/alunos`);
    res.send(getAlunosPage(alunos.data));
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.get('/aluno/:id', async (req, res) => {
  try {
    const aluno = await axios.get(`${apiUrl}/alunos/${req.params.id}`);
    res.send(getAlunoPage(aluno.data));
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.get('/cursos', async (req, res) => {
  try {
    const cursos = await axios.get(`${apiUrl}/cursos`);
    console.log(cursos.data);
    res.send(getCursosPage(cursos.data));
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.get('/curso/:id', async (req, res) => {
  try {
    const curso = await axios.get(`${apiUrl}/cursos/${req.params.id}`);
    const alunos = await axios.get(`${apiUrl}/alunos?curso=${req.params.id}`);
    res.send(getCursoPage(curso.data, alunos.data));
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.get('/instrumentos', async (req, res) => {
  try {
    const instrumentos = await axios.get(`${apiUrl}/instrumentos`);
    res.send(getInstrumentosPage(instrumentos.data));
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.get('/instrumento/:id', async (req, res) => {
  try {
    const instrumento = await axios.get(`${apiUrl}/instrumentos/${req.params.id}`);
    const alunos = await axios.get(`${apiUrl}/alunos?instrumento=${instrumento.data['#text']}`);
    res.send(getInstrumentoPage(instrumento.data, alunos.data));
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});