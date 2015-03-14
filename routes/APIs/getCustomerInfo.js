/**
 * Created by liaokaien on 2/20/15.
 */

var quo = require('../util/quotation');


module.exports = function(app, url) {
    app.get(url, function(req, res) {
        // when receive a GET HTTP request, send query to database.
        //step - 1 connect to mysql
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'leon1993',
            database: 'system'
        });
        connection.connect();

        // step - 2 construct query and send it to database
        var id = quo(req.query.id);

        var query = 'SELECT name,age,street,city,state,kind,business_category,company_income,marriage_status,gender,zip_code,home_income FROM Customer WHERE cus_id = ' + id + ';';
        console.log(quo((parseInt('23') + 1).toString()));
        connection.query(query, function(err, rows) {
            if (!err) {
                // if query are processed correctly, send the info as JSON to browser.

                var info = new Object();
                info.name = rows[0].name;
                info.age = rows[0].age;
                info.street = rows[0].street;
                info.city = rows[0].city;
                info.state = rows[0].state;
                info.kind = rows[0].kind;
                info.marriage_status = rows[0].marriage_status;
                info.gender = rows[0].gender;
                info.zipcode = rows[0].zip_code;
                info.home_income = rows[0].home_income;
                info.company_income = rows[0].company_income;
                info.business_category = rows[0].business_category;
                res.json(info);
            } else
                console.log('Error while performing Query.');
        });
        connection.end();
    });
}
