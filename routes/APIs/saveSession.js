/**
 * Created by liaokaien on 4/18/15.
 */
module.exports = function(app, url) {
    app.post(url, function (req, res) {
        req.session.id = req.body.id;
            res.json({message:true});
    })};