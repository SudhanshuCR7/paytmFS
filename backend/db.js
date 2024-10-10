const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://sudhanshu17cr7:vZabFCusG02x4mII@cluster0.cn8zq.mongodb.net/paytm_db");

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

//Create a schema for Accounts
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balances: {
        type: Number,
        required: true
    }
})

//Create a model from the schema
const Account = mongoose.model('Account', accountSchema);

module.exports = {User,Account};