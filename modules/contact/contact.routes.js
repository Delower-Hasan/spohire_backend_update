
const express = require("express");
const { createMessage ,getContacts} = require("./contact.controller");


const router = express.Router();

router.post("/sendContactMessage", createMessage);
router.get("/", getContacts);



module.exports = router;
