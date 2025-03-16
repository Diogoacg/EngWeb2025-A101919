import json
import random
import string
import re

def random_id(length=6):
    """Generate a random ID"""
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))

def is_valid_actor(name):
    """Determine if a name is likely to be a real actor name"""
    if not isinstance(name, str):
        return False
        
    # Palavras curtas não são nomes de atores
    if len(name) < 3:
        return False
        
    # Frases longas provavelmente não são nomes
    if len(name) > 40:
        return False
    
    # Palavras comuns que indicam que não é um ator
    non_actor_words = ['the', 'and', 'in', 'of', 'at', 'on', 'with', 'by', 'from', 
                       'to', 'for', 'truth', 'commission', 'centers', 'around', 
                       'footage', 'found', 'various', 'none', 'n/a']
    
    # Se o nome for completamente uma dessas palavras, não é um ator
    if name.lower() in non_actor_words:
        return False
    
    # Se o nome começar com palavras como "the", "a", etc. não é um ator
    if re.match(r'^(the|an?)\s', name.lower()):
        return False
        
    # Nome de ator normalmente tem pelo menos um espaço (nome e sobrenome)
    # Mas nem sempre é o caso, então isso é apenas mais um indício
    has_space = ' ' in name.strip()
    
    # Nomes de atores geralmente começam com letra maiúscula
    starts_with_capital = name[0].isupper() if name else False
    
    # Se tem espaço E começa com maiúscula, muito provavelmente é um ator
    if has_space and starts_with_capital:
        return True
        
    # Outros casos precisam de mais avaliação
    # Verificar se contém palavras como "documentary", "footage", etc.
    suspicious_terms = ['documentary', 'footage', 'featuring', 'various', 
                        'artist', 'narrator', 'voice', 'themselves']
    
    for term in suspicious_terms:
        if term.lower() in name.lower():
            return False
    
    # Se passou por todas as verificações acima, pode ser um ator
    return starts_with_capital  # Favorecemos nomes que começam com maiúsculas

def format_movies(input_file, output_file):
    # Read the input JSON file
    with open(input_file, 'r') as f:
        movies = json.load(f)
    
    # Dictionary to map actors to their movies
    actors_movies = {}
    
    # Format each movie
    for i, movie in enumerate(movies):
        # Skip empty objects
        if not movie:
            continue
        
        # Add ID if not present
        if 'id' not in movie:
            movie['id'] = f"m{i}"
        
        # Add title if not present
        if 'title' not in movie:
            movie['title'] = f"Untitled Movie {i}"
        
        # Add year if not present
        if 'year' not in movie:
            movie['year'] = random.randint(1950, 2023)
            
        # Ensure genres is a list
        if 'genres' not in movie:
            movie['genres'] = []
        
        # Process cast field
        if 'cast' in movie:
            if isinstance(movie['cast'], str):
                # Se cast for uma string, pode ser uma descrição
                if len(movie['cast']) > 30:
                    movie['description'] = movie['cast']
                    movie['cast'] = []
                else:
                    # Pode ser um único ator
                    movie['cast'] = [movie['cast']]
            
            elif isinstance(movie['cast'], list):
                # Se for lista, filtrar nomes inválidos
                valid_actors = []
                description_parts = []
                
                for actor in movie['cast']:
                    if is_valid_actor(actor):
                        valid_actors.append(actor)
                    elif isinstance(actor, str) and len(actor) > 0:
                        description_parts.append(actor)
                
                # Se tiver poucos atores válidos e vários elementos, pode ser uma descrição
                if len(valid_actors) <= 1 and len(movie['cast']) >= 3:
                    # Juntar as partes da descrição
                    if description_parts:
                        movie['description'] = ' '.join(description_parts)
                    movie['cast'] = valid_actors
                else:
                    movie['cast'] = valid_actors
        else:
            movie['cast'] = []
            
        # Map actors to movies
        for actor in movie.get('cast', []):
            if not actor or not isinstance(actor, str):
                continue
                
            if actor not in actors_movies:
                actors_movies[actor] = []
            actors_movies[actor].append({
                'id': movie['id'],
                'title': movie['title']
            })
    
    # Remove empty objects
    movies = [m for m in movies if m]
    
    # Create actors data
    actors = []
    for actor_name, actor_movies in actors_movies.items():
        # Skip empty actor names
        if not actor_name or not actor_name.strip():
            continue
            
        actors.append({
            'id': 'a_' + actor_name.lower().replace(' ', '_').replace(',', '').replace('.', ''),
            'name': actor_name,
            'movies': actor_movies
        })
    
    # Prepare the final data
    formatted_data = {
        'movies': movies,
        'actors': actors
    }
    
    # Write to the output file
    with open(output_file, 'w') as f:
        json.dump(formatted_data, f, indent=2)
    
    print(f"Formatted {len(movies)} movies and {len(actors)} actors")

if __name__ == "__main__":
    format_movies('cinema.json', 'cinemaFormatted.json')