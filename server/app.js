const mongoose = require('mongoose');
const dotenv = require('dotenv').config({path: __dirname + '/../.env'});
const helmet = require('helmet');
const morgan = require('morgan');
const app = require('express')();
const cors = require('cors');

const Quote = require('./_models/quote');

const dbUser = process.env.DB_ADMIN_USERNAME;
const dbPassword = process.env.DB_ADMIN_PASSWORD;

mongoose.connect(
  'mongodb+srv://'+ dbUser+':'+dbPassword+'@oc-nodejs.eextt.mongodb.net/roiheenok?retryWrites=true&w=majority',
  {  useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true })
  .catch(() => console.log('Connexion à MongoDB échouée 🔴'));

app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());

app.get('/random', async (req, res, next) =>{
    const count = await Quote.countDocuments();
    const random = Math.floor(Math.random() * count);
    const quote = await Quote.findOne().skip(random).select('-__v');

    res.status(200).json({quote: quote});
});

app.get('/search/:word', async (req, res, next) =>{
  const word = req.params.word.toString();
  const regex = new RegExp(word, 'i')
  const quotes = await Quote.find({ quote: {$regex: regex} }).select('-__v');

  res.status(200).json({ quotes });
})

app.listen(8080, ()=>{
  console.log('Listening on port 8080 ...');
});
