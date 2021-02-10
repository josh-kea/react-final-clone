require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const nodemailer = require("nodemailer");
const slugify = require('slugify');
const express = require("express");

const app = express();
const jwt = require("jsonwebtoken");
const { restart } = require("nodemon");

const mongoose = require("mongoose");
const User = require("./models/UserModel"); // Register user model
const Product = require("./models/ProductModel"); // Register product model

// Bcrypt for password hashing and dehashing
const bcrypt = require("bcrypt");
// Rate limiting
const rateLimiter = require("express-rate-limit");

// app.use("/users", rateLimiter({
//     windowMs: 15 * 60 * 1000, // 15 mins
//     max: 15 // limit each IP to 100 request per windowMs
// }))

// db mongoose connection to MongoDB

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// middlewares - implement cors
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Creating verification email function
const sendVerificationMail = (email, uniqueString) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: "587",
    secure: false,
    auth: {
      user: "joshkap2015@gmail.com",
      pass: process.env.SENDINBLUE_PASSWORD,
    },
  });

  const mailOptions = {
    from: "joshua@ptd-cph.com",
    // to: email,
    to: "joshkap2015@gmail.com", // for testing purposes
    subject: "[React Josh] Confirm Your Email Address",
    html: `Press <a href="http://localhost:3000/verify/${uniqueString}"> here </a> to verify your email address. Thanks!`,
  };

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Verification email send successfully.");
    }
  });
};

// GET /verify/:verifyString
app.get("/verifyEmail/:verifyString", async (req, res) => {
  const { verifyString } = req.params;

  const user = await User.findOne({ verifyString: verifyString });

  if (user == null) {
    console.log("user not found");
    return res.status(400).send("Cannot find user");
  } else if (user) {
    user.isValid = true;
    await user.save();
    res.status(200).json();
  }
});

// POST /users  -- Registering a user
app.post("/users", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const existingUser = await User.findOne({ email: email });

  if (!existingUser) {
    const user = await new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
    });

    await user.setPassword(password);

    await user.generateEmailVerificationString(email);

    await user.save();

    token = user.generateJWT();

    sendVerificationMail(email, user.verifyString);

    res.status(200).json({
      authToken: token,
      message: "User created successfully!",
    });
  } else {
    res.status(409).json({
      message: "User already exists!",
    });
  }
});

// POST /users/login -- Checks for existing user
app.post('/users/login', async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  console.log(user)

  if (user === null) {
      return res.status(400).json({
        message: 'User not found.',
      });
  }

  if (await user.validPassword(password)) {
    // if password matches
    token = user.generateJWT()

    await res.status(200)
    await res.header('auth-token', token)
    await res.json({
      "authToken": token,
      message: 'User logged in!',
      email: user.email,
      isAdmin: user.isAdmin
    });

  } else if (await !user.validPassword(password)) {
        res.status(400).json({
        message: 'Password or email is incorrect!'
    })
  }
})

// GET /users  -- Listing users
app.get("/users", async (req, res) => {

  User.find(
    {},
    await function (err, users) {
      if (err) {
        console.log(err);
      }
      res.status(200).json(users);
    }
  ).sort({ createdAt: -1 });
});

// GET /users/id  -- Showing single user
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  User.findOne(
    { _id: id },
    await function (err, user) {
      if (err) {
        console.log(err);
      }
      res.status(200).json(user);
    }
  );
});

// PUT /users/id  -- UPDATING EXISTING USER
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;

  User.findOneAndUpdate(
    { _id: id },
    { firstName, lastName, email },
    await function (err, user) {
      if (err) {
        console.log(err);
      }
      res.status(200).json(user);
    }
  );
});

// POST/ admin
app.post("/admin", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });

  if (user == null) {
    return res.status(400).send("Cannot find user!");
  } else if (user) {
    res.status(200).json(user);
  }
});

// GET ALL PRODUCTS -- Listing products

app.get("/products", async (req, res) => {

  Product.find(
    {},
    await function (err, products) {
      if (err) {
        console.log(err);
      }
      res.status(200).json(products);
    }
  ).sort({ createdAt: -1 });
});

// GET SINGLE PRODUCT BY ID -- Show product

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;

  Product.findOne(
    { _id: id },
    await function (err, product) {
      if (err) {
        console.log(err);
      }
      res.status(200).json(product);
    }
  );
});



// POST PRODUCT -- Creating a new product

app.post("/products/add", async (req, res) => {
  const { title, content, product_cost, selling_price, aliexpress_link, productImg } = await req.body
  const slug =  await slugify(title)// My Post my-post

  switch(true) {
    case !title:
        return res.status(400).json({
            error: 'Title is required'
        })
    case !content:
        return res.status(400).json({
            error: 'Content is required'
        })
    case !product_cost:
      return res.status(400).json({
          error: 'Product cost is required'
      })
    case !selling_price:
        return res.status(400).json({
            error: 'Selling price is required'
        })
    case !aliexpress_link:
      return res.status(400).json({
          error: 'Aliexpress link is required'
      })
  }

  if (await Product.findOne({ slug: slug })){
    return res.status(400).json({
      error: 'Product slug already exists, please try a different product name.'
    });
  } else {
    const profit_margin = selling_price - product_cost;
  
    await Product.create({ title, productImg , content, product_cost, selling_price, profit_margin, aliexpress_link, slug }, (err, product) => {
        if(err){
            console.log(err)
            return res.status(400).json({ error: 'Duplicate post. Try another title.'})
        }
  
        res.json(product);
    });
  }

});


app.listen(4000);
