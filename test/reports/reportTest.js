const { test } = require('zora');
const { times } = require('lodash');

const deck =
  ['hearts', 'spades', 'clubs', 'diamonds']
    .flatMap(suit =>
      times(13, i =>
        ({ rank: i + 1, suit })))
    .concat({ rank: 1, suit: 'joker' }, { rank: 2, suit: 'joker' });

test('large object diff', ({ eq }) => {
  eq(deck, []);
});