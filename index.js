const express = require('express') //importing express
const dotenv = require("dotenv") // importing env
dotenv.config()
require('./src/db/db') // importing db connections

const app = express()
const port = process.env.PORT 

// importing routes

const adminRouter = require('./src/routes/admin')
const userRouter = require('./src/routes/user')
const productRouter = require('./src/routes/product')
const orderRouter = require('./src/routes/order')

// creating server 

app.use(express.json())
app.use(adminRouter)
app.use(userRouter)
app.use(productRouter)
app.use(orderRouter)


app.listen(port,()=>{
    console.log(`server running on ${port}`)
})