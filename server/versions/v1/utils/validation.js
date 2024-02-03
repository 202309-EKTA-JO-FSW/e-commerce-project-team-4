const validateShopItem =(shopItem)=>{
    const errors = {}

    if (!shopItem.title || typeof shopItem.title !== 'string'){
        errors.title = 'Title is required and must be a string'
    }

    if (!shopItem.image || typeof shopItem.image !== 'string'){
        errors.image = 'Image URL is required and must be a string'
    }

    if (!shopItem.price || typeof shopItem.price !== 'number'){
        errors.price = 'Price is required and must be a positive number'
    }

    if (!shopItem.description || typeof shopItem.description !== 'string'){
        errors.description = 'Description is required and must be a string'
    }

    if (!shopItem.availableCount || typeof shopItem.availableCount !== 'number'){
        errors.description = 'Available count is required and must be a non-negative number'
    }

    if (!shopItem.genre || typeof shopItem.genre !== 'string'){
        errors.genre = 'Genre or category is required and must be a string'
    }

    return{
        isValid: Object.keys(errors).length === 0,
        errors,
    }
}
module.exports = {validateShopItem}