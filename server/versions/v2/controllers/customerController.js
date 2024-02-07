const Items = require("../models/shopItemModel");

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
customerController.newCard = async (req, res) => {};

// checkout
customerController.newCheckout = async (req, res) => {};

module.exports = customerController;
