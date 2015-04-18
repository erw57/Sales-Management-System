/**
 * Created by liaokaien on 3/8/15.
 */
var quo = require('../util/quotation');
module.exports = function(app, url) {
    app.post(url, function(req, res) {
        var args = req.body;
        var mysql = require('mysql');
        var db = require('../util/db');
        var connection = db(mysql);
        connection.connect();
        var query = {};
        query.customer = 'UPDATE Customer SET' +
            ' name=' + quo(args.name) +
            ' ,street=' + quo(args.street) +
        ' ,city=' + quo(args.city) +
        ' ,state=' + quo(args.state) +
        ' ,zip_code=' + quo(args.zip_code) +
            ' ,kind=' + quo(args.kind) +
            ' WHERE id=' + args.id+';';
        connection.query(query.customer, function(err,rows) {
            if (!err) {
                if(args.kind === 'home'){
                    connection = mysql.createConnection({
                        host: 'localhost',
                        port: '8889',
                        user: 'root',
                        password: 'root',
                        database: 'test'
                    });
                    query.home = 'update HCustomer set '+
                        'marriage_status='+quo(args.marriage_status)+
                        ',gender='+quo(args.gender)+
                        ',age='+args.age+
                        ',home_income='+args.income+' where customer_id='+
                    args.id;

                    connection.query(query.home,function(err){
                        if(!err){
                            res.json({'message':'Successful update customer\'s profile'});
                        }
                        else{
                            console.log(err);
                            res.json({'message':'fail to update HCustomer info'});
                        }
                    });
                }
                else{
                    connection = mysql.createConnection({
                        host: 'localhost',
                        port: '8889',
                        user: 'root',
                        password: 'root',
                        database: 'test'
                    });
                    connection.connect();
                    query.business = 'update BCustomer set '+
                    'business_category='+quo(args.category)+
                    ',company_income='+args.income+' where customer_id='+
                    args.id;
                    console.log(query.business);
                    connection.query(query.business,function(err){
                        if(!err){
                            res.json({'message':'Successful update customer\'s profile'});
                            //connection.end();
                        }
                        else{
                            console.log(err);
                            res.json({'message':'fail to update BCustomer info'});
                        }
                    });

                }
            }
            else{
                console.log('error : update customer');
            }
        });
        connection.end();



    });
};
