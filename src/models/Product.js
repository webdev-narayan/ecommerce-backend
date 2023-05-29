const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    availableQty: {
        type: Number,
        require: true
    }
},{timestamps:true})
const Product = new mongoose.model('Product' , productSchema)
module.exports = Product