exports.studentsListPage = function(slist, d, message = ''){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="icon" href="public/favicon.png"/>
            <link rel="stylesheet" href="public/w3.css"/>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
            <title>Student Management</title>
            <style>
                body {
                    font-family: 'Poppins', sans-serif;
                    background-color: #f5f7fa;
                }
                .page-header {
                    margin-bottom: 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .card-container {
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                }
                .header-container {
                    background: linear-gradient(135deg, #00897b, #009688);
                    color: white;
                    padding: 25px 20px;
                }
                .add-btn {
                    background-color: white !important;
                    color: #009688 !important;
                    border-radius: 50% !important;
                    width: 42px;
                    height: 42px;
                    font-size: 20px;
                    padding: 0;
                    line-height: 42px;
                    text-align: center;
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
                    transition: all 0.3s ease;
                }
                .add-btn:hover {
                    background-color: #eee !important;
                    transform: scale(1.05);
                }
                .table-container {
                    padding: 20px;
                }
                .modern-table {
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
                }
                .modern-table th {
                    background: rgba(0, 150, 136, 0.1) !important;
                    color: #00695c !important;
                    font-weight: 500;
                    letter-spacing: 0.5px;
                }
                .action-btn {
                    border-radius: 20px !important;
                    padding: 4px 16px !important;
                    font-size: 13px !important;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }
                .action-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                }
                .edit-btn {
                    background-color: #3f51b5 !important;
                }
                .delete-btn {
                    background-color: #e53935 !important;
                }
                .student-link {
                    color: #00897b;
                    text-decoration: none;
                    font-weight: 500;
                    position: relative;
                }
                .student-link::after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 2px;
                    bottom: -2px;
                    left: 0;
                    background-color: #00897b;
                    transform: scaleX(0);
                    transition: transform 0.3s ease;
                }
                .student-link:hover::after {
                    transform: scaleX(1);
                }
                .footer-container {
                    background: linear-gradient(135deg, #00897b, #009688);
                    color: rgba(255, 255, 255, 0.8);
                    padding: 15px 20px;
                    font-size: 14px;
                }
                .success-alert {
                    background-color: #4caf50 !important;
                    border-radius: 8px;
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
                    padding: 15px 20px;
                    color: white;
                    margin-bottom: 20px;
                    position: relative;
                    animation: slideDown 0.5s ease forwards;
                }
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            </style>
        </head>
        <body>
            <div class="w3-container w3-margin">
                <div class="card-container w3-card-4 w3-white">
                    <header class="header-container">
                        <div class="page-header">
                            <h1 class="w3-xlarge">Gestão de Alunos</h1>
                            <a class="w3-btn add-btn" href="/alunos/registo">+</a>
                        </div>
                    </header>
            
                    <div class="table-container">
                        ${message ? `<div class="success-alert"><i class="fas fa-check-circle" style="margin-right: 8px;"></i>${message}</div>` : ''}
                        <div class="modern-table">
                            <table class="w3-table-all w3-hoverable w3-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>GitHub</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                    `
    for(let i=0; i < slist.length ; i++){
        pagHTML += `
                <tr>
                    <td>${slist[i].id}</td>
                    <td>
                        <a class="student-link" href="/alunos/${slist[i].id}">
                            ${slist[i].name}
                        </a>
                    </td>
                    <td><a href="${slist[i].gitlink}" target="_blank" class="student-link"><i class="fab fa-github" style="margin-right: 5px;"></i>${slist[i].gitlink.replace('https://github.com/', '')}</a></td>
                    <td>
                        <a class="w3-btn action-btn edit-btn" href="/alunos/edit/${slist[i].id}"><i class="fas fa-edit" style="margin-right: 5px;"></i>Editar</a>
                        <a class="w3-btn action-btn delete-btn" href="/alunos/delete/${slist[i].id}"><i class="fas fa-trash-alt" style="margin-right: 5px;"></i>Eliminar</a>
                    </td>
                </tr>
        `
    }

    pagHTML += `
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <footer class="footer-container">
                        <h5>Gerado por EngWeb2025 em ${d}</h5>
                    </footer>
                </div>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

exports.studentFormPage = function(d, message = ''){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="icon" href="public/favicon.png"/>
            <link rel="stylesheet" href="public/w3.css"/>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
            <title>Registar Aluno</title>
            <style>
                body {
                    font-family: 'Poppins', sans-serif;
                    background-color: #f5f7fa;
                }
                .card-container {
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                }
                .header-container {
                    background: linear-gradient(135deg, #00897b, #009688);
                    color: white;
                    padding: 25px 20px;
                }
                .form-container {
                    padding: 30px 20px;
                }
                .form-field {
                    margin-bottom: 25px;
                }
                .w3-input {
                    border-radius: 4px !important;
                    padding: 12px !important;
                    border: 1px solid #e0e0e0 !important;
                    transition: all 0.3s ease;
                }
                .w3-input:focus {
                    border-color: #00897b !important;
                    box-shadow: 0 0 0 2px rgba(0, 137, 123, 0.2) !important;
                }
                fieldset {
                    border-radius: 8px;
                    border: 1px solid #e0e0e0;
                    padding: 20px;
                    margin-bottom: 25px;
                }
                legend {
                    font-weight: 500;
                    color: #00695c;
                    padding: 0 10px;
                    font-size: 16px;
                }
                label {
                    font-weight: 500;
                    color: #616161;
                    margin-bottom: 8px;
                    display: block;
                    font-size: 14px;
                }
                .checkbox-container {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 15px;
                    margin-top: 15px;
                }
                .checkbox-item {
                    display: flex;
                    align-items: center;
                }
                .checkbox-item label {
                    margin-left: 8px;
                    margin-bottom: 0;
                }
                .submit-btn {
                    background: linear-gradient(135deg, #00897b, #009688) !important;
                    color: white !important;
                    border-radius: 30px !important;
                    padding: 12px 30px !important;
                    text-transform: uppercase;
                    font-weight: 500;
                    letter-spacing: 1px;
                    border: none;
                    box-shadow: 0 4px 15px rgba(0, 137, 123, 0.3);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .submit-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(0, 137, 123, 0.4);
                }
                .footer-container {
                    background: linear-gradient(135deg, #00897b, #009688);
                    color: rgba(255, 255, 255, 0.8);
                    padding: 15px 20px;
                    font-size: 14px;
                }
                .back-link {
                    color: white;
                    text-decoration: none;
                    font-weight: 500;
                    opacity: 0.8;
                    transition: opacity 0.3s ease;
                }
                .back-link:hover {
                    opacity: 1;
                }
                .success-alert {
                    background-color: #4caf50 !important;
                    border-radius: 8px;
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
                    padding: 15px 20px;
                    color: white;
                    margin-bottom: 20px;
                    position: relative;
                    animation: slideDown 0.5s ease forwards;
                }
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            </style>
        </head>
        <body>
            <div class="w3-container w3-margin">
                <div class="card-container w3-card-4 w3-white">
                    <header class="header-container">
                        <h2><i class="fas fa-user-plus" style="margin-right: 10px;"></i>Registar Novo Aluno</h2>
                    </header>
            
                    <div class="form-container">
                        ${message ? `<div class="success-alert"><i class="fas fa-check-circle" style="margin-right: 8px;"></i>${message}</div>` : ''}
                        <form action="/alunos/registo" method="POST">
                            <fieldset>
                                <legend><i class="fas fa-id-card" style="margin-right: 8px;"></i>Informações Pessoais</legend>
                                
                                <div class="form-field">
                                    <label for="id">ID do Aluno</label>
                                    <input id="id" class="w3-input" type="text" name="id" required/>
                                </div>
                                
                                <div class="form-field">
                                    <label for="name">Nome Completo</label>
                                    <input id="name" class="w3-input" type="text" name="name" required/>
                                </div>
                                
                                <div class="form-field">
                                    <label for="gitlink">Perfil GitHub</label>
                                    <input id="gitlink" class="w3-input" type="url" name="gitlink" placeholder="https://github.com/username" required/>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend><i class="fas fa-tasks" style="margin-right: 8px;"></i>Trabalhos de Casa</legend>
                                <div class="checkbox-container">
                                    <div class="checkbox-item">
                                        <input class="w3-check" type="checkbox" id="tpc1" name="tpc1" value="1"/>
                                        <label for="tpc1">TPC1</label>
                                    </div>
                                    <div class="checkbox-item">
                                        <input class="w3-check" type="checkbox" id="tpc2" name="tpc2" value="1"/>
                                        <label for="tpc2">TPC2</label>
                                    </div>
                                    <div class="checkbox-item">
                                        <input class="w3-check" type="checkbox" id="tpc3" name="tpc3" value="1"/>
                                        <label for="tpc3">TPC3</label>
                                    </div>
                                    <div class="checkbox-item">
                                        <input class="w3-check" type="checkbox" id="tpc4" name="tpc4" value="1"/>
                                        <label for="tpc4">TPC4</label>
                                    </div>
                                    <div class="checkbox-item">
                                        <input class="w3-check" type="checkbox" id="tpc5" name="tpc5" value="1"/>
                                        <label for="tpc5">TPC5</label>
                                    </div>
                                    <div class="checkbox-item">
                                        <input class="w3-check" type="checkbox" id="tpc6" name="tpc6" value="1"/>
                                        <label for="tpc6">TPC6</label>
                                    </div>
                                    <div class="checkbox-item">
                                        <input class="w3-check" type="checkbox" id="tpc7" name="tpc7" value="1"/>
                                        <label for="tpc7">TPC7</label>
                                    </div>
                                    <div class="checkbox-item">
                                        <input class="w3-check" type="checkbox" id="tpc8" name="tpc8" value="1"/>
                                        <label for="tpc8">TPC8</label>
                                    </div>
                                </div>
                            </fieldset>
                            
                            <div style="text-align: center; margin-top: 30px;">
                                <button class="submit-btn" type="submit">Registar Aluno</button>
                            </div>
                        </form>
                    </div>

                    <footer class="footer-container">
                        <h5>Gerado por EngWeb2025 em ${d} - [<a class="back-link" href="/"><i class="fas fa-home" style="margin-right: 5px;"></i>Voltar</a>]</h5>
                    </footer>
                </div>
            </div>
        </body>
    </html>
    `
}

exports.studentFormEditPage = function(a, d, message = ''){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="icon" href="public/favicon.png"/>
            <link rel="stylesheet" href="public/w3.css"/>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
            <title>Editar Aluno</title>
            <style>
                body {
                    font-family: 'Poppins', sans-serif;
                    background-color: #f5f7fa;
                }
                .card-container {
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                }
                .header-container {
                    background: linear-gradient(135deg, #3f51b5, #5c6bc0);
                    color: white;
                    padding: 25px 20px;
                }
                .form-container {
                    padding: 30px 20px;
                }
                .form-field {
                    margin-bottom: 25px;
                }
                .w3-input {
                    border-radius: 4px !important;
                    padding: 12px !important;
                    border: 1px solid #e0e0e0 !important;
                    transition: all 0.3s ease;
                }
                .w3-input:focus {
                    border-color: #3f51b5 !important;
                    box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.2) !important;
                }
                fieldset {
                    border-radius: 8px;
                    border: 1px solid #e0e0e0;
                    padding: 20px;
                    margin-bottom: 25px;
                }
                legend {
                    font-weight: 500;
                    color: #3949ab;
                    padding: 0 10px;
                    font-size: 16px;
                }
                label {
                    font-weight: 500;
                    color: #616161;
                    margin-bottom: 8px;
                    display: block;
                    font-size: 14px;
                }
                .checkbox-container {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 15px;
                    margin-top: 15px;
                }
                .checkbox-item {
                    display: flex;
                    align-items: center;
                }
                .checkbox-item label {
                    margin-left: 8px;
                    margin-bottom: 0;
                }
                .submit-btn {
                    background: linear-gradient(135deg, #3f51b5, #5c6bc0) !important;
                    color: white !important;
                    border-radius: 30px !important;
                    padding: 12px 30px !important;
                    text-transform: uppercase;
                    font-weight: 500;
                    letter-spacing: 1px;
                    border: none;
                    box-shadow: 0 4px 15px rgba(63, 81, 181, 0.3);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .submit-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(63, 81, 181, 0.4);
                }
                .footer-container {
                    background: linear-gradient(135deg, #3f51b5, #5c6bc0);
                    color: rgba(255, 255, 255, 0.8);
                    padding: 15px 20px;
                    font-size: 14px;
                }
                .back-link {
                    color: white;
                    text-decoration: none;
                    font-weight: 500;
                    opacity: 0.8;
                    transition: opacity 0.3s ease;
                }
                .back-link:hover {
                    opacity: 1;
                }
                .success-alert {
                    background-color: #4caf50 !important;
                    border-radius: 8px;
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
                    padding: 15px 20px;
                    color: white;
                    margin-bottom: 20px;
                    position: relative;
                    animation: slideDown 0.5s ease forwards;
                }
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            </style>
        </head>
        <body>
            <div class="w3-container w3-margin">
                <div class="card-container w3-card-4 w3-white">
                    <header class="header-container">
                        <h2><i class="fas fa-user-edit" style="margin-right: 10px;"></i>Editar Aluno</h2>
                    </header>
            
                    <div class="form-container">
                        ${message ? `<div class="success-alert"><i class="fas fa-check-circle" style="margin-right: 8px;"></i>${message}</div>` : ''}
                        <form action="/alunos/edit/${a.id}" method="POST">
                            <fieldset>
                                <legend><i class="fas fa-id-card" style="margin-right: 8px;"></i>Informações Pessoais</legend>
                                
                                <div class="form-field">
                                    <label for="id">ID do Aluno</label>
                                    <input id="id" class="w3-input" type="text" name="id" readonly value="${a.id}"/>
                                </div>
                                
                                <div class="form-field">
                                    <label for="name">Nome Completo</label>
                                    <input id="name" class="w3-input" type="text" name="name" value="${a.name}" required/>
                                </div>
                                
                                <div class="form-field">
                                    <label for="gitlink">Perfil GitHub</label>
                                    <input id="gitlink" class="w3-input" type="url" name="gitlink" value="${a.gitlink}" required/>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend><i class="fas fa-tasks" style="margin-right: 8px;"></i>Trabalhos de Casa</legend>
                                <div class="checkbox-container">
                    `

    for(i=1; i < 9; i++){
        var tpc = "tpc" + i
        if(tpc in a){
            pagHTML += `
                <div class="checkbox-item">
                    <input class="w3-check" type="checkbox" id="tpc${i}" name="tpc${i}" value="1" checked/>
                    <label for="tpc${i}">TPC${i}</label>
                </div>`
        }
        else{
            pagHTML += `
                <div class="checkbox-item">
                    <input class="w3-check" type="checkbox" id="tpc${i}" name="tpc${i}" value="1"/>
                    <label for="tpc${i}">TPC${i}</label>
                </div>`
        }
    }      

    pagHTML += `
                                </div>
                            </fieldset>
                            
                            <div style="text-align: center; margin-top: 30px;">
                                <button class="submit-btn" type="submit">Guardar Alterações</button>
                            </div>
                        </form>
                    </div>

                    <footer class="footer-container">
                        <h5>Gerado por EngWeb2025 em ${d} - [<a class="back-link" href="/"><i class="fas fa-home" style="margin-right: 5px;"></i>Voltar</a>]</h5>
                    </footer>
                </div>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

exports.studentPage = function(aluno, d, message = ''){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="icon" href="public/favicon.png"/>
            <link rel="stylesheet" href="public/w3.css"/>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
            <title>Detalhes do Aluno</title>
            <style>
                body {
                    font-family: 'Poppins', sans-serif;
                    background-color: #f5f7fa;
                }
                .card-container {
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                }
                .header-container {
                    background: linear-gradient(135deg, #673ab7, #9c27b0);
                    color: white;
                    padding: 25px 20px;
                    position: relative;
                }
                .details-container {
                    padding: 30px 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .student-card {
                    background-color: white;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
                }
                .student-header {
                    background-color: rgba(103, 58, 183, 0.1);
                    color: #673ab7;
                    padding: 15px;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .student-header h3 {
                    margin: 0;
                    font-size: 18px;
                }
                .student-body {
                    padding: 20px;
                }
                .student-info {
                    margin-bottom: 30px;
                }
                .info-item {
                    margin-bottom: 15px;
                    display: flex;
                    align-items: flex-start;
                }
                .info-label {
                    font-weight: 500;
                    color: #673ab7;
                    width: 100px;
                    margin-right: 15px;
                }
                .info-value {
                    flex: 1;
                }
                .github-link {
                    color: #673ab7;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    transition: all 0.3s ease;
                }
                .github-link:hover {
                    color: #9c27b0;
                }
                .github-icon {
                    margin-right: 8px;
                    font-size: 18px;
                }
                .tpc-container {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 15px;
                }
                .tpc-item {
                    background: rgba(103, 58, 183, 0.1);
                    border-radius: 8px;
                    padding: 12px;
                    text-align: center;
                    color: #673ab7;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }
                .tpc-item:hover {
                    background: rgba(103, 58, 183, 0.15);
                    transform: translateY(-3px);
                }
                .action-buttons {
                    display: flex;
                    justify-content: flex-end;
                    gap: 15px;
                    margin-top: 30px;
                }
                .btn {
                    padding: 10px 20px;
                    border-radius: 30px;
                    font-weight: 500;
                    text-transform: uppercase;
                    font-size: 14px;
                    letter-spacing: 0.5px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-decoration: none;
                }
                .btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                }
                .btn-edit {
                    background-color: #3f51b5;
                    color: white;
                }
                .btn-delete {
                    background-color: #e53935;
                    color: white;
                }
                .btn-back {
                    background-color: #607d8b;
                    color: white;
                }
                .footer-container {
                    background: linear-gradient(135deg, #673ab7, #9c27b0);
                    color: rgba(255, 255, 255, 0.8);
                    padding: 15px 20px;
                    font-size: 14px;
                }
                .back-link {
                    color: white;
                    text-decoration: none;
                    font-weight: 500;
                    opacity: 0.8;
                    transition: opacity 0.3s ease;
                }
                .back-link:hover {
                    opacity: 1;
                }
                .success-alert {
                    background-color: #4caf50 !important;
                    border-radius: 8px;
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
                    padding: 15px 20px;
                    color: white;
                    margin-bottom: 20px;
                    position: relative;
                    animation: slideDown 0.5s ease forwards;
                }
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            </style>
        </head>
        <body>
            <div class="w3-container w3-margin">
                <div class="card-container w3-card-4 w3-white">
                    <header class="header-container">
                        <h2><i class="fas fa-user" style="margin-right: 10px;"></i>Detalhes do Aluno</h2>
                    </header>
            
                    <div class="details-container">
                        ${message ? `<div class="success-alert"><i class="fas fa-check-circle" style="margin-right: 8px;"></i>${message}</div>` : ''}
                        
                        <div class="student-card">
                            <div class="student-header">
                                <h3><i class="fas fa-id-card" style="margin-right: 8px;"></i>Informações Pessoais</h3>
                            </div>
                            <div class="student-body">
                                <div class="student-info">
                                    <div class="info-item">
                                        <div class="info-label">ID</div>
                                        <div class="info-value">${aluno.id}</div>
                                    </div>
                                    <div class="info-item">
                                        <div class="info-label">Nome</div>
                                        <div class="info-value">${aluno.name}</div>
                                    </div>
                                    <div class="info-item">
                                        <div class="info-label">GitHub</div>
                                        <div class="info-value">
                                            <a href="${aluno.gitlink}" target="_blank" class="github-link">
                                                <i class="fab fa-github github-icon"></i>
                                                ${aluno.gitlink.replace('https://github.com/', '')}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="student-card">
                            <div class="student-header">
                                <h3><i class="fas fa-tasks" style="margin-right: 8px;"></i>Trabalhos de Casa</h3>
                            </div>
                            <div class="student-body">
                                <div class="tpc-container">
                    `
                    
    // Verificar quais TPCs o aluno tem completos
    let hasTPC = false;
    for(let i=1; i < 9; i++){
        var key = `tpc${i}`
        if(aluno[key]){
            hasTPC = true;
            pagHTML += `<div class="tpc-item"><i class="fas fa-check-circle" style="margin-right: 5px;"></i>TPC${i}</div>`
        }
    }
    
    // Se não tiver nenhum TPC, mostrar mensagem
    if(!hasTPC){
        pagHTML += `<div style="grid-column: 1 / -1; text-align: center; color: #9e9e9e; padding: 20px;">Nenhum trabalho de casa registado</div>`
    }
        
    pagHTML += `
                                </div>
                                
                                <div class="action-buttons">
                                    <a href="/" class="btn btn-back"><i class="fas fa-home" style="margin-right: 5px;"></i>Voltar</a>
                                    <a href="/alunos/edit/${aluno.id}" class="btn btn-edit"><i class="fas fa-edit" style="margin-right: 5px;"></i>Editar</a>
                                    <a href="/alunos/delete/${aluno.id}" class="btn btn-delete" onclick="return confirm('Tem certeza que deseja excluir este aluno?')"><i class="fas fa-trash-alt" style="margin-right: 5px;"></i>Eliminar</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer class="footer-container">
                        <h5>Gerado por EngWeb2025 em ${d} - [<a class="back-link" href="/"><i class="fas fa-home" style="margin-right: 5px;"></i>Voltar</a>]</h5>
                    </footer>
                </div>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

exports.errorPage = function(errorMessage, d){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="icon" href="public/favicon.png"/>
            <link rel="stylesheet" href="public/w3.css"/>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
            <title>Erro</title>
            <style>
                body {
                    font-family: 'Poppins', sans-serif;
                    background-color: #f5f7fa;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0;
                }
                .card-container {
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    width: 100%;
                    max-width: 800px;
                }
                .header-container {
                    background: linear-gradient(135deg, #e53935, #f44336);
                    color: white;
                    padding: 25px 20px;
                }
                .error-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 40px 20px;
                    text-align: center;
                }
                .error-icon {
                    font-size: 80px;
                    color: #f44336;
                    margin-bottom: 20px;
                }
                .error-title {
                    font-size: 24px;
                    color: #333;
                    margin-bottom: 15px;
                    font-weight: 600;
                }
                .error-message {
                    font-size: 16px;
                    color: #666;
                    margin-bottom: 30px;
                    line-height: 1.6;
                    max-width: 600px;
                }
                .btn {
                    padding: 12px 30px;
                    border-radius: 30px;
                    font-weight: 500;
                    text-transform: uppercase;
                    font-size: 14px;
                    letter-spacing: 1px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-decoration: none;
                }
                .btn-home {
                    background: linear-gradient(135deg, #e53935, #f44336);
                    color: white;
                    box-shadow: 0 4px 15px rgba(229, 57, 53, 0.3);
                }
                .btn-home:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(229, 57, 53, 0.4);
                }
                .footer-container {
                    background: linear-gradient(135deg, #e53935, #f44336);
                    color: rgba(255, 255, 255, 0.8);
                    padding: 15px 20px;
                    font-size: 14px;
                }
                .back-link {
                    color: white;
                    text-decoration: none;
                    font-weight: 500;
                    opacity: 0.8;
                    transition: opacity 0.3s ease;
                }
                .back-link:hover {
                    opacity: 1;
                }
            </style>
        </head>
        <body>
            <div class="w3-container">
                <div class="card-container w3-card-4 w3-white">
                    <header class="header-container">
                        <h2><i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>Erro</h2>
                    </header>
            
                    <div class="error-container">
                        <div class="error-icon">
                            <i class="fas fa-exclamation-circle"></i>
                        </div>
                        <h3 class="error-title">Algo deu errado!</h3>
                        <p class="error-message">${errorMessage}</p>
                        <a href="/" class="btn btn-home">
                            <i class="fas fa-home" style="margin-right: 8px;"></i>
                            Voltar à página inicial
                        </a>
                    </div>

                    <footer class="footer-container">
                        <h5>Gerado por EngWeb2025 em ${d}</h5>
                    </footer>
                </div>
            </div>
        </body>
    </html>
    `
}