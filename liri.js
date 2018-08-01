//Dependancies
require("dotenv").config();

//import the node spotify api npm package

var Spotify = require("node-spotify-api");

//import api key
//in the directory that I'm in export the data from keys into the keys variable
var keys = require("./keys");

//import the request npm package
var request = require("request");

//import the fs package for read/overwrite

var fs = require("fs");

//initialize the Spotify API client while using our client ID and secret

var spotify = new Spotify(keys.spotify);

//Functions
//write to the log.txt file
var getArtistNames = function(artists) {
  return artist.name;
};

//function for running spotify search
var getMeSpotify = function(songName) {
  if (songName === undefined) {
    songName = "Because Of You";
  }
  spotify.search(
      {
        type: "track",
        query: songName
      },
      function(err, data){
        if(err){
          console.log("An error has occured: " + err);
          return;
        }
        var songs = data.tracks.items;

        for (var i=0; i<songs.length; i++){
          console.log(i);
          console.log("artist(s): " + songs[i].artists.map(getArtistNames));
          console.log("song name: " + songs[i].name);
          console.log("preview song: " + songs[i].preview_url);
          console.log("album: " + songs[i].album.name);
          console.log("-----------------------------------");
        }
      }
  );
};

// Function for running a Twitter Search
// var getMyTweets = function() {
//   var client = new Twitter(keys.twitter);
//
//   var params = {
//     screen_name: "cnn"
//   };
//   client.get("statuses/user_timeline", params, function(error, tweets, response) {
//     if (!error) {
//       for (var i = 0; i < tweets.length; i++) {
//         console.log(tweets[i].created_at);
//         console.log("");
//         console.log(tweets[i].text);
//       }
//     }
//   });
// };

//Don't forget to nmp install Twitter and require it inside of keys.js


//Create a function for running a movie search

var getMovie = function(movieName){
  if (movieName === undefined){
    movieName = "Man On Fire";
  }
  var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

//this is the pattern for making requests
  request(urlHit, function(err, response, body){
    if(!err && response.statusCode === 200){
      var jsonData = JSON.parse(body);
      console.log("Title: " + jsonData.Title);
      console.log("Year: " + jsonData.Year);
      console.log("Rated: " + jsonData.Rated);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      console.log("Country: " + jsonData.Country);
      console.log("Language: " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);
      console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
    }
  });
};

//function for running commands to be read on random.txt

var doWhatItSays = function(){
  fs.readFile("random.txt", "utf8", function(err, data){
    console.log(data);
    var dataArr = data.split(",");

    if(dataArr.lenth === 2){
      pick(dataArr[0], dataArr[1]);
    }
    else if (dataArr.length === 1){
      pick(dataArr[0]);
    }
  });
};

// Function for determining which command is executed
var pick = function(caseData, functionData) {
  switch (caseData) {
  case "my-tweets":
    getMyTweets();
    break;
  case "spotify-this-song":
    getMeSpotify(functionData);
    break;
  case "movie-this":
    getMeMovie(functionData);
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    console.log("LIRI doesn't know that");
  }
};

var runThis = function(argOne, argTwo){
  pick(argOne, argTwo);
};


//Main process

runThis(process.argv[2], process.argv[3]);

// var Twitter = require(twitter);
// put the getmytweets function after the getMySpotify function
