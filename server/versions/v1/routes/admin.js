const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/adminController");

router.post("/admin/item/new", adminControllers.addNewItem);

router.put("/admin/item/:id", adminControllers.updateItem);

router.delete("/admin/item/:id", adminControllers.deleteItem);

router.get("/admin/item/search", adminControllers.searchItem);

module.exports = router;
