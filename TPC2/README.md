# Manifesto TPC2

## 📌 Título

Escola de Música

## 👤 Autor

<table>
<tr>
    <td><img src="../diogo.jpg" width="100"></td>
    <td>
    <strong>Nome:</strong> Diogo Afonso Costa Gonçalves<pt>
    <strong>Número:</strong> A101919
    </td>
</tr>
</table>

## 📝 Resumo

Desenvolver um serviço em Node.js que utilize a API fornecida pelo json-server da escola de música e gere páginas web para o site.  
Os serviços devem incluir seções para listar os alunos, cursos e instrumentos. O objetivo é permitir que, ao selecionar um aluno, curso ou instrumento específico, o utilizador seja redirecionado para uma página com todos os detalhes dessa entidade.  
A implementação de pedidos PUT e POST não está incluída no escopo deste trabalho.

### server.js

Este ficheiro contém o código do servidor Node.js que responde a diferentes pedidos HTTP. Ele utiliza a biblioteca `axios` para fazer pedidos à API do json-server e renderiza páginas HTML com base nos dados recebidos.

- **GET /:** Página inicial com links para listas de alunos, cursos e instrumentos.
- **GET /alunos:** Lista de todos os alunos.
- **GET /aluno/:id:** Detalhes de um aluno específico.
- **GET /cursos:** Lista de todos os cursos.
- **GET /curso/:id:** Detalhes de um curso específico, incluindo a lista de alunos que o frequentam.
- **GET /instrumentos:** Lista de todos os instrumentos.
- **GET /instrumento/:id:** Detalhes de um instrumento específico, incluindo a lista de alunos que o tocam.

### myPages.js

Este ficheiro contém funções que geram as páginas HTML para o site da escola de música. As funções utilizam a biblioteca W3.CSS para estilização e são responsáveis por renderizar as diferentes páginas com base nos dados fornecidos.

- **getMainPage(data):** Gera a página inicial com links para listas de alunos, cursos e instrumentos.
- **getAlunosPage(alunos):** Gera a página com a lista de todos os alunos.
- **getAlunoPage(aluno):** Gera a página com os detalhes de um aluno específico.
- **getCursosPage(cursos):** Gera a página com a lista de todos os cursos.
- **getCursoPage(curso, alunos):** Gera a página com os detalhes de um curso específico, incluindo a lista de alunos que o frequentam.
- **getInstrumentosPage(instrumentos):** Gera a página com a lista de todos os instrumentos.
- **getInstrumentoPage(instrumento, alunos):** Gera a página com os detalhes de um instrumento específico, incluindo a lista de alunos que o tocam.

## 📂 Lista de Resultados

- [server.js](./src/server.js)
- [myPages.js](./src/myPages.js)
- [db.json](./db.json)