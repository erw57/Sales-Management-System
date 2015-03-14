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
        var query = 'SELECT MAX(order_id) AS nextID FROM Transaction';
        connection.query(query, function(err, rows) {
            if (!err) {
                args.id = (parseInt(rows[0].nextID) + 1).toString();
                query = 'INSERT INTO Transaction VALUE(' +
                    quo(args.id) + ',' +
                    quo(args.cus_id) + ',' +
                    quo(args.prod_id) + ',' +
                    quo(args.salesperson) + ',' +
                    args.quantity + ', ' +
                    args.price + ', ' +
                    quo(args.time) + ',' +
                    quo(args.location) + ');';
                console.log(query);
                connection.query(query, function(err) {
                    if (!err) {
                        query = 'UPDATE Inventory SET amount = amount-' +
                            args.quantity + ' WHERE prod_id =' + quo(args.prod_id) + 'AND store_name = ' + quo(args.location) + ';';
                        console.log(query);
                        connection.query(query, function(err, rows) {
                            if (!err) {
                                connection.end();
                                res.json({
                                    orderID: args.id
                                });

                            } else {
                                console.log('Fail to update inventory amount')
                            }
                        })
                    } else {
                        console.log('Failure');
                    }
                });
            } else {
                console.log('No available ID can be offered.')
            }
        });
    });
};
