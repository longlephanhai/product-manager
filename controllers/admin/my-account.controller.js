const system = require("../../config/system");
var md5 = require('md5');
const Account = require("../../models/account.model");

const myAccount = async (req, res) => {
  res.render('admin/pages/my-account/index', {
    pageTitle: 'Thông tin cá nhân'
  })
}
const editMyAccount = async (req, res) => {
  res.render('admin/pages/my-account/edit', {
    pageTitle: 'Chỉnh sửa thông tin cá nhân'
  })
}
const editMyAccountPatch = async (req, res) => {
  const id = res.locals.user._id
  const emailExst = await Account.findOne({
    _id: { $ne: id },
    email: req.body.email,
    deleted: false
  })
  if (emailExst) {
    req.flash("error", "Email đã tồn tại")
  }
  else {
    if (req.body.password) {
      req.body.password = md5(req.body.password)
    } else {
      delete req.body.password
    }
    await Account.updateOne({ _id: id }, req.body)
  }
  res.redirect("back")
}

module.exports = { myAccount, editMyAccount, editMyAccountPatch }