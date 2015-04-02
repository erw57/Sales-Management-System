/**
 * Created by liaokaien on 3/6/15.
 */
var quo = require('../util/quotation');
module.exports = function(app, url) {
    app.post(url, function(req, res) {
        var args = {
            store_id:req.body.store_id,
            product_id:req.body.product_id,
            quantity:req.body.quantity
        };
        console.log(req.body);
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            port: '8889',
            user: 'root',
            password: 'root',
            database: 'test'
        });
        connection.connect();
        var query = 'SELECT * FROM Inventory WHERE product_id=' + args.product_id + ' AND store_id=' +args.store_id;
        console.log(query);
        connection.query(query, function(err, rows) {
            if (!err) {
                if (rows.length > 0) {
                    query = 'UPDATE Inventory SET quantity=quantity' + args.quantity + ' WHERE product_id=' +args.product_id
                    + ' AND store_id =' + args.store_id + ';';
                    console.log(query);
                    connection.query(query, function(err) {
                        if (!err) {
                            console.log('Success: Update inventory amount');
                            connection.end();
                            res.json({message:'success'});
                        } else {
                            res.json({message:'error'});
                            console.log('Error: Update inventory amount.');
                        }
                    });
                } else {
                    query = 'select max(id) as nextID from Inventory';
                    connection.query(query,function(err,rows){
                        args.id = (parseInt(rows[0].nextID) + 1).toString();
                        query = 'INSERT INTO Inventory VALUES(' +
                        args.id+','+ args.store_id + ',' +args.product_id+
                        ','+args.quantity.substring(1)+');';
                        console.log('query: ', query)
                        connection.query(query, function(err, rows) {
                            if (!err) {
                                console.log('Success: Add new inventory item');
                                connection.end();
                                res.json({message:'success'});
                            } else {
                                res.json({message:'error'});
                                console.log('Error: Add new inventory item')
                            }
                        });
                    });
                }
            } else {
                console.log('ERROR 2');
            }
        });
    });
};
