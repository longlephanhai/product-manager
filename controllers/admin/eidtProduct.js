const system = require("../../config/system");
const Product = require("../../models/product.model")

const editProduct = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id
    }
    const product = await Product.findOne(find);
    res.render("admin/pages/products/edit", {
      pageTitle: "Chỉnh sửa sản phẩm",
      product: product
    })
  } catch (error) {
    res.redirect(`${system.prefixAdmin}/products`)
  }
}
module.exports = editProduct
