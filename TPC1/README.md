# Manifesto TPC1

## 📌 Título

A Oficina

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

Desenvolver um serviço em Node.js que utilize a API fornecida pelo json-server da oficina de reparações e gere páginas web para o site.  
Os serviços devem incluir seções para listar as reparações, intervenções e veículos. O objetivo é permitir que, ao selecionar uma reparação específica, o utilizador seja redirecionado para uma página com todos os detalhes dessa reparação.  
A implementação de pedidos PUT e POST não está incluída no escopo deste trabalho.

### normaliza.py

Este ficheiro contém um script Python que processa o dataset `dataset_reparacoes.json` para separar e ordenar as informações em reparações, intervenções e viaturas.

- **Carrega o dataset** `dataset_reparacoes.json`.
- **Separa as informações** em três listas: `reparacoes`, `intervencoes` e `viaturas`.
- **Ordena as listas**:
  - `reparacoes` por data (do presente para o passado).
  - `intervencoes` por código.
  - `viaturas` por marca e modelo.
- **Guarda as informações** em um único arquivo JSON chamado `informacoes_separadas_ordenadas.json`.

### tpc1.js

Este ficheiro contém o código do servidor Node.js que responde a diferentes pedidos HTTP. Ele utiliza a biblioteca `axios` para fazer pedidos à API do json-server e renderiza páginas HTML com base nos dados recebidos.

- **GET /:** Página inicial com links para listas de reparações, intervenções e viaturas.
- **GET /reparacoes:** Lista de todas as reparações.
- **GET /reparacoes/:nif:** Detalhes de uma reparação específica.
- **GET /intervencoes:** Lista de todas as intervenções.
- **GET /intervencoes/:codigo:** Detalhes de uma intervenção específica.
- **GET /viatura:** Lista de todas as viaturas.
- **GET /viatura/:modelo:** Detalhes de uma viatura específica.

## 📂 Lista de Resultados

- [tpc1.js](./tpc1.js)
- [normaliza.py](./normaliza.py)
- [informacoes_separadas_ordenadas.json](./informacoes_separadas_ordenadas.json)