require('dotenv').config()
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')

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

// Creating verification email function
const sendVerificationMail = (email, uniqueString) => {
  // const transporter = nodemailer.createTransport({
  //   host: 'smtp.zoho.eu',
  //   port: '465',
  //   secure: true, // true for 465, false for other ports
  //   auth: {
  //     user: "joshua@ptd-cph.com", 
  //     pass: process.env.ZOHO_PASSWORD, // zoho protected password
  //   },
  // });

  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'joshwebdev29@gmail.com',
  //     pass: "Devboy#1"
  //   }
  // });

  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: '587',
    secure: false, // true for 465, false for other ports
    auth: {
      user: "joshkap2015@gmail.com", 
      pass: process.env.SENDINBLUE_PASSWORD, // zoho protected password
    },
  });

  const mailOptions = {
    from: "joshua@ptd-cph.com",
    // to: email,
    to: "joshkap2015@gmail.com", // for testing purposes
    subject: "[React Josh] Confirm Your Email Address",
    html: `Press <a href="http://localhost:3000/verify/${uniqueString}"> here </a> to verify your email address. Thanks!`
  }

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Verification email send successfully.")
    }
  })
}

// GET /verify/:verifyString
app.get('/verifyEmail/:verifyString', async (req, res) =>{
  const { verifyString } = req.params

  const user = await User.findOne({ verifyString: verifyString });

  if (user == null) {
    console.log('user not found')
    return res.status(400).send('Cannot find user')

  } else if (user) {
    user.isValid = true
    await user.save()
    res.status(200).json()
  }
})

// POST /users  -- Creating a user
app.post('/users', async (req, res) => {

    const { email, password} = req.body;

      const user = await new User({ email: email });

      await user.setPassword(password) // hash & salt generator with crypto
      // console.log(user.email)

    //  console.log(user.hash + user.salt)

      await user.generateEmailVerificationString(email)

      await user.save()

      sendVerificationMail(email, user.verifyString)
      
      res.json(user);

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

// GET/ admin
app.get('/admin', async (req, res) =>{
  const { email } = req.email

  const user = await User.findOne({ email: email });

  if (user == null) {
    console.log('user not found')
    return res.status(400).send('Cannot find user')

  } else if (user) {
    res.json(user);
    res.status(200).json()
  }
})

app.listen(4000)