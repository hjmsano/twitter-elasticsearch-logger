require('dotenv').config();
const client = require('../client/twitter-client');

describe('twitter client', () => {
  describe('search()', () => {
    test('Searching on Twitter from Since ID = 0, then expected Max ID is larger than 0.', async () => {
      const result = await client.search('justfortestingthiscode', 0, 0);
      expect(result.search_metadata.max_id).toBeGreaterThan(0);
    });
  });
});
