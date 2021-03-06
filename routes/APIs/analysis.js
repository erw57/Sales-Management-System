module.exports.topProduct= function(app, url) {
    app.get(url, function(req, res) {
        var query = 'select name,SUM(quantity*Product.price) as sales,'+
            'Sum(`quantity`) as amount from TOrder,Product where TOrder.product_id = Product.id '+
            'group by name order by sales DESC Limit 5;';
        var mysql = require('mysql');
        var db = require('../util/db');
        var connection = db(mysql);
        connection.connect();
        connection.query(query,function(err,rows){
            if(!err){
                var data=[];
                for(var i=0; i<rows.length;i++){
                    data[i]={
                        c:[
                            {v:rows[i].name},
                        ]
                    }
                    for(var t = 1; t<rows.length+1;t++){
                        data[i].c[t] = {v:0};
                    }
                    data[i].c[i+1] = {v:rows[i].sales};
                }
                res.json({data:data});
            }
            else{
                res.json(err);
            }
        });

    });
};

module.exports.getSalesData = function(app,url){
    app.get(url,function(req,res){
        var id = req.query.id;
        var mysql = require('mysql');
        var db = require('../util/db');
        var connection = db(mysql);
        connection.connect();
        var query = 'select name,image_path,sum(quantity)as amount,sum(quantity*TOrder.price)as sales'+
            ' from TOrder,Product where Product.id = product_id and product_id='+id;
        connection.query(query,function(err,rows){
            if(!err){
                var result = {
                    amount : rows[0].amount,
                    sales : rows[0].sales,
                    name : rows[0].name,
                    image_path :rows[0].image_path.slice(0,rows[0].image_path.length-1).split(',')[0]
                };
                query ='select Customer.name,sum(quantity*price)as consumption,sum(quantity) as amount from TTransaction,TOrder,Customer '
                + 'where TOrder.transaction_id=TTransaction.id and TTransaction.customer_id=Customer.id and product_id ='
                + id+' group by Customer.id ORDER BY consumption DESC limit 10;';
                connection.query(query,function(err,rows){
                    if(!err){
                        result.topCustomer = rows;
                        res.json(result);
                    }
                    else{
                        res.json(err);
                    }
                });

            }
            else{
                res.json(err);
            }
        });

    });
}

module.exports.topCategory = function(app,url){
    app.get(url,function(req,res){
        var mysql = require('mysql');
        var db = require('../util/db');
        var connection = db(mysql);
        connection.connect();
        query = 'select Product.kind as pname ,sum(quantity*TOrder.price) as sales'
        +' from Product,TOrder where Product.id=product_id '
        +'group by Product.kind order by sales DESC;';
        connection.query(query,function(err,rows){
            if(!err){
                var result = {
                    data:[]
                };
                for(var i=0; i<rows.length;i++){
                    result.data[i]={
                        c:[
                            {v:rows[i].pname},
                        ]
                    }
                    for(var t = 1; t<rows.length+1;t++){
                        result.data[i].c[t] = {v:0};
                    }
                        result.data[i].c[i+1] = {v:rows[i].sales};
                }
                res.json({data:result.data});
            }
            else{
                res.json(err);
                console.log(err);
            }
        });

    });
};

module.exports.regionComparison = function(app,url){
    app.get(url,function(req,res){
        var mysql = require('mysql');
        var db = require('../util/db');
        var connection = db(mysql);
        connection.connect();
        var query = 'select Region.name as RegionName ,SUM(quantity*price) ' +
            'as sales From TOrder,TTransaction,Store,Region ' +
            'where TOrder.transaction_id = TTransaction.id and TTransaction.store_id = Store.id ' +
            'and Store.region_id = Region.id' +
            ' group by Region.id' +
            ' order by sales DESC;';
        console.log(query);
        connection.query(query,function(err,rows){
            if(!err){
                res.json({data:rows});
                connection.end();
            }
            else{
                res.json({err:err});
                connection.end();
            }
        });
        });
};

module.exports.topSalesperson = function(app,url){
    app.get(url,function(req,res){
        var mysql = require('mysql');
        var db = require('../util/db');
        var connection = db(mysql);
        connection.connect();
        var query = 'select Salesperson.name as Name ,SUM(quantity*price) as Sales' +
            ' From TOrder,TTransaction,Salesperson' +
            ' where TOrder.transaction_id = TTransaction.id and TTransaction.sales_id= Salesperson.id' +
            ' group by Salesperson.id ' +
            ' order by Sales DESC limit 10; ';
        console.log(query);
        connection.query(query,function(err,rows){
            if(!err){
                res.json({data:rows});
            }
            else{
                res.json({err:err});
            }
        });
    });
};

