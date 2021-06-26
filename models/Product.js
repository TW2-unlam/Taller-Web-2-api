 var mongoose = require('mongoose');

 var productSchema = new mongoose.Schema({
    slug: String,
    name: String,
    released: String,
    background_image: String,
    rating: String,
    rating_top: String,
    genres: Array
 });

 mongoose.model("Product", productSchema);
