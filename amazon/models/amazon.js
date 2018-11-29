var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  Name: String,
  Price: String,
  Image: String,
  orders: {type: Number, default:0}
});

ProductSchema.methods.order = function(cb) {
  this.orders += 1;
  this.save(cb);
};

mongoose.model('Product',ProductSchema);