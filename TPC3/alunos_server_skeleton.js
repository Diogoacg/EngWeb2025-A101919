var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates')
var static = require('./static.js')

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation
var alunosServer = http.createServer((req, res) => {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                if(req.url == "/"){
                    res.writeHead(302, {'Location': '/alunos'})
                    res.end()
                }
                else if(req.url == "/alunos" || req.url.startsWith("/alunos?deleted=true")){
                    axios.get('http://localhost:3000/alunos')
                        .then(response => {
                            var alunos = response.data
                            let message = req.url.includes("deleted=true") ? "Aluno removido com sucesso!" : ""
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.studentsListPage(alunos, d, message))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.errorPage("Não foi possível obter a lista de alunos...", d))
                            res.end()
                        })
                }
                else if(req.url == "/alunos/registo"){
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(templates.studentFormPage(d))
                    res.end()
                }
                else if(req.url.match(/\/alunos\/[A-Za-z0-9]+$/)){
                    var idAluno = req.url.split("/")[2]
                    axios.get('http://localhost:3000/alunos/' + idAluno)
                        .then(response => {
                            let aluno = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.studentPage(aluno, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.errorPage("Não foi possível obter o registo do aluno...", d))
                            res.end()
                        })
                }
                else if(req.url.match(/\/alunos\/edit\/[A-Za-z0-9]+$/)){
                    var idAluno = req.url.split("/")[3]
                    axios.get('http://localhost:3000/alunos/' + idAluno)
                        .then(response => {
                            let aluno = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.studentFormEditPage(aluno, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.errorPage("Não foi possível obter o registo do aluno...", d))
                            res.end()
                        })
                }
                else if(req.url.match(/\/alunos\/delete\/[A-Za-z0-9]+$/)){
                    var idAluno = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/alunos/' + idAluno)
                        .then(response => {
                            // Redirecionar para a lista de alunos com código 302
                            res.writeHead(302, {'Location': '/alunos?deleted=true'})
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.errorPage("Não foi possível remover o aluno...", d))
                            res.end()
                        })
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(templates.errorPage("Pedido não suportado: " + req.method + " " + req.url, d))
                    res.end()
                }
                break
            case "POST":
                if(req.url == '/alunos/registo'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/alunos', result)
                                .then(resp => {
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write(templates.studentFormPage(d, "Aluno registado com sucesso!"))
                                    res.end()
                                })
                                .catch(erro => {
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write(templates.errorPage("Erro no registo do aluno...", d))
                                    res.end()
                                })
                        }
                    })
                }
                else if(req.url.match(/\/alunos\/edit\/[A-Za-z0-9]+$/)){
                    var idAluno = req.url.split("/")[3]
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put('http://localhost:3000/alunos/' + idAluno, result)
                                .then(resp => {
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write(templates.studentFormEditPage(result, d, "Aluno editado com sucesso!"))
                                    res.end()
                                })
                                .catch(erro => {
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write(templates.errorPage("Erro na edição do aluno...", d))
                                    res.end()
                                })
                        }
                    })
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(templates.errorPage("Pedido não suportado: " + req.method + " " + req.url, d))
                    res.end()
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write(templates.errorPage("Pedido não suportado: " + req.method + " " + req.url, d))
                res.end()
        }
    }
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})