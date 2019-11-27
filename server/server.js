const path = require('path');
const express = require('express');
const session = require('express-session');
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
app.use( cookieParser() );
app.use( session({ 
  secret: "hey, look ma, i made it",
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// STATIC PAGES
app.use( '/assets' , express.static( path.resolve( __dirname, '../client/assets')));

app.get('/', userController.dbCheck, reminderController.dbCheck, ( req , res ) => {
  res.status( 206 ).sendFile( path.join( __dirname, '../client/assets/index.html' ));
});

app.get('/home', ( req , res ) => {
  res.status( 206 ).sendFile( path.join( __dirname, '../client/assets/index.html' ));
});

app.get( '/signup' , cookieController.setSignupCookie , ( req , res ) => {
  res.sendFile( path.join( __dirname, '../client/assets/signup.html' ));
});

app.post( '/signup' , userController.createUser , ( req , res ) => {
  res.status( 206 ).redirect( 'login' );
});

app.get( '/login' , ( req, res ) => {
  res.sendFile( path.join( __dirname, '../client/assets/login.html' ));
});

app.post( '/login' , userController.verifyUser , ( req, res ) => {
  // res.status( 206 ).send( `User verified! Hello ${req.session.user}!` );
  res.status( 206 ).redirect( 'reminders' );
});

app.get( '/reminders' , ( req , res ) => {
  res.sendFile( path.join( __dirname , '../client/assets/reminders.html'));
});

app.get( '/reminders/tasks',  reminderController.getReminders, ( req , res ) => {
  res.status( 200 ).json(res.locals.reminders);
});

app.post( '/reminders', reminderController.createTask, reminderController.getReminders, ( req , res ) => {
  res.status( 200 ).json(res.locals.reminders);
});

app.get( '/logOff', ( req, res ) => {
  // req.session.destroy();
  res.status( 200 ).redirect( 'home');
});

// CONFIGURE FALLBACK URL
app.get( '/*', ( req, res ) => {
  res.sendFile( path.join( __dirname, '../client/assets/index.html' ))
});

// STARTING UP SERVER LISTENING ON PORT 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;