var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('customer.html', { root: 'public' });
});

/* GET admin page. */
router.get('/admin', function(req, res) {
  res.sendFile('admin.html', { root: 'public' });
});

router.param('product', function(req, res, next, id) {
  var query = Product.findById(id);
  query.exec(function (err, product){
    if (err) { return next(err); }
    if (!product) { return next(new Error("can't find product")); }
    req.product = product;
    return next();
  });
});

router.put('/products/:product/order', function(req, res, next) {
  console.log("Put Route"+req.product.Name);
  req.product.order(function(err, product){
    if (err) { return next(err); }
    res.json(product);
  });
});

router.delete('/products/:product',function(req,res) {
    req.product.remove();
  res.sendStatus(200);
});

router.get('/products', function(req, res, next) {
  console.log("Get Route");
  Product.find(function(err, products){
    if(err){ console.log("Error"); return next(err); }
    res.json(products);
  console.log("res.json Get Route");
  });
  console.log("returningGet Route");
});

router.post('/products', function(req, res, next) {
  console.log("Post Route");
  var product = new Product(req.body);
  console.log("Post Route");
  console.log(product);
  product.save(function(err, prodcut){
		console.log("Error "+err);
		if(err){  return next(err); }
    console.log("Post Route before json");
		res.json(product);
	});
});

module.exports = router;
