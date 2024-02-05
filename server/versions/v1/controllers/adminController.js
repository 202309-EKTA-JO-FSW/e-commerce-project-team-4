const ShopItem = require("../models/shopItemModel");


//const addNewItem = (req, res) => {};

// add a new item to the shop

async function addNewItem(req, res) {
    try { 
        const {title,price,description,availableCount,category}= req.body

        const newItem = new ShopItem({
            title,
            price,
            description,
            availableCount,
            category,
        });
        
        const savedItem = await newItem.save();

        res.status(201).json({message: "Item added sucessfully", item: savedItem});
    
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//update an existing ShopItem:

async function updateItem(req, res) {
    try {
        const {id} = req.params;
        const {title, price,description,availableCount,category} = req.body;

        const updatedItem = await ShopItem.findByIdAndUpdate(
            id,
            {
                title,
                price,
                description,
                availableCount,
                category,
            },
            {new: true}
            );
        if (updatedItem) {
            res.json({message: "Item updated sucessfully!", item: updatedItem})

        } else {
            res.status(404).json({ error: "Item not found"});
        }           
        
    } catch (error) {
        res.status(500).json({message: error.message})        
    }
    
}

module.exports = {
    addNewItem,
    updateItem
  };