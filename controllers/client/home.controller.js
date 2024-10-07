const priceNew = require("../../helpers/product");
const Product = require("../../models/product.model");

//[GET] /
const home = async (req, res) => {
  const records = await Product.find({
    featured: "1",
    deleted: false,
    status: "active"
  }).limit(6)
  const newProduct = priceNew(records)
  // hiển thị sản phẩm mới nhất
  const productNew = await Product.find({
    deleted: false,
    status: "active"
  }).limit(6).sort({ position: "desc" })
  const newProductNew = priceNew(productNew)
  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    records: newProduct,
    productsNew: newProductNew
  });
}
module.exports = home