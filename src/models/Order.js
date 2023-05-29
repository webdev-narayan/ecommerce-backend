const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    userEmail: {
        type: String,
        require: true
    },
    products: [{
        productId: {
            type: String,
        },
        productName: {
            type: String
        },
        quantity: { type: Number, default: 1 }
    }],
    address: { type: String, required: true },
    amount: { type: Number, require: true },
    status: {
        type: String,
        enum: ['pending', 'approved', 'shipped', 'deleverd',"cancel"],
        default: 'pending',
        // required: true
    }
}, { timestamps: true })

const Order = new mongoose.model("Order", orderSchema)
module.exports = Order