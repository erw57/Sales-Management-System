/**
 * Created by liaokaien on 2/16/15.
 *
 * @param app
 * @param url
 */
module.exports = function(app, url) {
    app.get(url, function(req, res) {
        var list = new Object();
        list.data = [];
        //
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: '127.0.0.1',
            port: '3306',
            user: 'root',
            password: 'leon1993',
            database: 'system'
        });
        connection.connect();
        var query = 'SELECT prod_id,prod_name,price,product_kind FROM Product';
        connection.query(query, function(err, rows) {
            if (!err) {
                console.log(rows);
                for (var i = 0; i < rows.length; i++) {
                    list.data[i] = new Object();
                    list.data[i].name = rows[i]['prod_name'];
                    list.data[i].id = rows[i]['prod_id'];
                    list.data[i].price = rows[i].price;
                    list.data[i].kind = rows[i]['prod_kind'];
                }
                res.json(list);
            } else {
                console.log('Error:', err, rows);
            }
        });
        connection.end();
    });
}
