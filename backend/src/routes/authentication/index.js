const express = require('express');
const createCookieToken = require('../../api/v1/authentication/createCookieToken');
const router = express.Router()


router.post("/jwt", createCookieToken)

module.exports=router;