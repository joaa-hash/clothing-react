require('dotenv').config();
let express = require('express');
let app = express();
let massive = require('massive');
let ctrl = require('./controller');
const session = require('express-session');
const axios = require('axios');

// Stripe
// const stripe = require('stripe')('sk_test_51HDK6aBOhiVRiJQqMtQKP1wcktCYzea3Q1IZz193rpfUSRVkQcZHhejNtdsGVRqwmBpn0kdTQYC5cCHKTHh6SxTv00D4F1pFsL');

const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env;

app.use(express.static(`${__dirname}/../build`));
app.use(express.static('.'));
app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}));

 // const YOUR_DOMAIN = 'http://104.131.29.110:4003/#/'; // production domain
// const YOUR_DOMAIN = 'http://localhost:3000/#/'; // local domain

// Stripe Payment Below
app.post('/create-session', async (req, res) => {
    const {price, title, img} = req.body;
    const newPrice = +price * 100
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: title,
            images: [img],
          },
          unit_amount: newPrice,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}success/`,
    cancel_url: `${YOUR_DOMAIN}portfolio/`,
  });
  res.json({ id: session.id });
});

app.get('/session', (req, res) => {
  if (!req.session.user){
    req.session.user = {
        name: "",
        number: "",
        email: "",
        cart: [],
        total: 0
    }
    res.status(200).send(req.session);
    } else {
    res.status(200).send(req.session);
}
}
);
app.get('/latestProducts/', ctrl.getLatest )
app.get('/allProducts', ctrl.allProducts)
app.get('/relatedProducts', ctrl.relatedProducts)
app.get('/item/:id', async (req, res) => {
  const {id} = req.params;
  const db = req.app.get('db');
  const item = await db.getItem(id);
  res.status(200).send(item);
  
})
app.get('/cart/', (req, res) => {
  res.status(200).send(req.session.user)
})

app.post('/updatecart/', (req, res) => {
  const {title, items, price, img, size, color} = req.body;
  let twice = false;
  if (!req.session.user){
    console.log('new cart')
    req.session.user = {
      name: "",
      number: "",
      email: "",
      cart: [],
      total: 0
    }
    req.session.user.cart.push({title, items, price, img, size, color});
    req.session.user.cart.map((elm, index) => {
      let itemPrice = +elm.price * +elm.items;
      req.session.user.total = req.session.user.total + itemPrice;
    })
    res.status(200).send(req.session);
  } else {
    req.session.user.cart.map((e) => {
      if (title.toLowerCase() === e.title.toLowerCase()) {
        e.items = +e.items + +items;
        twice = true;
        req.session.user.cart.map((elm, index) => {
          let itemPrice = +elm.price * +elm.items;
          req.session.user.total = req.session.user.total + itemPrice;
        })
        res.status(200).send(req.session);
      }
    })
    if (twice === false){
      req.session.user.total = 0;
      req.session.user.cart.push({title, items, price, img, size, color});
      req.session.user.cart.map((elm, index) => {
        let itemPrice = +elm.price * +elm.items;
        req.session.user.total = req.session.user.total + itemPrice;
      })
      res.status(200).send(req.session);
      }
  }
})
app.post('/', (req, res) => {
  const {price, title, img} = req.body;
})

app.delete('/removeItem', function (req, res) {
  
  res.status(200).send(req.session);
})

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('Database Connected!')
})
.catch(err => console.log(err));

app.listen(SERVER_PORT, () => console.log(`Port running on: ${SERVER_PORT}`));