//var mysql = require('mysql');
module.exports = function(mysql){
    var con = mysql.createConnection({
        host: 'localhost',
        port: '8889',
        user: 'root',
        password: 'root',
        database: 'test'
    });
    return con;
};
