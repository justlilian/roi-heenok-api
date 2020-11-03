const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
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

    res.status(200).json({quote: {_id: quote.id, quote: censureQuote(quote.quote)}});
});

app.get('/search/:word', async (req, res, next) =>{
  const word = req.params.word.toString();
  const regex = new RegExp(word, 'i')
  const quotes = await Quote.find({ quote: {$regex: regex} }).select('-__v');

  res.status(200).json({ quotes: censureAllQuotes(quotes) });
})

app.listen(process.env.PORT || 8080, ()=>{
  console.log('Listening on port 8080 ...');
});

/**
 * Applique la censure des citations sur l'ensemble des résultats
 * 
 * @param {*} quotes
 */
function censureAllQuotes(quotes){
  const res = [];

  for(var i=0; i < quotes.length; i++){
    res.push({quote: {_id: quotes[i].id, quote: censureQuote(quotes[i].quote)}})
  }
  return res;
}

/**
 * Censure les citations choquantes du roi heenok
 * 
 * @param {*} quote 
 */
function censureQuote(quote){
  const choquants = ['cul', 'nazi', 'négrito', 'putain', 'merde','négros', 'négro', 'pute', 'nègres', 'nègre', 'arabes', 'baisez', 'baiser', 'chiennes'];
  var res = quote;
  choquants.forEach(mot=>{
    res = res.replace(new RegExp(mot,'g'), censure(mot));
  })
  return res;
}

/**
 * Censure les lettres d'un mot en laissant juste la première
 * 
 * @param {*} mot 
 */
function censure(mot){
  return mot[0]+mot.substring(1).replace(/./g, '*');
}
