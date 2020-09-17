const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const orders = []

const port = 3000

//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

// GET
app.get('/get_orders', (req, res) => {
    res.status(200).send(orders)
})

// CREATE
app.post('/new_order', (req, res) => {
    const order = req.body

    if (order.food_name && order.customer_name && order.food_qty) {
        orders.push({
            ...order,
            id: `${order.length + 1}`,
            date: Date.now().toString()
        })
        res.status(200).json({
            message: 'Order Created Successfully'
        })
    } else {
        res.status(401).json({
            message: 'Order Creation Failed'
        })
    }
})

// UPDATE
app.patch('/orders/:id', (req, res) => {
    const order_id = req.params.id
    const order_update = req.body

    for (let order of orders) {
        if (order.id == order_id) {
            if (order_update.food_name != null || undefined) {
                order.food_name = order_update.food_name
            }
            if (order_update.food_qty != null || undefined) {
                order.food_qty = order_update.food_qty
            }
            if (order_update.customer_name != null || undefined) {
                order.customer_name = order_update.customer_name
            }
            return res
            .status(200)
            .json({ message: 'Update Successfully', data: order })
        }
    }
    res.status(404).json({message: 'Invalid Order ID'})
})

// DELETE
app.delete('/order/:id', (req, res) => {
    const order_id = req.params.id

    for (let order of orders) {
        if (order.id == order_id) {
            orders.splice(orders.indexOf(order), 1)

            return res.status(200).json({
                message: 'Deleted Successfully'
            })
        }
    }
    res.status(404).json({
        message: 'Invalid Order ID'
    })
})


app.listen(port, () => {
    console.log('Server listening on http://localhost:' + port)
})

