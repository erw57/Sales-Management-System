/**
 * Created by liaokaien on 2/20/15.
 */

var quo = require('../util/quotation');


module.exports = function(app, url) {
    app.get(url, function(req, res) {
        // when receive a GET HTTP request, send query to database.
        //step - 1 connect to mysql
        var info = {};
        var mysql = require('mysql');
        var db = require('../util/db');
        var connection = db(mysql);
        connection.connect();

        // step - 2 construct query and send it to database
        var id = req.query.id;
        var query = {};
        query.getBasicInfo = 'SELECT * FROM Customer WHERE id = ' + id + ';';
        console.log(query.getBasicInfo);
        connection.query(query.getBasicInfo, function(err, rows) {
            if (!err) {
                if(rows.length > 0){
                // if query are processed correctly, send the info as JSON to browser.
                info.name = rows[0].name;
                info.id = rows[0].id;
                info.street = rows[0].street;
                info.city = rows[0].city;
                info.state = rows[0].state;
                info.zip_code = rows[0].zip_code;
                info.kind = rows[0].kind;
                info.history = [];
                if (info.kind === 'home') {
                    query.getDetailInfo = 'select * from HCustomer where customer_id=' + id;
                    console.log(query.getDetailInfo);
                    mysql = require('mysql');
                    db = require('../util/db');
                    connection = db(mysql);
                    connection.connect();

                    connection.query(query.getDetailInfo, function (err, rows) {
                        if (!err) {
                            info.marriage_status = rows[0].marriage_status;
                            info.gender = rows[0].gender;
                            info.age = rows[0].age;
                            info.income = rows[0].home_income;
                            query.getTransaction = 'select id from `TTransaction` where customer_id=' + id;
                            console.log(query.getTransaction);
                            connection.query(query.getTransaction, function (err, rows) {
                                if (!err) {
                                    if (rows.length > 0) {
                                        query.getOrder = 'select * from `TOrder` where transaction_id in(';
                                        for (var i = 0; i < rows.length; i++) {
                                            query.getOrder += rows[i].id + ','
                                        }
                                        query.getOrder = query.getOrder.slice(0, query.getOrder.length - 1);
                                        query.getOrder += ');';
                                        console.log(query.getOrder);
                                        connection.query(query.getOrder, function (err, rows) {
                                            if (!err) {
                                                info.history = rows;
                                                res.json(info);
                                            }
                                            else {
                                                res.json(info);
                                            }
                                        });
                                    }
                                    else {
                                        res.json(info);
                                    }

                                }
                                else {
                                    console.log(err);
                                    res.json({message: "error:1"});
                                }
                            })

                        }
                        else {
                            console.log(err);
                            res.json({message: "error:2"});
                        }
                    });
                }
                else {
                    query.getDetailInfo = 'select * from BCustomer where customer_id=' + id;
                    console.log(query.getDetailInfo);
                    var mysql = require('mysql');
                   var db = require('../util/db');
                   var connection = db(mysql);
                        connection.connect();
                    connection.connect();
                    connection.query(query.getDetailInfo, function (err, rows) {
                        if (!err) {
                            info.category = rows[0].business_category;
                            info.income = rows[0].company_income;
                            query.getTransaction = 'select id from `TTransaction` where customer_id=' + id;
                            connection.query(query.getTransaction, function (err, rows) {
                                if (!err) {
                                    if (rows.length > 0) {
                                        query.getOrder = 'select * from `TOrder` where transaction_id in(';
                                        for (var i = 0; i < rows.length; i++) {
                                            query.getOrder += rows[i].id + ','
                                        }
                                        query.getOrder = query.getOrder.slice(0, query.getOrder.length - 1);
                                        query.getOrder += ');';
                                        connection.query(query.getOrder, function (err, rows) {
                                            if (!err) {
                                                info.history = rows;
                                                res.json(info);
                                            }
                                            else {
                                                res.json(info);
                                            }
                                        });
                                    }
                                    else {
                                        res.json(info);
                                    }

                                }
                                else {
                                    console.log(err);
                                    res.json({message: "error"});
                                }
                            })

                        }
                        else {
                            console.log(err);
                            res.json({message: "error"});
                        }
                    });
                }
                }
                else{res.json({message:"error:3"})}
            }
            else{
                console.log('Error while performing Query.');
                res.json({message:'fail'});
            }
        });
        connection.end();
    });
}
