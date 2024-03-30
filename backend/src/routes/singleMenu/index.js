const express = require('express');
const Menu = require('../../models/Menu.models');
const { ObjectId } = require('mongodb');
const findSingleMenu = require('../../api/v1/menus/controller/findSingleMenu');
const router = express.Router()

router.get("/menu/:id", findSingleMenu);

module.exports = router;
