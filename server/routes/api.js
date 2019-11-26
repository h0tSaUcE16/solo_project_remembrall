const express = require('express');

const remindersController = require('../controllers/remindersControllers');

const router = express.Router();

router.get('/', remindersController.getReminders, ( req, res ) => {
  res.status(202).json(res.locals.reminders);
})

module.exports = router;