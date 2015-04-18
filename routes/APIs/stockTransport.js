/**
 * Created by liaokaien on 4/2/15.
 */
var quo = require('../util/quotation');
module.exports = function(app,url){
    app.post(url,function(req,res){
        var args = {
            from:req.body.from,
            to:req.body.to,
            id:req.body.id,
            quantity:req.body.quantity,
            absQuantity: req.body.quantity.substr(1),
        };

        var connection = require('../util/db');
        connection.connect();
        var query = {
            in:'update Inventory set quantity = quantity+'+
                args.quantity+' where product_id ='+args.id+' and store_id='+
                args.to+';',
            out:
            'update Inventory set quantity = quantity-'+
            args.quantity+' where product_id ='+args.id+' and store_id='+
            args.from+';'
        }
        console.log(query.in);
        connection.query(query.in,function(err){
            if(!err){
                connection.query(query.out,function(err){
                    if(!err){
                        res.json({message:'success'});
                    }
                    else{
                        console.log(err);
                        res.json({message:'error'});
                    }
                });
            }
            else{
                console.log(err);
                res.json({message:'error'});
            }

        });

    });
}

