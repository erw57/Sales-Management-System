/**
 * Created by liaokaien on 2/19/15.
 */
module.exports = function(app, url) {
    app.get(url, function(req, res) {
        var args = req.query;
        var mysql = require('mysql');
        var db = require('../util/db');
        var connection = db(mysql);
        connection.connect();
        var result = {};
        var query = 'SELECT * FROM Product WHERE id=' + args.id;
        console.log(query);
        connection.query(query, function(err, rows) {
            if (!err) {
                result = rows[0];
                var imagePath = rows[0].image_path;
                imagePath = imagePath.slice(0,imagePath.length-1);
                result.image_path = imagePath.split(',');
                connection = require('../util/db');
                connection.connect();
                query = 'SELECT * FROM Inventory WHERE ' + 'product_id= ' + args.id + ' AND ' + 'store_id=' + args.store;
                console.log(query);

                connection.query(query, function(err, rows) {
                    if (!err) {
                        result.amount = rows[0].quantity;
                        res.json(result);
                    } else {
                        console.log('fail to get inventory informaiton',err);
                    }
                });
            } else {
                console.log('ERROR: Retrieval Product Info');
            }
        });

        connection.end();
    });
};
