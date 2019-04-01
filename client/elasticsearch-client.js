const ElasticsearchClient = require('elasticsearch');
const client = new ElasticsearchClient.Client({
  host: process.env.ELASTICSEARCH_HOST
});

module.exports = {
  search: (searchParam) => {
    return new Promise(function (resolve, reject) {
      client.ping({
        requestTimeout: 2000
      }, function (error) {
        if (error) {
          throw new Error(error);
        } else {
          client.search(searchParam).then(function (response) {
            resolve(response);
          }, function (error) {
            reject(error);
          });
        }
      });
    });
  },
  bulkPut: (tweets) => {
    return new Promise(function (resolve, reject) {
      let records = [];
      for (let i = 0; i < tweets.length; i++) {
        const created_at = new Date(tweets[i].created_at);
        records.push({
          index: {
            _index: `${process.env.ELASTICSEARCH_INDEX}-${created_at.getFullYear()}${('0'+(created_at.getMonth()+1)).slice(-2)}${('0'+(created_at.getDate())).slice(-2)}`,
            _type: 'tweet',
            _id: tweets[i].id_str
          }
        });
        tweets[i].created_at = created_at.toISOString();
        records.push(tweets[i]);
      }
      client.ping({
        requestTimeout: 2000
      }, function (error) {
        if (error) {
          throw new Error(error);
        } else if (records.length > 0) {
          client.bulk({body: records}).then(function (response) {
            resolve(response);
          }, function (error) {
            reject(error);
          });
        } else {
          resolve('no tweets');
        }
      });
    });
  }
};
