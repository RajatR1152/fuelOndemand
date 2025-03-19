const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    fullName: String,
    contactNumber: String,
    email: String,
    address: String,
    landmark: String,
    fuelType: String,
    quantity: String,
    paymentMethod: String,
    price: String,
    time: String,
    status: String,
    date: String,
    id: String

})

const orders = new mongoose.model('orders', orderSchema);

module.exports = orders;