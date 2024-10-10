const express = require("express")
const zod = require('zod');
const router = express.Router();
const {User} = require('../db')
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config')
const {authMiddleware} = require('../middleware')

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

const schema3 = zod.object({
    firstName : zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().min(6).optional()
})

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
  }

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
        password : passwordReq,
        balance: getRandomNumber(10000)
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

router.put('/', authMiddleware, async function(req,res) {
   const inpValRes = schema3.safeParse(req.body);

   if(!inpValRes.success){
    res.status(411).json({
        msg: "req body inputs is invalid"
    })
   }
   await User.updateOne({_id: req.userId}, req.body);

   res.status(200).json({
    msg: "user info updated successfully"
   })
}) 

router.get('/bulk', async function(req,res) {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports = router;