/**
 * Created by liaokaien on 4/10/15.
 */
var quo = require('../util/quotation');

module.exports = function(app, url) {
    app.get(url, function(req, res) {
        var id = req.query.id;
        var result = {};
        var query = {
            order :'select * from TOrder where id ='+id,
            transaction:'',
            product:''
        }
        var connection = require('../util/db');
        connection.connect();
        connection.query(query.order,function(err,rows){
            if(!err){
                result.quantity = rows[0].quantity;
                query.transaction = 'select * from TTransaction where id =' + rows[0].transaction_id;
                query.product = 'select * from Product where id =' + rows[0].product_id;
                connection.query(query.transaction,function(err,rows){
                    if(!err){
                        result.time = rows[0].time;
                        query.saleAndStore = 'select Salesperson.name as salesperson,Store.name as store from Salesperson,Store where ';
                        query.saleAndStore += 'Store.id='+rows[0].store_id+' and Salesperson.id='+rows[0].sales_id;
                        console.log(query.saleAndStore);
                        connection.query(query.product,function(err,rows){
                            if(!err){
                                result.name = rows[0].name;
                                result.price = rows[0].price;
                                result.kind = rows[0].kind;
                                result.description = rows[0].description;
                                //res.json(result);
                                connection.query(query.saleAndStore,function(err,rows){
                                    if(!err){
                                        result.salesPersonName = rows[0].salesperson;
                                        result.store = rows[0].store;
                                        res.json(result);
                                    }
                                    else{
                                        console.log(err);
                                        res.json({message:'error'});
                                    }
                                })
                            }
                            else{
                                console.log(err);
                                res.json({message:'error'});
                            }
                        });
                    }
                    else{
                        console.log(err);
                        res.json({message:'error'});
                    }
                });
            }
            else{
                console.log(err);
                res.json({message:'error'});
            }

        });
    });
};