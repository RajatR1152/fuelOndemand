const express = require('express');
const app = express();
const port = 5002;
const bodyParser = require('body-parser');
const bc = require('bcrypt');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const users = require('./context/UserContext');

const Razorpay = require('razorpay');
const orders = require('./context/OrderContext');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const conn = mongoose.connect('mongodb+srv://rajatrandai7:8408900279rR@cluster0.capzj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connection successfull');
})


app.post('/signup', async (req, res) => {

    let u = await users.find({ email: req.body.email });

    if (u.length > 0) {
        res.json({
            message: "email already exist",
            code: 401
        })
    }
    else {
        const userData = {
            username: req.body.username,
            email: req.body.email,
            password: await bc.hash(req.body.password, 10),
            isAdmin: req.body.isAdmin,
        }
        try {
            const newUser = await new users(userData);

            newUser.save().then(() => {
                res.json({
                    message: "user created successfylly",
                    code: 200
                })
            })
        }
        catch (err) {
            res.json({
                message: 'something went wrong',
                code: 401
            })
        }
    }

})

app.post('/login', (req, res) => {
    users.findOne({ email: req.body.email }).then(async (d) => {
        if (d) {

            const pwd = await bc.compare(req.body.password, d.password);

            if (pwd) {
                res.json({
                    code: 200,
                    email: d.email,
                    iadm: false,
                    message: "login succesfull !"
                })
            }
            else {
                res.json({
                    code: 401,
                    message: "invalid credentials !"
                })
            }

        }
        else {
            res.json({
                code: 401,
                message: "invalid credentials !"
            })
        }
    })
})

app.post('/getUser', (req, res) => {
    users.findOne({ email: req.body.email }).then((d) => {
        res.send(d);
    })
})

const razorpay = new Razorpay({
    key_id: 'rzp_test_PwPHcfV19dGbu7',
    key_secret: 'Q0RI78C59W3nNmzFKxyrQKJu',
});

app.post('/order', async (req, res) => {
    try {
        const price = (req?.body.amount * 100).toFixed(0);

        if (!price) {
            return res.status(400).json({ error: 'Amount is required' });
        }

        const data = await razorpay.orders.create({
            amount: price,
            currency: "INR",
            receipt: "ORD_ID_" + Date.now(),
        });

        res.json({
            amount: data.amount / 100,
            orderId: data.id,
        });

    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ error: 'Failed to create order', details: error.message });
    }

})

const date = new Date();
const dd = String(date.getDate()).padStart(2, "0");
const mm = String(date.getMonth() + 1).padStart(2, "0");
const yy = date.getFullYear();

const currentDate = `${dd}/${mm}/${yy}`;

const hh = String(date.getHours()).padStart(2, "0");
const mn = String(date.getMinutes()).padStart(2, "0");
const ss = String(date.getSeconds()).padStart(2, "0");

const currentTime = `${hh}:${mn}:${ss}`;


app.post('/createorder', (req, res) => {
    req.body.data.date = currentDate;
    req.body.data.time = currentTime;

    const od = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 9),
        fullName: req.body.data.fullName,
        contactNumber: req.body.data.contactNumber,
        email: req.body.data.email,
        address: req.body.data.address,
        landmark: req.body.data.landmark,
        fuelType: req.body.data.fuelType,
        quantity: req.body.data.quantity,
        paymentMethod: req.body.data.paymentMethod,
        price: req.body.data.price,
        date: currentDate,
        time: currentTime,
        status: 'pending'
    }

    const newOrder = new orders(od);
    newOrder.save().then(() => {
        res.json({
            code: 200,
            message: 'order created successfully'
        })
    })
})

app.post('/getorders', (req, res) => {
    orders.find().then((d) => {
        res.send(d);
    })
})

app.post('/getuserorder', (req, res) => {
    orders.find({ email: req.body.email }).then((d) => {
        res.send(d);
    })
})

app.post('/cancel', async (req, res) => {
    const deletedOrder = await orders.deleteOne({ id: req.body.orderId });

    if (deletedOrder.deletedCount > 0) {
        res.json({
            code: 200,
            message: 'Order cancelled successfully'
        });
        console.log('deleted')
    } else {
        res.json({
            code: 404,
            message: 'Order not found'
        });
    }
})

app.post('/confirm', async (req, res) => {

    const order = await orders.findOne({ id: req.body.orderId });

    order.status = 'completed';
    order.save().then(()=>{console.log('order saved')})
    
})

app.listen(port, () => {
    console.log(`listening on ${port}`);
})