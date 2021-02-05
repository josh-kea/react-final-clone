require('dotenv').config()
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const { restart } = require('nodemon')

const mongoose = require('mongoose');
const User = require('./models/UserModel'); // Register user model

// Bcrypt for password hashing and dehashing
const bcrypt = require('bcrypt')
// Rate limiting
const rateLimiter = require("express-rate-limit");

app.use("/users", rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 15 // limit each IP to 100 request per windowMs
}))

app.use(express.json())
// middlewares - implement cors
app.use(cors());

// db mongoose connection to MongoDB

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => console.log('DB Connected'))
.catch(err => console.log(err));


app.get('/users', (req, res) => {
  res.json(users)
})

// Creating user with bcrypt hashed password
// POST /USERS  -- Creating a user
// app.post('/users', async (req, res) => {
//     try {
//       const hashedPassword = await bcrypt.hash(req.body.password, 10)
//       const user = { name: req.body.name, password: hashedPassword }
//       users.push(user)
//       console.log(users)
//       res.status(201).send()
//     } catch {
//       res.status(500).send()
//     }
// })

// POST /users  -- Creating a user
app.post('/users', async (req, res) => {

    const { email, password} = req.body;

    const user = await new User({ email: email });

    user.setPassword(password) // hash & salt generator with crypto
    // console.log(user.email)

   //  console.log(user.hash + user.salt)

    user.save()
    
    res.json(user);

    // const user = User.create({ email }, (err, user) => {
    //   if (err) {
    //     console.log(err)
    //   }
    // })
})

// POST /users/login -- Checks for existing user
app.post('/users/login', async (req, res) => {

  const {email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user == null) {
      console.log('user not found')
      return res.status(400).send('Cannot find user')
      
      //return res.send('User not found!')
  }

  if (await user.validPassword(password)) {
    // if password matches

    console.log("password matches!")

    token = user.generateJWT()

    res.status(200).json({
      message: 'User logged in!',
      email: user.email,
      token: token
    })
    
  } else {
        res.status(400).json({
        error: 'Password incorrect!'
    })
  }


    // const user = users.find(user => user.name === req.body.name)
    // if (user == null) {
    //   return res.status(400).send('Cannot find user')
    //   //return res.send('User not found!')
    // }
    // try {
    //   if(await bcrypt.compare(req.body.password, user.password)) {

    //     // Generating accessToken & refreshToken if user is found.
    //     const accessToken = generateAccessToken(user)
    //     const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    //     refreshTokens.push(refreshToken)
    //     // res.json({ accessToken: accessToken, refreshToken: refreshToken })
        
    //     res.status(200).json({
    //       message: 'User logged in!',
    //       accessToken: accessToken,
    //       refreshToken: refreshToken,
    //       username: user.name
    //     })

    //   } else {
    //     res.status(400).json({
    //       error: 'Password incorrect!'
    //     })
    //   }
    // } catch {
    //   // Generic catch-all response
    //   res.status(500).send('Lol')
    // }
})

// Authentication below

let refreshTokens = []

app.post(('/token'), (req,res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        restart.json({ accessToken: accessToken })
    })

})

app.delete('/logout', (req,res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token )
    res.sendStatus(204)
})

// app.post('/login', (req,res) => {
//     // Authenticates User

//     const username = req.body.username
//     const user = { name: username}

//     const accessToken = generateAccessToken(user)
//     const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
//     refreshTokens.push(refreshToken)
//     res.json({ accessToken: accessToken, refreshToken: refreshToken })
// })



function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

app.listen(4000)