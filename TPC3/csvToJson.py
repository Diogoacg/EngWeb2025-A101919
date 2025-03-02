import csv
import json

csv_file_path = 'alunos.csv'
json_file_path = 'alunos.json'

data = {"alunos": []}

with open(csv_file_path, encoding='utf-8') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=';')
    for row in csv_reader:
        aluno = {
            "id": row[0],
            "name": row[1].strip(),
            "gitlink": row[2].strip()
        }
        data["alunos"].append(aluno)

with open(json_file_path, 'w', encoding='utf-8') as json_file:
    json.dump(data, json_file, indent=2, ensure_ascii=False)

print(f'CSV file successfully processed and saved as {json_file_path}')