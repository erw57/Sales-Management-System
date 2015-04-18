/**
 * Created by liaokaien on 3/6/15.
 */

module.exports = function(app, url) {
    app.get(url, function(req, res) {
        var id = req.query.id;
        var mysql = require('mysql');
        var db = require('../util/db');
        var connection = db(mysql);
        connection.connect();
        var query = 'SELECT * FROM Transaction WHERE cus_id=' + id;
        console.log(query);
        connection.query(query, function(err, rows) {
            if (!err) {
                res.json({
                    total: rows.length,
                    history: rows
                });
            } else {
                console.log('ERROR: Retrieval Product Info');
            }
            connection.end();
        });

    });
};
