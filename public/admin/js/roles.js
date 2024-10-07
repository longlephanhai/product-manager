// Permissions
const tablePermissions = document.querySelector("[table-premissions]")
if (tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]")
  buttonSubmit.addEventListener("click", () => {
    let permissions = [];
    const row = tablePermissions.querySelectorAll("[data-name]");
    row.forEach((item) => {
      const name = item.getAttribute("data-name");
      const inputs = item.querySelectorAll("input");
      if (name == "id") {
        inputs.forEach((input) => {
          const id = input.value
          permissions.push({
            id: id,
            permissions: []
          })
        })
      } else {
        inputs.forEach((input, index) => {
          const checked = input.checked;
          if (checked) {
            permissions[index].permissions.push(name)
          }
        })
      }
    })
    console.log(permissions);
    if (permissions.length > 0) {
      const formChangePermissions = document.querySelector("#form-change-permissions")
      const inputPermissions = formChangePermissions.querySelector("input[name='permissions']")
      inputPermissions.value = JSON.stringify(permissions)
      formChangePermissions.submit()
    }
  })
}
// End Permissions

// Permissions data default
const dataRecords = document.querySelector("[data-records]")
if (dataRecords) {
  const record = JSON.parse(dataRecords.getAttribute("data-records"))
  const tablePermissions = document.querySelector("[table-premissions]")
  record.map((item, index) => {
    const permissions = item.permissions
    permissions.map(permission => {
      const row = tablePermissions.querySelector(`[data-name="${permission}"]`);
      const input = row.querySelectorAll("input")[index]
      input.checked = true
    })
  })
}
// End Permissions data default