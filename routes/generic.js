const errors = require('restify-errors');
const Dog = require('../models/Dog');

function AddRoute(server, model, path) {
    server.post(path, (req, res, next) => {
        if (!req.is('application/json')) return next(new errors.InvalidContentError("Expects 'application/json'"));
        let data = req.body || {};
        let item = new model(data);
        item.save((err) => {
            if (err) {
                console.error(err);
                return next(new errors.InternalError(err.message));
                next();
            }
            res.send(201);
            next();
        });
    });

    server.get(path, (req, res, next) => {
        model.apiQuery(req.params, (err, docs) => {
            if (err) {
                console.error(err);
                return next(new errors.InvalidContentError(err.errors.name.message));
            }
            res.send(docs);
            next();
        });
    });

    server.get(`${path}/:item_id`, (req, res, next) => {
        model.findOne({ _id: req.params.item_id }, (err, doc) => {
            if (err) {
                console.error(err);
                return next(new errors.InvalidContentError(err.errors.name.message));
            }
            res.send(doc);
            next();
        });
    });

    server.put(`${path}/:item_id`, (req, res, next) => {
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }
        let data = req.body || {};
        if (!data._id) data = Object.assign({}, data, { _id: req.params.item_id });
        model.findOne({ _id: req.params.item_id }, (err, doc) => {
            if (err) {
                console.error(err);
                return next(new errors.InvalidContentError(err.errors.name.message));
            }
            else if (!doc) {
                return next(new errors.ResourceNotFoundError('The resource you requested could not be found.'));
            }
            model.updateOne({ _id: data._id }, data, (err) => {
                if (err) {
                    console.error(err);
                    return next(new errors.InvalidContentError(err.errors.name.message));
                }
                res.send(200, data);
                next();
            });
        });
    });

    server.del(`${path}/:item_id`, (req, res, next) => {
        model.deleteOne({ _id: req.params.item_id }, (err) => {
            if (err) {
                console.error(err);
                return next(new errors.InvalidContentError(err.errors.name.message));
            }
            res.send(204);
            next();
        });
    });
}

module.exports = function(server) {
    AddRoute(server, Dog, '/dogs');
};
