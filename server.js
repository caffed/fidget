'use strict';

// Express
var express = require('express');
var app = express();
var router = express.Router();

// MISC / ENV
var port = process.env.PORT || 4000;
app.set('port', port);
global._ = require("lodash");
global.Q = require("q");

// Mincer
var Mincer  = require('mincer');
var environment = new Mincer.Environment();
app.set("assetPaths", ['app/assets/javascripts', 'app/assets/stylesheets', 'vendor']);
_.map(app.get("assetPaths"), function(path){
  environment.appendPath(path);
});
app.use('/assets', Mincer.createServer(environment));


// Handlebars
var viewsDir = __dirname + '/app/views';
var exphbs  = require('express-handlebars');
var hbs = exphbs.create({
            layoutsDir: viewsDir + "/layouts",
            partialsDir: viewsDir + "/partials",
            defaultLayout: 'main'
          });
app.set('views', viewsDir);
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('/public', express.static(__dirname + '/public'));

router = require('./app/routes')(router);

app.get('/*', router);

console.log("\nStarting up...\n");
app.listen(port);

