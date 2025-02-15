import json

with open('dataset_reparacoes.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

reparacoes = data['reparacoes']
intervencoes = []
viaturas = []

for reparacao in reparacoes:
    viaturas.append(reparacao['viatura'])
    for intervencao in reparacao['intervencoes']:
        intervencao['nif'] = reparacao['nif']
        intervencoes.append(intervencao)

reparacoes.sort(key=lambda x: x['data'], reverse=True)
intervencoes.sort(key=lambda x: x['codigo'])
viaturas.sort(key=lambda x: (x['marca'], x['modelo']))

result = {
    "reparacoes": reparacoes,
    "intervencoes": intervencoes,
    "viaturas": viaturas
}

with open('informacoes_separadas_ordenadas.json', 'w', encoding='utf-8') as file:
    json.dump(result, file, ensure_ascii=False, indent=4)

print("Informações separadas, ordenadas e salvas em um único arquivo.")