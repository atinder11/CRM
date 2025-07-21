const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUsers } = require("../controllers/authController");

router.post("/register", registerUser);  //singup
router.post("/login", loginUser); //singin
router.post("/users", getUsers); //allusers

module.exports = router;