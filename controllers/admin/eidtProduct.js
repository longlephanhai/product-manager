const system = require("../../config/system");
const ProductCategory = require("../../models/product-category.model");
const Product = require("../../models/product.model")
const createTree = require("../../helpers/createTree");
const editProduct = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id
    }
    const product = await Product.findOne(find);
    const category = await ProductCategory.find({
      deleted: false,
    });
    const newCategory = createTree(category)
    res.render("admin/pages/products/edit", {
      pageTitle: "Chỉnh sửa sản phẩm",
      product: product,
      category: newCategory
    })
  } catch (error) {
    res.redirect(`${system.prefixAdmin}/products`)
  }
}
module.exports = editProduct
