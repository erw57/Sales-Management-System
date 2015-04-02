/**
 * Created by liaokaien on 2/19/15.
 */
module.exports = function(app, url) {
    app.get(url, function(req, res) {
        var args = req.query;
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            port: '8889',
            user: 'root',
            password: 'root',
            database: 'system'
        });
        connection.connect();
        var result = {};
        var query = 'SELECT * FROM Product WHERE id=' + args.id;
        console.log(query);
        connection.query(query, function(err, rows) {
            if (!err) {
                result = rows[0];
            } else {
                console.log('ERROR: Retrieval Product Info');
            }
        });
        query = 'SELECT * FROM Inventory WHERE ' + 'id= ' + args.id + ' AND ' + 'store=' + args.store;
        console.log(result);

        connection.query(query, function(err, rows) {
            if (!err) {
                result.amount = rows[0].quantity;
                res.json(result);
            } else {
                console.log('fail to get inventory informaiton');
            }
        });
        connection.end();
    });
};
