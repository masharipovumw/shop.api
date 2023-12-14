import { all, run } from '../dbhelper.js'

export const allProducts = async (req, res) => {
    const sql = 'SELECT * FROM products;'

    const products = await all(sql)

    res.status(200).json(products)
}
export const Addproduct = async (req, res) => {
    const { productName, prductTitle, coast } = req.body
    const productImage = req.file.filename

    const sql = `INSERT INTO products(productName, productImage, prductTitle, coast) 
    VALUES (?, ?, ?, ?);`

    await run(sql, [productName, productImage, prductTitle, coast])

    res.status(201).json({
        message: 'product was added',
    })
}
export const deleteProduct = async (req, res) => {
    const id = +req.params.id
    const sql = `DELETE FROM products WHERE id=?;`

    const product = await run(sql, [id])

    res.status(201).json({
        message: 'product delited',
        product,
    })
}
export const changeProduct = async (req, res) => {
    const { productName, prductTitle, coast } = req.body
    const id = +req.params.id
    const productImage = req.file.filename
    const sql = `UPDATE products SET
    productName=?,
    prductTitle=?,
    coast=?,
    productImage=?
    WHERE id = ?;
    `
    const product = await run(sql, [
        productName,
        prductTitle,
        coast,
        productImage,
        id
    ])

    res.status(201).json({
        message: 'product updated',
        product,
    })
}
