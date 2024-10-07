const Product = require("../../models/product.model");

const deleteItem = async (req, res) => {
  try {
    const id = req.params.id;

    //xóa mền
    await Product.updateOne({ _id: id },
      {
        deleted: true,
        deletedBy: {
          account_id: res.locals.user.id,
          deletedAt: new Date()
        }
      }
    )
    res.redirect("back")
  } catch (error) {
    console.log(error);
  }
}
module.exports = deleteItem