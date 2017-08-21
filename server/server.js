var express = require('express');
var path = require('path');
var config = require('../webpack.config.js');
var webpack = require('webpack');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var app = express();
var compiler = webpack(config);

app.use(bodyParser.json());
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

app.use(express.static('./dist'));

// app.get('^(?!\/?api).+$', function (req, res) {
//   res.sendFile(path.resolve('client/index.html'));
// });

const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://seastar.eu.auth0.com/.well-known/jwks.json`
  }),
  audience: 'https://seastar.eu.auth0.com/api/v2/',
  issuer: `https://seastar.eu.auth0.com/`,
  algorithms: ['RS256']
})

Categories = require('./models/category.js');
Items = require('./models/item.js');
Posts = require('./models/post.js');
mongoose.connect('mongodb://localhost/seastar');
var db = mongoose.connection;

//CATEGORIES

app.get('/api/getCategories', checkJwt, function(req, res) {
  Categories.getCategories((err,category)=>{
    if(err){
      throw err;
      res.json(err);
    }
    res.json(category);
  })
})

app.post('/api/setCategories', checkJwt, function(req, res) {
  Categories.setCategory(req.body, (err, category) => {
    if(err){
      throw err;
      res.json(err);
    }
    res.json(category);
  })
})

app.post('/api/deleteCategory', checkJwt, function(req, res) {
  Categories.removeCategory(req.body, (err, category) => {
    if(err) {
      throw err;
      res.json(err);
    }
    res.json(category);
  })
})

//ITEMS
//checkJwt,
app.get('/api/getItems', checkJwt,  function(req, res) {
  Items.getItems((err,item)=>{
    if(err){
      throw err;
      res.json(err);
    }
    res.json(item);
  })
})
app.post('/api/setItem', checkJwt, function(req, res) {
  Items.setItem(req.body, (err, item) => {
    if(err){
      throw err;
      res.json(err);
    }
    res.json(item);
  })
})
app.post('/api/deleteItem', checkJwt, function(req, res) {
  console.log(req.body);
  Items.removeItem(req.body, (err, item) => {
    if(err) {
      throw err;
      res.json(err);
    }
    res.json(item);
  })
})
app.post('/api/voteItem', checkJwt, function(req, res) {
  Items.voteItem(req.body, (err, item) => {
    if(err) {
      throw err;
      res.json(err);
    }
    // console.log(item);
    res.json(item);
  })
})
app.post('/api/devoteItem', checkJwt, function(req, res) {
  Items.deVoteItem(req.body, (err, item) => {
    if(err) {
      throw err;
      res.json(err);
    }
    // console.log(item);
    res.json(item);
  })
})
app.post('/api/cleanItem', checkJwt, function(req, res) {
  Items.cleanItem(req.body, (err, item) => {
    if(err) {
      throw err;
      res.json(err);
    }
    console.log(item);
    res.json(item);
  })
})

//POSTS
app.get('/api/getPosts', checkJwt,  function(req, res) {
  Posts.getPosts((err,posts)=>{
    if(err){
      throw err;
      res.json(err);
    }
    res.json(posts);
  })
})
app.post('/api/setPost', checkJwt, function(req, res) {
  Posts.setPost(req.body, (err, post) => {
    if(err) {
      throw err;
      res.json(err);
    }
    res.json(post);
  })
})
app.post('/api/deletePost', checkJwt, function(req, res) {
  Posts.removePost(req.body, (err, post) => {
    if(err) {
      throw err;
      res.json(err);
    }
    res.json(post);
  })
})

// app.post('/api/alterCrew', checkJwt, function(req, res){
//
//   Crews.addUserToCrew(req.body.user, req.body.crew, (err, crew) =>{
//     if(err){
//       throw err;
//       res.json(err);
//     }
//     res.json(crew)
//   })
// })

var port = 3000;

app.get('*', function (req, res) {
  res.sendFile(path.resolve('client/index.html'));
});
app.listen(port, function(error) {
  if (error) throw error;
  console.log("Express server listening on port", port);
});
