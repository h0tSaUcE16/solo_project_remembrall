const db = require('../models/reminderModel');

const reminderController = {};

reminderController.dbCheck = ( req, res, next ) => {
  const sqlQuery = "CREATE TABLE IF NOT EXISTS tasks ( title VARCHAR NOT NULL, body VARCHAR NOT NULL, subject VARCHAR DEFAULT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, completed INT NOT NULL, username VARCHAR(25) );";
  db.query(sqlQuery, ( error , result ) => {
    if (error)
      return res.status(400).send(error);
    next();
  })
}

reminderController.createTask = ( req , res , next ) => {
  if (req.session.user) {
    // res.status( 206 ).send(req.session.user + ' ' + req.cookies.user);
    const { title, body, category } = req.body;
    const sqlQuery = 'INSERT INTO tasks ( title , body , subject , completed , username ) VALUES ( $1, $2, $3, 0, $4)';
    const args = [ title, body, category, req.session.user ];
    db.query(sqlQuery, args, ( error, result ) => {
      if (error)
        return res.status(400).send('Error while creating new reminder');
      next();
    })
  }
  else 
    return res.status(406).send('Session failure!');
}

reminderController.getReminders = ( req , res , next ) => {
  if (req.session.user) {
    const sqlQuery = 'SELECT * FROM tasks WHERE username = $1';
    db.query( sqlQuery, [ req.session.user ], ( error, result ) => {
      // console.log(result);
      if (error)
        return res.status(400).send('Error while getting reminders');
      res.locals.reminders = result.rows;
      return next();
    })
  } 
  else
    return res.status(406).send('Session failure!');
}

module.exports = reminderController;