const express = require('express')
const router = express.Router()
const systemConfig = require('../../config/system')
const { login, loginPost, logout } = require('../../controllers/admin/login.controller')
const { validateLogin } = require('../../validates/admin/auth.validate')
const PATH_ADMIN = systemConfig.prefixAdmin
const auth = "/auth"
router.get(PATH_ADMIN + auth + '/login', login)
router.post(PATH_ADMIN + auth + '/login',
  validateLogin,
  loginPost
)
router.get(PATH_ADMIN + auth + '/logout', logout)
module.exports = router