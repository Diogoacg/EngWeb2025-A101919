# Manifesto TPC5

## 📌 Título

Sistema de Gestão de Alunos

## 👤 Autor

<table>
<tr>
    <td><img src="../diogo.jpg" width="100"></td>
    <td>
    <strong>Nome:</strong> Diogo Afonso Costa Gonçalves<br>
    <strong>Número:</strong> A101919
    </td>
</tr>
</table>

## 📝 Resumo

O TPC5 consiste no desenvolvimento de um sistema completo de gestão de alunos implementado com a stack MEAN (MongoDB, Express, Angular/PUG, Node.js). O sistema é composto por três componentes principais: uma base de dados MongoDB, uma API RESTful em Node.js/Express e um frontend Web também em Node.js/Express com templates PUG.

A aplicação permite a gestão completa de registos de alunos de uma disciplina, incluindo dados pessoais e controlo de trabalhos de casa (TPCs). Implementa operações CRUD completas (Criar, Ler, Atualizar, Eliminar) através de uma API dedicada, apresentando uma interface de utilizador moderna e responsiva.

### Arquitetura do Sistema

O projeto está organizado com uma arquitetura de três camadas:

1. **Base de Dados (MongoDB)**: Armazenamento permanente dos dados dos alunos.
2. **API_DADOS (Backend)**: Interface RESTful que fornece acesso aos dados armazenados no MongoDB.
3. **FRONTEND (Frontend)**: Interface Web para utilizadores interagirem com o sistema.

### Importação de Dados para o MongoDB

Para preencher inicialmente a base de dados, é fornecido um ficheiro `alunos.json` que pode ser importado para o MongoDB utilizando o comando:

```bash
cd TPC5/API_DADOS
node import_data.js
```

### 🚀 Como Executar

#### 1. Configurar e iniciar o MongoDB
```bash
# Se ainda não tiver instalado o MongoDB
sudo apt-get install -y mongodb

# Iniciar o serviço MongoDB
sudo service mongodb start

# Verificar se está em execução
sudo service mongodb status

# Importar dados iniciais (se necessário)
cd TPC5/API_DADOS
node import_data.js

```

#### 2. Iniciar a API (Backend)
```bash
cd API_DADOS
npm install
npm start
```

#### 3. Iniciar o Frontend
```bash
cd FRONTEND
npm install
npm start
```

#### 4. Aceder à aplicação
Abra um navegador e aceda a [http://localhost:1234](http://localhost:1234)

## 📋 Lista de Resultados

### Componente 1: Base de Dados MongoDB

**Estrutura de dados dos alunos:**
```javascript
{
  "id": "A101919",         // Identificador único do aluno (formato Axxxxxx)
  "name": "Diogo Gonçalves",   // Nome completo do aluno
  "gitlink": "https://github.com/utilizador/repositorio", // Link para o repositório GitHub
  "tpc1": "1",             // Estado do TPC1 ("1" = entregue, "" = não entregue)
  "tpc2": "1",             // Estado do TPC2
  "tpc3": "",              // Estado do TPC3
  "tpc4": "1",             // Estado do TPC4
  "tpc5": "",              // Estado do TPC5
  "tpc6": "1"              // Estado do TPC6
}
```

### Componente 2: API_DADOS (Backend)

**Ficheiros Principais:**
[API_DADOS/server.js](API_DADOS/server.js) - Configuração principal do servidor Express
[API_DADOS/models/aluno.js](API_DADOS/models/aluno.js) - Modelo Mongoose para alunos
[API_DADOS/controllers/aluno_controller.js](API_DADOS/controllers/aluno_controller.js) - Controladores para operações CRUD
[API_DADOS/routes/aluno_routes.js](API_DADOS/routes/aluno_routes.js) - Definição das rotas da API

**Endpoints Implementados:**
- **GET /api/alunos:** Lista todos os alunos.
- **GET /api/alunos/: id:** Obtém detalhes de um aluno específico.
- **POST /api/alunos:** Cria um novo registo de aluno.
- **PUT /api/alunos/: id:** Atualiza um registo de aluno existente.
- **DELETE /api/alunos/: id:** Remove um registo de aluno.

### Componente 3: FRONTEND (Interface Web)

**Ficheiros Principais:**

[FRONTEND/app.js](FRONTEND/app.js) - Configuração principal da aplicação Express
[FRONTEND/views/layout.pug](FRONTEND/views/layout.pug) - Template base com estrutura comum
[FRONTEND/views/index.pug](FRONTEND/views/index.pug) - Página inicial
[FRONTEND/views/error.pug](FRONTEND/views/error.pug) - Página de erro
[FRONTEND/views/alunos/lista.pug](FRONTEND/views/alunos/lista.pug) - Lista de alunos
[FRONTEND/views/alunos/detalhes.pug](FRONTEND/views/alunos/detalhes.pug) - Detalhes de um aluno
[FRONTEND/views/alunos/form.pug](FRONTEND/views/alunos/form.pug) - Formulário para criar/editar alunos
[FRONTEND/views/alunos/delete.pug](FRONTEND/views/alunos/delete.pug) - Confirmação de eliminação
[FRONTEND/public/css/style.css](FRONTEND/public/css/style.css) - Estilos CSS da aplicação
[FRONTEND/public/js/scripts.js](FRONTEND/public/js/scripts.js) - JavaScript do cliente

