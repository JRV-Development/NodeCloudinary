const express = require("express");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
const path = require("path");
const multer = require("multer");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session=require('express-session')

//Initializations
const app = express();

//Settings
app.set("port", process.env.PORT);
app.set("views", path.join(__dirname, "views"));
app.engine(
  "hbs",
  engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");

//Added Image a Nodejs
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});
app.use(multer({ storage }).single("photo"));

//Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(flash());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//Globales
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.errors_msg = req.flash("errors_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});

//Routes
app.use(require("./routes/photo.routes"));

//Static
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
