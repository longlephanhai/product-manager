// Cập nhật số lượng sản phẩm trong giỏ hàng
const inputQuantity = document.querySelectorAll('input[name="quantity"]');
if (inputQuantity) {
  inputQuantity.forEach(input => {
    input.addEventListener('change', (e) => {
      const productId = input.getAttribute("product-id")
      const quantity = parseInt(input.value)
      if (quantity > 0) {
        window.location.href = `/cart/update/${productId}/${quantity}`
      }
    })
  })
}

// Hết cập nhật số lượng sản phẩm trong giỏ hàng
