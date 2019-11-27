const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieController = require('./controllers/cookieController');
const reminderController = require('./controllers/reminderController');
const userController = require('./controllers/userController');

const app = express();

const PORT = 3000;

// PARSE REQUEST BODY AND COOKIES ON EVERY REQUEST
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }));
// app.use( cookieParser() );

app.get('/', userController.dbCheck, reminderController.dbCheck, ( req , res ) => {
  res.status( 206 ).sendFile( path.join( __dirname, '../client/index.html' ));
})

app.get( '/signup' , cookieController.setSignupCookie , ( req , res ) => {
  res.sendFile( path.join( __dirname, '../client/signup.html' ));
})

app.post( '/signup' , userController.createUser , ( req , res ) => {
  res.status( 206 ).send( "User created!" );
})

app.get( '/login' , ( req, res ) => {
  res.sendFile( path.join( __dirname, '../client/login.html' ));
})

app.post( '/login' , userController.verifyUser , ( req, res ) => {
  res.status( 206 ).send( 'User verified!' );
})




// CONFIGURE FALLBACK URL
app.get( '/*', ( req, res ) => {
  res.sendFile( path.join( __dirname, '../client/index.html' ))
});

// STARTING UP SERVER LISTENING ON PORT 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})

module.exports = app;