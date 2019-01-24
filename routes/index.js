const errors = require('restify-errors');
const Todo = require('../models/Todo');

module.exports = function(server) {
    server.post('/todos', (req, res, next) => {
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }
        let data = req.body || {};
        let todo = new Todo(data);
        todo.save((err) => {
            if (err) {
                console.error(err);
                return next(new errors.InternalError(err.message));
                next();
            }
            res.send(201);
            next();
        });
    });

    server.get('/todos', (req, res, next) => {
        Todo.apiQuery(req.params, (err, docs) => {
            if (err) {
                console.error(err);
                return next(new errors.InvalidContentError(err.errors.name.message));
            }
            res.send(docs);
            next();
        });
    });

    server.get('/todos/:todo_id', (req, res, next) => {
        Todo.findOne({ _id: req.params.todo_id }, (err, doc) => {
            if (err) {
                console.error(err);
                return next(new errors.InvalidContentError(err.errors.name.message));
            }
            res.send(doc);
            next();
        });
    });

    server.put('/todos/:todo_id', (req, res, next) => {
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }
        let data = req.body || {};
        if (!data._id) data = Object.assign({}, data, { _id: req.params.todo_id });
        Todo.findOne({ _id: req.params.todo_id }, (err, doc) => {
            if (err) {
                console.error(err);
                return next(new errors.InvalidContentError(err.errors.name.message));
            }
            else if (!doc) {
                return next(new errors.ResourceNotFoundError('The resource you requested could not be found.'));
            }
            Todo.updateOne({ _id: data._id }, data, (err) => {
                if (err) {
                    console.error(err);
                    return next(new errors.InvalidContentError(err.errors.name.message));
                }
                res.send(200, data);
                next();
            });
        });
    });

    server.del('/todos/:todo_id', (req, res, next) => {
        Todo.deleteOne({ _id: req.params.todo_id }, (err) => {
            if (err) {
                console.error(err);
                return next(new errors.InvalidContentError(err.errors.name.message));
            }
            res.send(204);
            next();
        });
    });
};
