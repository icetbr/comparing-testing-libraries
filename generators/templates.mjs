// import dedent from '@michaelray/dedent';
import dedent from 'dedent-js';

export default {
    baseTemplate: ({ imports = '', assertParam = '', assertion = 'eq(actual, expected);', runner = '', endTest = '' }) => dedent`
        const employee = require('../src/employee');
        ${imports}

        test('insert saves the data to the database', async (${assertParam}) => {
            const data = { name: 'John', email: 'john@test.com', description: 'average height' };
            await employee.insert(data);

            const actual = await employee.find();

            const expected = process.env.mode === 'equalError' ? [{ ...data, name: 'John1' }] : [data];
            ${assertion}
            await employee.removeAll();\
            ${endTest}
        });

        ${runner}
    `,

    mediumDiffErrorTemplate: ({ imports = '', assertParam = '', assertion = 'eq(actual, expected);', runner = '', endTest = '' }) => dedent`
        ${imports}

        const game = () => ({
            turn: { count: 1, player: 'within(1, 4)', phase: 'draw' },
            drawPile: 'length(42)',
            discardPile: [],
            teams: [
                {
                    players: [
                        { name: 'Player 1', cards: 'length(11)', lastDraw: null },
                        { name: 'Player 2', cards: 'length(11)', lastDraw: null },
                    ],
                    reservePile: 'length(11)',
                    board: [],
                },
                {
                    players: [
                        { name: 'Player 3', cards: 'length(11)', lastDraw: null },
                        { name: 'Player 4', cards: 'length(11)', lastDraw: null },
                    ],
                    reservePile: 'length(11)',
                    board: [],
                }
            ],
        });

        test('large object diff', (${assertParam}) => {
            const actual = game();
            const expected = game();
            delete actual.teams[1].players[0].lastDraw;
            delete actual.teams[1].players[1].lastDraw;
            ${assertion}\
            ${endTest}
        });

        ${runner}
    `,

    largeDiffErrorTemplate: ({ imports = '', assertParam = '', assertion = 'eq(actual, expected);', runner = '', endTest = '' }) => dedent`
        const { times } = require('lodash');
        ${imports}

        const deck =
            ['hearts', 'spades', 'clubs', 'diamonds']
                .flatMap(suit =>
                times(13, i =>
                    ({ rank: i + 1, suit })))
                .concat({ rank: 1, suit: 'joker' }, { rank: 2, suit: 'joker' });

        test('large object diff', (${assertParam}) => {
            const actual = deck;
            const expected = [];
            ${assertion}\
            ${endTest}
        });

        ${runner}
    `,
};