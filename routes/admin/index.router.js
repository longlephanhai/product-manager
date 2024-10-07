// const dashBoardRoutes = require("./dashboard.route")
// module.exports = (app) => {
//     app.use('/admin/dashboard', dashBoardRoutes);
// }
const express = require("express")
const multer = require('multer')

// const storageMulter = require("../../helpers/storageMulter")
const upload = multer()
const systemConfig = require('../../config/system')
const dashboard = require("../../controllers/admin/dashboard.controller")
const productAdmin = require("../../controllers/admin/product.controller")
const changeStatus = require("../../controllers/admin/changstatus")
const changeMultiStatus = require("../../controllers/admin/changeMultiStatus")
const deleteItem = require("../../controllers/admin/deleteItem")
const addProduct = require("../../controllers/admin/addProduct")
const createPost = require("../../controllers/admin/createPost")
const validate = require("../../validates/admin/product.validate")
const editProduct = require("../../controllers/admin/eidtProduct")
const editProductPatch = require("../../controllers/admin/editProductPatch")
const detail = require("../../controllers/admin/detail")
const uploadClound = require("../../middlewares/admib/uploadClound")

const createProductCategory = require("../../controllers/admin/products-category")
const validateCategory = require("../../validates/admin/product-category.validate")
const createPostCategory = require("../../controllers/admin/cretePostProductCategory")
const productsCategory = require("../../controllers/admin/productCategory")
const productCategoryEdit = require("../../controllers/admin/product-category-edit")
const productCategoryEditPatch = require("../../controllers/admin/productCategoryEditPatch")
const { roles, create, createPostRole, editRole, editRolePatch, permissions, permissionsPatch } = require("../../controllers/admin/role.controller")
const { account, createAccount, createAccountPost, editAccount, editAccountPatch } = require("../../controllers/admin/account.controller")
const { validateAccount, editAccountValidate } = require("../../validates/admin/account.validate")
const authMiddleware = require("../../middlewares/admib/auth.middlewares")

const routeradmin = express.Router()
const PATH_ADMIN = systemConfig.prefixAdmin
routeradmin.get(PATH_ADMIN + '/dashboard', authMiddleware.requireAuth, dashboard)
routeradmin.get(PATH_ADMIN + '/products', authMiddleware.requireAuth, authMiddleware.requireAuth, productAdmin)
routeradmin.patch(PATH_ADMIN + '/products/change-status/:status/:id', authMiddleware.requireAuth, changeStatus)
routeradmin.patch(PATH_ADMIN + '/products/change-multi', authMiddleware.requireAuth, changeMultiStatus)
routeradmin.delete(PATH_ADMIN + "/products/delete/:id", authMiddleware.requireAuth, deleteItem)
routeradmin.get(PATH_ADMIN + "/products/create", authMiddleware.requireAuth, addProduct)
routeradmin.post(
  PATH_ADMIN + "/products/create",
  authMiddleware.requireAuth,
  upload.single('thumbnail'),
  uploadClound,
  validate,
  createPost
)
routeradmin.get(PATH_ADMIN + "/products/edit/:id",authMiddleware.requireAuth, editProduct)
routeradmin.patch(PATH_ADMIN + "/products/edit/:id",
  authMiddleware.requireAuth,
  upload.single('thumbnail'),
  uploadClound,
  validate,
  editProductPatch)
routeradmin.get(PATH_ADMIN + "/products/detail/:id",authMiddleware.requireAuth, detail)

routeradmin.get(PATH_ADMIN + "/products-category",authMiddleware.requireAuth, productsCategory)
routeradmin.get(PATH_ADMIN + "/products-category/create",authMiddleware.requireAuth, createProductCategory)
routeradmin.post(
  PATH_ADMIN + "/products-category/create",
  authMiddleware.requireAuth,
  upload.single('thumbnail'),
  uploadClound,
  validateCategory,
  createPostCategory
)
routeradmin.get(PATH_ADMIN + "/products-category/edit/:id",authMiddleware.requireAuth, productCategoryEdit)
routeradmin.patch(PATH_ADMIN + "/products-category/edit/:id",
  authMiddleware.requireAuth,
  upload.single('thumbnail'),
  uploadClound,
  validateCategory,
  productCategoryEditPatch
)
routeradmin.get(PATH_ADMIN + '/roles',authMiddleware.requireAuth, roles)
routeradmin.get(PATH_ADMIN + '/roles/create',authMiddleware.requireAuth, create)
routeradmin.post(PATH_ADMIN + '/roles/create',authMiddleware.requireAuth, createPostRole)
routeradmin.get(PATH_ADMIN + '/roles/edit/:id',authMiddleware.requireAuth, editRole)
routeradmin.patch(PATH_ADMIN + '/roles/edit/:id',authMiddleware.requireAuth, editRolePatch)
routeradmin.get(PATH_ADMIN + '/roles/permissions',authMiddleware.requireAuth, permissions)
routeradmin.patch(PATH_ADMIN + '/roles/permissions',authMiddleware.requireAuth, permissionsPatch)
routeradmin.get(PATH_ADMIN + '/accounts',authMiddleware.requireAuth, account)
routeradmin.get(PATH_ADMIN + '/accounts/create',authMiddleware.requireAuth, createAccount)
routeradmin.post(PATH_ADMIN + '/accounts/create',
  authMiddleware.requireAuth,
  upload.single('avatar'),
  uploadClound,
  validateAccount,
  createAccountPost
)
routeradmin.get(PATH_ADMIN + '/accounts/edit/:id',authMiddleware.requireAuth, editAccount)
routeradmin.patch(PATH_ADMIN + '/accounts/edit/:id',
  authMiddleware.requireAuth,
  upload.single('avatar'),
  uploadClound,
  editAccountValidate,
  editAccountPatch
)

module.exports = routeradmin
