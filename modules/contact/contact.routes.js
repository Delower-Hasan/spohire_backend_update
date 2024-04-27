
const express = require("express");
const { createMessage } = require("./contact.controller");


const router = express.Router();

router.post("/sendContactMessage", createMessage);



module.exports = router;
