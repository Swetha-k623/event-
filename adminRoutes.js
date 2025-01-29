const express = require("express");
const { exportUsers } = require("../controllers/adminController");
const router = express.Router();

router.get("/export", exportUsers);

module.exports = router;
