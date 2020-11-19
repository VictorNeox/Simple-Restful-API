module.exports = {
    log(req, res, next) {
        console.log('Logging...');
        next();
    },

    authenticate (req, res, next) {
        console.log('Authenticating...');
        next();
    }
}