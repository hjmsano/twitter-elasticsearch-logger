# Twitter Elasticsearch Logger

[![CircleCI](https://circleci.com/gh/hjmsano/twitter-elasticsearch-logger/tree/master.svg?style=svg)](https://circleci.com/gh/hjmsano/twitter-elasticsearch-logger/tree/master)

## What is this?
- There are many solutions to storing tweets to databases but I could not find a good (easy, flexible and simple) tool for Elasticsearch.
- This script is a worker written in Node.js to the following process:
  1. Searching a word on Twitter Search API
  2. Putting tweets to Elasticsearch through Bulk API
  3. Running these steps every n seconds as specified in `main.js`.
- You can run `main.js` directly, also you can build a Docker container and run the script like a sidecar container beside Elasticsearch container.

## Pre requirements
- You must have an Elasticsearch (container or cluster) before start running main.js
- You need credentials to use Twitter API. You can request it via [Twitter Developer Platform](https://developer.twitter.com). (it may takes few days)

## Configuration

### Add a mapping template to Elasticsearch
- Enable the analyzer (Natural Language Analysis) for `text` field.
- Apply `geo_point` type to `geo` and `coordinate` field.

```
curl -d @mapping_template.json -H "Content-Type: application/json" http://elasticsearch:9200/_template/twitter
```


### Environment Variables
You need to specify some variables through Environment Variables or `.env` file.
If you use `.env`, you can use `.env.template` as a template.

|Name|Example|
|:----|:----|
|TWITTER_CONSUMER_KEY|abc123|
|TWITTER_CONSUMER_SECRET|xyz987|
|TWITTER_TOKEN_KEY|1234567890|
|TWITTER_TOKEN_SECRET|abcdefghijklmn|
|TWITTER_SEARCH_TERM|keyword_you_want_to_search include:retweets|
|ELASTICSEARCH_HOST|elasticsearch:9200|
|ELASTICSEARCH_TIMEOUT|5000|
|ELASTICSEARCH_INDEX|twitter|

If you set Environment Variables when you launch the Docker container, you can use the following lines.
```bash
-e "TWITTER_CONSUMER_KEY=abc123" \
-e "TWITTER_CONSUMER_SECRET=xyz987" \
-e "TWITTER_TOKEN_KEY=1234567890" \
-e "TWITTER_TOKEN_SECRET=abcdefghijklmn" \
-e "TWITTER_SEARCH_TERM=keyword_you_want_to_search include:retweets" \
-e "ELASTICSEARCH_HOST=elasticsearch:9200" \
-e "ELASTICSEARCH_TIMEOUT=5000" \
-e "ELASTICSEARCH_INDEX=twitter" \
```

## Start using the script

### Local
```bash
npm install
nohup node main.js &
```

### Docker based
- Before you start the container, you need to have an Elasticsearch container first.

```bash
docker build -t twitter-logger .
docker run -d --link elasticsearch \
-e "TWITTER_CONSUMER_KEY=abc123" \
-e "TWITTER_CONSUMER_SECRET=xyz987" \
-e "TWITTER_TOKEN_KEY=1234567890" \
-e "TWITTER_TOKEN_SECRET=abcdefghijklmn" \
-e "TWITTER_SEARCH_TERM=keyword_you_want_to_search include:retweets" \
-e "ELASTICSEARCH_HOST=elasticsearch:9200" \
-e "ELASTICSEARCH_TIMEOUT=5000" \
-e "ELASTICSEARCH_INDEX=twitter" \
--name twitter-logger \
twitter-logger
```

## For testing the code
- You can leverage CircleCI to run the test.
- This project uses [JEST](https://jestjs.io) for ESLint, Unit Test and Code coverage.
