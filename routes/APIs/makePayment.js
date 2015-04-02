/**
 * Created by liaokaien on 3/6/15.
 */
var quo = require('../util/quotation');
module.exports = function(app, url) {
    app.post(url, function (req, res) {
        var args = req.body;
        console.log( "args:",args);
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            port: '8889',
            user: 'root',
            password: 'root',
            database: 'test'
        });
        var transaction_id;
        connection.connect();
        connection.query('SELECT MAX(id) AS nextID FROM Transaction', function (err, rows) {
            if (!err) {
                transaction_id = (parseInt(rows[0].nextID) + 1).toString();
                var time = new Date();
                var year = time.getFullYear();
                var month = time.getMonth() + 1;
                if (month < 10) {
                    month = 0 + month.toString();
                }
                var date = time.getDate();
                time = year + '-' + month + '-' + date;
                var transQuery = 'INSERT INTO Transaction VALUES(' +
                    transaction_id + ',' + quo(time) + ',' + args.customer_id + ',' +
                    args.sales_id + ',' + args.store_id + ");";
                console.log(transQuery);
                connection.query(transQuery, function (err) {
                    if (!err) {
                        var it = {time:0};
                        connection.query('SELECT MAX(id) AS nextID FROM `Order`', function (err, rows) {
                                if (!err) {
                                    it.id = (parseInt(rows[0].nextID) + 1).toString();
                                    for (var i = 0; i < args.cart.length; i++) {
                                        var orderArgs = {};
                                        console.log(orderArgs.id);
                                        orderArgs.id = it.id;
                                        orderArgs.transaction_id = transaction_id;
                                        orderArgs.product_id = args.cart[it.time].product_id;
                                        orderArgs.quantity = args.cart[it.time].quantity;
                                        orderArgs.price = args.cart[it.time].price;
                                        it.time++;
                                        it.id ++;
                                        var orderQuery = 'INSERT INTO `Order` VALUES(' +
                                            orderArgs.id + ',' +
                                            orderArgs.transaction_id + ',' +
                                            orderArgs.product_id + ',' +
                                            orderArgs.quantity + ', ' +
                                            orderArgs.price + ');';
                                        console.log(orderQuery);
                                        connection.query(orderQuery, function (err, rows) {
                                            if (!err) {
                                                console.log('Success: Update Order');
                                            }
                                            else {
                                                console.log('Error:', err);
                                            }
                                        });
                                    }

                                } else {
                                    console.log('Failure');
                                }// end update order;
                            });

                    } //end update transaction
                    else {
                        console.log('Error: Update Transaction');
                    }
                });
            }
            else{
                console.log("error: connect to database");
            }
        });
    })
};
