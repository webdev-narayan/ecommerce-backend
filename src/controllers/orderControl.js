const Order = require('../models/Order')




const newOrder = async (req, res) => {

    const { products, address, amount } = req.body

    const userEmail = req.userEmail

    // res.status(200).json({ "Order Detail": {products}, message: 'Order Placed' })


    try {
        const newOrder = await new Order({
            userEmail,
            products,
            address,
            amount,
        })

        const data = await newOrder.save()


        res.status(200).json({ "Order Detail": data, message: 'Order Placed' })


    } catch (error) {
        res.status(500).json({ error: error, message: "stuck on catch" })
    }
}



// get all orders and status 

const myOrders = async (req, res) => {
    const userEmail = req.userEmail

    const orders = await Order.find({ userEmail })
    res.status(200).json(orders)

}

// get single order details 

const singleOrder = async (req, res) => {
    const { orderid } = req.params
    console.log(orderid)

    if (orderid) {
        const order = await Order.find({ _id: orderid })
        res.status(200).json({ order })
    } else {
        res.status(400).json({ error: "Invalid Order Id" })
    }

}


// cancel an order 
const cancelOrder = async (req, res) => {
    const { orderid } = req.params

    try {

        if (orderid) {
            const order = await Order.findByIdAndUpdate(orderid, { status: "cancel" })
            res.status(200).json({ order })
        } else {
            res.status(400).json({ message: "Invalid Order Id" })
        }


    } catch (error) {
        res.status(500).json({ error, message: "Internal Server Error" })
    }


}






module.exports = {
    newOrder, myOrders, cancelOrder, singleOrder
}