const express = require("express");
const applyMiddleWare = require("./middlewares/applyMiddleware");
const connectDB = require("./db/connectDB");
const createCookieToken = require("./api/v1/authentication");
const servicesRoutes = require ('./routes/menus/index')
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;


applyMiddleWare(app);

// app.use(createCookieToken)
app.use(servicesRoutes)





app.get("/health", (req, res) => {
  res.send("Bistro Boss Restaurant Server is in operation");
});

app.all("*", (req, res, next) => {
  const error = new Error(`The requested url is invalid [${req.url}]`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    message: err.message,
  });
});

const main = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Bistro Boss is Running on ${port}`);
  });
};

main()