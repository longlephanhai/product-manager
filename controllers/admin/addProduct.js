const createTree = require("../../helpers/createTree")
const ProductCategory = require("../../models/product-category.model")
const addProduct = async (req, res) => {
 
  let find = {
    deleted: false
  }
  const category = await ProductCategory.find(find)
  const newCategory = createTree(category)
  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm",
    category: newCategory
  })
}
module.exports = addProduct