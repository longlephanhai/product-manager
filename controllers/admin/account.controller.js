const Account = require("../../models/account.model")
const system = require("../../config/system");
var md5 = require('md5');
const Role = require("../../models/roles.model");

const account = async (req, res) => {
  let find = {
    deleted: false
  }
  const records = await Account.find(find).select("-password -token")
  for (const record of records) {
    const role = await Role.findOne({
      _id: record.role_id,
      deleted: false,
    })
    record.role = role
  }
  res.render("admin/pages/accounts/index", {
    pageTitle: "Danh sách tài khoản",
    records: records
  })
}

const createAccount = async (req, res) => {
  const roles = await Role.find({ deleted: false })
  res.render("admin/pages/accounts/create", {
    pageTitle: "Tạo mới tài khoản",
    roles: roles
  })
}

const createAccountPost = async (req, res) => {
  try {
    const emailExst = await Account.findOne({
      email: req.body.email,
      deleted: false
    })
    if (emailExst) {
      req.flash("error", "Email đã tồn tại")
      res.redirect("back")
    }
    else {
      req.body.password = md5(req.body.password)
      const records = new Account(req.body)
      await records.save()
      res.redirect(`${system.prefixAdmin}/accounts`)
    }
  } catch (error) {
    console.log(error.message);
  }
}

const editAccount = async (req, res) => {
  let find = {
    _id: req.params.id,
    deleted: false
  }
  try {
    const data = await Account.findOne(find)
    const roles = await Role.find({ deleted: false })
    res.render("admin/pages/accounts/edit", {
      pageTitle: "Chỉnh sửa tài khoản",
      data: data,
      roles: roles
    })
  } catch (error) {
    res.resdirect(`${system.prefixAdmin}/accounts`)
  }
}

const editAccountPatch = async (req, res) => {
  const id = req.params.id
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
module.exports = { account, createAccount, createAccountPost, editAccount, editAccountPatch }