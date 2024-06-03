const Product = require("../../models/product.model");
const systemConfig = require("../../config/system")
const createPost = async (req, res) => {
  try {
    req.body.price = parseInt(req.body.price)
  req.body.discountPercentage = parseInt(req.body.discountPercentage)
  req.body.stock = parseInt(req.body.stock)
  if (req.body.position == "") {
    const countProducts = await Product.countDocuments()
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position)
  }
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`
  }
  const product = new Product(req.body); // tạo mới product
  await product.save(); // lưu vào trong database
  res.redirect(`${systemConfig.prefixAdmin}/products`)
  } catch (error) {
    console.log(error);
  }
}
module.exports = createPost