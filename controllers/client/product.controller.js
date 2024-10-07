const priceNew = require("../../helpers/product");
const getSubCategoryHelper = require("../../helpers/products-category");
const ProductCategory = require("../../models/product-category.model");
const Product = require("../../models/product.model")
//[GET] /products
const product = async (req, res) => {
  try {
    const products = await Product.find({
      status: "active",
      deleted: false
    }).sort({ position: "desc" });
    const newProduct = products.map(item => {
      item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
      return item
    });
    // console.log(newProduct);
    res.render("client/pages/products/index", {
      pageTitle: "Trang danh sách sản phẩm",
      products: newProduct
    })
  } catch (error) {
    console.log(error);
  }
}

const categorySlug = async (req, res) => {
  const category = await ProductCategory.findOne({
    slug: req.params.slugCategory,
    status: "active",
    deleted: false
  })



  const listSubCategory = await getSubCategoryHelper(category._id)
  const listSub=listSubCategory.map(item => item.id)

  const products = await Product.find({
    product_category_id: {
      $in: [category.id, ...listSub]
    },
    deleted: false
  }).sort({ position: "desc" })

  const newProduct = priceNew(products)
  res.render("client/pages/products/index", {
    pageTitle: category.title,
    products: newProduct
  })
}
module.exports = { product, categorySlug }