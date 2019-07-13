const User = require("../../models/User");
const UserSession = require("../../models/UserSession");
const mongoose = require("mongoose")

module.exports = (app) => {
  mongoose.set('useFindAndModify', false);

  app.post('/api/account/signup', (req, res, next) => {
    const { username, password, zip } = req.body;
    let { email, gender } = req.body;
    if (!username) {
      return res.send({
        success: false,
        message: "Error: Username cannot be empty."
      });
    }
    if (!email) {
      return res.send({
        success: false,
        message: "Error: Email cannot be empty."
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Error: Password cannot be empty."
      });
    }
    if (!gender) {
      return res.send({
        success: false,
        message: "Error: Gender cannot be empty."
      });
    }
    if (!zip) {
      return res.send({
        success: false,
        message: "Error: ZIP Code cannot be empty."
      });
    }

    email = email.toLowerCase();
    gender = gender.toUpperCase();

    if (gender != 'MALE' && gender != 'FEMALE' && gender != 'OTHER') {
      return res.send({
        success: false,
        message: "Error: Gender must be male, female, or other."
      });
    }

    // Steps:
    // 1. Verify email doesn't already exist
    // 2. Save

    User.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error."
        });
      } else if (previousUsers.length > 1) {
        return res.send({
          success: false,
          message: "Error: Email already in use."
        });
      } else {
        // Save the new user
        const newUser = new User();
        newUser.email = email;
        newUser.username = username;
        newUser.password = newUser.generateHash(password);
        newUser.zip = zip;
        newUser.gender = gender;
        newUser.save((err, user) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error: Server error."
            });
          } else {
            return res.send({
              success: true,
              message: "Signed up!"
            });
          }
        });
      }
    });
  });

  app.post('/api/account/signin', (req, res, next) => {
    const { password, username } = req.body;
    if (!username) {
      return res.send({
        success: false,
        message: "Error: Username cannot be empty."
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Error: Password cannot be empty."
      });
    }

    User.find({
      username: username,
    }, (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error."
        });
      } else if (users.length != 1) {
        return res.send({
          success: false,
          message: "Error: Invalid username."
        });
      } else {
        const user = users[0];
        if (!user.validPassword(password)) {
          return res.send({
            success: false,
            message: "Error: Invalid password."
          });
        } else {
          // Otherwise create UserSession
          const newUserSession = new UserSession();
          newUserSession.userId = user._id;
          newUserSession.save((err, doc) => {
            if (err) {
              return res.send({
                success: false,
                message: "Error: Username already in use."
              });
            } else {
              return res.send({
                success: true,
                message: "Signed in!",
                token: doc._id
              });
            }
          })
        }
      }
    });
  });

  app.get('/api/account/verify', (req, res, next) => {
    // Get token
    const { token } = req.query; // ?token=test
    // Verify token is unique and not deleted
    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error."
        });
      } else if (sessions.length != 1) {
        return res.send({
          success: false,
          message: "Error: Failed verification."
        });
      } else {
        return res.send({
          success: true,
          message: "Verified!"
        });
      }
    });
  });

  app.get('/api/account/logout', (req, res, next) => {
    // Get token
    const { token } = req.query; // ?token=test
    // Verify token is unique and not deleted
    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
        $set: {
          isDeleted: true
        }
      }, null, (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error."
          });
        } else {
          return res.send({
            success: true,
            message: "Logged out!"
          });
        }
      });
  });
}
