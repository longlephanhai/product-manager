const Product = require("../../models/product.model")

const editProductPatch = async (req, res) => {
 try {
  const id = req.params.id
  req.body.price = parseInt(req.body.price)
  req.body.discountPercentage = parseInt(req.body.discountPercentage)
  req.body.stock = parseInt(req.body.stock)
  req.body.position = parseInt(req.body.position)
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`
  }
  await Product.updateOne({ _id: id }, req.body)
  res.redirect(`back`)
 } catch (error) {
  console.log(error);
 }
}
module.exports = editProductPatch