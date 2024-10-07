const Account = require("../../models/account.model")
const system = require("../../config/system");
var md5 = require('md5');
const login = async (req, res) => {
  if (req.cookies.token) {
    res.redirect(`${system.prefixAdmin}/dashboard`)
  } else {
    res.render("admin/pages/auth/login", {
      pageTitle: "Đăng nhập"
    })
  }

}
const loginPost = async (req, res) => {
  const { email, password } = req.body
  const user = await Account.findOne({
    email: email,
    deleted: false
  })
  if (!user) {
    req.flash("error", "Email không tồn tại")
    console.log("Email không tồn tại");
    res.redirect("back")
    return
  }
  if (md5(password) !== user.password) {
    req.flash("error", "Sai email hoặc mật khẩu")
    console.log("sai mat khau");
    res.redirect("back")
    return
  }
  if (user.status !== "active") {
    req.flash("error", "Tài khoản đã bị khóa")
    console.log("tai khoan bi khoa");
    res.redirect("back")
    return
  }
  res.cookie("token", user.token)
  res.redirect(`${system.prefixAdmin}/dashboard`)
}

const logout = (req, res) => {
  res.clearCookie("token")
  res.redirect(`${system.prefixAdmin}/auth/login`)
}
module.exports = { login, loginPost, logout }