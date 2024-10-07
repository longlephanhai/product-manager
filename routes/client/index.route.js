const express = require("express")
const home = require("../../controllers/client/home.controller");
const { product, categorySlug } = require("../../controllers/client/product.controller");
const detailClient = require("../../controllers/client/detailClient");
const category = require("../../middlewares/client/category.middlewares");
const { cartId } = require("../../middlewares/client/cart.middlewares");
const { infoUser } = require("../../middlewares/client/user.middlewares");
const { settingGeneral } = require("../../middlewares/client/setting.middlewares");
const router = express.Router()
router.use(category)
router.use(cartId)
router.use(infoUser)
router.use(settingGeneral)
router.get('/', home)
router.get('/products', product);
router.get(`/products/:slugCategory`, categorySlug)
router.get(`/products/detail/:slugProduct`, detailClient)

module.exports = router