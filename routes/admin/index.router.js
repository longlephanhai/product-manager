// const dashBoardRoutes = require("./dashboard.route")
// module.exports = (app) => {
//     app.use('/admin/dashboard', dashBoardRoutes);
// }
const express = require("express")
const multer = require('multer')
const storageMulter = require("../../helpers/storageMulter")
const upload = multer({ storage: storageMulter() })
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


const routeradmin = express.Router()
const PATH_ADMIN = systemConfig.prefixAdmin
routeradmin.get(PATH_ADMIN + '/dashboard', dashboard)
routeradmin.get(PATH_ADMIN + '/products', productAdmin)
routeradmin.patch(PATH_ADMIN + '/products/change-status/:status/:id', changeStatus)
routeradmin.patch(PATH_ADMIN + '/products/change-multi', changeMultiStatus)
routeradmin.delete(PATH_ADMIN + "/products/delete/:id", deleteItem)
routeradmin.get(PATH_ADMIN + "/products/create", addProduct)
routeradmin.post(
    PATH_ADMIN + "/products/create",
    upload.single('thumbnail'),
    validate,
    createPost
)
routeradmin.get(PATH_ADMIN + "/products/edit/:id", editProduct)
routeradmin.patch(PATH_ADMIN + "/products/edit/:id",
    upload.single('thumbnail'),
    validate,
    editProductPatch)
routeradmin.get(PATH_ADMIN+"/products/detail/:id",detail)
module.exports = routeradmin