const JWT = require('jsonwebtoken')
const JWT_secrete = process.env.ADMIN_ACCESS_SECRET_KEY // secret key for admin 
const JWT_user_access_secret_key = process.env.USER_ACCESS_SECRET_KEY // secret key for user


const authAdmin = async (req, res, next) => {
    let token = await req.headers.authorization

    try {

        if (token) {
            token = token.split(" ")[1] // splitting token string to get the 2nd value which is token , first value is Bearer
            let user = JWT.verify(token, JWT_secrete)
            req.user = user.email // adding user to request object , value of user ie user email, extracted from token 

        } else {
            res.status(401).json({ message: "Access Denied , Unauthorized User" })
        }
        next()


    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "Access Denied , Unauthorized access", error })

    }



}


// middleware for authorizing user to place an order 

const authOrder = async (req, res, next) => {

    try {
        let userTOken = await req.headers.authorization  // getting user token

        if (!userTOken) {
            res.status(401).json({ error: "Access Denied token false , Unauthorized User" })

        } else {
            userTOken = userTOken.split(" ")[1]
            let user = JWT.verify(userTOken, JWT_user_access_secret_key)
            if (user) {
                req.userEmail = user.email // create userEmail it will be accessible from controllers that is order contrll
                next()
            } else {
                res.status(401).json({ error: 'invalid token please login' })
            }
        }

    } catch (error) {
        res.status(500).json({ error })
    }
}



module.exports = {
    authAdmin, authOrder
}