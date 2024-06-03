//[GET] /
const home  = (req, res) => {
  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ"
  });
}
module.exports =home