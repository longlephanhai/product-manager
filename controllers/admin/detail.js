const Product = require("../../models/product.model")

const detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id
    }
    const product = await Product.findOne(find);
    console.log(product);
    res.render("admin/pages/products/detail",{
      pageTitle:product.title,
      product:product
    })
  } catch (error) {
    console.log(error)
  }
}
module.exports = detail