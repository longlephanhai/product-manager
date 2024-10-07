const User = require("../../models/user.model")
const md5 = require("md5")
const generate = require("../../helpers/generate")
const ForgotPassword = require("../../models/forgot-password.model")
const { sendMail } = require("../../helpers/sendMail")
const Cart = require("../../models/cart.model")
const register = async (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Đăng ký tài khoản"
  })
}
const registerPost = async (req, res) => {
  const existEmail = await User.findOne({
    email: req.body.email,
    deleted: false
  })
  if (existEmail) {
    req.flash("error", "Email đã tồn tại");
    res.redirect("back");
    return;
  }
  req.body.password = md5(req.body.password)
  const user = new User(req.body)
  await user.save()
  res.cookie("tokenUser", user.tokenUser)
  res.redirect("/")
}
const login = async (req, res) => {
  res.render("client/pages/user/login", {
    pageTitle: "Đăng nhập tài khoản"
  })
}
const loginPost = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({
    email: email,
    deleted: false
  })
  if (!user) {
    req.flash("error", "Email không tồn tại");
    res.redirect("back");
    return;
  }
  if (md5(password) !== user.password) {
    res.redirect("back")
    return
  }
  if (user.status === "inactive") {
    res.redirect("back")
    return
  }
  res.cookie("tokenUser", user.tokenUser)
  // lưu userId vào collection cart
  await Cart.updateOne({
    _id: req.cookies.cartId
  }, {
    user_id: user.id
  })
  res.redirect("/")
}
const logout = async (req, res) => {
  res.clearCookie("tokenUser")
  res.redirect("/")
}
const forgotPassword = async (req, res) => {
  res.render("client/pages/user/forgot-password", {
    pageTitle: "Lấy lại mật khẩu"
  })
}
const forgotPasswordPost = async (req, res) => {
  const email = req.body.email
  const user = await User.findOne({
    email: email,
    deleted: false
  })
  if (!user) {
    res.redirect("back")
    return
  }
  // Việc 1: tạo 1 mã otp và lưu otp, email vào collection
  const otp = generate.generateRandomNumber(8)
  const objectForgotPassword = {
    email: email,
    otp: otp,
    expireAt: Date.now()
  }
  const forgotPassword = new ForgotPassword(objectForgotPassword)
  await forgotPassword.save()
  // Việc 2: gửi mã otp qua email của user
  const subject = "Mã otp lấy lại mật khẩu"
  sendMail(email, subject, otp)
  res.redirect(`/user/password/otp?email=${email}`)
}
const otpPassword = async (req, res) => {
  const email = req.query.email
  res.render("client/pages/user/otp-password", {
    pageTitle: "Nhập mã otp",
    email: email
  })
}
const otpPasswordPost = async (req, res) => {
  const email = req.body.email
  const otp = req.body.otp
  const result = await ForgotPassword.findOne({
    email: email,
    otp: otp
  })
  console.log(result); 1
  if (!result) {
    res.redirect("back")
    return
  }
  const user = await User.findOne({
    email: email,
  })
  res.cookie("tokenUser", user.tokenUser)
  res.redirect(`/user/password/reset`)
}
const resetPassword = async (req, res) => {
  res.render("client/pages/user/reset-password", {
    pageTitle: "Đổi mật khẩu"
  })
}
const resetPasswordPost = async (req, res) => {
  const password = req.body.password
  const tokenUser = req.cookies.tokenUser


  await User.updateOne({
    tokenUser: tokenUser
  }, {
    password: md5(password)
  })
  res.redirect("/")
}
const info = async (req, res) => {
  res.render("client/pages/user/info", {
    pageTitle: "Thông tin tài khoản"
  })
}
module.exports = { register, registerPost, login, loginPost, logout, forgotPassword, forgotPasswordPost, otpPassword, otpPasswordPost, resetPassword, resetPasswordPost, info }