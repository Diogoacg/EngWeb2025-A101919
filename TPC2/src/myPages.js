export function getMainPage(data) {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Escola de Música</title>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet" type="text/css" href="https://www.w3schools.com/w3css/4/w3.css"/>
                <link rel="icon" type="image/x-icon" href="favicon.ico"/>
                <style>
                    .hero-section { 
                        background: linear-gradient(135deg, #6b46c1 0%, #434190 100%);
                        padding: 4rem 2rem;
                        color: white;
                        text-align: center;
                        margin-bottom: 2rem;
                    }
                    .card-link {
                        transition: transform 0.2s;
                        display: block;
                    }
                    .card-link:hover {
                        transform: translateY(-5px);
                    }
                    .custom-shadow {
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }
                </style>
            </head>
            <body class="w3-light-grey">
                <div class="hero-section">
                    <h1 class="w3-xxlarge">Escola de Música</h1>
                    <p class="w3-large">Sistema de Gestão Acadêmica</p>
                </div>

                <div class="w3-container">
                    <div class="w3-row-padding">
                        <div class="w3-third">
                            <a href="/alunos" class="card-link">
                                <div class="w3-card-4 w3-white w3-padding-32 w3-center custom-shadow">
                                    <i class="w3-xxxlarge">👥</i>
                                    <h3>Alunos</h3>
                                </div>
                            </a>
                        </div>
                        <div class="w3-third">
                            <a href="/cursos" class="card-link">
                                <div class="w3-card-4 w3-white w3-padding-32 w3-center custom-shadow">
                                    <i class="w3-xxxlarge">📚</i>
                                    <h3>Cursos</h3>
                                </div>
                            </a>
                        </div>
                        <div class="w3-third">
                            <a href="/instrumentos" class="card-link">
                                <div class="w3-card-4 w3-white w3-padding-32 w3-center custom-shadow">
                                    <i class="w3-xxxlarge">🎵</i>
                                    <h3>Instrumentos</h3>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                <footer class="w3-container w3-center w3-padding-16 w3-text-grey">
                <p>
                    <i class="far fa-copyright" aria-hidden="true"></i> Diogo Gonçalves a101919 - Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a>
                </p>
            </body>
        </html>
    `;
}

export function getAlunosPage(alunos) {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Lista de Alunos</title>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet" type="text/css" href="https://www.w3schools.com/w3css/4/w3.css"/>
                <link rel="icon" type="image/x-icon" href="favicon.ico"/>
                <style>
                    .page-header { 
                        background: linear-gradient(135deg, #6b46c1 0%, #434190 100%);
                        padding: 2rem;
                        color: white;
                        margin-bottom: 2rem;
                    }
                    .custom-table {
                        border-radius: 8px;
                        overflow: hidden;
                    }
                    .table-container {
                        margin: 0 2rem;
                    }
                    .back-button {
                        margin: 2rem;
                        background: #6b46c1 !important;
                    }
                    .back-button:hover {
                        background: #434190 !important;
                    }
                    .clickable-row {
                        cursor: pointer;
                    }
                </style>
                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        var rows = document.querySelectorAll('.clickable-row');
                        rows.forEach(function(row) {
                            row.addEventListener('click', function() {
                                window.location.href = row.dataset.href;
                            });
                        });
                    });
                </script>
            </head>
            <body class="w3-light-grey">
                <div class="page-header">
                    <h1>Lista de Alunos</h1>
                </div>

                <a href="/" class="w3-button back-button w3-round-large">← Voltar</a>

                <div class="table-container">
                    <div class="w3-card-4 custom-table">
                        <table class="w3-table w3-striped w3-bordered w3-white">
                            <thead>
                                <tr class="w3-purple">
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Data de Nascimento</th>
                                    <th>Curso</th>
                                    <th>Ano</th>
                                    <th>Instrumento</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${alunos.map(aluno => `
                                    <tr class="w3-hover-light-grey clickable-row" data-href="/aluno/${aluno.id}">
                                        <td>${aluno.id}</td>
                                        <td>${aluno.nome}</td>
                                        <td>${aluno.dataNasc}</td>
                                        <td>${aluno.curso}</td>
                                        <td>${aluno.anoCurso}</td>
                                        <td>${aluno.instrumento}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <a href="/" class="w3-button back-button w3-round-large">← Voltar</a>

                <footer class="w3-container w3-center w3-padding-16 w3-text-grey">
                <p>
                    <i class="far fa-copyright" aria-hidden="true"></i> Diogo Gonçalves a101919 - Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a>
                </p>
            </body>
        </html>
    `;
}

export function getAlunoPage(aluno) {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Aluno - ${aluno.nome}</title>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet" type="text/css" href="https://www.w3schools.com/w3css/4/w3.css"/>
                <link rel="icon" type="image/x-icon" href="favicon.ico"/>
                <style>
                    .page-header { 
                        background: linear-gradient(135deg, #6b46c1 0%, #434190 100%);
                        padding: 2rem;
                        color: white;
                        margin-bottom: 2rem;
                    }
                    .info-card {
                        max-width: 800px;
                        margin: 0 auto;
                        border-radius: 8px;
                        overflow: hidden;
                    }
                    .info-item {
                        padding: 1rem;
                        border-bottom: 1px solid #eee;
                    }
                    .info-label {
                        color: #666;
                        font-size: 0.9em;
                    }
                    .back-button {
                        background: #6b46c1 !important;
                        margin: 2rem;
                    }
                    .back-button:hover {
                        background: #434190 !important;
                    }
                </style>
            </head>
            <body class="w3-light-grey">
                <div class="page-header">
                    <h1>${aluno.nome}</h1>
                    <p>Detalhes do aluno</p>
                </div>

                <div class="w3-container">
                    <div class="w3-card-4 info-card w3-white">
                        <div class="info-item">
                            <div class="info-label">ID do Aluno</div>
                            <div>${aluno.id}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Data de Nascimento</div>
                            <div>${aluno.dataNasc}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Curso</div>
                            <div>${aluno.curso}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Ano do Curso</div>
                            <div>${aluno.anoCurso}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Instrumento</div>
                            <div>${aluno.instrumento}</div>
                        </div>
                    </div>
                </div>

                <div class="w3-center">
                    <a href="/alunos" class="w3-button back-button w3-round-large">← Voltar para Lista</a>
                </div>

                <footer class="w3-container w3-center w3-padding-16 w3-text-grey">
                <p>
                    <i class="far fa-copyright" aria-hidden="true"></i> Diogo Gonçalves a101919 - Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a>
                </p>
            </body>
        </html>
    `;
}
export function getCursosPage(cursos) {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Lista de Cursos</title>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet" type="text/css" href="https://www.w3schools.com/w3css/4/w3.css"/>
                <link rel="icon" type="image/x-icon" href="favicon.ico"/>
                <style>
                    .page-header { 
                        background: linear-gradient(135deg, #6b46c1 0%, #434190 100%);
                        padding: 2rem;
                        color: white;
                        margin-bottom: 2rem;
                    }
                    .custom-table {
                        border-radius: 8px;
                        overflow: hidden;
                    }
                    .table-container {
                        margin: 0 2rem;
                    }
                    .back-button {
                        margin: 2rem;
                        background: #6b46c1 !important;
                    }
                    .back-button:hover {
                        background: #434190 !important;
                    }
                    .clickable-row {
                        cursor: pointer;
                    }
                </style>
                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        var rows = document.querySelectorAll('.clickable-row');
                        rows.forEach(function(row) {
                            row.addEventListener('click', function() {
                                window.location.href = row.dataset.href;
                            });
                        });
                    });
                </script>
            </head>
            <body class="w3-light-grey">
                <div class="page-header">
                    <h1>Lista de Cursos</h1>
                </div>

                <a href="/" class="w3-button back-button w3-round-large">← Voltar</a>

                <div class="table-container">
                    <div class="w3-card-4 custom-table">
                        <table class="w3-table w3-striped w3-bordered w3-white">
                            <thead>
                                <tr class="w3-purple">
                                    <th>ID</th>
                                    <th>Designação</th>
                                    <th>Duração</th>
                                    <th>Instrumento</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${cursos.map(curso => `
                                    <tr class="w3-hover-light-grey clickable-row" data-href="/curso/${curso.id}">
                                        <td>${curso.id}</td>
                                        <td>${curso.designacao}</td>
                                        <td>${curso.duracao}</td>
                                        <td>${curso.instrumento['#text']}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <a href="/" class="w3-button back-button w3-round-large">← Voltar</a>


                <footer class="w3-container w3-center w3-padding-16 w3-text-grey">
                <p>
                    <i class="far fa-copyright" aria-hidden="true"></i> Diogo Gonçalves a101919 - Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a>
                </p>
            </body>
        </html>
    `;
}
export function getCursoPage(curso, alunos) {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Curso - ${curso.designacao}</title>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet" type="text/css" href="https://www.w3schools.com/w3css/4/w3.css"/>
                <link rel="icon" type="image/x-icon" href="favicon.ico"/>
                <style>
                    .page-header { 
                        background: linear-gradient(135deg, #6b46c1 0%, #434190 100%);
                        padding: 2rem;
                        color: white;
                        margin-bottom: 2rem;
                    }
                    .info-card {
                        max-width: 800px;
                        margin: 0 auto;
                        border-radius: 8px;
                        overflow: hidden;
                    }
                    .info-item {
                        padding: 1rem;
                        border-bottom: 1px solid #eee;
                    }
                    .info-label {
                        color: #666;
                        font-size: 0.9em;
                    }
                    .back-button {
                        background: #6b46c1 !important;
                        margin: 2rem;
                    }
                    .back-button:hover {
                        background: #434190 !important;
                    }
                    .clickable-row {
                        cursor: pointer;
                    }
                </style>
                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        var rows = document.querySelectorAll('.clickable-row');
                        rows.forEach(function(row) {
                            row.addEventListener('click', function() {
                                window.location.href = row.dataset.href;
                            });
                        });
                    });
                </script>
            </head>
            <body class="w3-light-grey">
                <div class="page-header">
                    <h1>${curso.designacao}</h1>
                    <p>Detalhes do curso</p>
                </div>

                <div class="w3-container">
                    <div class="w3-card-4 info-card w3-white">
                        <div class="info-item">
                            <div class="info-label">ID do Curso</div>
                            <div>${curso.id}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Duração</div>
                            <div>${curso.duracao}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Instrumento</div>
                            <div>${curso.instrumento['#text']}</div>
                        </div>
                    </div>
                </div>

                <div class="w3-container">
                    <h2>Alunos</h2>
                    <ul class="w3-ul w3-hoverable">
                        ${alunos.map(aluno => `
                            <li class="w3-padding-16 clickable-row" data-href="/aluno/${aluno.id}">
                                ${aluno.nome}
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="w3-center">
                    <a href="/cursos" class="w3-button back-button w3-round-large">← Voltar para Lista</a>
                </div>

                <footer class="w3-container w3-center w3-padding-16 w3-text-grey">
                <p>
                    <i class="far fa-copyright" aria-hidden="true"></i> Diogo Gonçalves a101919 - Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a>
                </p>
            </body>
        </html>
    `;
}
export function getInstrumentosPage(instrumentos) {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Lista de Instrumentos</title>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet" type="text/css" href="https://www.w3schools.com/w3css/4/w3.css"/>
                <link rel="icon" type="image/x-icon" href="favicon.ico"/>
                <style>
                    .page-header { 
                        background: linear-gradient(135deg, #6b46c1 0%, #434190 100%);
                        padding: 2rem;
                        color: white;
                        margin-bottom: 2rem;
                    }
                    .custom-table {
                        border-radius: 8px;
                        overflow: hidden;
                    }
                    .table-container {
                        margin: 0 2rem;
                    }
                    .back-button {
                        margin: 2rem;
                        background: #6b46c1 !important;
                    }
                    .back-button:hover {
                        background: #434190 !important;
                    }
                    .clickable-row {
                        cursor: pointer;
                    }
                </style>
                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        var rows = document.querySelectorAll('.clickable-row');
                        rows.forEach(function(row) {
                            row.addEventListener('click', function() {
                                window.location.href = row.dataset.href;
                            });
                        });
                    });
                </script>
            </head>
            <body class="w3-light-grey">
                <div class="page-header">
                    <h1>Lista de Instrumentos</h1>
                </div>

                <a href="/" class="w3-button back-button w3-round-large">← Voltar</a>

                <div class="table-container">
                    <div class="w3-card-4 custom-table">
                        <table class="w3-table w3-striped w3-bordered w3-white">
                            <thead>
                                <tr class="w3-purple">
                                    <th>ID</th>
                                    <th>Nome</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${instrumentos.map(instrumento => `
                                    <tr class="w3-hover-light-grey clickable-row" data-href="/instrumento/${instrumento.id}">
                                        <td>${instrumento.id}</td>
                                        <td>${instrumento['#text']}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <a href="/" class="w3-button back-button w3-round-large">← Voltar</a>

                <footer class="w3-container w3-center w3-padding-16 w3-text-grey">
                <p>
                    <i class="far fa-copyright" aria-hidden="true"></i> Diogo Gonçalves a101919 - Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a>
                </p>
            </body>
        </html>
    `;
}
export function getInstrumentoPage(instrumento, alunos) {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Instrumento - ${instrumento['#text']}</title>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet" type="text/css" href="https://www.w3schools.com/w3css/4/w3.css"/>
                <link rel="icon" type="image/x-icon" href="favicon.ico"/>
                <style>
                    .page-header { 
                        background: linear-gradient(135deg, #6b46c1 0%, #434190 100%);
                        padding: 2rem;
                        color: white;
                        margin-bottom: 2rem;
                    }
                    .info-card {
                        max-width: 800px;
                        margin: 0 auto;
                        border-radius: 8px;
                        overflow: hidden;
                    }
                    .info-item {
                        padding: 1rem;
                        border-bottom: 1px solid #eee;
                    }
                    .info-label {
                        color: #666;
                        font-size: 0.9em;
                    }
                    .back-button {
                        background: #6b46c1 !important;
                        margin: 2rem;
                    }
                    .back-button:hover {
                        background: #434190 !important;
                    }
                    .clickable-row {
                        cursor: pointer;
                    }
                </style>
                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        var rows = document.querySelectorAll('.clickable-row');
                        rows.forEach(function(row) {
                            row.addEventListener('click', function() {
                                window.location.href = row.dataset.href;
                            });
                        });
                    });
                </script>
            </head>
            <body class="w3-light-grey">
                <div class="page-header">
                    <h1>${instrumento['#text']}</h1>
                    <p>Detalhes do instrumento</p>
                </div>

                <div class="w3-container">
                    <div class="w3-card-4 info-card w3-white">
                        <div class="info-item">
                            <div class="info-label">ID do Instrumento</div>
                            <div>${instrumento.id}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Nome</div>
                            <div>${instrumento['#text']}</div>
                        </div>
                    </div>
                </div>

                <div class="w3-container">
                    <h2>Alunos</h2>
                    <ul class="w3-ul w3-hoverable">
                        ${alunos.map(aluno => `
                            <li class="w3-padding-16 clickable-row" data-href="/aluno/${aluno.id}">
                                ${aluno.nome}
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="w3-center">
                    <a href="/instrumentos" class="w3-button back-button w3-round-large">← Voltar para Lista</a>
                </div>


                <footer class="w3-container w3-center w3-padding-16 w3-text-grey">
                <p>
                    <i class="far fa-copyright" aria-hidden="true"></i> Diogo Gonçalves a101919 - Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a>
                </p>
            </body>
        </html>
    `;
}
