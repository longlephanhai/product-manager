const Product = require("../../models/product.model")
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")
const Account = require("../../models/account.model")
//[GET] /admin/products
const productAdmin = async (req, res) => {
  try {
    const filterStatus = filterStatusHelper(req.query);
    let find = {
      deleted: false,
    }
    if (req.query.status) {
      find.status = req.query.status
    }
    const objectSearch = searchHelper(req.query);
    if (objectSearch.regex) {
      find.title = objectSearch.regex;
    }

    // pagination
    const countProduct = await Product.countDocuments(find);
    let objectPagination = paginationHelper(
      {
        currenttPage: 1,
        limitItems: 4,
      },
      req.query,
      countProduct
    )

    // sort
    let sort = {}
    if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue
    } else {
      sort.position = "desc"
    }
    const products = await Product.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip);
    for (const product of products) {
      // lấy ra thông tin người tạo
      const user = await Account.findOne({ _id: product.createdBy.account_id })
      if (user) {
        product.accountFullName = user.fullName
      }

      // lấy ra thông tin người cập nhật gần nhất
      const updatedBy = product.updatedBy.slice(-1)[0]
      if (updatedBy) {
        const userUpdated = await Account.findOne({
          _id: updatedBy.account_id
        })
        updatedBy.accountFullName = userUpdated.fullName
      }
    }
    res.render("admin/pages/products/index", {
      pageTitle: "Danh sách sản phẩm",
      products: products,
      filterStatus: filterStatus,
      keyword: objectSearch.keyword,
      pagination: objectPagination
    })
  } catch (error) {
    console.log(error);
  }
}
module.exports = productAdmin


