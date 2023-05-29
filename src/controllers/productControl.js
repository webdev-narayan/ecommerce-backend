const Product = require('../models/Product')


// creatin new product 

const addProduct = async (req, res) => {
    const { name, description, price, availableQty } = req.body

    try {
        const product = await new Product({
            name, description, price, availableQty
        })
        await product.save()
        res.status(200).json({ message: `product - ${name} has been added` })
    } catch (error) {
        res.status(500).json(error)
    }

}


// delete product 
const deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findByIdAndDelete(id)
        res.status(200).json({ message: `product - ${product.name} has been deleted` })
    } catch (error) {
        res.status(500).json(error)
    }

}


// get single product 
const singleProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.find({ _id: id })
        res.status(200).json({ product })
    } catch (error) {
        res.status(500).json(error)
    }

}
// update single product 
const updateProduct = async (req, res) => {

    const { id } = req.params
    const { name, description, price, availableQty } = req.body
    try {
        const product = await Product.findByIdAndUpdate(id, { name, description, price, availableQty })
        res.status(200).json({ message: `product - ${product.name} has been updated` })
    } catch (error) {
        res.status(500).json(error)
    }

}

// get all  product 
const allProducts = async (req, res) => {
    if (req.method === "GET")
        try {
            const products = await Product.find()
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json(error)
        }

}


module.exports = {
    addProduct,
    allProducts,
    deleteProduct, singleProduct, updateProduct
}