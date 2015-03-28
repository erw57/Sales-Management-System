/**
 * Created by liaokaien on 3/6/15.
 */
module.exports = function(app, url) {
    app.get(url, function(req, res) {
        var list = new Object();
        list.data = [];
        //
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            port: '8889',
            user: 'root',
            password: 'root',
            database: 'system'
        });
        connection.connect();
        var query = 'SELECT cus_id,kind,gender,name,age FROM Customer';
        connection.query(query, function(err, rows) {
            if (!err) {
                console.log(rows);
                for (var i = 0; i < rows.length; i++) {
                    list.data[i] = new Object();
                    var column = rows[i];
                    list.data[i].name = column['name'];
                    list.data[i].id = column['cus_id'];
                    list.data[i].gender = column['gender'];
                    list.data[i].age = column['age'];
                    list.data[i].kind = column['kind'];
                }
                res.json(list);
            } else {
                console.log('Error:', err);
            }
        });
        connection.end();
    });
}
