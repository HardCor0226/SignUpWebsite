'use strict';

const express = require( 'express' ), //requires 'express' package as a dependency
  layouts = require( 'express-ejs-layouts' ), //requires 'express-ejs-layouts' package as a dependency
  app = express(),
  router = require('./routes/index'),
  homeController = require( './controllers/homeController' ),
  apiRoute = require('./routes/apiRoutes'),

  bodyParser = require( 'body-parser' ),
  mongoose = require( 'mongoose' ),
  methodOverride = require( 'method-override' );

/*connects mongoose to the users database in MongoDB*/
mongoose.connect( 'mongodb://localhost/user_db', {useNewUrlParser: true} );
const db = mongoose.connection;
db.once( 'open', () => {
  console.log( 'Successfully connected to MongoDB using Mongoose!' );
} );

app.set( 'port', process.env.PORT || 3000 ); //declares the server to be opened when program is initiated (localhost:300)
app.set( 'view engine', 'ejs' ); //sets app to use ejs

app.use( methodOverride( '_method', {
  methods: [ 'POST', 'GET' ]
} ) );

app.use( layouts ); //calls the 'express-ejs-layouts' package to be used by the program
app.use( express.static( 'public' ) );

app.use( bodyParser.urlencoded( {
  extended: false
} ) );

app.use( bodyParser.json() );

/*API route used to return JSON data from the users database*/
app.use('/api', apiRoute);
/*calls index.js that house all subpage routes of the application*/
app.use( '/', router );

/* opens the designated server port and runs the program to the server */
app.listen( app.get( 'port' ), () => {
  console.log( `Server running at http://localhost:${app.get('port')}` );
} );