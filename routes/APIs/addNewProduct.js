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
                var mysql = require('mysql');
                var db = require('../util/db');
                var connection = db(mysql);
                connection.connect();
                var query = 'SELECT MAX(id) AS nextID FROM Product';
                connection.query(query, function(err, rows) {
                    if (!err) {
                        args.id = ((parseInt(rows[0].nextID)) + 1).toString();
                        console.log(rows);
                        console.log(args.id,'in field');
                        query = 'INSERT INTO Product VALUE(' +
                        args.id + ',' +
                        quo(args.name) + ',' +
                        args.price + ',' + quo(args.kind) +
                        ','+quo(args.path)+','+quo(args.description)+');';
                        connection.query(query, function(err) {
                            if (!err) {
                                var query = 'SELECT MAX(id) AS nextID FROM Inventory';
                                connection.query(query,function(err,rows){
                                    if(!err){
                                        var startId = rows[0].nextID + 1;
                                        query = 'select id from Store';
                                        connection.query(query,function(err,rows){
                                            if(!err){
                                                var set = [];
                                                for (var i = 0;i<rows.length;i++){
                                                    set.push(rows[i].id);
                                                }
                                                query = '';
                                                for(var i = 0;i<set.length;i++){
                                                    query = 'insert into Inventory values(';
                                                    //console.log(query);
                                                    query += startId+','+set[i]+','+args.id+','+0+');';
                                                    //console.log(query);
                                                    startId ++;

                                                    connection.query(query,function(err){
                                                        if(!err){
                                                            //console.log('suc');
                                                        }
                                                        else{

                                                            console.log(err);
                                                        }
                                                    });
                                                }
                                                connection.end();
                                            }
                                            else{
                                                console.log(err);
                                            }
                                        });
                                    }

                                });
                            }else {
                                console.log(err);
                                connection.end();
                            }
                        });

                    } else {
                        console.log(err);
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
                var db = require('../util/db');
                var connection = db(mysql);
                connection.connect();
                //console.log(args);
                console.log(args.id,'in file');
                query = 'update Product set image_path='+args.path+' where id='+args.id+';';

                connection.query(query,function(err,rows){
                    if(!err){
                        //console.log('success;');
                    }
                    else{
                        console.log(query);
                    }
                })

            });
        });
        res.json('success');
    });
}

