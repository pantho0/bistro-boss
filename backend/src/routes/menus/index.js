const express = require('express');
const Menu = require('../../models/Menu.models');
const findAllMenuItem = require('../../api/v1/menus/controller/findAllmenuItem');
const router = express.Router()


router.get("/menu", findAllMenuItem);


module.exports = router;