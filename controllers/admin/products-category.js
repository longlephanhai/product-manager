const ProductCategory = require("../../models/product-category.model")
const systemConfig = require("../../config/system")
const createTree = require("../../helpers/createTree")
const createProductCategory = async (req, res) => {
  let find = {
    deleted: false
  };

  const records = await ProductCategory.find(find);
  // console.log("rescod",records);
  const newRecords = createTree(records);
  console.log("new records", newRecords);


  res.render("admin/pages/products-category/create", {
    pageTitle: "Tạo danh mục sản phẩm",
    records: newRecords
  })
}


module.exports = createProductCategory
