/**
 * Created by liaokaien on 3/8/15.
 */
var quo = require('../util/quotation');
module.exports = function(app, url) {
    app.get(url, function(req, res) {
        var id = req.query.id;
        var store = req.query.store;
        var connection = require('../util/db.js');
        connection.connect();
        var query;
        if (store == 'all') {
            query = 'SELECT * FROM Inventory WHERE ' +
                'prod_id = ' + id;
        } else {
            query = 'SELECT * FROM Inventory WHERE ' +
                'prod_id= ' + id + ' AND store_name=' + quo(store);
        }
        console.log('Query to be sent', query);
        connection.query(query, function(err, rows) {
            if (!err) {
                console.log(rows);
                res.json(rows);
            } else
                console.log('Error: can not get information');

        });
        connection.end();
    });
};