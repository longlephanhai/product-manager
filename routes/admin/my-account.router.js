const express = require('express')
const { myAccount, editMyAccount, editMyAccountPatch } = require('../../controllers/admin/my-account.controller')
const systemConfig = require('../../config/system')
const PATH_ADMIN = systemConfig.prefixAdmin
const multer = require('multer')
const upload = multer()
const authMiddleware = require("../../middlewares/admib/auth.middlewares")
const myAccountRouter = express.Router()
const uploadClound = require("../../middlewares/admib/uploadClound")
myAccountRouter.get(PATH_ADMIN + '/my-account', authMiddleware.requireAuth, myAccount)
myAccountRouter.get(PATH_ADMIN + '/my-account/edit', authMiddleware.requireAuth, editMyAccount)
myAccountRouter.patch(PATH_ADMIN + '/my-account/edit',
    authMiddleware.requireAuth,
    upload.single('avatar'),
    uploadClound,
    editMyAccountPatch
)
module.exports = myAccountRouter