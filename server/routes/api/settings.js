const User = require("../../models/User");
const mongoose = require("mongoose")

module.exports = (app) => {
  mongoose.set('useFindAndModify', false);

  app.post('/api/settings/username', (req, res, next) => {
    const {old_username, new_username} = req.body;
    let {new_username, username} = req.body;
    if(!old_username){
      return res.send({
        success: false,
        message: "Error: Username cannot be empty."
      });
    }
    // code to change username
  });

  app.post('/api/settings/password', (req, res, next) => {
    // code to change user password
    // use bcrypt to encrypt password (see /api/account/signup on how password encryption works)
  });

  app.post('/api/settings/email', (req, res, next) => {
    // code to change email
    // make sure email is not already being used
    // dont forget to change to lowercase
  });

  app.post('/api/settings/gender', (req, res, next) => {
    // code to change gender
    // make sure only MALE, FEMALE, and OTHER are allowed
  });

  app.post('/api/settings/zip', (req, res, next) => {
    // code to change ZIP code
  });
}
