import json
import random
import string

def random_id(length=6):
    """Generate a random ID"""
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))

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
            
        # Add cast if not present
        if 'cast' not in movie:
            movie['cast'] = []
        
        # Map actors to movies
        for actor in movie.get('cast', []):
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
        actors.append({
            'id': 'a_' + actor_name.lower().replace(' ', '_'),
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