import md5 from "md5";
import {run, get} from "../dbhelper.js"

export const allusers = async (req, res) => {
        const sql = 'SELECT * FROM users;'
    
        const rows = await all(sql)
    
        res.status(200).json(
            {
            rows
        }
        )
}

export const register = async(req, res) => {
    const { username, password } = req.body
    const token = md5(username+password)
    
        const sql = `
        INSERT INTO users(username, password, token)
        VALUES(?, ?, ?);`

        await run(sql, [username, password, token])
        
        res.status(200).json({
            user:username,
            password,
            token,
        })
}
export const loginUser = async (req, res) => {
    const { username, password } = req.body

    const sql = 'SELECT * FROM users WHERE username = ?'

    const user = await get(sql, [username])

    if (!user) {
        res.status(400).json({
            message: `user with username ${username} not found`,
        })
    } else if (user.password !== password) {
        res.status(401).json({
            message: `username or password wrong`,
        })
    } else {
        const { username, name, surname, token, role } = user

        res.status(200).json({
            username,
            password,
            role,
            token,
        })
    }
}