/**
 * Created by liaokaien on 3/6/15.
 */
var quo = require('../util/quotation');
var busboy = require('connect-busboy');
var fs = require('fs-extra');

module.exports = function(app, url) {
    app.use(busboy());
    var path;
    app.post(url, function(req, res) {
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);
            //Path where image will be uploaded
            fstream = fs.createWriteStream('images/' + filename);
            path = 'images/'+filename;
            file.pipe(fstream);
            fstream.on('close', function () {
                console.log("Upload Finished of " + filename);
                res.redirect('back');
            });
        });
        var args = {};
        req.busboy.on('field',function(key,value){
             args.key = value;
        });

        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            port: '8889',
            user: 'root',
            password: 'root',
            database: 'system'
        });
        connection.connect();
        var query = 'SELECT MAX(prod_id) AS nextID FROM Transaction';
        connection.query(query, function(err, rows) {
            if (!err) {
                args.id = (parseInt(rows[0].nextID) + 1).toString();
                query = 'INSERT INTO Product VALUE(' +
                    quo(args.id) + ',' +
                    quo(args.name) + ',' +
                    args.price + ',' + quo(args.kind) +
                    ','+quo(path)+');';
                console.log(query);
                connection.query(query, function(err) {
                    if (!err) {
                        connection.end();
                        res.json(args.id);
                    } else {
                        console.log('ERROR');
                    }
                });

            } else {
                console.log('ERROR');
            }
        });
    });
}
