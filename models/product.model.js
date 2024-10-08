const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productSchema = new mongoose.Schema({
  title: String, //Sản phẩm 1
  product_category_id: {
    type: String,
    default: "",
  },
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  featured: String,
  position: Number,
  slug: {
    type: String,
    slug: "title",// Sản phẩm 1
    unique: true //là duy nhất 
  },
  createdBy: {
    account_id: String,
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  deleted: {
    type: Boolean,
    default: false
  },
  // deletedAt: Date,
  deletedBy: {
    account_id: String,
    deletedAt: Date,
  },
  updatedBy: [
    {
      account_id: String,
      updatedAt: Date,
    }
  ],
}, {
  timestamps: true
});
const Product = mongoose.model("Product", productSchema, "products")

module.exports = Product