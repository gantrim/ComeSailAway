var Promise = require('bluebird');
var crypto = require('crypto');
var UserService = {


  //
  //getUserAttributes: function (user) {
  //
  //  //if no user was found
  //  if (user) {
  //    var userObjects = {};
  //    userObjects.user = user
  //    return UserService.getClientSafePassportForUserByProtocol(user.id, "local")
  //      .then(function (userPassport) {
  //        userObjects.passport = userPassport;
  //        return UserService.getRolesForUser(userObjects.id);
  //      })
  //      .then(function (userRoles) {
  //        userObjects.roles = userRoles;
  //        return userObjects;
  //      })
  //  }
  //  else {
  //    throw new Error('Could Not Get User Attributes');
  //  }
  //}
  //
  //,
  //createSimplCarUser: function (username, email, password, roles) {
  //  var createdObjects = {};
  //  return User.create({
  //    username: username,
  //    email: email
  //  })
  //    .then(function (user) {
  //      if (user) {
  //        createdObjects.user = user;
  //        var token = crypto.randomBytes(48).toString('base64');
  //        return Passport.create({
  //          protocol: "local"
  //          , password: password
  //          , user: user.id
  //          , accessToken: token
  //        });
  //      }
  //      else {
  //        User.destroy({username: username});
  //        delete createdObjects.user
  //        throw new Error("Unable to create user");
  //      }
  //    })
  //    .then(function (passport) {
  //      if (passport) {
  //        createdObjects.passport = passport;
  //        return OrientDBClient
  //          .create("Edge", "E")
  //          .from(createdObjects.user.id)
  //          .to(createdObjects.passport.id)
  //          .one()
  //          .then(function (userPassportEdge) {
  //            return userPassportEdge;
  //          })
  //      }
  //      else {
  //        User.destroy({id: createdObjects.user.id});
  //        throw new Error("Unable to create passport for user");
  //      }
  //    })
  //    .then(function (userToPassportEdge) {
  //      if (userToPassportEdge) {
  //        var rolePromises = [];
  //        for (var i = 0, len = roles.length; i < len; i++) {
  //          var uppercaseRole = roles[i].toUpperCase();
  //          var rolePromise =
  //                Role.findOrCreate({name: uppercaseRole}, {name: uppercaseRole, user: createdObjects.user.id})
  //                  .then(function (role) {
  //                    return role;
  //                  });
  //          rolePromises.push(rolePromise);
  //        }
  //        return Promise.all(rolePromises);
  //      }
  //      else {
  //        User.destroy({id: createdObjects.user.id});
  //        Passport.destroy({id: createdObjects.passport.id})
  //        throw new Error("Unable to create link between user and local passport");
  //      }
  //    })
  //    .then(function (userRoles) {
  //      if (userRoles) {
  //        createdObjects.roles = userRoles;
  //        var userRoleEdgePromises = [];
  //        for (var i = 0, len = userRoles.length; i < len; i++) {
  //          var userRoleEdgePromise = OrientDBClient
  //            .create("Edge", "E")
  //            .from(createdObjects.user.id)
  //            .to(userRoles[i].id)
  //            .one()
  //            .then(function (userPassportEdge) {
  //              return userPassportEdge;
  //            });
  //          userRoleEdgePromises.push(userRoleEdgePromise);
  //        }
  //        return Promise.all(userRoleEdgePromises);
  //      }
  //      else {
  //        throw new Error("Unable to setup roles for user");
  //      }
  //    })
  //    .then(function (userRoleEdges) {
  //      if (userRoleEdges) {
  //        createdObjects.roleEdges = userRoleEdges;
  //        return createdObjects;
  //      }
  //    });
  //},
  //
  //findOrCreateSimplCarUser: function (username, email, password, roles) {
  //
  //  return UserService.checkForExistingUsernameOrEmail(username, email)
  //    .then(function (foundUsers) {
  //      var user;
  //
  //      //user was found by username
  //      if (foundUsers[0]) {
  //        user = foundUsers[0];
  //        return UserService.getUserAttributes(user);
  //      }
  //      //user was found by email address
  //      else if (foundUsers[1]) {
  //        user = foundUsers[1];
  //        return UserService.getUserAttributes(user);
  //      }
  //      else {
  //
  //        return UserService.createSimplCarUser(username, email, password, roles);
  //      }
  //    })
  //},
  //
  //checkForExistingUsernameOrEmail: function (username, email) {
  //  return Promise.all([User.findOne({username: username}), User.findOne({username: username})]);
  //}
}

module.exports = UserService;
