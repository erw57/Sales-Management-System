/**
 * Created by liaokaien on 4/2/15.
 */
module.exports = function(app,url){
  app.get(url,function(req,res){
      var mysql = require('mysql');
      var db = require('../util/db');
      var connection = db(mysql);
      connection.connect();
      var query = 'select * from Store';
      connection.query(query,function(err,rows){
          if(!err){
              res.json({data:rows,id:req.session.id});
          }
          else{
              console.log(err);
              res.json({message:'error'});
          }
      });
  });
};