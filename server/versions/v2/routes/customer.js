const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.get("/items", customerController.getAllItems);
router.get("/items/filter", customerController.getFilterItems);
router.get("/items/search", customerController.getSearchItems);
router.get("/items/:id", customerController.getSingleItem);

// sending a request to /cart with the customer ID, item ID and quantity
// router.post("items/card", customerController.newCard);

// router.post("items/checkout", customerController.newCheckout);

module.exports = router;
