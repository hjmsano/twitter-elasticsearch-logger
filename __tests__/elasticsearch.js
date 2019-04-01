require('dotenv').config();
const client = require('../client/elasticsearch-client');


describe('elasticsearch client', () => {
  describe('bulkPut()', () => {
    test('Putting an array of dummy tweets to Elasticsearch through Bulk API', async () => {
      const dummyData = [{
        "created_at": "Mon Jan 1 00:00:00 +0000 2018",
        "id": 1234567890,
        "id_str": "1234567890",
        "text": "this is a test tweet",
        "user": {
          "id": 715817438,
          "id_str": "715817438",
          "name": "test-user"
        },
        "geo": null,
        "coordinates": null,
      }];
      const result = await client.bulkPut(dummyData);
      expect(result.errors).toBe(false);
    });
  });
  describe('search()', () => {
    test('Searching a dummy tweet on Elasticsearch', async () => {
      const searchParam = {
        body: {
          query: {
            match: {
              id: {
                query: 1234567890
              }
            }
          }
        }
      };
      const result = await client.search(searchParam);
      expect(result.hits.total).toBeGreaterThanOrEqual(0);
    });
  });
});
