const express = require('express');
const Menu = require('../../models/Menu.models');
const router = express.Router()


router.get("/menu", async (req, res) => {
    let sortObj = {}
    const sortField = req.query.sortField;
    const sortOrder = req.query.sortOrder;
    if(sortField && sortOrder){
      sortObj[sortField] = sortOrder
    }
    const result = await Menu.find().sort(sortObj);
    res.send(result);
  });


module.exports = router;