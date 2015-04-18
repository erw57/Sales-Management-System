/**
 * Created by liaokaien on 3/6/15.
 */
var quo = require('../util/quotation');
module.exports = function(app, url) {
    app.post(url, function (req, res) {
        var args = {
            customer_id : req.body.customer_id,
            store_id :req.body.store_id,
            cart : req.body.cart,
            sales_id :(req.session.id?req.session.id:42)
        };
        console.log('session.id=',args.sales_id);


        //console.log( "args:",args);
        var connection = require('../util/db');
        var transaction_id;
        var mysql = require('mysql');
        var db = require('../util/db');
        var connection = db(mysql);
        connection.query('SELECT MAX(id) AS nextID FROM TTransaction', function (err, rows) {
            if (!err) {
                transaction_id = (parseInt(rows[0].nextID) + 1).toString();
                var time = new Date();
                var year = time.getFullYear();
                var month = time.getMonth() + 1;
                if (month < 10) {
                    month = 0 + month.toString();
                }
                var date = time.getDate();
                var hour = time.getHours();
                var minute = time.getMinutes();
                var second  = time.getSeconds();
                time = year + '-' + month + '-' + date+' '+hour+':'+minute+':'+second;

                var transQuery = 'INSERT INTO TTransaction VALUES(' +
                    transaction_id + ',' + quo(time) + ',' + args.customer_id + ',' +
                    args.sales_id + ',' + args.store_id + ");";
                console.log(transQuery);
                connection.query(transQuery, function (err) {
                    if (!err) {
                        var it = {time:0};
                        connection.query('SELECT MAX(id) AS nextID FROM `TOrder`', function (err, rows) {
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
                                        var orderQuery = 'INSERT INTO `TOrder` VALUES(' +
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
                                                res.json({message:'error'});
                                                console.log('Error:', err);
                                            }
                                        });
                                    }
                                    res.json({message:'success'});
                                    connection.end();

                                } else {
                                    res.json({message:'error'});
                                    console.log('Failure');
                                }// end update order;
                            });

                    } //end update transaction
                    else {
                        res.json({message:'error'});
                        console.log('Error: Update Transaction');
                    }
                });
            }
            else{
                res.json({message:'error'});
                console.log("error: connect to database");
            }
        });// End order insert
    })
};
