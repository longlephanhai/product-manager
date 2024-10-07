const express = require('express');
var methodOverride = require('method-override')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var flash = require('express-flash')
require('dotenv').config()
const systemConfig = require('./config/system')
const database = require("./config/database")
database.connect();
var path = require('path');
const route = require("./routes/client/index.route")
const routeAdmin = require("./routes/admin/index.router")
const authRouter = require("./routes/admin/auth.router")
const moment = require('moment');
const myAccountRouter = require('./routes/admin/my-account.router');
const routerSearch = require('./routes/client/search.router');
const routerCart = require('./routes/client/cart.router');
const routerCheckout = require('./routes/client/checkout.router');
const routerUser = require('./routes/client/user.router');
const routerSetting = require('./routes/admin/setting.route');
const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(`${__dirname}/public`));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// flash
app.use(cookieParser('KJOIVOVOOJJVO'));
app.use(session({
  secret: 'KJOIVOVOOJJVO',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use(flash());
//end flash

// Tiny MCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// end tiny MCE

//app local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment
// Routes
app.use(route)
app.use(routeAdmin)
app.use(authRouter)
app.use(myAccountRouter)
app.use(routerSearch)
app.use(routerSetting)
app.use("/cart",routerCart)
app.use("/checkout",routerCheckout)
app.use("/user",routerUser)

app.get("*",(req,res)=>{
  res.render("client/pages/errors/404",{
    pageTitle:"404 Not Found"
  })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});