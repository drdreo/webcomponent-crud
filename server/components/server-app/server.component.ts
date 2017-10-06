class AppComponent {

    static get is() {
        return 'server-app';
    }

    beforeRegister() {
        this.is = 'app-component';
    }

    ready() {
        super.ready();

        const mongoskin = require('mongoskin');
        const bodyParser = require('body-parser');
        const logger = require('morgan');

        this.bodyParserMW = bodyParser.json();
        this.bodyParserURLEncodedMW = bodyParser.urlencoded({extended: true});
        this.loggerMW = logger('dev');

        var db = mongoskin.db('mongodb://@localhost:27017/test', {safe: true});

        this.paramCallback = (app) => {
            app.param('collectionName', function (req, res, next, collectionName) {
                req.collection = db.collection(collectionName)
                return next()
            });
        };

        this.getIndex = (req, res) => {
            res.send('please select a collection, e.g., /collections/messages');
        };

        this.getCollection = (req, res, next) => {
            req.collection.find({}, {limit: 10, sort: {'_id': -1}}).toArray(function (e, results) {
                if (e) return next(e)
                res.send(results)
            });
        }

        this.postCollection = (req, res, next) => {
            req.collection.insert(req.body, {}, function (e, results) {
                if (e) return next(e)
                res.send(results)
            });
        }

        this.getCollectionEntity = (req, res, next) => {
            req.collection.findById(req.params.id, function (e, result) {
                if (e) return next(e)
                res.send(result)
            });
        }

        this.putCollectionEntity = (req, res, next) => {
            req.collection.updateById(req.params.id, {$set: req.body}, {
                safe: true,
                multi: false
            }, function (e, result) {
                if (e) return next(e)
                res.send((result === 1) ? {msg: 'success'} : {msg: 'error'})
            });
        }

        this.deleteCollectionEntity = (req, res, next) => {
            req.collection.removeById(req.params.id, function (e, result) {
                if (e) return next(e)
                res.send((result === 1) ? {msg: 'success'} : {msg: 'error'})
            });
        }
    }
}

Polymer(AppComponent);