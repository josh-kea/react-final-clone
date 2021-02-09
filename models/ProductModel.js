var mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

var ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        min: 3,
        max: 160,
        required: true
    },
    productImg: String,
    slug: {
        type: String,
        unique: true,
        index: true,
        lowercase: true
    },
    content: {
        type: {},
        required: true,
        min: 20,
        max: 2000000
    },
    product_cost: Number,
    selling_price: Number,
    profit_margin: Number,
    aliexpress_link: String
}, {timestamps: true});

module.exports = mongoose.model('Product', ProductSchema);