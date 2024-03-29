const express = require('express');
const Menu = require('../../models/Menu.models');
const { ObjectId } = require('mongodb');
const router = express.Router()

router.get("/menu/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await Menu.findById(query);
    res.send(result);
  });

module.exports = router;
