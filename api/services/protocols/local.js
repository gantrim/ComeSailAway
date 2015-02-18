var validator = require('validator');
var crypto = require('crypto');
var Promise = require('bluebird');

/**
 * Local Authentication Protocol
 *
 * The most widely used way for websites to authenticate users is via a username
 * and/or email as well as a password. This module provides functions both for
 * registering entirely new users, assigning passwords to already registered
 * users and validating login requesting.
 *
 * For more information on local authentication in Passport.js, check out:
 * http://passportjs.org/guide/username-password/
 */

/**
 * Register a new user
 *
 * This method creates a new user from a specified email, username and password
 * and assign the newly created user a local Passport.
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
exports.register = function (req, res, next) {
  var email = req.param('email')
    , username = req.param('username')
    , password = req.param('password')
    , createdObjects = {};

  //region make sure all params are there
  if (!email) {
    req.flash('error', 'Error.Passport.Email.Missing');
    return next(new Error('No email was entered.'));
  }

  if (!username) {
    req.flash('error', 'Error.Passport.Username.Missing');
    return next(new Error('No username was entered.'));
  }

  if (!password) {
    req.flash('error', 'Error.Passport.Password.Missing');
    return next(new Error('No password was entered.'));
  }

//endregion


  User.findOne({username: username})
    //check if username already exists
    .then(function (user) {
      if (user) {
        throw new Error('Username already Exists');
      }
      else {
        return User.findOne({email: email});
      }
    })
    //check if email already exists
    .then(function (user) {
      if (user) {
        throw new Error('Email already Exists');
      }
      else {
        return User.create({
          username: username
          , email: email
        })
      }
    })
    .then(function (user) {
      if (user) {
        createdObjects.user = user;
        var token = crypto.randomBytes(48).toString('base64');
        return Passport.create({
          protocol: "local"
          , password: password
          , user: user.id
          , accessToken: token
        });
      }
      else {
        throw new Error("Unable to create user");
      }
    })
    .then(function (passport) {
      if (passport) {
        createdObjects.passport = passport;
        return next(null, {user: createdObjects.user, passport: createdObjects.passport})
      }
      else {
        throw new Error("Unable To Register User");
      }
    })
    .catch(function (error) {
      if (error) {
        if (error.code === 'E_VALIDATION') {
          if (error.invalidAttributes.email) {
            req.flash('error', 'Error.Passport.Email.Exists');
          } else {
            req.flash('error', 'Error.Passport.User.Exists');
          }
        }
        return next(error);
      }
    })
}
;

/**
 * Assign local Passport to user
 *
 * This function can be used to assign a local Passport to a user who doens't
 * have one already. This would be the case if the user registered using a
 * third-party service and therefore never set a password.
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
exports.connect = function (req, res, next) {
  var user = req.user
    , password = req.param('password');

  Passport.findOne({
    protocol: 'local'
    , user: user.id
  }, function (err, passport) {
    if (err) {
      return next(err);
    }

    if (!passport) {
      Passport.create({
        protocol: 'local'
        , password: password
        , user: user.id
      }, function (err, passport) {
        next(err, user);
      });
    }
    else {
      next(null, user);
    }
  });
};

/**
 * Validate a login request
 *
 * Looks up a user using the supplied identifier (email or username) and then
 * attempts to find a local Passport associated with the user. If a Passport is
 * found, its password is checked against the password supplied in the form.
 *
 * @param {Object}   req
 * @param {string}   identifier
 * @param {string}   password
 * @param {Function} next
 */
exports.login = function (req, identifier, password, next) {
  var isEmail = validator.isEmail(identifier)
    , query = {}
    , user
    , passport;

  if (!identifier || !password) {
    return next('A username AND password is required to authenticate. One or both were missing ');
  }

  if (isEmail) {
    query.email = identifier;
  }
  else {
    query.username = identifier;
  }

  User.findOne(query)
    .then(function (userFromDB) {
      //if no user was found
      if (!userFromDB) {
        if (isEmail) {
          throw new Error('Error.Passport.Email.NotFound');
        } else {
          throw new Error('Error.Passport.Username.NotFound');
        }
      }
      else {
        user = userFromDB;
        return Passport.findOne({user: user.id});
      }
    })
    .then(function (userPassport) {
      passport = userPassport;
      return next(null, {user: user, passport: passport});
    })
    .catch(function (error) {
      if (error) {
        return next(error);
      }
    })
}
