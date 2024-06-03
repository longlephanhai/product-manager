const Product = require("../../models/product.model");

const detailClient = async (req, res) => {
  try {
    const find = {
      deleted: false,
      slug:req.params.slug,
      status:"active"
    }
    const product=await Product.findOne(find)
    console.log(product);
    res.render("client/pages/products/detail",{
      pageTitle:product.title,
      product:product
    })
  } catch (error) {
    console.log(error);
  }
}
module.exports = detailClient