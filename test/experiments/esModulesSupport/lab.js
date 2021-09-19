const Code = require('@hapi/code');
const { expect } = require('@hapi/code');
const { describe, it } = exports.lab = require('@hapi/lab').script();
const b = require('../../../src/experiments/esModulesSupport/b');

Code.settings.truncateMessages = true;
describe('b', () => {

    it('imported a', async () => {
        expect(b()).to.equal(1);
    });

});
