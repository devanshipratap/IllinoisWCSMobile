/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app) {
    app.use('/api/users', require('./user.js'));
    app.use('/api/events', require('./event.js'));
};
