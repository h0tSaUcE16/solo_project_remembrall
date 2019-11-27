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
  if ( !username || !password )
    return res.status( 400 ).send( 'Must enter valid username & password. No blanks!' );
  // const sqlQuery = `INSERT INTO users ( username, password ) VALUES ( '${username}', '${password}' );`;
  const sqlQuery = 'INSERT INTO users ( username, password ) VALUES ($1, $2);';
  db.query(sqlQuery, [ username, password ], ( error , result ) => {
    if (error)
      return res.status( 400 ).send( 'Error while creating new user ' );
    next();
  })
}

userController.verifyUser = ( req , res , next ) => {
  const { username , password } = req.body;
  // const sqlQuery = `SELECT * FROM users WHERE username='${ username }'`;
  const sqlQuery = "SELECT * FROM users WHERE username = $1";
  db.query(sqlQuery, [username], ( error , result ) => {
    // ERROR RESPONSE
    if ( error )
      return res.status( 400 ).send( 'Error while logging in' );
    // EXTRACT PASSWORD FROM RESULT
    const userPassword = result.rows[0]['password'];
    // CHECK IF PASSWORDS MATCH
    if (password === userPassword) {
      // res.cookie('user' , result.rows[0]['username'] , { expires: new Date( Date.now() + 300000 ) , httpOnly: true });
      req.session.user = result.rows[0]['username'];
      return next();
    }
    // IF NOT, RETURN 404 MESSAGE
    return res.status( 404 ).send( 'Incorrect password!' )
  })
}



module.exports = userController;
