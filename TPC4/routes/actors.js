var express = require('express');
var router = express.Router();
var axios = require('axios');

// List all actors
router.get('/', function(req, res) {
  var date = new Date().toISOString().substring(0,16);
  const searchTerm = req.query.search ? req.query.search.trim().toLowerCase() : null;
  
  axios.get('http://localhost:3000/movies')
    .then(response => {
      const allMovies = response.data;
      
      // Extract all unique actors and count their movies
      let actorsMap = {};
      allMovies.forEach(movie => {
        if (movie.cast && Array.isArray(movie.cast)) {
          movie.cast.forEach(actor => {
            // Skip empty actors
            if (!actor.trim()) return;
            
            // Normalize actor name
            const normalizedName = actor.trim();
            
            // Add or increment actor count
            if (!actorsMap[normalizedName]) {
              actorsMap[normalizedName] = { 
                name: normalizedName, 
                count: 1,
                movies: [movie.id]
              };
            } else {
              actorsMap[normalizedName].count++;
              actorsMap[normalizedName].movies.push(movie.id);
            }
          });
        }
      });
      
      // Convert to array for easier sorting and filtering
      let actors = Object.values(actorsMap);
      
      // Apply search filter if provided
      if (searchTerm) {
        actors = actors.filter(actor => 
          actor.name.toLowerCase().includes(searchTerm)
        );
      }
      
      // Sort by number of movies (descending)
      actors.sort((a, b) => b.count - a.count);
      
      res.status(200).render('actorslistpage', {
        'actors': actors,
        'searchTerm': searchTerm,
        'date': date
      });
    })
    .catch(erro => {
      console.error('Erro ao obter lista de atores:', erro);
      res.status(500).render('error', {'error': erro});
    });
});

// Actor profile page with filmography
router.get('/:actorName', function(req, res) {
  var actorName = req.params.actorName;
  var date = new Date().toISOString().substring(0,16);
  
  // Descodificar o nome do ator que pode conter caracteres especiais
  actorName = decodeURIComponent(actorName);
  
  // Obter todos os filmes para filtrar os do ator
  axios.get('http://localhost:3000/movies')
    .then(response => {
      const allMovies = response.data;
      
      // Filtrar filmes em que o ator participa
      const actorMovies = allMovies.filter(movie => 
        Array.isArray(movie.cast) && movie.cast.some(actor => 
          actor.toLowerCase() === actorName.toLowerCase()
        )
      );
      
      // Extrair todos os géneros dos filmes do ator
      let actorGenres = {};
      actorMovies.forEach(movie => {
        if (movie.genres && Array.isArray(movie.genres)) {
          movie.genres.forEach(g => {
            actorGenres[g] = (actorGenres[g] || 0) + 1;
          });
        }
      });
      
      // Ordenar filmes do mais recente para o mais antigo
      actorMovies.sort((a, b) => (b.year || 0) - (a.year || 0));
      
      // Contar o número total de filmes
      const totalMovies = actorMovies.length;
      
      res.status(200).render('actorespage', {
        'actor': actorName,
        'movies': actorMovies,
        'totalMovies': totalMovies,
        'genres': actorGenres,
        'date': date
      });
    })
    .catch(erro => {
      console.error('Erro ao obter filmes do ator:', erro);
      res.status(500).render('error', {'error': erro});
    });
});

module.exports = router;