/**
 * Created by liaokaien on 3/6/15.
 */
var quo = require('../util/quotation');

module.exports = function(app, url) {
    app.post(url, function(req, res) {
        var args = req.body;
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'leon1993',
            database: 'system'
        });
        connection.connect();
        var query = 'SELECT MAX(prod_id) AS nextID FROM Transaction';
        connection.query(query, function(err, rows) {
            if (!err) {
                args.id = (parseInt(rows[0].nextID) + 1).toString();
                query = 'INSERT INTO Product VALUE(' +
                    quo(args.id) + ',' +
                    quo(args.name) + ',' +
                    args.price + ',' + quo(args.kind) + ');';
                console.log(query);
                connection.query(query, function(err) {
                    if (!err) {
                        connection.end();
                        res.json(args.id);
                    } else {
                        console.log('ERROR');
                    }
                });

            } else {
                console.log('ERROR');
            }
        });
    });
}
