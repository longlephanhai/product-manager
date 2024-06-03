//change status
const buttonChangeStatys = document.querySelectorAll("[button-change-status]")
if (buttonChangeStatys.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status")
  const patch = formChangeStatus.getAttribute("data-patch")
  buttonChangeStatys.forEach(button => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status")
      const id = button.getAttribute("data-id")
      let statusChange = statusCurrent === "active" ? "inactive" : "active"
      const action = patch + `/${statusChange}/${id}?_method=PATCH`
      formChangeStatus.action = action
      formChangeStatus.submit();
    })
  })
}
//end change status

//delete products
const buttonsDelete = document.querySelectorAll("[button-delete]")
if (buttonsDelete.length > 0) {
  const formDeleteItem = document.querySelector("#form-delete-item")
  const path = formDeleteItem.getAttribute("data-path")
  buttonsDelete.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này")
      if (isConfirm) {
        const id = button.getAttribute("data-id")
        const action = `${path}/${id}?_method=DELETE`
        formDeleteItem.action = action
        formDeleteItem.submit()
      }
    })
  })
}
//delete products