const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productCategorySchema = new mongoose.Schema({
  title: String, //Sản phẩm 1
  parent_id:{
    type:String,
    default:""
  },
  description: String,
  thumbnail: String,
  status: String,
  position: Number,
  slug: {
    type: String,
    slug: "title",// Sản phẩm 1
    unique: true //là duy nhất 
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
}, {
  timestamps: true
});
const ProductCategory = mongoose.model("ProductCategory", productCategorySchema, "products-category")

module.exports = ProductCategory