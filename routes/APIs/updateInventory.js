/**
 * Created by liaokaien on 3/6/15.
 */
var quo = require('../util/quotation');
module.exports = function(app, url) {
    app.post(url, function(req, res) {
        var args = req.body;
        console.log(req.body);
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            port: '8889',
            user: 'root',
            password: 'root',
            database: 'system'
        });
        connection.connect();
        var query = 'SELECT * FROM Inventory WHERE prod_id=' + args.id + ' AND store_name=' + quo(args['store_name']);
        console.log(query);
        connection.query(query, function(err, rows) {
            if (!err) {
                if (rows.length > 0) {
                    query = 'UPDATE Inventory SET amount=amount' + args['amount'] + ' WHERE prod_id=' + quo(args['id']) + ' AND store_name =' + quo(args['store_name']) + ';';
                    console.log(query);
                    connection.query(query, function(err, rows) {
                        if (!err) {
                            console.log('Success: Update inventory amount');
                            connection.end();
                            res.json({
                                data: rows
                            });
                        } else {
                            console.log('Error: Update inventory amount.');
                        }
                    });
                } else {
                    query = 'INSERT INTO Inventory VALUE(' +
                        quo(args['id']) + ', ' +
                        quo(args['store_name']) + ' ,' +
                        args['amount'].substring(1) + ');';
                    console.log('query: ', query)
                    connection.query(query, function(err, rows) {
                        if (!err) {
                            console.log('Success: Add new inventory item');
                            connection.end();
                            res.json(rows);
                        } else {
                            console.log('Error: Add new inventory item')
                        }
                    });
                }

            } else {
                console.log('ERROR 2');
            }

        });



    });


};
