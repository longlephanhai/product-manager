const ProductCategory = require("../../models/product-category.model")
const systemConfig = require("../../config/system")
const createPostCategory = async (req, res) => {
  if (res.locals.role.permissions.includes('product-category-create')) {
    if (req.body.position == "") {
      const countProducts = await ProductCategory.countDocuments()
      req.body.position = countProducts + 1;
    } else {
      req.body.position = parseInt(req.body.position)
    }
    const record = new ProductCategory(req.body); // tạo mới product
    await record.save(); // lưu vào trong database
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
  } else {
    return
  }
}
module.exports = createPostCategory