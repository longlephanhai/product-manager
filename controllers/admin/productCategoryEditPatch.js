const ProductCategory = require("../../models/product-category.model");

const productCategoryEditPatch = async (req, res) => {
  const id = req.params.id;
  req.body.position = parseInt(req.body.position)
  await ProductCategory.updateOne({ _id: id }, req.body)
  res.redirect("back")
}
module.exports = productCategoryEditPatch