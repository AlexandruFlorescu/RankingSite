var app = express();
var compiler = webpack(config);

app.use(bodyParser.json());
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

app.use(express.static('./dist'));

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

var port = 3000;

app.get('*', function (req, res) {
  res.sendFile(path.resolve('client/index.html'));
});
app.listen(port, function(error) {
  if (error) throw error;
  console.log("Express server listening on port", port);
});
