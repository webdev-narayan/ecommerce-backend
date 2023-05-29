const User = require('../models/User')
const JWT = require('jsonwebtoken')
const CryptoJS = require('crypto-js')
// adding env variables 
const User_Access_Secret = process.env.USER_ACCESS_SECRET_KEY
const User_Refresh_Secret = process.env.USER_REFRESH_SECRET_KEY
const User_Pass_Sec_Key = process.env.USER_PASSWORD_SECRET_KEY

// create user 

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        // checking if the user already exists
        let usercheck = await User.findOne({ email })

        if (usercheck) {
            res.status(400).json({ message: "Email Already Exists" })
        } else {
            const encryptPassword = CryptoJS.AES.encrypt(password, User_Pass_Sec_Key).toString()
            const user = await new User({
                name, email, password: encryptPassword
            })
            await user.save()
            res.status(200).json({ message: "Account created Successfully", user })
        }

    } catch (error) {
        res.status(500).json(error)

    }
}


// login user 

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        // checking user exists or not 
        let user = await User.findOne({ email })

        if (user) {
            const decryptPassword = CryptoJS.AES.decrypt(user.password, User_Pass_Sec_Key).toString(CryptoJS.enc.Utf8);

            if (email == user.email && password == decryptPassword) {
                var user_accessToken = JWT.sign({ email: user.email, name: user.name }, User_Access_Secret, { expiresIn: '2d' })
                var user_refreshToken = JWT.sign({ email: user.email, name: user.name }, User_Refresh_Secret, { expiresIn: '10d' })

                res.status(200).json({ message: "Signed In Successfully", user_accessToken, user_refreshToken })
            } else {
                res.status(400).json({ error: "some error" })
            }
        } else {
            res.status(400).json({ message: "please Check your credentials" })
        }

    } catch (error) {
        res.status(500).json({ error })
    }
}




// refresh token 

const refreshToken = async (req, res) => {


    try {
        const { userRefreshToken } = req.body // destructring userRefresh TOken from req.body

        if (!userRefreshToken) { // cheking if refreshToken is not present 

            res.status(401).json({ error: "access Denied" })

        } else {

            let user = JWT.verify(userRefreshToken, User_Refresh_Secret) //verifying user refresh token

            // sending the new token 
            var user_accessToken = JWT.sign({ email: user.email, name: user.name }, User_Access_Secret, { expiresIn: '2d' })
            var user_refToken = JWT.sign({ email: user.email, name: user.name }, User_Refresh_Secret, { expiresIn: '30d' })

            res.status(200).json({ message: "Token Refreshed ", user_accessToken, user_refToken })

        }

    } catch (error) {
        res.status(500).json({ error, message: "Internal Server Error" })
    }
}



module.exports = {
    createUser,
    loginUser,
    refreshToken
}