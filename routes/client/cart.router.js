const express = require("express")

const { cartId } = require("../../middlewares/client/cart.middlewares")
const { addPost, index, deletePost, updatePost } = require("../../controllers/client/cart.controller")
const category = require("../../middlewares/client/category.middlewares")
const { infoUser } = require("../../middlewares/client/user.middlewares")
const { settingGeneral } = require("../../middlewares/client/setting.middlewares")
const routerCart = express.Router()
routerCart.use(category)
routerCart.use(cartId)
routerCart.use(infoUser)
routerCart.use(settingGeneral)
routerCart.get("/", index)
routerCart.get("/delete/:productId", deletePost);
routerCart.post("/add/:productId", addPost);
routerCart.get("/update/:productId/:quantity", updatePost);
module.exports = routerCart