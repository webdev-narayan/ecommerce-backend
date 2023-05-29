const express = require('express') // importing express js
const router = express.Router() 
const middleware = require('../middleware/authToken') // importing middleware
const adminControl = require('../controllers/adminControl') // importing


router.post('/admin/signup',(adminControl.createAdmin))


router.post('/admin/login',(adminControl.loginAdmin))

router.post('/admin/refresh-token',(adminControl.refreshToken))

router.get('/admin/orders',middleware.authAdmin,adminControl.getAllOrders)

router.post('/admin/order/status/:orderid',middleware.authAdmin,adminControl.changeOrderStatus)


module.exports = router