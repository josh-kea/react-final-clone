require('dotenv').config()

const express = require('express')
// app
const app = express()

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');


// middlewares

app.use(express.json())

// db mongoose connection to MongoDB

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log('DB Connected'))
.catch(err => console.log(err));

const posts = [
    {
        username: 'Josh',
        title: 'post 1'
    },
    {
        username: 'John',
        title: 'post 1'
    }
]

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name ))
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(3000)