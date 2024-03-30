const express = require("express");
const applyMiddleWare = require("./middlewares/applyMiddleware");
const connectDB = require("./db/connectDB");
const authenticationRoutes = require("./routes/authentication/index.js");
const servicesRoutes = require ('./routes/menus/index')
const reviewRoutes = require('./routes/reviews/index.js')
const singleMenuGet = require('./routes/singleMenu/index.js')
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;


applyMiddleWare(app);

app.use(authenticationRoutes)
app.use(servicesRoutes)
app.use(singleMenuGet)
app.use(reviewRoutes)




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