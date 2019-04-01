require('dotenv').config();
const archiver = require('../client/archiver');

describe('Archiver Main', () => {
  describe('archive()', () => {
    test('Archiving tweets into Elasticsearch', async () => {
      const result = await archiver.archive();
      expect(result.status).toBe("ok");
    }, 600000);
  });
});
