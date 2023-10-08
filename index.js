console.log('test run')
var express = require('express');
var app = express();
var pool = require('./queries.js')

// app.get('/', function(req, res){
//     res.send('test nodemon');
// });

app.post('/', function(req, res){
    res.send('test post!');
})

// Data Actor
app.get('/actors', (req, res) =>{
    pool.query('SELECT * FROM actor', (err, result) =>{
        if(err){
            throw err;
        }
        res.send(result.rows);
    })
})

// Data Film

// Get seluruh data film
app.get('/films', (req, res) => {
    pool.query('SELECT * FROM film', (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result.rows);
    });
});

// Menampilkan data film tertentu berdasarkan id
app.get('/films/:filmId', (req, res) => {
    const filmId = req.params.filmId;
    pool.query('SELECT * FROM film WHERE film_id = $1', [filmId], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result.rows);
    });
  });

// akhir data film

// Data Category
app.get('/category', (req, res) => {
    pool.query('SELECT * FROM category', (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result.rows);
    });
});

// Menampilkan data list film berdasarkan category

app.get('/films-by-category/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;
    pool.query(
        'SELECT film.film_id, film.title, film.description, film_category.category_id ' +
        'FROM film ' +
        'INNER JOIN film_category ON film.film_id = film_category.film_id ' +
        'WHERE film_category.category_id = $1',
        [categoryId],
        (err, result) => {
            if (err) {
                throw err;
            }
            res.send(result.rows);
        }
    );
});




//
// app.get('/films-by-category/:categoryId', (req, res) => {
//     const categoryId = req.params.categoryId;
//     pool.query('SELECT film_category.* FROM film JOIN film_category ON film.film_id = film_category.film_id WHERE film_category.category_id = $1', [categoryId], (err, result) => {
//         if (err) {
//             throw err;
//         }
//         res.send(result.rows);
//     });
// });




pool.connect((err, res) =>{
    console.log(err);
    console.log('connected!');
});

app.listen(3000);
