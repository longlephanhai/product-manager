const Role = require("../../models/roles.model");
const systemConfig = require("../../config/system");
const { log } = require("console");
const roles = async (req, res) => {
  let find = {
    deleted: false
  }
  const records = await Role.find(find);
  res.render("admin/pages/roles/index", {
    pageTitle: "Nhóm quyền",
    records: records
  });
}

const create = async (req, res) => {
  res.render("admin/pages/roles/create", {
    pageTitle: "Tạo nhóm quyền"
  });
}

const createPostRole = async (req, res) => {
  console.log(req.body);
  const record = new Role(req.body);
  await record.save();
  res.redirect(`${systemConfig.prefixAdmin}/roles`)
}
const editRole = async (req, res) => {
  try {
    const id = req.params.id
    let find = {
      _id: id,
      deleted: false
    }
    const data = await Role.findOne(find);
    res.render("admin/pages/roles/edit", {
      pageTitle: "Chỉnh sửa nhóm quyền",
      data: data
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
  }
}
const editRolePatch = async (req, res) => {
  const id = req.params.id
  await Role.updateOne({ _id: id }, req.body);
  req.flash("success", "Chỉnh sửa nhóm quyền thành công")
  res.redirect("back")
}
const permissions = async (req, res) => {
  let find = {
    deleted: false
  }
  const records = await Role.find(find);
  res.render("admin/pages/roles/permissions", {
    pageTitle: "Phân quyền",
    records: records
  });
}
const permissionsPatch = async (req, res) => {
  const permissions = JSON.parse(req.body.permissions);
  for (const item of permissions) {
    const id = item.id;
    const permissions = item.permissions;
    await Role.updateOne({ _id: id }, { permissions: permissions });
  }
  res.redirect(`back`)
}
module.exports = { roles, create, createPostRole, editRole, editRolePatch, permissions, permissionsPatch }