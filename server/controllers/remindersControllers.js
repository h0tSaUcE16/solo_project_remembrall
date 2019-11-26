const db = require('../models/remindersModels');

const remindersController = {};

remindersController.getReminders = ( req, res, next ) => {
  const sqlQuery = "";
  db.query( sqlQuery, ( error, result ) => {
    if (error)
      return next(error);
    res.locals.reminders = result;
    return next();
  })
}

module.exports = remindersController;