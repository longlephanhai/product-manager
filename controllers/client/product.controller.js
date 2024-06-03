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
module.exports = product