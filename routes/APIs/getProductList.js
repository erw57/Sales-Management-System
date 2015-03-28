/**
 * Created by liaokaien on 2/16/15.
 *
 * @param app
 * @param url
 */
 var quo = require('../util/quotation');
module.exports = function(app, url) {
    app.get(url, function(req, res) {
        var list = {};
        list.data = [];
        var store_name = req.query.store_name;
        //
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            port: '8889',
            user: 'root',
            password: 'root',
            database: 'system'
        });
        var productList = [];
        connection.connect();
        var query = 'SELECT prod_id FROM Inventory WHERE store_name='+quo(store_name);
        connection.query(query,function(err,rows){
            if(!err){
                for(var i = 0; i<rows.length;i++){
                      productList.push(rows[i].prod_id);
                }
                console.log(productList);
            }
        });
        query = 'SELECT * FROM Product';
        connection.query(query, function(err, rows) {
            if (!err) {
                //console.log(rows);
                var q = 0
                for (var i = 0; i < rows.length; i++) {
                    if(productList.indexOf(rows[i]['prod_id'])>=0){
                        list.data[q] = new Object();
                        list.data[q].name = rows[i]['prod_name'];
                        list.data[q].id = rows[i]['prod_id'];
                        list.data[q].price = rows[i].price;
                        list.data[q].kind = rows[i]['prod_kind'];
                        list.data[q].image_path = rows[i].image_path;
                        q++;
                    }

                }
                res.json(list);
            } else {
                console.log('Error:', err, rows);
            }
        });
        connection.end();
    });
}
