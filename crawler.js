var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var parameters = "id,name,feed{message,comments{comment_count,like_count}}";
var candidate = 'fernandoHaddad';
  var FB = require('fb');

var urlDB = 'mongodb://localhost:32768/test';
MongoClient.connect(urlDB, function (err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  var candidate_collection = db.collection('candidates');

  var candidate1 = { name: "Fernando Haddad", facebook_name: "fernandoHaddad" };
  var candidate2 = { name: "Celso Russomanno", facebook_name: "100003613814366" };

  candidate_collection.insert([candidate1, candidate2], function (err, result) {
    if(err){
      console.log(err);
    } else {
      console.log('Inserted %d candidates into the "candidates" collection. The candidates inserted with "_id" are:', result.length, result);
    }
  })

  db.close();
});

var accessToken;
FB.api('oauth/access_token', {
    client_id: '1815746298657244',
    client_secret: '310c0cd744b3a5d4ab533362a272c265',
    grant_type: 'client_credentials'
}, function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }
    console.log(res.access_token);
    accessToken = res.access_token;
});

query_data_from_candidate(candidate, parameters, access_token);

function query_data_from_candidate(user, parameters, access_token) {

  FB.setAccessToken(access_token);

  FB.api(
    '/' + user,
    'GET',
    { "fields": parameters },
    function (response) {
      var feedItems;

      if (response && response.error) {
        console.log('Erro na chamada do facebook !');
        console.log(response.error);
        return;
      }

      feedItems = response.feed.data;

      feedItems.forEach(function (feedItem) {
        console.log("Mensagem do feed: " + feedItem.message);

        var total_comments = 0;
        var total_likes = 0;

        var comments = feedItem.comments.data;

        comments.forEach(function (element) {
          total_comments += element.comment_count;
          total_likes += element.like_count;
        });

        console.log("Total de comentários: " + total_comments);
        console.log("Total de likes: " + total_likes);
        console.log('-------------------------------------------');
      });
    }
  );
}
