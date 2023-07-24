import React, { useEffect } from 'react';

import Reveal from 'reveal.js';

import revealOptions from './revealOptions';

import 'reveal.js/css/reveal.css';

const Deck = ({ options, children }) => {
  useEffect(() => {
    Reveal.initialize({ ...revealOptions, ...options });
  });
  return (
    <div className="reveal">
      <div className="slides">{children}</div>
    </div>
  );
};

export default Deck;
