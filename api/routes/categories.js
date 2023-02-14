const  Category = require("../models/Category.js");
const express = require("express");

const router = express.Router()

//! get all category
router.get("/get-all", async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (error) {
        console.log(error)
    }
})

//! Update category
router.put("/update-category", async (req, res) => {
    try {
        const categories = await Category.findOneAndUpdate( { _id: req.body.categoryId }, req.body);
        res.status(200).json("Item updated successfully")

    } catch (error) {
        console.log(error)
    }
})


//! Create category
router.post("/add-category", async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(200).json("Item added successfully");

    } catch (error) {
        res.status(400).json(error);
    }
})

//! Delete category
router.delete("/delete-category", async (req, res) => {
    try {
        const categories = await Category.findOneAndDelete({ _id: req.body.categoryId })
        res.status(200).json(categories)
    }
    catch(error) {
        console.log(error)
    }
})

module.exports = router;