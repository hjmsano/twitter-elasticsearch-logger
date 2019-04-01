const twitter = require('./twitter-client');
const elasticsearch = require('./elasticsearch-client');

const sleep = (duration) => new Promise(resolve => setTimeout(resolve, duration));

module.exports = {
  archive: async () => {
    let from;
    let to = 0;
    let tweets;
    let maxId;
    let counter = 0;
    let resultCount = 100;
    maxId = await elasticsearch.search(
      {
        index: `${process.env.ELASTICSEARCH_INDEX}-*`,
        body: {
          aggs: {
            maxId: {max: {field: "id"}}
          }
        }
      }
    );
    from = maxId.hits.hits.length > 0 ? maxId.aggregations.maxId.value : 0;

    while (resultCount === 100) {
      tweets = await twitter.search(process.env.TWITTER_SEARCH_TERM, from, to);
      await elasticsearch.bulkPut(tweets.statuses);

      from = 0;
      to = Math.min.apply(null, tweets.statuses.map(function (tweet) {
        counter++;
        return tweet.id;
      }));
      resultCount = tweets.statuses.length;
      await sleep(2000);
    }
    return {
      status: "ok",
      count: counter
    };
  }
};
