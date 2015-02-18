/**
 * Created by greg on 1/29/15.
 */
var jwtAuthService = require("../services/jwtAuthService");
var secret = 'ewfn09qu43f09qfj94qf*&H#(R';

module.exports = function (req, res, next) {
    var token;

    if (req.headers && req.headers.authorization) {
        var parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {
            var scheme = parts[0],
                credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        } else {
            return res.json(401, {err: 'Format is Authorization: Bearer [token]'});
        }
    } else if (req.param('token')) {
        token = req.param('token');
        // We delete the token from param to not mess with blueprints
        delete req.query.token;
    } else {
        return res.json(401, {err: 'No Authorization header was found. You must authenticate before using this service'});
    }

    jwtAuthService.verifyToken(token, function (err, token) {
        if (err) {
            return res.json(401, {err: 'The JWT is not valid'});
        }
        req.token = token;

        next();
    });
};