var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var access_token = 'EAAS0aIMAt4kBAJPWZBn4ZC2N5wl8uYZCAzystVCi8MUDPxnKyUq7iSUMXKi9SqgtdqxvoW7dHmVmyDWDwg0qZCYhONha3D1kLbBI1D2QsAbDQUQxx0F3zjCl5ZByuZB5fNzEoSYwz6z9IGomT1XBHj9123hTEmxZBJZAh5FwsIbMXwZDZD';
var parameters = "id,name,feed{message,comments{comment_count,like_count}}";
var candidate = 'fernandoHaddad';

query_data_from_candidate(candidate, parameters, access_token);

/*
var accessToken;
FB.api('oauth/access_token', {
    client_id: 'app_id',
    client_secret: 'app_secret',
    grant_type: 'client_credentials'
}, function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }
    accessToken = res.access_token;
});
*/

function query_data_from_candidate(user, parameters, access_token) {
  var FB = require('fb');

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
