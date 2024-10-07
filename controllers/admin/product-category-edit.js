const ProductCategory = require("../../models/product-category.model");
const createTree = require("../../helpers/createTree");
const system = require("../../config/system");
const productCategoryEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ProductCategory.findOne({
      _id: id,
      deleted: false
    },)
    const records = await ProductCategory.find(
      {
        deleted: false
      }
    )
    const newRecords = createTree(records)
    res.render("admin/pages/products-category/edit", {
      pageTitle: "Chỉnh sửa danh mục sản phẩm",
      data: data,
      records: newRecords
    })
  } catch (error) {
    res.redirect(`${system.prefixAdmin}/products-category`)
  }
}
module.exports = productCategoryEdit