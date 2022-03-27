'use strict';

const express = require( 'express' ),
  layouts = require( 'express-ejs-layouts' ),
  app = express(),
  router = require('./routes/index'),
  homeController = require( './controllers/homeController' ),
  apiRoutes = require('./routes/apiRoutes'),


  bodyParser = require( 'body-parser' ),
  mongoose = require( 'mongoose' ),
  methodOverride = require( 'method-override' );

//mongoose.connect( 'mongodb://localhost/user_db', {useNewUrlParser: true} );
//const db = mongoose.connection;
/*db.once( 'open', () => {
  console.log( 'Successfully connected to MongoDB using Mongoose!' );
} );*/

app.set( 'port', process.env.PORT || 4200 );
//app.set( 'view engine', 'ejs' );

app.use( methodOverride( '_method', {
  methods: [ 'POST', 'GET' ]
} ) );

//app.use( layouts );
app.use( express.static( 'public' ) );

app.use( bodyParser.urlencoded( {
  extended: false
} ) );

app.use( bodyParser.json() );
app.use('/api', apiRoutes);
app.use( '/', router );

app.listen( app.get( 'port' ), () => {
  console.log( `Server running at http://localhost:${app.get('port')}` );
} );