const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.get("/health", (req, res) => {
  res.send("Bistro Boss Restaurant Server is in operation");
});


app.all("*", (req,res,next)=>{
    const error = new Error(`The requested url is invalid [${req.url}]`)
    error.status = 404
    next(error)
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500).send({
        message : err.message
    })
})




app.listen(port, () => {
  console.log(`Bistro Boss is Running on ${port}`);
});


