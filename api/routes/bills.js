const Bill = require("../models/Bill.js")
const express = require("express")
const router = express.Router()

// with router we can apply CRUD


// get all bills
router.get("/get-all", async (req, res) => {
    try {
        const bills = await Bill.find();
        res.status(200).json(bills)
        
    } catch (error) {
        console.log(error)
    }
})


//add-bill
router.post("/add-bill", async (req, res) => {
    try {
        const newBill = new Bill(req.body);
        await newBill.save()
        res.status(200).json("bill addded successfully");
    } catch (error) {
        console.log(error)
    }
})


module.exports = router