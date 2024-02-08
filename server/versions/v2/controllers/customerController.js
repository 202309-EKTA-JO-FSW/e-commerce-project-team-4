const Items = require("../models/shopItemModel");
const Order = require("../models/orderModel");
const Card = require("../models/cardModel");

const customerController = {};

// get all items
customerController.getAllItems = async (req, res) => {
  let { offset, page } = req.query;

  // converting string to numbers
  offset = Number(offset) || 0;
  page = Number(page) || 1;
  try {
    // if page = 1 then 1 - 1 = 0, in this case when the page is 1, it won't skip any documents
    const skip = (page - 1) * offset;
    const items = await Items.find().skip(skip).limit(offset);

    if (items.length === 0) {
      res.status(400).json({ message: "Couldn't find any items" });
    }

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// filter items
customerController.getFilterItems = async (req, res) => {
  const { category, priceRange, offset, page } = req.query;
  offset = Number(offset) || 0;
  page = Number(page) || 1;
  try {
    const skip = (page - 1) * offset;
    let items;
    if (category) {
      items = await Items.find({ category: { $in: category } })
        .skip(skip)
        .limit(offset);
    } else if (priceRange) {
      switch (priceRange) {
        case "10-50":
          items = await Items.find({ price: { $gte: 10, $lte: 50 } })
            .skip(skip)
            .limit(offset);
          break;
        case "50-100":
          items = await Items.find({ price: { $gte: 50, $lte: 100 } })
            .skip(skip)
            .limit(offset);
          break;
        case "100-above":
          items = await Items.find({ price: { $gte: 100 } })
            .skip(skip)
            .limit(offset);
          break;
        default:
          res.status(400).json({ message: "Invalid price range" });
      }
    } else {
      return res.status(400).json({ message: "No query parameters provided" });
    }

    if (items.length === 0) {
      res.status(400).json({ message: "Couldn't find any items" });
    }

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// search for the items
customerController.getSearchItems = async (req, res) => {
  let { title, offset, page } = req.query;
  offset = Number(offset) || 0;
  page = Number(page) || 1;
  try {
    const skip = (page - 1) * offset;
    const items = await Items.find({ title: new RegExp(title) })
      .skip(skip)
      .limit(offset);
    if (items.length === 0) {
      res.status(400).json({ message: "Couldn't find any items" });
    }
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get an item by id
customerController.getSingleItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Items.find({ _id: id });
    if (!item) {
      res.status(400).json({ message: "The item is not available" });
    }
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// card
customerController.newCard = async (req, res) => {
  const { customerId, itemID, quantity } = req.body;
  try {
    const item = await Card.findOne({ itemId: itemID });
    if (!item || item.quantity < quantity) {
      return res.status(400).json({ message: "Not enough items in inventory" });
    }
    // Decrement the quantity in the inventory
    await Card.updateOne({ itemId: itemID }, { $inc: { quantity: -quantity } });

    await Order.updateOne(
      { customer: customerId },
      { $push: { items: { itemId: itemID } } },
      { upsert: true }
    );

    res.status(201).json({ message: "Item added to cart successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// checkout
customerController.newCheckout = async (req, res) => {
  try {
    // Extract cart from request body
    const { orders } = req.body;

    // Validate the cart contents (simplified)
    if (!orders || !orders.items || orders.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty or invalid." });
    }

    // Calculate total price
    let totalPrice = 0;
    for (const item of Order.items) {
      const product = await Order.findById(item.itemId); // Assuming an async call to find the item in the database
      if (!product) {
        return res
          .status(404)
          .json({ message: `Item with ID ${item.id} not found.` });
      }
      totalPrice += product.price * item.quantity;

      // Create and save the order
      const order = await Order.create({
        items: item.itemId,
        totalAmount: totalPrice,
        customer: req.coustomer.name, // I am not sure
      });
      res.json({
        message: "Checkout successful",
        order: order,
      });
    }

    res.status(201).json({ message: "checkout successful" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred during the checkout process." });
  }
};

module.exports = customerController;
