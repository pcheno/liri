//require("dotenv").config();


//var client = new Twitter(keys.twitter);

var request = require("request");
// Store all of the arguments in an array
var nodeArgs = process.argv;
var action = nodeArgs[2].toLowerCase();

function movieThis(action,nodeArgs) {
    // Create an empty variable for holding the movie name
    var movieName = "";
    // Add "+" for spaces in movie name
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
    // Then run a request to the OMDB API with the movie specified, using my apiKey
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=5f016458"
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

        var bodyData = JSON.parse(body);
        if (bodyData.Response == "True") {
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
        } else {
            console.log('Sorry, movie titled "' + movieName.split(/[+]+/).join(' ') + '" does not exist in the OMDB database.')
        }
    }); //request(queryUrl, function (error, response, body)
} //function movieThis

function twitterThis() {
    console.log("twitterThis");
} //function twitterThis


if (action == "do-what-it-says") {
    //open random.txt file
    //read in action
    //read in possible movie name
    //if movie-this, then create nodeArgs, keep in mind the structure [0=1,1=2,2=action, 3....movie words]
    //remember to toLowerCase(); the action

    // Includes the FS package for reading and writing packages
    var fs = require("fs");
    // Running the readFile module that's inside of fs.
    // Stores the read information into the variable "data"
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        } else {
            // Break the string down by comma separation and store the contents into the output array.
            var output = data.split(",");
            //initialize nodeArgs
            var nodeArgs = [];
            for (var i = 0; i < 3; i++) {
                nodeArgs[i] = "";
            }
            var tempName = "";
            // Loop Through the newly created output array
            for (var i = 0; i < output.length; i++) {
                if (i == 0) {
                    action = output[i].toLowerCase();
                } else {
                    //take into consideration there maybe a "," in the movie title
                    if (i == 1) {
                        tempName = output[i];
                    } else {
                        tempName += "," + output[i];
                    }
                }
                // Print each element (item) of the array/
            } // for (var i = 0; i < output.length; i++)

            // now put movie name in nodeArgs as if user entered
            var nameArray = tempName.split(" ");
            for (var i = 0; i < nameArray.length; i++) {
                nodeArgs.push(nameArray[i]);
            }
            if (action == "movie-this") {
                movieThis(action,nodeArgs);
            } else if (action == "my-tweets") {
                twitterThis();
            }
        } //else from err/readFile
    }); // fs.readFile
} // if (action == "do-what-it-says") 


if (action == "movie-this") {
    movieThis(action,nodeArgs);
} else if (action == "my-tweets") {
    twitterThis();
}