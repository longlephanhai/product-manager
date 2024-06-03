// const productRoutes = require('./product.route')
// const homeRoutes = require('./home.route')
// module.exports = (app) => {
//   app.use('/', homeRoutes);
//   app.use('/products', productRoutes)
// }
const express = require("express")
const home = require("../../controllers/client/home.controller");
const product = require("../../controllers/client/product.controller");
const detailClient = require("../../controllers/client/detailClient");
const router = express.Router()

router.get('/', home)
router.get('/products', product);
router.get(`/products/:slug`,detailClient)
module.exports = router