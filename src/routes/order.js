const express = require('express') // importing Express Js
const router = express.Router() // Importing router from express js

const orderControl = require('../controllers/orderControl')
const middleware = require('../middleware/authToken')


// endpoint to place new order autherization required

router.post('/order/new',middleware.authOrder,orderControl.newOrder)

// endpoint to get all orders autherization required
router.get('/order/my-orders', middleware.authOrder,orderControl.myOrders)


//endpoint to cancel order autherization required
router.put('/order/cancel/:orderid', middleware.authOrder,orderControl.cancelOrder)

//endpoint to get a single order , autherization required
router.get('/order/:orderid', middleware.authOrder,orderControl.singleOrder)

module.exports = router