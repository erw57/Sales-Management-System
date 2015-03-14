/**
 * Created by liaokaien on 3/6/15.
 */

module.exports = function(app, url) {
    app.get(url, function(req, res) {
        var id = req.query.id;
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'leon1993',
            database: 'system'
        });
        connection.connect();
        var query = 'SELECT * FROM Transaction WHERE cus_id=' + id;
        connection.query(query, function(err, rows) {
            if (!err) {
                res.json({
                    total: rows.length,
                    data: rows
                });
            } else {
                console.log('ERROR: Retrieval Product Info');
            }
            connection.end();
        });

    });
};
