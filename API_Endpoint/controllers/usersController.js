'use strict';

const User = require( '../models/user' ),
  getUserParams = ( body ) => {
    return {
      name: body.name,
      gender: body.gender,
    };
  };
const httpStatus = require("http-status-codes");

/*All methods used to display user information along with enabling Create, Read, Update, Delete (CRUD) functions*/

module.exports = {
  index: ( req, res, next ) => {
    User.find()
      .then( users => {
        res.locals.users = users;
        next();
      } )
      .catch( error => {
        console.log( `Error fetching users: ${error.message}` );
        next( error );
      } );
  },
  indexView: ( req, res ) => {
    if (req.query.format === "json"){
      res.json(res.locals.users);
    }
    else {
      res.render( 'users/index' );
    }
    
  },
/*renders add user page*/
  new: ( req, res ) => {
    res.render( 'users/new' );
  },
/*adds newly input user into the users database (Create)*/
  create: ( req, res, next ) => {
    let userParams = getUserParams( req.body );

    User.create( userParams )
      .then( user => {
        res.locals.redirect = '/users';
        res.locals.user = user;
        next();
        console.log(`User added.`);
      } )
      .catch( error => {
        console.log( `Error saving user: ${error.message}` );
        next( error );
      } );
  },
/*renders the newly created user to the Users List webpage*/
  redirectView: ( req, res, next ) => {
    let redirectPath = res.locals.redirect;
    if ( redirectPath !== undefined ) res.redirect( redirectPath );
    else next();
  },

  show: ( req, res, next ) => {
    let userId = req.params.id;
    User.findById( userId )
      .then( user => {
        res.locals.user = user;
        next();
      } )
      .catch( error => {
        console.log( `Error fetching user by ID: ${error.message}` );
        next( error );
      } );
  },
/*creates the ability to edit the information of an existing user*/
  edit: ( req, res, next ) => {
    let userId = req.params.id;
    User.findById( userId )
      .then( user => {
        res.render( 'users/edit', {
          user: user
        } );
      } )
      .catch( error => {
        console.log( `Error fetching user by ID: ${error.message}` );
        next( error );
      } );
  },
/*passes and saves the newly edited user data into the database*/
  update: ( req, res, next ) => {
    let userId = req.params.id,
      userParams = getUserParams( req.body );

    User.findByIdAndUpdate( userId, {
        $set: userParams
      } )
      .then( user => {
        res.locals.redirect = `/users`;
        res.locals.user = user;
        next();
      } )
      .catch( error => {
        console.log( `Error updating user by ID: ${error.message}` );
        next( error );
      } );
  },
/*removes existing user and associated data from the database*/
  delete: ( req, res, next ) => {
    let userId = req.params.id;
    User.findByIdAndRemove( userId )
      .then( () => {
        res.locals.redirect = '/users';
        next();
      } )
      .catch( error => {
        console.log( `Error deleting user by ID: ${error.message}` );
        next();
      } );
  },

  respondJSON: (req, res) => {
    res.json({
      status: httpStatus.OK,
      data: res.locals
    });
  },

  errorJSON: (error, req, res, next) => {
    let errorObject;

    if (error){
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
    }
    else {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Unknown Error."
      };
    }
    res.json(errorObject);
  },

};
