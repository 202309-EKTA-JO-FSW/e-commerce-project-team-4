// import router from "../routes/admin";
const ShopItem = require("../models/shopItemModel");

async function addNewItem(req, res) {
  try {
    const newItemBody = req.body;

    const newItem = new ShopItem(newItemBody);

    await newItem.save();

    // or

    // const newItem = await ShopItem.create(newItemBody)

    res.status(201).json({ message: "Item added sucessfully", item: newItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//update an existing ShopItem:
async function updateItem(req, res) {
  try {
    const { id } = req.params;
    const newItemBody = req.body;

    const updatedItem = await ShopItem.findByIdAndUpdate(id, newItemBody, {
      new: true,
    });

    if (!updatedItem) {
      res.status(404).json({ error: "Item not found" });
    }

    res
      .status(201)
      .json({ message: "Item updated sucessfully!", item: updatedItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// search
const searchItem = async (req, res) => {
  const { title, description, category } = req.query;

  try {
    const items = await ShopItem.find({
      $or: [
        // Assuming you want to find items that match any of the provided fields
        //$or: This is a logical operator that allows the query to match documents where at least one of the given conditions is true. It takes an array of conditions.
        { title: new RegExp(title) },
        { description: new RegExp(description) },
        { $in: { category: new RegExp(category) } },
      ],
    });

    if (!items || items.length === 0) {
      return res.status(404).json({
        message:
          "NO RELATED ITEMS. Try another item name, title, description, or category.",
      });
    }

    return res.status(200).json({ items });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete by id ... but we should make sure just the admin can only delete the item
const deleteItem = async (req, res) => {
  const id = req.params.id;

  try {
    const items = await ShopItem.findByIdAndRemove(id);

    if (!items) {
      return res.status(400).json({ message: "The item is not found" });
    }

    return res.status(200).json({ message: "successfully deleted the item" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addNewItem,
  updateItem,
  searchItem,
  deleteItem,
};
