const http = require('http');
const axios = require('axios');

http.createServer((req, res) => {
    console.log("METHOD: " + req.method);
    console.log("URL: " + req.url);

    switch (req.method) {
        case "GET":
            {
                if (req.url === "/") {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    res.write("<h1>Página Inicial</h1>");
                    res.write(`<li><a href='/reparacoes'> Lista de reparações </a></li>`);
                    res.write(`<li><a href='/intervencoes'> Lista de intervenções </a></li>`);
                    res.write(`<li><a href='/viatura'> Lista de viaturas </a></li>`);
                    res.end();
                }

                if (req.url === "/reparacoes") {
                    axios.get('http://localhost:3000/reparacoes')
                        .then(resp => {
                            var reparacoes = resp.data;
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                            res.write("<h1>Reparações</h1>");
                            res.write(`<pt><a href='/'>Voltar</a>`);
                            res.write("<ul>");
                            reparacoes.forEach(element => {
                                res.write(`<li><a href='/reparacoes/${element.nif}'>Data: ${element.data} | Nome: ${element.nome} | Nif: ${element.nif}</a></li>`);
                            });
                            res.write("</ul>");
                            res.end();
                        })
                        .catch(err => {
                            res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' });
                            console.log(err);
                            res.end();
                        });
                }

                if (req.url.startsWith("/reparacoes/")) {
                    var nif = req.url.split("/")[2];
                    axios.get(`http://localhost:3000/reparacoes?nif=${nif}`)
                        .then(resp => {
                            let reparacao = resp.data[0]; // JSON Server returns an array

                            if (reparacao) {
                                var viatura = reparacao.viatura;
                                var intervencoes = reparacao.intervencoes;
                                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                                res.write("<h1>Detalhes de reparação</h1>");
                                res.write(`<pt><a href='/reparacoes'>Voltar</a>`);
                                res.write(`<p>Nome: ${reparacao.nome}</p>`);
                                res.write(`<p>Nif: ${reparacao.nif}</p>`);
                                res.write(`<p>Data: ${reparacao.data}</p>`);
                                res.write(`<p>Viatura</p>`);
                                res.write("<ul>");
                                res.write(`<li>Marca: ${viatura.marca} </li>`);
                                res.write(`<li>Modelo: ${viatura.modelo} </li>`);
                                res.write(`<li>Matricula: ${viatura.matricula} </li>`);
                                res.write("</ul>");

                                res.write(`<p>Número de intervenções: ${reparacao.nr_intervencoes}</p>`);
                                res.write("<ul>");
                                intervencoes.forEach(interv => {
                                    res.write(`-------------------------`);
                                    res.write(`<li>Código: ${interv.codigo}</li>`);
                                    res.write(`<li>Nome: ${interv.nome}: ${interv.descricao}</li>`);
                                    res.write(`<li>Descrição: ${interv.descricao}</li>`);
                                });
                                res.write("</ul>");
                                res.end();
                            } else {
                                res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
                                res.write("<h1>Reparação não encontrada</h1>");
                                res.end();
                            }
                        })
                        .catch(err => {
                            res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' });
                            console.log(err);
                            res.end();
                        });
                }

                if (req.url === "/intervencoes") {
                    axios.get('http://localhost:3000/intervencoes')
                        .then(resp => {
                            var intervencoes = resp.data;
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                            res.write("<h1>Intervenções</h1>");
                            res.write(`<pt><a href='/'>Voltar</a>`);
                            res.write("<ul>");
                            intervencoes.forEach(element => {
                                res.write(`<li><a href='/intervencoes/${element.codigo}'>Código: ${element.codigo} | Nome:  ${element.nome} | Descrição:${element.descricao}</a></li>`);
                            });
                            res.write("</ul>");
                            res.end();
                        })
                        .catch(err => {
                            res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' });
                            console.log(err);
                            res.end();
                        });
                }

                if (req.url.startsWith("/intervencoes/")) {
                    var codigo = req.url.split("/")[2];
                    axios.get(`http://localhost:3000/intervencoes?codigo=${codigo}`)
                        .then(resp => {
                            let intervencao = resp.data[0]; // JSON Server returns an array

                            if (intervencao) {
                                axios.get(`http://localhost:3000/reparacoes?intervencoes.codigo=${codigo}`)
                                    .then(resp => {
                                        let reparacoes = resp.data;

                                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                                        res.write("<h1>Detalhes de intervenção</h1>");
                                        res.write(`<pt><a href='/intervencoes'>Voltar</a>`);
                                        res.write(`<p>Código: ${intervencao.codigo}</p>`);
                                        res.write(`<p>Nome: ${intervencao.nome}</p>`);
                                        res.write(`<p>Descrição: ${intervencao.descricao}</p>`);
                                        res.write("<h1>Reparações em que foi usada</h1>");
                                        reparacoes.forEach(element => {
                                            res.write(`-----------------------`);
                                            res.write(`<p>Nome: ${element.nome}</p>`);
                                            res.write(`<p>Nif: ${element.nif}</p>`);
                                            res.write(`<p>Data: ${element.data}</p>`);
                                            res.write(`<pt><a href='/reparacoes/${element.nif}'> Ver detalhes</a></pt>`);
                                        });
                                        res.end();
                                    })
                                    .catch(err => {
                                        res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' });
                                        console.log(err);
                                        res.end();
                                    });
                            } else {
                                res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
                                res.write("<h1>Intervenção não encontrada</h1>");
                                res.end();
                            }
                        })
                        .catch(err => {
                            res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' });
                            console.log(err);
                            res.end();
                        });
                }

                if (req.url === "/viatura") {
                    axios.get('http://localhost:3000/viaturas')
                        .then(resp => {
                            var viaturas = resp.data;
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                            res.write("<h1>Viaturas</h1>");
                            res.write(`<pt><a href='/'>Voltar</a>`);
                            res.write("<ul>");
                            viaturas.forEach(element => {
                                res.write(`<li><a href='/viatura/${element.modelo}'>Marca: ${element.marca} | Modelo: ${element.modelo}</a></li>`);
                            });
                            res.write("</ul>");
                            res.end();
                        })
                        .catch(err => {
                            res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' });
                            console.log(err);
                            res.end();
                        });
                }

                if (req.url.startsWith("/viatura/")) {
                    const modelo = decodeURIComponent(req.url.split('/')[2]);
                    axios.get(`http://localhost:3000/viaturas?modelo=${modelo}`)
                        .then(resp => {
                            let viatura = resp.data[0]; // JSON Server returns an array

                            if (viatura) {
                                axios.get(`http://localhost:3000/reparacoes?viatura.modelo=${modelo}`)
                                    .then(resp => {
                                        let reparacoes = resp.data;

                                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                                        res.write("<h1>Detalhes de Modelo</h1>");
                                        res.write(`<pt><a href='/viatura'>Voltar</a>`);
                                        res.write(`<p>Marca: ${viatura.marca}</p>`);
                                        res.write(`<p>Modelo: ${viatura.modelo}</p>`);
                                        res.write(`<p>Matrícula: ${viatura.matricula}</p>`);

                                        res.write("<h1>Reparações em que foi usada</h1>");
                                        reparacoes.forEach(element => {
                                            res.write(`---------------------------`);
                                            res.write(`<p>Nome: ${element.nome}</p>`);
                                            res.write(`<p>Nif: ${element.nif}</p>`);
                                            res.write(`<p>Data: ${element.data}</p>`);
                                            res.write(`<pt><a href='/reparacoes/${element.nif}'>Ver detalhes</a>`);
                                        });

                                        res.end();
                                    })
                                    .catch(err => {
                                        res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' });
                                        console.log(err);
                                        res.end();
                                    });
                            } else {
                                res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
                                res.write("<h1>Modelo não encontrado</h1>");
                                res.end();
                            }
                        })
                        .catch(err => {
                            res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' });
                            console.log(err);
                            res.end();
                        });
                }
                break;
            }
        default:
            res.writeHead(405, { 'Content-Type': 'text/html;charset=utf-8' });
            res.end();
            break;
    }
}).listen(1234);

console.log("Servidor à escuta na porta 1234...");
console.log("http://localhost:1234");