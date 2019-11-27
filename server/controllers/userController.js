const db = require('../models/reminderModel');

const userController = {};

userController.dbCheck = ( req , res , next ) => {
  const sqlQuery = "CREATE TABLE IF NOT EXISTS users ( username VARCHAR(25) PRIMARY KEY, password VARCHAR(25) NOT NULL );";
  db.query(sqlQuery, ( error , result ) => {
    if (error)
      return res.status(400).send('Error while creating user table');
    next();
  })
}

userController.createUser = ( req , res , next ) => {
  const { username , password } = req.body;
  const sqlQuery = `INSERT INTO users ( username , password ) VALUES ( '${username}' , '${password}' );`;
  db.query(sqlQuery, ( error , result ) => {
    if (error)
      return res.status(400).send('Error while creating new user ' + error);
    next();
  })
}

userController.verifyUser = ( req , res , next ) => {
  const { username , password } = req.body;
  const sqlQuery = `SELECT password FROM users WHERE username='${username}'`;
  db.query(sqlQuery, ( error , result ) => {
    // ERROR RESPONSE
    if ( error )
      return res.status(400).send('Error while logging in');
    // EXTRACT PASSWORD FROM RESULT
    const userPassword = result.rows[0]['password'];
    // CHECK IF PASSWORDS MATCH
    if (password === userPassword)
      return next();
    // IF NOT, RETURN 404 MESSAGE
    return res.status(404).send('Incorrect password!')
  })
}



module.exports = userController;
