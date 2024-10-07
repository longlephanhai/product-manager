const validateRegister = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Họ và ten không được để trống!");
    res.redirect("back");
    return;
  }
  if (!req.body.email) {
    req.flash("error", "Emailkhông được để trống!");
    res.redirect("back");
    return;
  }
  if (!req.body.password) {
    req.flash("error", "password không được để trống!");
    res.redirect("back");
    return;
  }
  next()
}
const validateLogin = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", "Emailkhông được để trống!");
    res.redirect("back");
    return;
  }
  if (!req.body.password) {
    req.flash("error", "password không được để trống!");
    res.redirect("back");
    return;
  }
  next()
}
const validateForgotPassword = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", "Email không được để trống!");
    res.redirect("back");
    return;
  }
  next()
}
const validateResetPassword = (req, res, next) => {
  if(!req.body.password){
    req.flash("error", "Password không được để trống!");
    console.log("passswr trong");
    
    res.redirect("back");
    return;
  }
  if(!req.body.passwordConfirm){
    req.flash("error", "Password Confirm không được để trống!");
    console.log("confi trong");
    res.redirect("back");
    return;
  }
  if(req.body.password !== req.body.passwordConfirm){
    req.flash("error", "Password Confirm không khớp!");
    res.redirect("back");
    return
  }
  next()
}
module.exports = { validateRegister, validateLogin, validateForgotPassword,validateResetPassword }