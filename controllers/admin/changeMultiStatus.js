const Product = require("../../models/product.model");

//[PATCH] /admin/products/change-status/:status/:id
const changeMultiStatus = async (req, res) => {
  // cài thêm thư viện body-parser để req.body không trả undefinded
  try {
    const type = req.body.type
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" })
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" })
      break;
    case "delete-all":
      await Product.updateMany({ _id: { $in: ids } }, { deleted: true, deletedAt: new Date() })
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-")
        position = parseInt(position)
        await Product.updateOne({ _id: id }, { position: position })
      }
      break;
    default:
      break;
  }
  res.redirect("back")
  } catch (error) {
    console.log(error);
  }
}
module.exports = changeMultiStatus