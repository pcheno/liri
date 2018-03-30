//require("dotenv").config();


//var client = new Twitter(keys.twitter);

var request = require("request");

// Store all of the arguments in an array
var nodeArgs = process.argv;
var action = nodeArgs[2]
// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        movieName = movieName + "+" + nodeArgs[i];
    } else {
        movieName += nodeArgs[i];
    } //else
} //for 
if (movieName == "") {
    movieName = "Mr.+Nobody"
}
// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=5f016458" //trilogy";

//* Title of the movie.
//* Year the movie came out.
//* IMDB Rating of the movie.
//* Rotten Tomatoes Rating of the movie.
//* Country where the movie was produced.
//* Language of the movie.
//* Plot of the movie.
//* Actors in the movie.

request(queryUrl, function (error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {
        bodyData = JSON.parse(body);
        console.log("Title: " + bodyData.Title);
        console.log("Release Year: " + bodyData.Year);
        console.log("Title: " + bodyData.imdbRating);
        var rottenTomatoes = "";
        for (var i = 0; i < bodyData.Ratings.length; i++) {
            if (bodyData.Ratings[i].Source == "Rotten Tomatoes") {
                rottenTomatoes = bodyData.Ratings[i].Value;
            }
        }
        console.log("Rotten Tomatoes: " + rottenTomatoes);
        console.log("Country: " + bodyData.Country);
        console.log("Language: " + bodyData.Language);
        console.log("Plot: " + bodyData.Plot);
        console.log("Actors: " + bodyData.Actors);
    }  // if (!error && response.statusCode === 200)
});  //request(queryUrl, function (error, response, body)