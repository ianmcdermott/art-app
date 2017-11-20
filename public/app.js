const MOCK_USER_AUTH_UPDATES = {
    "username": "username",
    "password":  "password"
    "name": {
    	"first-name": 'First', 
    	"last-name": 'Last'}
}


const MOCK_USER_UPDATES = {
	"name": {
		"firstName": 'First',
		 "lastName": 'Last'},
 	"id": "111111",
	"artwork": [{
		"image": Image,
		"animation": "0001",
		"title": "Hello World",
		"date": "2015-03-25"
	  }]
}

const MOCK_ANIMATION_UPDATES = {
	"id":   "888888",
	"title":  "Foo Fa",
	"creation-date":  "2015-03-25",
	// "audio":  "file",
}


const MOCK_SEQUENCE_UPDATES = {
	"id":   "111111",
	"guide": [image]},
	"user-drawn": [image]
}

// POSTs user registration data to User Auth endpoint

// POSTs user auth token to User Auth endpoint

// GETs protected endpoint for USER REGISTRATION from Auth endpoint

// POSTs refresh token to USER AUTH endpoint 

// POSTs new user object at the USER endpoint 

// *User Dashboard* GETs "name" data from USER endpoint and displays  
function getAndDisplayName(callback){
	getName(dispayName);
}

// GETs user's name  
function getName(callback){
	setTimeout(callback(MOCK_USER_UPDATES), 100);
}

//display username
function displayName(data){
	$('body').append(`<p>Hello ${concatename(data.name)}</p>`
}

//concatenates first/last name
function concatename(name){
	return `${name.first-name} ${name.last-name}`
} 

//GETs and displays artwork for gallery page
function getAndDisplayArtwork(){
	getArtworkData(displayArtwork)
}

//retrieves value from sequence enpoint
function getArtworkData(callback){
	setTimeout(callback(MOCK_ANIMATION_UPDATES), 100);
}

// *User Gallery* GETs "image" and "title" from USER endpoint's "artwork" key and displays user's thumbnail along with it's title, perhaps date in subtle color
function displayArtwork(data){
	let artwork = data.image;
	let title = data.title;
	let date = data.date;
	$('body').append(
		`<img src="${artwork}" alt="${title}">
		<p>${title}</p>
		<p class="subtle">${date}</p>`
		)
}

// *User Gallery* GETs "id" from ANIMATION endpoint and uses it to retrieve "drawn-frames" array from SEQUENCE endpoint 


// *Canvas* ||submit button|| is clicked and user's "artwork", "title", "creation date" POSTs to USER endpoint's "artwork" key 
function submitArtwork(){
	$('#artworkSubmit').on('click', function(){
		postArtworkData();
		postSequenceData();
	})
}

// *Canvas* load guide image for the canvas and display canvas from sketch.js file
function displayCanvas(guideImage){
	let guide = getGuideImage(displayGuide);
	$('body').append(`<script src="sketch.js"></script>`)
}

// *Canvas* GETs image for current guide from "guide image" key's array and displays through p5.js program
function getGuideImage(callback){
	setTimeout(callback(MOCK_SEQUENCE_UPDATES));
}

function displayGuide(data){
	return data['guide-frames'][data['drawn-frames'].length]
}

// *Canvas* ||submit button|| is clicked and user's "artwork", "name" POSTs to SEQUENCE endpoint's "drawn-frames" and "credits" keys 

// *Canvas* POSTs to endpoint (Used for image on SEQUENCE and USER endpoints and ||title input|| to USER endpoint) 


// *Canvas* GETs "animationID" from ANIMATION endpoint and uses it to match "ID" found in sequence endpoint and POST to "drawn-frames" and "credits" keys 
function getAnimationID(){

}

// *Canvas* GETs animation ID to POST it to user's "artwork" key's "animationID" to endpoint (Used for image on SEQUENCE and USER endpoints and ||title input|| to USER endpoint) 
 

// *User Profile Settings* || Delete My Account || button is clicked and:

	// *User Profile Settings* GETs username from User endpoint

	// *User Profile Settings* DELETEs user from USER AUTH and USER endpoints

	// *User Profile Settings* anonymizes user name from SEQUENCE Endpoint

// *User Dashboard* GETs random image from USER endpoint and posts as icon for ||My Work|| in --Pick Art-- screen
function getAndDisplayThumb(){
	function getThumb(displayThumb());
}

function getThumb(){
	setTimeout(callback(MOCK_USER_UPDATES));
}

function displayThumb(data){
	$('displayDiv').append(
		`<img src="${data.artwork.image}"></img>
		<p>${data.artwork.title}</p>`);
}
// *User Dashboard* GETs random image from SEQUENCE endpoint and posts as icon for ||My Work|| in --Pick Art-- screen

//Canvas plays what the animation looks like up till the user's slide? 

//*Animation Showcase* GETs image sequence and posts in canvas players? made in p5.js
