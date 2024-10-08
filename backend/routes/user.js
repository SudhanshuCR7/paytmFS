const express = require("express")
const zod = require('zod');
const router = express.Router();
const {User} = require('../db')
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config')
const bcrypt = require("bcrypt")

const schema = zod.object({
    username : zod.string().email().min(3),
    firstName : zod.string().max(50),
    lastName : zod.string().max(50),
    password : zod.string().min(6)
})

const schema2 = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)
})

router.post('/signup', async function(req,res) {
    
    const inpValRes = schema.safeParse(req.body);

    if(!inpValRes.success)
    {
      res.status(411).json({
        msg : "input is invalid"
      })
    }

    const usernameReq = req.body.username;
    const firstNameReq = req.body.firstName;
    const lastNameReq = req.body.lastName;
    const passwordReq = req.body.password;

    const existingUser = await User.findOne( {username:usernameReq });

    if(existingUser)
    {
        return res.status(400).send("username already exists")
    }

    const user = new User({
        username: usernameReq,
        firstName: firstNameReq,
        lastName : lastNameReq,
        password : passwordReq
    });

    user.save();

    var token = jwt.sign({username : usernameReq},JWT_SECRET);

    return res.json({
        msg: "user created successfully",
        token: token
    })
})

router.post('/signin',async function(req,res) {
    
    const inpValRes = schema2.safeParse(req.body);

    if(!inpValRes.success)
    {
          res.status(411).json({
            msg : "input is invalid"
          })
    }

    const usernameReq = req.body.username;
    const passwordReq = req.body.password;

    const existingUser = await User.findOne( {username:usernameReq });


    if(!existingUser)
    {
        res.send(411).json({
            msg: "user does not exists"
        })
    }
 
    if(existingUser.password != passwordReq)
    {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    var token = jwt.sign({username : usernameReq},JWT_SECRET);
    
    res.status(200).json({ 
        message: 'Login successful',
        token: token 
    });

})

// router.put('/', ) {
    
// })


module.exports = router;