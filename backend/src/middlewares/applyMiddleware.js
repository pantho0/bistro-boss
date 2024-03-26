
const express = require("express");
const cors = require("cors");
const { CLIENT, LOCAL_CLIENT } = require("../config/default");


const applyMiddleWare = (app) => {
  app.use(cors({
    origin : [
        CLIENT,
        LOCAL_CLIENT
    ]
  }));
  app.use(express.json());
};


module.exports= applyMiddleWare