var getProductList = require('./APIs/getProductList');
var getProductDetail = require('./APIs/getProductDetail');
var getCustomerInfo = require('./APIs/getCustomerInfo');
var addNewCustomer = require('./APIs/addNewCustomer');
var getCustomerList = require('./APIs/getCustomerList');
var makePayment = require('./APIs/makePayment');
var addNewProduct = require('./APIs/addNewProduct');
var updateInventory = require('./APIs/updateInventory');
var getCustomerHistory = require('./APIs/getCustomerHistory');
var checkInventory = require('./APIs/checkInventory.js');
var modifyCustomer = require('./APIs/modifyCustomer.js');
var modifyProduct = require('./APIs/modifyProduct.js');
/**
 *  set req.session.id = 'req.body.id'
 *  then use it every time when the query we send
 *  to database contains employee's id.
 */
module.exports = function(app) {
    //Page Routing
    app.get('/index', function(req, res) {
        var name = req.query.name;
        res.render('about.ejs');
    });

    //Assign Urls to JSON APIs
    getProductList(app, '/api/getProductList');
    getProductDetail(app, '/api/getProductDetail');
    getCustomerInfo(app, '/api/getCustomerInfo');
    addNewCustomer(app, '/api/addNewCustomer');
    getCustomerList(app, '/api/getCustomerList');
    makePayment(app, '/api/makePayment');
    addNewProduct(app, '/api/addNewProduct');
    updateInventory(app, '/api/updateInventory');
    getCustomerHistory(app, '/api/getCustomerHistory');
    modifyCustomer(app, '/api/modifyCustomer');
    modifyProduct(app, '/api/modifyProduct');
    checkInventory(app, '/api/checkInventory');
};
