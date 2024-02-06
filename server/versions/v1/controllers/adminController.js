// import router from "../routes/admin";
const { query } = require("express");
const ShopItem = require("../models/shopItemModel");

async function addNewItem(req, res) {
  try {
    const { title, price, description, availableCount, category, image } =
      req.body;

    const newItem = new ShopItem({
      title,
      price,
      description,
      availableCount,
      category,
    });

    const savedItem = await newItem.save();

    res
      .status(201)
      .json({ message: "Item added sucessfully", item: savedItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//update an existing ShopItem:

async function updateItem(req, res) {
  try {
    const { id } = req.params;
    const { title, price, description, availableCount, category, image } =
      req.body;

    const updatedItem = await ShopItem.findByIdAndUpdate(
      id,
      {
        title,
        price,
        description,
        availableCount,
        category,
      },
      { new: true }
    );
    if (updatedItem) {
      res.json({ message: "Item updated sucessfully!", item: updatedItem });
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const searchItem = async(req, res, next) =>{  // the seach for admin items
    // const query = ShopItem.find({ any: Schema.Types.Mixed });
    const { title, description, category } = req.query;
    try{
      const items = await ShopItem.find({
        $or: [ // Assuming you want to find items that match any of the provided fields
        //$or: This is a logical operator that allows the query to match documents where at least one of the given conditions is true. It takes an array of conditions.
            { title: { $regex: title, $options: 'i' } },
            { description: { $regex: description, $options: 'i' } },
            { category: { $regex: category, $options: 'i' } }
        ]
      });     /*Searches the title field for any documents that contain a string matching the pattern specified by the title variable. $regex is used to specify that title should be treated as a regular expression, allowing for pattern matching rather than exact string comparison. $options: 'i' makes the search case-insensitive.
              description: { $regex: description, $options: 'i' }: Similar to the title, it searches the description field for any matches that are case-insensitive.
              category: { $regex: category, $options: 'i' }: Searches the category field in the same manner. */
        
      if (!items || items.length === 0) {
        return res.status(404).json({ message: "NO RELATED ITEMS. Try another item name, title, description, or category." });
      }

      return res.status(200).json({ items });
    }
    catch(err){
        return console.log(err)
    }
};

// delete by id ... but we should make sure just the admin can only delete the item
const deleteItem = async(req, res, next) =>{
    const id =req.params.id; 
    let items;
    try{
        items= await ShopItem.findByIdAndRemove(id);  //here the change will be 
      if(!items){
        return res.status(500).json({message:"unable to delete item"})
    }
    return res.status(200).json({message:"successfully deleted the item"})
    }
    catch(err){
        return console.log(err)
    }
  
};

module.exports = {
  addNewItem,
  updateItem,
  searchItem,
  deleteItem
};
