import React, {useState, useEffect} from 'react';

import {
  Link
} from 'react-router-dom'

import './Home.css';

const pretty = require('js-object-pretty-print').pretty;

const API_DOMAIN = 'http://localhost:8080';

const Home = () => {
  const [response, setResponse] = useState('');

  const getQuotes = async () => {
    const res = await fetch(API_DOMAIN+'/random').then(res => res.json()).catch();

    setResponse(res.quote);
  }

  //Component did mount :
  useEffect(() => { 
    getQuotes();
  }, []);

  return(
    <div class='home'> 
      <header class='header'>
            <Link to='/' >
              <img class='header__img no-select no-focus' width="300" alt="roi-heenok-api - free web archive for the bests things 'Roi Heenok' has ever said ..." src="/img/roi-heenok.png"/>
            </Link>
      </header>
      <h1 class='description__title'>Roi Heenok Api</h1>
      <section class='description'>
        This is a free JSON API and web archive for the bests
        things 'Roi Heenok' has ever said ... <a href='https://github.com/LilianBvr/roi-heenok-api'>Read more</a>
      </section>
      <section class='usage'>
        <h1 class='usage__title'>
          <svg class='usage__title__icon' width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 0 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 0 0-4.243-4.243L6.586 4.672z"/>
          </svg>
          Usage
        </h1>
        
        <div class='usage__block'>
          <div class='block__title'>Retrieve a random quote in JSON format.</div>
          <div class='block__request'>GET <a class='block__request__link' href={`${API_DOMAIN}/random`}>{API_DOMAIN}/random</a></div>
          <div class='block__example'>Example response:</div>
          <pre class='block__response'>
            {pretty(response)}
          </pre>
          <div class='block__new' onClick={getQuotes} href=''>Get me a new one ...</div>
        </div>

        <div class='usage__block'>
          <div class='block__title'>Retrieve a quote with free text search.</div>
          <div class='block__request'>GET <a class='block__request__link' href={`${API_DOMAIN}/search/:{query}`}>{API_DOMAIN}/search/:&#123;query&#125;</a></div>
        </div>

      </section>
      
    </div>
  );
}

export default Home;