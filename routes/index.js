const specific = require('./specific');
const generic = require('./generic');

module.exports = function(server) {
    specific(server);
    generic(server);
};
