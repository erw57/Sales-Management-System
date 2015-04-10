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
        var args = req.query;
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            port: '8889',
            user: 'root',
            password: 'root',
            database: 'test'
        });
        connection.connect();
        var query;
        if (args.store_id === 'all') {
            query = 'SELECT * FROM Inventory ;';
        } else {
            query = 'SELECT * FROM Inventory WHERE store_id=' + quo(args.store_id);
        }

        //console.log(query);
        connection.query(query, function(err, rows) {
            if (!err) {
                //console.log(rows);
                for (var i = 0; i < rows.length; i++) {
                    var temp = {};
                    temp.id = rows[i].product_id;
                    temp.quantity = rows[i].quantity;
                    list.data.push(temp);
                }
                var it= {};

                //console.log(list.data);


                for (var i = 0; i < list.data.length; i++) {
                    var num = list.data[i].id;
                    it[num]  = i;
                    //console.log(it);
                    query = 'SELECT * FROM Product WHERE id =' + list.data[i].id+";";
                    //console.log(query);
                    connection.query(query, function(err, rows) {
                        if(!err){
                            //console.log(rows);
                            var id = rows[0].id;


                            list.data[it[id]].name = rows[0].name;
                            list.data[it[id]].price = rows[0].price;
                            list.data[it[id]].kind = rows[0].kind;
                            var imagePath = rows[0].image_path;
                            imagePath = imagePath.slice(0,imagePath.length-1);
                            list.data[it[id]].image_path = imagePath.split(',');
                            list.data[it[id]].description = rows[0].description;
                            console.log(list);
                            if (it[id] === list.data.length-1){
                                connection.end();
                                res.json(list);
                            }
                        }
                        else{
                            console.log('Error: Product');
                        }
                    });
                }
            }
        });
    });
};
