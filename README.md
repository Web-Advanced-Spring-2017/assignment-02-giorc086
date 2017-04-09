# Assignment 2 - RESTful API 
3/5/2017

##CURRENT BUGS:
1. After doing `npm install`
2. When you run `sudo mongod` and `nodemon app.js` and go to localhost:8080 the searchbar has become inactive. The error in the console says that there is something wrong with GET request from my API to access data from db.
3. If you click on the Pin on the map of aspen you are re-directed to the page http://localhost:8080/aspen.html but the map does not load. The error in the console says that placeName is not defined. 

#### To run the website at localhost:8080 install the node dependencies 
1. In terminal start the mongo database by cd'ing into the folder and type: sudo mongod
2. Open a new tab in terminal and type: node app
At this point you can visit localhost 8080

To update the data in the database, in a new tab type: node update-temp and node add-resorts 

### Process
The first step to build this app was to use the API On The Snow to gather the list of resorts in Colorado, the statistics and the weather reports for each one. The list of the resorts and their details is requested by running add-resorts once and update-profile whenever data needs to be updated. Then it gets saved in the MongoDB database with Mongoose and a model/schema of the db is created. In order to display the data from the database I created an API that gets the name of all the resorts and the info about each one.

| Verb| URL endpoint     | Resource Description            |
| ----|:----------------:| -------------------------------:|
| GET | api/resort       | Get list of resort, ids and info|
| GET | api/resort/id    | Get one resort                  |
| GET | api/compare      | Compare two resorts             |

The information from the database is used to show the list of resorts in the dropdown and to show stats about a clicked resort. 

To also display locations on the Google Map, the Google Maps API was used.

### API's used:
http://docs.clientservice.onthesnow.com/docs/index.html
https://developers.google.com/maps/documentation/javascript/tutorial
