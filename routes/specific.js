const errors = require('restify-errors');
const Cat = require('../models/Cat');

module.exports = function(server) {
    server.post('/cats', (req, res, next) => {
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }
        let data = req.body || {};
        let cat = new Cat(data);
        cat.save((err) => {
            if (err) {
                console.error(err);
                return next(new errors.InternalError(err.message));
                next();
            }
            res.send(201);
            next();
        });
    });

    server.get('/cats', (req, res, next) => {
        Cat.apiQuery(req.params, (err, docs) => {
            if (err) {
                console.error(err);
                return next(new errors.InvalidContentError(err.errors.name.message));
            }
            res.send(docs);
            next();
        });
    });

    server.get('/cats/:cat_id', (req, res, next) => {
        Cat.findOne({ _id: req.params.cat_id }, (err, doc) => {
            if (err) {
                console.error(err);
                return next(new errors.InvalidContentError(err.errors.name.message));
            }
            res.send(doc);
            next();
        });
    });

    server.put('/cats/:cat_id', (req, res, next) => {
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }
        let data = req.body || {};
        if (!data._id) data = Object.assign({}, data, { _id: req.params.cat_id });
        Cat.findOne({ _id: req.params.cat_id }, (err, doc) => {
            if (err) {
                console.error(err);
                return next(new errors.InvalidContentError(err.errors.name.message));
            }
            else if (!doc) {
                return next(new errors.ResourceNotFoundError('The resource you requested could not be found.'));
            }
            Cat.updateOne({ _id: data._id }, data, (err) => {
                if (err) {
                    console.error(err);
                    return next(new errors.InvalidContentError(err.errors.name.message));
                }
                res.send(200, data);
                next();
            });
        });
    });

    server.del('/cats/:cat_id', (req, res, next) => {
        Cat.deleteOne({ _id: req.params.cat_id }, (err) => {
            if (err) {
                console.error(err);
                return next(new errors.InvalidContentError(err.errors.name.message));
            }
            res.send(204);
            next();
        });
    });
};
