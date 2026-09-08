const express = require("express");
const path = require("path");
const session = require("express-session");

const userRouter = require("./routes/userRouter");
const { hostRouter } = require("./routes/hostRouter");
const errorController = require("./controllers/errorController");

const app = express();

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "admin-secret-124421",
  resave: false,
  saveUninitialized: false
}));

// Global Variables
app.use((req, res, next) => {
  res.locals.isAdmin = req.session.isAdmin;
  res.locals.isLoggedIn = req.session.user || req.session.isAdmin;
  res.locals.cartCount = (req.session.cart || []).reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0
  );
  next();
});

// Routes
app.use(userRouter);
app.use(hostRouter);

// 404 Page
app.use(errorController.pageNotFound);

// Server
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});