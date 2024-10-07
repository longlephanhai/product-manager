const Product = require("../../models/product.model")
const { account } = require("./account.controller")

const editProductPatch = async (req, res) => {
  try {
    const id = req.params.id
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    req.body.position = parseInt(req.body.position)
    const updatedBy = {
      account_id: res.locals.user.id,
      updatedAt: new Date()
    }
    // req.body.updatedBy = updatedBy
    await Product.updateOne({ _id: id }, {
      ...req.body,
      $push: {
        updatedBy: updatedBy
      }
    })
    res.redirect(`back`)
  } catch (error) {
    console.log(error);
  }
}
module.exports = editProductPatch