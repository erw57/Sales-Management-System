/**
 * Created by liaokaien on 2/23/15.
 */
var quo = require('../util/quotation');



module.exports = function(app, url) {
    app.post(url, function(req, res) {
        var args = req.body;
        console.log(args);
        var mysql = require('mysql');
        var db = require('../util/db');
        var connection = db(mysql);
        connection.connect();
        var query = {};
        query.getCusId = "select max(id) as nextID from Customer;";
        connection.query(query.getCusId, function(err, rows) {
            if (!err) {
                args.customer_id = (parseInt(rows[0].nextID) + 1).toString();
                query.customer = 'insert into Customer values(' +
                    args.customer_id + ',' + quo(args.name) + ',' + quo(args.street) + ',' +
                    quo(args.city) + ',' + quo(args.state) + ',' + args.zip_code + ',' +
                    quo(args.kind) + ');';
                connection.query(query.customer, function(err) {
                    if (!err) {
                        if (args.kind === 'home') {
                            query.getId = 'select max(id) as nextID from HCustomer';
                            connection.query(query.getId, function(err, rows) {
                                if (!err) {
                                    args.id = (parseInt(rows[0].nextID) + 1).toString();
                                    query.Hcustomer = 'insert into Hcustomer values(' +
                                        args.id + ',' + args.customer_id + ',' + quo(args.marriage_status) +
                                        ',' + quo(args.gender) + ',' + args.age + ',' +
                                        args.income + ');';
                                    connection.query(query.Hcustomer, function(err) {
                                        if (!err) {
                                            console.log("Success: add a new customer");
                                            connection.end();
                                            res.json({
                                                message: 'success'
                                            });
                                        } else {
                                            console.log("error: add new customer");
                                            res.json({
                                                message: 'fail'
                                            });
                                        }
                                    });
                                } else {
                                    console.log('error: get id from home customer')
                                }
                            });
                        } else {
                            query.getId = 'select max(id) as nextID from BCustomer';
                            connection.query(query.getId, function(err, rows) {
                                if (!err) {
                                    args.id = (parseInt(rows[0].nextID) + 1).toString();
                                    query.Bcustomer = 'insert into Bcustomer values(' +
                                        args.id + ',' + args.customer_id + ',' + quo(args.category) +
                                        ',' + args.income + ');';
                                    console.log(query.Bcustomer);
                                    connection.query(query.Bcustomer, function(err) {
                                        if (!err) {
                                            console.log("Success: add a new customer");
                                            connection.end();
                                            res.json({
                                                message: 'success'
                                            });
                                        } else {
                                            console.log("error: add new customer");
                                            res.json({
                                                message: 'fail'
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    } else {
                        console.log('Error: insert into customer', err);
                        res.json({
                            message: 'fail'
                        });
                    }
                });
            } else {
                console.log("Error: can not link to database");
                res.json({
                    message: 'fail'
                });
            }
        });
    });
};
