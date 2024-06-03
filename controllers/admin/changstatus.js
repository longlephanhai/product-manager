const Product = require("../../models/product.model");

//[PATCH] /admin/products/change-status/:status/:id
const changeStatus = async (req, res) => {
  try {
    const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { status: status }) // update một cái
  // res.redirect("/admin/products")// chuyển hướng về một trang nào đó
  req.flash("success","Cập nhật sản phẩm thành công")
  res.redirect("back") // chuyển hướng về trang trước đó
  } catch (error) {
    console.log(error);
  }
}
module.exports = changeStatus