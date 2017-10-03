//Grab data from keys.js
var keys = require('./keys.js');
var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');
var client = new twitter(keys.twitterKeys);
var fs = require('fs');


var nodeArgv = process.argv;
var command = process.argv[2];

var x = "";

for (var i=3; i<nodeArgv.length; i++){
  if(i>3 && i<nodeArgv.length){
    x = x + "+" + nodeArgv[i];
  } else{
    x = x + nodeArgv[i];
  }
}


switch(command){
  case "my-tweets":
    showTweets();
  break;

  case "spotify-this-song":
    if(x){
      spotifySong(x);
    } else{
      spotifySong("Fluorescent Adolescent");
    }
  break;

  case "movie-this":
    if(x){
      omdbData(x)
    } else{
      omdbData("Mr. Nobody")
    }
  break;

  case "do-what-it-says":
    rando();
  break;

  default:
    console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
  break;
}

function showTweets(){
  
  var screenName = {screen_name: 'Minas59355481'};
  client.get('statuses/user_timeline', screenName, function(error, tweets, response){
    if(!error){
      for(var i = 0; i<tweets.length; i++){
        var date = tweets[i].created_at;
        console.log("@Minas59355481: " + tweets[i].text + " Created At: " + date.substring(0, 19));
        console.log("-----------------------");
        
        //adds text to log.txt file
        fs.appendFile('log.txt', "@Minas59355481: " + tweets[i].text + " Created At: " + date.substring(0, 19));
        fs.appendFile('log.txt', "-----------------------");
      }
    }else{
      console.log('Error occurred');
    }
  });
}

function spotifySong(song) {
  var songName = process.argv[3];
    var limit = 3;

    if(!songName){
      spotify.search({ type: 'track', query: 'Flashing Lights Kanye West', limit: limit}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
          console.log(`----------------------------------------`);
          console.log('"Flashing Lights" by Kanye West');
          console.log(`----------------------------------------`);
          console.log(`\n`);

            // console.log(data.tracks.items[2].album);
        for(var i = 0; i < limit; i++) {

          console.log(`Result ${i+1}`);
          console.log(`----------------------------------------`);
          console.log(`Artist(s) Name: ${data.tracks.items[i].artists[0].name}`); 
          console.log(`Album Name: ${data.tracks.items[i].album.name}`); 
          console.log(`Song Name: ${data.tracks.items[i].name}`);  
          console.log(`Spotify Preview Link: ${data.tracks.items[i].external_urls.spotify}`); 
          console.log(`Popularity: ${data.tracks.items[i].popularity}`); 
          console.log(`----------------------------------------`);
          console.log(`\n`);
        }
      });
    } else {
      spotify.search({ type: 'track', query: songName, limit: limit}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
            console.log(`----------------------------------------`);
          console.log(`Search Results for Song: ${songName}`);
          console.log(`----------------------------------------`);
          console.log(`\n`);

        for(var i = 0; i < limit; i++) {

          console.log(`Result ${i+1}`);
          console.log(`----------------------------------------`);
          console.log(`Artist(s) Name: ${data.tracks.items[i].artists[0].name}`); 
          console.log(`Album Name: ${data.tracks.items[i].album.name}`); 
          console.log(`Song Name: ${data.tracks.items[i].name}`);  
          console.log(`Spotify Preview Link: ${data.tracks.items[i].external_urls.spotify}`); 
          console.log(`Popularity: ${data.tracks.items[i].popularity}`); 
          console.log(`----------------------------------------`);
          console.log(`\n`);
        }
      });
    }
}

function omdbData(movie){
  var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';

  request(omdbURL, function (error, response, body){
    if(!error && response.statusCode == 200){
      var body = JSON.parse(body);

      console.log("Title: " + body.Title);
      console.log("Release Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);
      console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
      console.log("Rotten Tomatoes URL: " + body.tomatoURL);

      //adds text to log.txt
      fs.appendFile('log.txt', "Title: " + body.Title);
      fs.appendFile('log.txt', "Release Year: " + body.Year);
      fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
      fs.appendFile('log.txt', "Country: " + body.Country);
      fs.appendFile('log.txt', "Language: " + body.Language);
      fs.appendFile('log.txt', "Plot: " + body.Plot);
      fs.appendFile('log.txt', "Actors: " + body.Actors);
      fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
      fs.appendFile('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL);

    } else{
      console.log('Error occurred.')
    }
    if(movie === "Mr. Nobody"){
      console.log("-----------------------");
      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix!");

      //adds text to log.txt
      fs.appendFile('log.txt', "-----------------------");
      fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      fs.appendFile('log.txt', "It's on Netflix!");
    }
  });

}

function rando(){
  fs.readFile('random.txt', "utf8", function(error, data){
    var txt = data.split(',');

    spotifySong(txt[1]);
  });
}