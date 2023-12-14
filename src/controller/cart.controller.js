import { all, get, run } from '../dbhelper.js'

export const orderProduct = async (req, res) => {
    // console.log(price)
    console.log(req.body)
    const user = res.locals.user
    const userId = user.id
    const { productId, count } = req.body
    const priceSql = 'SELECT coast FROM products WHERE id = ?'
    const products = await get(priceSql, [productId])
    const price = products.coast

    const date = new Date().toDateString()
    const sql = `INSERT INTO orders (userId, productId, count,price,  data) VALUES (?, ?, ?, ?, ?);`

    await run(sql, [userId, productId, count, price, date])

    res.json({
        message: 'you bought product',
    })
}
export const userOrders = async (req, res) => {
    const userId = res.locals.user.id

    // name, description, price, count, date
    const sql = `SELECT 
    orders.id as id,
    products.productName AS name, products.prductTitle AS title,
    products.productImage AS image,
    orders.count as count, orders.data as data,
    orders.price as price
    FROM orders 
    INNER JOIN products ON orders.ProductId = products.id 
    WHERE orders.userId = ?
    `

    const orders = await all(sql, [userId])

    res.status(200).json({
        message: 'Your orders',
        orders: orders,
    })
}
export const allOrders = async (req, res) => {
    const sql = `
    SELECT orders.id as id, orders.productId as productId,
    orders.data as data, orders.count as count,
    products.productName as productName, products.coast as price,
    users.username 
    FROM orders
    INNER JOIN products ON products.id = orders.productId
    INNER JOIN users ON users.id = orders.userId;
    `

    const orders = await all(sql)

    res.json({
        message: 'All orders',
        orders,
    })
}
