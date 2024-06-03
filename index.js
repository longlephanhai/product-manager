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

const route = require("./routes/client/index.route")
const routeAdmin = require("./routes/admin/index.router")
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

//app local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Routes
app.use(route)
app.use(routeAdmin)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});