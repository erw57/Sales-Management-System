/**
 * Created by liaokaien on 2/19/15.
 */
module.exports = function(app, url) {
    app.get(url, function(req, res) {
        var id = req.query.id;
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            port: '8889',
            user: 'root',
            password: 'root',
            database: 'system'
        });
        connection.connect();
        var result = {};
        var query = 'SELECT * FROM Product WHERE prod_id=' + id;
          console.log(query);
        connection.query(query, function(err, rows) {
            if (!err) {
                result = rows[0];
            } else {
                console.log('ERROR: Retrieval Product Info');
            }
        });
        query = 'SELECT * FROM Inventory WHERE '+'prod_id= '+ id;
        console.log(result);

        connection.query(query,function(err,rows){
            if(!err){
                result.amount = [];
                for(var i=0;i<rows.length;i++){
                    result.amount[i] = {};
                    result.amount[i].store = rows[i].store_name;
                    result.amount[i].amount = rows[i].amount;
                }
                res.json(result);
            }
            else{
                console.log('fail to get inventory informaiton');
            }

                });

    });
};
