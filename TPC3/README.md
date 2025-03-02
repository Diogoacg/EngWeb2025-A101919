# Manifesto TPC3

## 📌 Título

Gestão de Alunos

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

Desenvolver um sistema de gestão de alunos em Node.js que utilize a API fornecida pelo json-server para armazenar e manipular registos de alunos. O sistema permite a visualização, criação, edição e remoção de registos de alunos através de uma interface web moderna e responsiva.

A aplicação implementa operações CRUD completas (Create, Read, Update, Delete) e apresenta uma interface de utilizador amigável com design moderno utilizando CSS personalizado, fontes do Google e ícones do Font Awesome.

### alunos_server_skeleton.js

Este ficheiro contém o código do servidor Node.js que responde a diferentes pedidos HTTP. Ele utiliza a biblioteca `axios` para fazer pedidos à API do json-server e renderiza páginas HTML com base nos dados recebidos.

- **GET /:** Redireciona para a lista de alunos.
- **GET /alunos:** Lista de todos os alunos.
- **GET /alunos/:id:** Detalhes de um aluno específico.
- **GET /alunos/registo:** Formulário para registar um novo aluno.
- **GET /alunos/edit/:id:** Formulário para editar um aluno existente.
- **GET /alunos/delete/:id:** Remove um aluno e redireciona para a lista atualizada.
- **POST /alunos/registo:** Processa o registo de um novo aluno.
- **POST /alunos/edit/:id:** Processa a atualização dos dados de um aluno existente.

### templates.js

Este ficheiro contém funções que geram as páginas HTML para a aplicação de gestão de alunos. As funções utilizam a biblioteca W3.CSS para estilização básica, complementada com CSS personalizado para criar uma interface moderna.

- **studentsListPage(slist, d, message):** Gera a página com a lista de todos os alunos.
- **studentFormPage(d, message):** Gera o formulário para registo de um novo aluno.
- **studentFormEditPage(a, d, message):** Gera o formulário para edição de um aluno existente.
- **studentPage(aluno, d, message):** Gera a página com os detalhes de um aluno específico.
- **errorPage(errorMessage, d):** Gera uma página de erro amigável.

### static.js

Este módulo é responsável por servir recursos estáticos como CSS e imagens para a aplicação. Ele identifica recursos estáticos nas requisições e os serve a partir da pasta `static`.

### csvToJson.py

Script Python para converter dados de alunos em formato CSV para JSON, facilitando a importação de dados para o json-server.

## 🚀 Características Principais

1. **Sistema de Notificações:** Mensagens de sucesso e erro para melhorar a experiência do utilizador.
2. **Operações CRUD Completas:** Criar, ler, atualizar e eliminar registos de alunos.
3. **Validação de Formulários:** Campos obrigatórios e validação de formato para URLs.
4. **Gestão de TPC:** Sistema de marcação de trabalhos de casa concluídos.
5. **Navegação Intuitiva:** Links claros para navegação entre as diferentes secções.

## 🛠️ Tecnologias Utilizadas

- **Node.js:** Backend da aplicação.
- **Axios:** Requisições HTTP para a API.
- **json-server:** Armazenamento de dados em JSON.
- **HTML5/CSS3:** Interface do utilizador responsiva.
- **Font Awesome:** Ícones modernos para melhorar a experiência visual.
- **Google Fonts:** Tipografia personalizada com a fonte Poppins.
- **Python:** Scripts de utilidade para processamento de dados.

## 📂 Lista de Resultados

- [alunos_server_skeleton.js](./alunos_server_skeleton.js) - Servidor Node.js
- [templates.js](./templates.js) - Templates HTML para as páginas
- [static.js](./static.js) - Gestão de recursos estáticos
- [csvToJson.py](./csvToJson.py) - Conversão de CSV para JSON
- [alunos.csv](./alunos.csv) - Dados de exemplo em formato CSV
- [alunos.json](./alunos.json) - Dados de exemplo em formato JSON

## 🚀 Como Executar

1. Iniciar o json-server para fornecer a API:
    ```bash
    json-server --watch alunos.json --port 3000
    ```

2. Iniciar o servidor Node.js para a aplicação de gestão de alunos:
    ```bash
    node alunos_server_skeleton.js
    ```

3. Aceder à aplicação em [http://localhost:7777](http://localhost:7777).