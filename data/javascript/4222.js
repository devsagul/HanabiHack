'use strict';

const RemoteService = require('./../../services/remote');

function handler(request, reply) {
    const user = request.yar.get('user');

    if (!user) {
        return reply.redirect('/');
    }

    const idToken = user.tokens && user.tokens.idToken.jwtToken;

    return RemoteService.list(idToken, (error, remotes) => {
        return reply.view('dashboard', {
            user,
            remotes,
            noRemotes: true
        });
    });
}

module.exports = handler;
