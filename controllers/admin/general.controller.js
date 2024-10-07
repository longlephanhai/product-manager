const SettingGeneral = require("../../models/settings-general.model");

const general = async (req, res) => {
  const settingGeneral = await SettingGeneral.findOne()
  res.render("admin/pages/settings/general", {
    title: "Cài đặt chung",
    settingGeneral: settingGeneral
  })
}
const generalPatch = async (req, res) => {
  const settingGeneral = await SettingGeneral.findOne()
  if (settingGeneral) {
    await SettingGeneral.updateOne({
      _id: settingGeneral._id
    }, req.body)
  } else {
    const record = new SettingGeneral(req.body)
    await record.save()
  }
  res.redirect("back")
}
module.exports = { general, generalPatch }