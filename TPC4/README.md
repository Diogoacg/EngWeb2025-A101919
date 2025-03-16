# Manifesto TPC4

## 📌 Título

Sistema de Gestão de Filmes e Atores

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

O TPC4 consiste no desenvolvimento de um sistema de gestão de filmes e atores utilizando Node.js, Express e Pug. O sistema utiliza a API fornecida pelo json-server para armazenar e manipular registos de filmes. A aplicação permite a visualização, criação, edição e remoção de filmes, bem como pesquisa e filtragem avançadas através de uma interface web moderna e responsiva. Adicionalmente, implementa uma navegação por atores permitindo visualizar filmografias completas.

A aplicação implementa operações CRUD completas (Create, Read, Update, Delete) e funcionalidades avançadas de filtragem por géneros (com lógica AND) e pesquisa por título ou atores, apresentando uma interface de utilizador amigável com design moderno utilizando W3.CSS e Font Awesome.

### app.js

Este ficheiro contém a configuração principal da aplicação Express, configurando o motor de templates Pug, middleware para processamento de JSON e formulários, rotas para os recursos estáticos e os routers de filmes e atores.

- **GET /:** Redireciona para a lista de filmes.
- **Middleware de Erro:** Tratamento de erros e páginas 404.

### routes/movies.js

Este ficheiro contém o router que gere todas as operações relacionadas com filmes:

- **GET /:** Lista de todos os filmes com opções de filtragem e pesquisa.
- **GET /movies/:id:** Detalhes de um filme específico.
- **GET /movies/registo:** Formulário para registar um novo filme.
- **POST /movies/registo:** Processa o registo de um novo filme.
- **GET /movies/edit/:idMovie:** Formulário para editar um filme existente.
- **POST /movies/edit/:idMovie:** Processa a edição de um filme existente.
- **GET /movies/delete/:idMovie:** Remove um filme e redireciona para a lista.
- **GET /movies/check-id/:id:** Endpoint para verificar se um ID já existe (evitar duplicados).

### routes/actors.js

Este ficheiro contém o router que gere todas as operações relacionadas com atores:

- **GET /:** Lista de todos os atores extraídos das listas de elenco dos filmes.
- **GET /actors/:actorName:** Perfil de um ator com sua filmografia completa.

## 🚀 Características Principais

1. **Filtragem por Géneros:** Permite selecionar múltiplos géneros com lógica AND (mostra filmes que têm TODOS os géneros selecionados).
2. **Pesquisa Avançada:** Pesquisa por título ou nomes de atores.
3. **Validação de IDs:** Sistema que verifica automaticamente se um ID de filme já existe e previne duplicados.
4. **Perfis de Atores:** Sistema de navegação por atores que permite ver todos os filmes em que um ator participou.
5. **Layout Responsivo:** Interface que se adapta a dispositivos móveis e computadores.
6. **Design em Cartões:** Visualização de filmes e atores em formato de cartões com alinhamento uniforme.

## 🛠️ Tecnologias Utilizadas

- **Node.js:** Backend da aplicação.
- **Express:** Framework web para Node.js.
- **Pug:** Motor de templates para geração de HTML.
- **Axios:** Cliente HTTP para comunicação com a API.
- **W3.CSS:** Framework CSS leve para estilização.
- **Font Awesome:** Biblioteca de ícones.
- **json-server:** API RESTful simulada para armazenamento de dados.

## 📂 Estrutura do Projeto

### Rotas
- **routes/movies.js** - Router para todas as operações relacionadas com filmes
- **routes/actors.js** - Router para todas as operações relacionadas com atores

### Templates Pug
- **views/layout.pug** - Template base com barra de navegação e estrutura comum
- **views/moviesListPage.pug** - Lista de filmes com filtros e pesquisa
- **views/moviePage.pug** - Página de detalhes de um filme
- **views/movieFormPage.pug** - Formulário para adicionar um novo filme
- **views/movieFormEditPage.pug** - Formulário para editar um filme existente
- **views/actorslistpage.pug** - Lista de todos os atores do sistema
- **views/actorespage.pug** - Página de perfil de um ator com filmografia
- **views/error.pug** - Página de erro

## 🌟 Funcionalidades Destacadas

### Sistema de Filtragem por Géneros
O sistema implementa uma filtragem avançada que permite selecionar múltiplos géneros e mostra apenas os filmes que correspondem a todos os géneros selecionados (lógica AND). Os géneros são extraídos dinamicamente da base de dados.

### Pesquisa Inteligente
A funcionalidade de pesquisa permite encontrar filmes pelo título ou pelos atores que participam neles, com a opção de escolher onde procurar (título, atores ou ambos).

### Validação de IDs
Para evitar duplicados na base de dados, a aplicação verifica em tempo real se um ID já existe e fornece feedback visual imediato ao utilizador, com a opção de gerar um ID único automaticamente.

### Sistema de Perfis de Atores
A aplicação agora permite navegar não só por filmes, mas também por atores:

1. **Lista de Atores:** Página que mostra todos os atores do sistema com contagem de filmes.
2. **Perfil do Ator:** Página dedicada a cada ator, mostrando:
   - Número total de filmes em que participou
   - Géneros predominantes na filmografia do ator
   - Lista completa de filmes ordenados por ano (do mais recente para o mais antigo)
3. **Navegação Integrada:** Links para atores nas páginas de filmes e vice-versa, criando uma navegação integrada por todo o sistema.

### Tratamento de Dados Robusto
O sistema implementa validações e conversões para garantir que tanto arrays quanto strings sejam tratados corretamente, evitando erros comuns como "join is not a function" ou separação incorreta de nomes de atores.

## 🚀 Como Executar

1. Iniciar o json-server para fornecer a API:
    ```bash
    json-server --watch cinemaFormatted.json --port 3000
    ```

2. Instalar as dependências:
    ```bash
    npm install
    ```

3. Iniciar o servidor Express:
    ```bash
    npm start
    ```

4. Aceder à aplicação em [http://localhost:3030](http://localhost:3030).

## 📂 Lista de Resultados

- views/layout.pug - Template base comum
- views/moviesListPage.pug - Página de listagem de filmes
- views/moviePage.pug - Página de detalhes de um filme
- views/movieFormPage.pug - Formulário para adicionar um filme
- views/movieFormEditPage.pug - Formulário para editar um filme
- views/actorslistpage.pug - Lista de todos os atores
- views/actorespage.pug - Perfil de um ator específico
- views/error.pug - Página de erro
- routes/movies.js - Router para operações de filmes
- routes/actors.js - Router para operações de atores
- app.js - Configuração principal da aplicação
- formatMovies.py - Script Python para formatar dados de filmes
- cinema.json - Dados de exemplo em formato JSON
- cinemaFormatted.json - Dados de exemplo formatados para a aplicação