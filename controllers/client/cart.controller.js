const { priceNewOneProduct } = require("../../helpers/oneProduct");
const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");

const index = async (req, res) => {
  const cartId = req.cookies.cartId;
  const cart = await Cart.findOne({
    _id: cartId
  })
  console.log(cart);
  if (cart.products.length > 0) {
    for (const item of cart.products) {
      const productId = item.product_id
      const productInfo = await Product.findOne({
        _id: productId
      })
      productInfo.priceNew = priceNewOneProduct(productInfo)
      item.productInfo = productInfo
      item.totalPrice = productInfo.priceNew * item.quantity
    }
  }

  cart.totalPrice = cart.products.reduce((total, item) => total + item.totalPrice, 0)


  res.render('client/pages/cart/index', {
    pageTitle: "Giỏ hàng",
    cartDetail: cart
  })
}

const addPost = async (req, res) => {
  const cartId = req.cookies.cartId;
  const cart = await Cart.findOne({
    _id: cartId
  })
  const existProductInCart = cart.products.find(product => product.product_id === req.params.productId)

  if (existProductInCart) {
    const newQuantity = existProductInCart.quantity + parseInt(req.body.quantity)
    await Cart.updateOne(
      {
        _id: cartId,
        "products.product_id": req.params.productId
      },
      {
        'products.$.quantity': newQuantity
      }
    )
    res.redirect("back")
  }
  else {
    const objectCart = {
      product_id: req.params.productId,
      quantity: parseInt(req.body.quantity)
    }

    await Cart.findByIdAndUpdate({ _id: cartId }, { $push: { products: objectCart } });
    res.redirect("back")
  }
}

const deletePost = async (req, res) => {
  const cartId = req.cookies.cartId;
  const productId = req.params.productId;
  await Cart.updateOne({
    _id: cartId
  }, {
    "$pull": { products: { "product_id": productId } }
  })
  res.redirect("back")
}

const updatePost = async (req, res) => {
  const productId = req.params.productId
  const quantity = req.params.quantity
  const cartId = req.cookies.cartId
  await Cart.updateOne(
    {
      _id: cartId,
      "products.product_id": productId
    },
    {
      'products.$.quantity': quantity
    }
  )
  res.redirect("back")
}
module.exports = { addPost, index, deletePost, updatePost }