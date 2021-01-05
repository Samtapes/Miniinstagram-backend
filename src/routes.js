const express = require('express');
const FavoritePostController = require('./Controllers/FavoritePostController');
const PostController = require('./Controllers/PostController');
const RegisterController = require('./Controllers/RegisterController');
const SessionController = require('./Controllers/SessionController');

const routes = express.Router();


// Register
routes.get('/register', RegisterController.index);
routes.post('/register', RegisterController.create);
routes.put('/register', RegisterController.edit);
routes.delete('/register', RegisterController.delete);



// Login
routes.post('/login', SessionController.create);



// Post
routes.post('/posts', PostController.create);
routes.get('/posts', PostController.index);
routes.put('/posts/:id', PostController.edit);
routes.delete('/posts/:id', PostController.delete);



routes.post('/favorite_post/:id', FavoritePostController.create)





module.exports = routes;