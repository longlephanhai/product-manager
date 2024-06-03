const Product = require("../../models/product.model");

const deleteItem = async (req, res) => {
 try {
  const id = req.params.id;
  // xóa cứng
  // await Product.deleteOne({ _id: id })

  //xóa mền
  await Product.updateOne({ _id: id },
    {
      deleted: true,
      deletedAt: new Date()
    }
  )
  res.redirect("back")
 } catch (error) {
  console.log(error);
 }
}
module.exports = deleteItem