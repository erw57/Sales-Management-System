/**
 * Created by liaokaien on 3/8/15.
 */
/**
 * Created by liaokaien on 3/8/15.
 */
var quo = require('../util/quotation');
module.exports = function(app, url) {
    app.post(url, function(req, res) {
        var args = req.body;
        var connection = require('../util/db');
        connection.connect();
        var query;
        query = 'UPDATE Product SET' +
            ' prod_name=' + quo(args.name) +
            ' ,price=' + args['price'] +
            ' ,product_kind=' + quo(args['kind']) +
            ',description=' + quo(args.description) +
            ' WHERE prod_id =' + args.id;

        console.log('Qurry:\n', query);
        connection.query(query, function(err, rows) {
            if (!err) {
                res.json(args);
            }
        });
        connection.end();



    });
};
