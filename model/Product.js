const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String ,require:true},
  stock: { type: Number ,require:true},
  category: { type: String,require:true }

});
module.exports = mongoose.model('Product', ProductSchema);
