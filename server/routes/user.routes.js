const userController = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

router.post("/register", userController.create);
router.post("/authenticate", userController.authenticate);

module.exports = router;
