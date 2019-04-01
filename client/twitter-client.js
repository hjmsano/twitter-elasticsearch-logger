const TwitterClient = require('twitter');
const client = new TwitterClient({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET
});

module.exports = {
  search: async (keyword, from, to) => {
    let searchParam = {
      q: keyword,
      count: 100,
      result_type: 'recent'
    };
    if(from > 0){
      searchParam['since_id'] = from;
    }else{
      searchParam['since_id'] = 0;
    }
    if(to > 0){
      searchParam['max_id'] = to - 1;
    }
    return await client.get('search/tweets', searchParam);
  }
};
