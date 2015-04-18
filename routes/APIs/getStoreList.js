/**
 * Created by liaokaien on 4/2/15.
 */
module.exports = function(app,url){
  app.get(url,function(req,res){
      var mysql = require('mysql');
      var connection = mysql.createConnection({
          host: 'localhost',
          port: '8889',
          user: 'root',
          password: 'root',
          database: 'test'
      });
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