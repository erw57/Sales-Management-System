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
    app.get('/2710/index', function(req, res) {
        var name = req.query.name;
        res.render('about.ejs');
    });

    //Assign Urls to JSON APIs
    getProductList(app, '/2710/api/getProductList');
    getProductDetail(app, '/2710/api/getProductDetail');
    getCustomerInfo(app, '/2710/api/getCustomerInfo');
    addNewCustomer(app, '/2710/api/addNewCustomer');
    getCustomerList(app, '/2710/api/getCustomerList');
    makePayment(app, '/api/2710/makePayment');
    addNewProduct(app, '/2710/api/addNewProduct');
    updateInventory(app, '/2710/api/updateInventory');
    getCustomerHistory(app, '/2710/api/getCustomerHistory');
    modifyCustomer(app, '/2710/api/modifyCustomer');
    modifyProduct(app, '/2710/api/modifyProduct');
    checkInventory(app, '/2710/api/checkInventory');
};
