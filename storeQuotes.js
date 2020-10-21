const mongoose = require('mongoose');
const HTMLParser = require('node-html-parser');
const fetch = require('node-fetch');
const dotenv = require('dotenv').config({path: __dirname + '/.env'});

const Quote = require('./_models/quote');

const dbUser = process.env.DB_ADMIN_USERNAME;
const dbPassword = process.env.DB_ADMIN_PASSWORD;

mongoose.connect(
  'mongodb+srv://'+ dbUser+':'+dbPassword+'@oc-nodejs.eextt.mongodb.net/roiheenok?retryWrites=true&w=majority',
  {  useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true })
  .catch(() => console.log('Connexion à MongoDB échouée 🔴'));

//call the function :
storeQuotes(1000, 100);

  /**
   * Send nbReq requests to get quotes and then store em.
   * 
   * @param nbReq Number of requests
   * @param interval Time to wait between each
   */
  async function storeQuotes( nbReq, interval ){
    for(var i=0; i< nbReq; i++){
      // Get a quote :
      const htmlDoc = await fetch('http://www.roi-heenok.com/index.php/gif-anime-roi-heenok--573.html')
        .then(res=>res.text())
      const quote = HTMLParser.parse(htmlDoc).querySelector('#information').text;
      console.log(quote)

      // Store it in the database :
      try{
        await new Quote({ quote }).save();
      }catch(err){
        console.error('ERREUR');
      }

      // Wait the asked interval : 
      await wait(interval);
    }
  }

  /**
   * Makes setTimeout async
   * 
   * @param {*} ms 
   */
  async function wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }
  