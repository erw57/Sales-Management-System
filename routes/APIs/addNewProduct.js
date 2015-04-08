/**
 * Created by liaokaien on 3/6/15.
 */
var quo = require('../util/quotation');
var busboy = require('connect-busboy');
var fs = require('fs-extra');

module.exports = function(app, url,$dir) {
    app.use(busboy());
    var args = {
        path:''
    };
    app.post(url, function(req, res) {
        var fstream;
        req.pipe(req.busboy);

        req.busboy.on('field',function(key,value){
            args[key] = value;
            if(key === 'description'){
                console.log('into');
                var mysql = require('mysql');
                var connection = mysql.createConnection({
                    host: 'localhost',
                    port: '8889',
                    user: 'root',
                    password: 'root',
                    database: 'test'
                });
                connection.connect();
                var query = 'SELECT MAX(id) AS nextID FROM Product';
                connection.query(query, function(err, rows) {
                    if (!err) {
                        args.id = (parseInt(rows[0].nextID) + 1).toString();
                        query = 'INSERT INTO Product VALUE(' +
                        args.id + ',' +
                        quo(args.name) + ',' +
                        args.price + ',' + quo(args.kind) +
                        ','+quo(args.path)+','+quo(args.description)+');';
                        connection.query(query, function(err) {
                            if (!err) {
                                connection.end();

                            }else {
                                connection.end();
                            }
                        });

                    } else {
                        console.log('ERROR2');
                    }
                });// end SQL insert
            }
        });

        req.busboy.on('file', function (fieldname, file,filename) {
            //console.log("Uploading: " + filename);
            //Path where image will be uploaded
            fstream = fs.createWriteStream($dir+'/public/Users/product/'+ filename);
            args.path += '/Users/product/'+filename+',';
            file.pipe(fstream);
            fstream.on('close', function () {
                //console.log("Upload Finished of " + filename);
                var mysql = require('mysql');
                var connection = mysql.createConnection({
                    host: 'localhost',
                    port: '8889',
                    user: 'root',
                    password: 'root',
                    database: 'test'
                });
                connection.connect();
                //console.log(args);
                query = 'update Product set image_path='+args.path+' where id='+args.id+';';

                connection.query(query,function(err,rows){
                    if(!err){
                        //console.log('success;');
                    }
                    else{
                        //console.log(query);
                    }
                })

            });
        });
        res.json('success');
    });
}

