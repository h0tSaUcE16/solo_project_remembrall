const db = require('../models/reminderModel');

const cookieController = {};

cookieController.setSignupCookie = ( req , res , next ) => {
  res.cookie( 'signup' , 'visited' , { expires: new Date( Date.now() + 10000 ) ,  httpOnly: true });
  next();
}

module.exports = cookieController;