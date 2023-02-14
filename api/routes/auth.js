const User = require("../models/User");
const router = require("express").Router()
const bcrypt = require("bcrypt")


// register-user
router.post("/register", async (req, res) => {
    try {
        const { username, email, password} = req.body
        const salt = await bcrypt.genSalt(10)
        hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        await newUser.save();
        
        res.status(200).json("New user successfully registered")
    } catch (error) {
        console.log(error)
    }
})


// login 
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email : req.body.email })
         if (!user) {
            return res.status(404).send({error: "User not found"});
         }

        const validPassword = await bcrypt.compare(req.body.password , user.password )

        if (validPassword) {
            res.status(200).json(user)
        }
        else {
            res.status(403).json("Invalid password")
        }


    } catch (error) {
        console.log(error)
    }
})

module.exports = router