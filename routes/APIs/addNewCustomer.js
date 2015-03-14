/**
 * Created by liaokaien on 2/23/15.
 */
var quo = require('../util/quotation');

function addCustomer(args) {
    var message = '';
    var name = quo(args.name);
    var gender = quo(args.gender);
    var kind = quo(args.kind);
    var street = quo(args.street);
    var city = quo(args.city);
    var state = quo(args.state);
    var zip_code = quo(args.zip_code);
    var home_income = quo(args.home_income);
    var age = quo(args.age);
    var marriage_status = quo(args.marriage_status);
    var company_income = args['company_income'];
    var business_category = args['business_category'];
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'leon1993',
        database: 'system'
    });

    connection.connect();
    //get next avaliable id
    var query = "select max(cus_id)  as nextID from Customer ;";
    connection.query(query, function(err, rows) {
        if (!err) {
            var id = quo((parseInt(rows[0].nextID) + 1).toString());
            console.log(id);
            //update that value;
            query = 'INSERT INTO Customer VALUES(' + id + ',' + name + ',' + street + ',' + city + ',' + state + ',' + zip_code + ',' + kind + ',' + business_category + ',' + company_income + ',' + marriage_status + ',' + age + ',' + gender + ',' + home_income + ');';
            console.log(query);
            connection.query(query, function(err) {
                //recall
                if (!err)
                    console.log('Success');
                else
                    console.log(' 2: Error while performing Query.', err);
            });
            connection.end();
        } else
            console.log('Error while performing Query.');
    });
}

module.exports = function(app, url) {
    app.post(url, function(req, res) {
        var args = new Object();

        args.age = req.body.age;
        args.gender = req.body.gender;
        args.name = req.body.name;
        args.kind = req.body.kind;
        args.street = req.body.street;
        args.city = req.body.city;
        args.state = req.body.state;
        args.zip_code = req.body.zip_code;
        args.home_income = req.body.home_income;
        args.marriage_status = req.body.marriage_status;

        addCustomer(args);
        res.json({
            message: 'success'
        });
    });
};
