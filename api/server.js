const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const dotenv = require("dotenv")
dotenv.config()

const app = express(); 
const cors = require("cors")
const port = process.env.PORT || 5000;
const logger = require("morgan")

// Middlewares
app.use(express.json())
app.use(cors())
app.use(logger("dev"))

// Routes
const categoryRoute = require("./routes/categories.js")
const productRoute = require("./routes/products.js")
const billRoute = require("./routes/bills.js")
const authRoute = require("./routes/auth.js")
const userRoute = require("./routes/users.js")

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error)
    }
}

app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/bills", billRoute);
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)


app.listen(port, () => {
    connect()
    console.log(`Your app listening on port ${port}`);
})