const Product = require("../models/Product.js")
const express = require("express")
const { route } = require("./categories.js")
const router = express.Router()

// Now that I have router we can apply CRUD on it

// get all products
router.get("/get-all", async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    }
    catch(error) {
        console.log(error)
    }
})

// post a product
router.post('/add-product', async (req, res) => {
    try {
        const newProduct = new Product(req.body)
        await newProduct.save()
        res.status(200).json("Product added successfully")
    } catch (error) {
        console.log(error)
    }
})

// update a product

router.put('/update-product', async (req, res) => {
    try {
        const products = await Product.findOneAndUpdate({ _id : req.body.productId }, req.body);
         res.status(200).json("Product updated successfully");
    } catch (error) {
        console.log(error)
    }
})

// delete a product

router.delete("/delete-product", async (req, res) => {
    try {
        const deleted = await Product.findOneAndDelete({ _id: req.body.productId })
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error)
    }
})


module.exports = router