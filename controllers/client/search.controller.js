const priceNew = require("../../helpers/product")
const Product = require("../../models/product.model")
const { product } = require("./product.controller")

const index = async (req, res) => {
  const keyword = req.query.keyword
  let newProducts = []
  if (keyword) {
    const products = await Product.find({
      title: new RegExp(keyword, 'i'),
      status: "active",
      deleted: false
    })
    newProducts = priceNew(products)
  }
  res.render("client/pages/search/index", {
    pageTitle: "Kết quả tìm kiếm",
    keyword: keyword,
    products: newProducts
  })
}
module.exports = { index }