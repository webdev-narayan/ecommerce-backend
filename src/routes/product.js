const express = require('express') // importing Express Js
const router = express.Router() // Importing router from express js
const productControl = require('../controllers/productControl')  // importing product controller 

const middleware = require('../middleware/authToken') // importing middleware



// End Point to add Product , autherization required

router.post('/product/add',(middleware.authAdmin),(productControl.addProduct))



// End Point to get all products no autherization 
router.get('/products',productControl.allProducts)



// End Point to delete product using id , autherization required
router.delete('/product/delete/:id',(middleware.authAdmin),productControl.deleteProduct)



// endpoint to get a single  product no autherization required
router.get('/product/:id',productControl.singleProduct)



// endpoint to update a product , autherization required
router.post('/product/update/:id',(middleware.authAdmin),(productControl.updateProduct))


module.exports = router