const createTree = require("../../helpers/createTree");
const ProductCategory = require("../../models/product-category.model")

const productsCategory = async (req, res) => {
    let find = {
        deleted: false,
    }
  
    const records = await ProductCategory.find(find);
    const newRecords = createTree(records)
    res.render("admin/pages/products-category/index", {
        pageTitle: "Danh mục sản phẩm",
        records: newRecords
    })
}
module.exports = productsCategory