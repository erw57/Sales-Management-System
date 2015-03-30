/**
 * Created by liaokaien on 3/8/15.
 */
var quo = require('../util/quotation');
module.exports = function(app, url) {
    app.post(url, function(req, res) {
        var args = req.body;
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: '127.0.0.1',
            port: '8889',
            user: 'root',
            password: 'root',
            database: 'system'
        });
        connection.connect();
        var query;
        query = 'UPDATE Customer SET' +
            ' name=' + quo(args.name) +
            ' ,age=' + args.age +
            ' ,gender=' + quo(args.gender) +
            ' ,street=' + quo(args.street) +
            ' ,kind=' + quo(args.kind) +
            ' ,business_category=' + (args['business_category']===null?'NULL':quo(args['business_category'])) +
            ' ,company_income=' + args.company_income +
            ' ,home_income=' + args.home_income +
            ' ,marriage_status=' + quo(args['marriage_status']) +
            ' WHERE cus_id=' + args.id+';';
        console.log('Qurry:\n',query);
        connection.query(query, function(err, rows) {
            if (!err) {
                console.log('success');
                res.json({'message':'Successful update customer\'s profile'});
            }
            else{
                console.log('error : update profile');
            }
        });
        connection.end();



    });
};
