const ProductCategory = require("../../models/product-category.model");
const Product = require("../../models/product.model");
const productHelper = require("../../helpers/oneProduct")
const detailClient = async (req, res) => {
  try {
    const find = {
      deleted: false,
      slug: req.params.slugProduct,
      status: "active"
    }
    const product = await Product.findOne(find)
    if (product.product_category_id) {
      const category = await ProductCategory.findOne({
        _id: product.product_category_id,
        status: "active",
        deleted: false
      })
      product.category = category
    }
    product.priceNew = productHelper.priceNewOneProduct(product)
    res.render("client/pages/products/detail", {
      pageTitle: product.title,
      product: product
    })
  } catch (error) {
    console.log(error);
  }
}
module.exports = detailClient