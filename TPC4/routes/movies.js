var express = require('express');
var router = express.Router();
var axios = require('axios');

// List all movies
router.get('/', function(req, res) {
  var date = new Date().toISOString().substring(0,16);
  
  // Get query parameters for filtering - convert to array if multiple genres
  let genres = [];
  if (req.query.genre) {
    // Handle both single genre string and array of genres
    genres = Array.isArray(req.query.genre) ? req.query.genre : [req.query.genre];
  }
  
  // Get search parameters
  const searchTerm = req.query.search ? req.query.search.trim() : null;
  const searchType = req.query.searchType || 'both';
  
  // First get all movies to build genre filters and for client-side filtering
  axios.get('http://localhost:3000/movies')
    .then(allResp => {
      const allMovies = allResp.data;
      
      // Extract all genres and count occurrences
      let genreCounts = {};
      allMovies.forEach(movie => {
        if (movie.genres && Array.isArray(movie.genres)) {
          movie.genres.forEach(g => {
            genreCounts[g] = (genreCounts[g] || 0) + 1;
          });
        }
      });
      
      // Apply all filters (search and genres)
      let filteredMovies = [...allMovies];
      
      // Apply search filter if provided
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        
        filteredMovies = filteredMovies.filter(movie => {
          // Search in title
          if ((searchType === 'both' || searchType === 'title') && 
              movie.title && movie.title.toLowerCase().includes(searchLower)) {
            return true;
          }
          
          // Search in actors
          if ((searchType === 'both' || searchType === 'actor') && 
              movie.cast && Array.isArray(movie.cast)) {
            return movie.cast.some(actor => 
              actor.toLowerCase().includes(searchLower)
            );
          }
          
          return false;
        });
      }
      
      // Apply genre filters if provided
      if (genres.length > 0) {
        filteredMovies = filteredMovies.filter(movie => {
          // Check if movie has genres array
          if (!movie.genres || !Array.isArray(movie.genres)) {
            return false;
          }
          
          // Check if movie has ALL selected genres (AND logic)
          return genres.every(selectedGenre => 
            movie.genres.includes(selectedGenre)
          );
        });
      }
      
      // Sort by title
      filteredMovies.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
      
      res.status(200).render('moviesListPage', {
        'mlist': filteredMovies, 
        'date': date,
        'genreCounts': genreCounts,
        'selectedGenres': genres,
        'searchTerm': searchTerm,
        'searchType': searchType
      });
    })
    .catch(erro => {
      res.status(500).render('error', {'error': erro});
    });
});

// Display the movie registration form
router.get('/registo', function(req, res) {
  var date = new Date().toISOString().substring(0,16);
  res.status(200).render('movieFormPage', {'date': date});
});

// Add this endpoint to check if an ID exists
router.get('/check-id/:id', function(req, res) {
  var id = req.params.id;
  axios.get('http://localhost:3000/movies/' + id)
    .then(() => {
      // ID exists
      res.json({ exists: true });
    })
    .catch(erro => {
      if (erro.response && erro.response.status === 404) {
        // ID doesn't exist
        res.json({ exists: false });
      } else {
        // Other error
        res.status(500).json({ error: 'Server error checking ID' });
      }
    });
});

// Update the registration handler to check for duplicate IDs
router.post('/registo', function(req, res) {
  var date = new Date().toISOString().substring(0,16);
  var body = req.body;
  
  // First check if ID exists
  axios.get('http://localhost:3000/movies/' + body.id)
    .then(() => {
      // ID already exists, send error
      res.status(400).render('error', {
        message: 'A movie with this ID already exists',
        error: { status: 400, stack: 'Please use a unique ID for this movie.' }
      });
    })
    .catch(erro => {
      if (erro.response && erro.response.status === 404) {
        // ID doesn't exist, proceed with creation
        
      // Process cast from comma-separated string to array
      if (body.cast && body.cast.trim() !== '') {
        // Split by commas and trim each entry
        body.cast = body.cast.split(',').map(actor => actor.trim());
      } else {
        body.cast = [];
      }
        
        // Process genres from comma-separated string to array
        if (body.genres && body.genres.trim() !== '') {
          body.genres = body.genres.split(',').map(genre => genre.trim());
        } else {
          body.genres = [];
        }
        
        console.log('Submitting new movie:', body);
        
        axios.post('http://localhost:3000/movies', body)
          .then(resp => {
            console.log('Movie created with ID:', resp.data.id);
            res.redirect('/movies');
          })
          .catch(erro => {
            console.error('Error creating movie:', erro);
            res.status(500).render('error', {
              message: 'Error creating movie',
              error: erro
            });
          });
      } else {
        // Other error
        res.status(500).render('error', {
          message: 'Error checking movie ID',
          error: erro
        });
      }
    });
});
// Delete movie
router.get('/delete/:idMovie', function(req, res) {
  var id = req.params.idMovie;
  axios.delete('http://localhost:3000/movies/' + id)
    .then(() => {
      res.status(200).redirect('/movies');
    })
    .catch(erro => {
      res.status(500).render('error', {'error': erro});
    });
});

router.post('/edit/:idMovie', function(req, res) {
  var id = req.params.idMovie;
  var body = req.body;
  
  // Process cast from comma-separated string to array
  if (body.cast && body.cast.trim() !== '') {
    body.cast = body.cast.split(',').map(actor => actor.trim());
  } else {
    body.cast = [];
  }
  
  // Convert genres string to array
  if (body.genres) {
    body.genres = body.genres.split(',').map(g => g.trim());
  } else {
    body.genres = [];
  }
  
  axios.put('http://localhost:3000/movies/' + id, body)
    .then(resp => {
      res.status(200).redirect('/movies');
    })
    .catch(erro => {
      res.status(500).render('error', {'error': erro});
    });
});

// Display movie editing form
router.get('/edit/:idMovie', function(req, res) {
  var id = req.params.idMovie;
  var date = new Date().toISOString().substring(0,16);
  axios.get('http://localhost:3000/movies/' + id)
    .then(resp => {
      // Ensure data is properly formatted
      let movie = resp.data;
      
      // Ensure cast is an array
      if (!Array.isArray(movie.cast)) {
        movie.cast = movie.cast ? [movie.cast] : [];
      }
      
      // Ensure genres is an array
      if (!Array.isArray(movie.genres)) {
        movie.genres = movie.genres ? [movie.genres] : [];
      }
      
      // Convert genres array to string for editing
      movie.genresString = movie.genres.join(', ');
      
      res.status(200).render('movieFormEditPage', {'movie': movie, 'date': date});
    })
    .catch(erro => {
      res.status(500).render('error', {'error': erro});
    });
});

// Show individual movie
router.get('/:idMovie', function(req, res) {
  var id = req.params.idMovie;
  var date = new Date().toISOString().substring(0,16);
  axios.get('http://localhost:3000/movies/' + id)
    .then(resp => {
      res.status(200).render('moviePage', {'movie': resp.data, 'date': date});
    })
    .catch(erro => {
      res.status(500).render('error', {'error': erro});
    });
});

module.exports = router;