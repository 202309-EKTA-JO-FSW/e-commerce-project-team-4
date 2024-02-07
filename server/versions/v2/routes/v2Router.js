const express = require("express");
const router = express.Router();
const customerRouter = require("./customer");
const adminRouter = require("./admin");

router.use("/admin", adminRouter);
router.use("/customer", customerRouter);

module.exports = router;
