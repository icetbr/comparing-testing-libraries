// // const eq = Assert.eq;
// // const t = (title, expected, actual) => test('', ({ eq }) => eq(expected, actual, title));

// test('game2', () => eq(1, 2))
// eq('game2', 1, 2)

// // deal cards, draw, play, discard

// // Assert.test = Assert.only;
// // Assert.only = test;

// function timeout(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// // await only(`dummy`, async ({ eq }) => { await timeout(1000); eq(1,1) });
// // await only(`dummy2`, async ({ eq }) => { await timeout(1000); eq(1,1) });
// // await only(`dummy3`, async ({ eq }) => { await timeout(1000); eq(1,1) });
// // await only(`dummy4`, async ({ eq }) => { await timeout(1000); eq(1,1) });
// // await only(`dummy5`, async ({ eq }) => { await timeout(1000); eq(1,1) });

// // test(`dummy6`, async ({ eq }) => await timeout(1000) && eq(1,1));
// // only(`dummy`, ({ eq }) => eq(4, 5))

// // test(`dummy`, ({ eq }) => eq(4, 5))

// // test(`dummy 2`, ({ eq }) => eq(4, 4))

const a = {
    turn: { count: 1, player: 'within(1, 4)', phase: 'draw' },
    drawPile: 'length(42)',
    discardPile: [],
    teams: [
        {
            players: [
                { name: 'Player 1', cards: length(11) },
                { name: 'Player 2', cards: length(11) },
            ],
            reservePile: 'length(11)',
            board: [],
        },
        {
            players: [
                { name: 'Player 3', cards: length(11) },
                { name: 'Player 4', cards: length(11) },
            ],
            reservePile: length(11),
            board: [],
        }
    ],
}