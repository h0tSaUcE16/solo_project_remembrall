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

reminderController.getReminders = ( req , res , next ) => {
  const sqlQuery = "";
  db.query( sqlQuery, ( error, result ) => {
    if (error)
      return next(error);
    res.locals.reminders = result;
    return next();
  })
}

module.exports = reminderController;