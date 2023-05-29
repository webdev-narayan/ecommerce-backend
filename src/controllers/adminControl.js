const Admin = require('../models/Admin') // adding admin model
const JWT = require('jsonwebtoken') // adding jsonwebtoken
var CryptoJS = require("crypto-js");
const Order = require('../models/Order') //adding order model
const JWT_Access_Secrete = process.env.ADMIN_ACCESS_SECRET_KEY
const JWT_Refresh_Secrete = process.env.ADMIN_REFRESH_SECRET_KEY

const Admin_Pass_Sec_Key = process.env.ADMIN_PASSWORD_SECRET_KEY



// function to create admin no authenticaiton
const createAdmin = async (req, res) => {
    try {

        const { name, email, password } = req.body // destructuring
        const encryptPassword = CryptoJS.AES.encrypt(password, Admin_Pass_Sec_Key).toString()

        // checking if the user alread exist 
        let usercheck = await Admin.findOne({ email })
        if (usercheck) {
            res.status(400).json({ error: "Email Already Exists" })
        } else {

            const new_Admin = await new Admin({ name, email, password: encryptPassword })
            const admin_res = await new_Admin.save()
            res.status(200).json({ message: `Account Create Successfully ${admin_res.name}` })
        }

    } catch (error) {
        res.status(500).send(error)
    }
}

// function to create admin  authentication require
const loginAdmin = async (req, res) => {

    try {

        const { email, password } = req.body // extracting email and password from req.body

        let admin = await Admin.findOne({ email }) // validating admin email exists or not

        if (admin) {

            const decryptPassword = CryptoJS.AES.decrypt(admin.password, Admin_Pass_Sec_Key).toString(CryptoJS.enc.Utf8)// decrypting password


            // writing statement to check req email with database email and passwrod with decrypted password from database
            if (email == admin.email && password == decryptPassword) {

                var accessToken = JWT.sign({ email: admin.email, name: admin.name }, JWT_Access_Secrete, { expiresIn: '2d' })
                var refreshToken = JWT.sign({ email: admin.email, name: admin.name }, JWT_Refresh_Secrete, { expiresIn: '30d' })
                res.status(200).json({ message: "Signed In Success", accessToken, refreshToken, name: admin.name })
            } else {
                res.status(400).json({ error: "Please Check Your Login Credentials" })
            }
        } else {
            res.status(400).json({ error: 'No User Exists Please Check Your Login Credentials' })
        }


    } catch (error) {
        res.status(500).json(error)
    }


}



// writing function to refresh token 
const refreshToken = async (req, res) => {

    try {
        const { refreshToken } = req.body // extracting from req.body

        // cheking if refreshToken is not present 
        if (!refreshToken) {
            res.status(401).json({ message: "access Denied" })
        } else {

            let user = JWT.verify(refreshToken, JWT_Refresh_Secrete)
            if (user) {

                // sending the new token 
                var accessToken = JWT.sign({ email: user.email, name: user.name }, JWT_Access_Secrete, { expiresIn: '2d' })
                var refToken = JWT.sign({ email: user.email, name: user.name }, JWT_Refresh_Secrete, { expiresIn: '30d' })

                res.status(200).json({ message: "Token Refreshed ", accessToken, refreshToken: refToken })
            } else {
                res.status(401).json({ error: "Invalid Token" })
            }

        }

    } catch (error) {
        res.status(500).json(error)
    }





}



// get lists of all placed orders  authentication required ie middleware

const getAllOrders = async (req, res) => {

    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ error, message: "Internal Server Error" })
    }
}

// enpoint to change status of a order

const changeOrderStatus = async (req, res) => {


    try {
        const validOrderId = await Order.findById(orderid)
        const { orderid } = req.params // getting order id from url
        const { status } = req.body // getting status (cancel,pending,approved etc) from req body

        if (validOrderId) {
            const order = await Order.findByIdAndUpdate(orderid, { status })
            const updatedOrder = await Order.findById(orderid)
            res.status(200).json({ message: `Order Status has been changed `, updatedOrder })
        } else {
            res.status(400).json({ error: "Invalid Order Id" })
        }
    } catch (error) {
        res.status(500).json({ error, message: "Internal server errorr" })
    }

}


module.exports = {
    createAdmin,
    loginAdmin,
    refreshToken,
    getAllOrders,
    changeOrderStatus
}