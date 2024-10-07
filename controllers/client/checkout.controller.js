const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const { priceNewOneProduct } = require("../../helpers/oneProduct");
const Order = require("../../models/Order.models");
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
  res.render("client/pages/checkout/index", {
    pageTitle: "Đặt hàng",
    cartDetail: cart
  })
}

const order = async (req, res) => {
  const cartId = req.cookies.cartId;
  const userInfo = req.body
  const cart = await Cart.findOne({
    _id: cartId
  })
  let products = []
  for (const product of cart.products) {
    const objectProduct = {
      product_id: product.product_id,
      quantity: product.quantity,
      price: 0,
      discountPercentage: 0,
    }
    const productInfo = await Product.findOne({
      _id: product.product_id
    })
    objectProduct.price = productInfo.price
    objectProduct.discountPercentage = productInfo.discountPercentage
    products.push(objectProduct)
  }
  const objectOrder = {
    cart_id: cartId,
    userInfo: userInfo,
    products: products
  };
  const order = new Order(objectOrder)
  await order.save()
  await Cart.updateOne({
    _id: cartId
  }, {
    products: []
  })
  res.redirect(`/checkout/success/${order._id}`)
}

const success = async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.orderId
  })
  for (const product of order.products) {
    const productInfor = await Product.findOne({
      _id: product.product_id
    }).select("title thumbnail")
    product.productInfor = productInfor
    product.priceNew =priceNewOneProduct(product)
    product.totalPrice = product.priceNew * product.quantity
  }
  order.totalPrice=order.products.reduce((sum,item)=>sum+item.totalPrice,0)
  res.render("client/pages/checkout/success", {
    pageTitle: "Đặt hàng thành công",
    order:order
  })
}
module.exports = { index, order, success }