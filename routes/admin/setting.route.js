const express = require('express')
const multer = require('multer')
const { general, generalPatch } = require('../../controllers/admin/general.controller')
const systemConfig = require('../../config/system')
const authMiddleware = require("../../middlewares/admib/auth.middlewares")
const upload = multer()
const uploadClound = require("../../middlewares/admib/uploadClound")
const PATH_ADMIN = systemConfig.prefixAdmin
const routerSetting = express.Router()
routerSetting.get(PATH_ADMIN + "/settings/general", authMiddleware.requireAuth, general)
routerSetting.patch(PATH_ADMIN + "/settings/general",
  authMiddleware.requireAuth,
  upload.single('logo'),
  uploadClound,
  generalPatch
)
module.exports = routerSetting