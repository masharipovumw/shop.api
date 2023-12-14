import { Router } from "express";
import multer from "multer";
import { Addproduct, allProducts, changeProduct, deleteProduct } from "../controller/User.action.controller.js";
import { authCheck } from "../middlewares/auth-check.js";



const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname + '.jpg')
    },
})
const upload = multer({ storage })

const user = Router()

user.get('/products/',authCheck(false),allProducts)
user.delete('/products/:id',authCheck(true),deleteProduct)
user.post('/products/', authCheck(true), upload.single('productImage'), Addproduct)
user.put('/products/:id', authCheck(true), upload.single('productImage'), changeProduct)



export default user