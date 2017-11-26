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
 	"id": "111111"
}

const MOCK_ANIMATION_UPDATES = {
	"id":   "888888",
	"title":  "Foo Fa",
	"creationDate":  "2015-03-25",
	"frame": "media/path/image.png"
}

const MOCK_USER_PROFILE_UPDATES = {
    "username": "username",
    "password":  "password"
    "name": 'First Last',
	"artwork": [{
		"image": "media/path/image.png",
		"animationId": "0001",
		"title": "Hello World",
		"date": "2015-03-25"
	  }]
}


const MOCK_SEQUENCE_UPDATES = {
	"id":   "111111",
	"guide": ["media/path/image.png", "media/path/image.png", "media/path/image.png"]},
	"userDrawn": ["media/path/image.png", "media/path/image.png", "media/path/image.png"],
	"credits": ["fakeUser1", "fakeUser2", "fakeUser3"]
}

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
function getAnimationId(callback){
	setTimeout(callback(retrieveSequence), 100);
}

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
function exportFrame(){
	$('#submit-image').on('click', function(){

	})
}
// *Canvas* POSTs to endpoint (Used for image on SEQUENCE and USER endpoints and ||title input|| to USER endpoint) 


// *Canvas* GETs "animationID" from ANIMATION endpoint and uses it to match "ID" found in sequence endpoint and POST to "drawn-frames" and "credits" keys 
function getAnimationID(callback){
	setTimeout(function(){callback()}, 100);
}

function returnAnimationId(data){
	return data.id;
}

// *Canvas* GETs animation ID to POST it to user's "artwork" key's "animationID" to endpoint (Used for image on SEQUENCE and USER endpoints and ||title input|| to USER endpoint) 


// *User Profile Settings* || Delete My Account || button is clicked and:
function deleteSelected(){
	$('#deleteAccountBtn').on('click', function(){
		const deletedUser = getUsername();
		deleteUser(deletedUser);
		anomymizeUser(deletedUser);
	}
}


function deleteUser(user){
	setTimeout(function(){}, 100)
}

// *User Profile Settings* gets username from user profile endpoint and anonymizes user name from SEQUENCE Endpoint
function anonymizeUser(user){
	getUsername(updateUserCredits);
}

function updateUserCredits(data){
	if(data.username = sequence.credits.username){
		updateSequence.username;
	}
	$('#credits').html;
}

// *User Dashboard* GETs username, first/last name, and one random artwork to display on profile
function renderDashboard(){
	getAndDisplayThumb();
	getAndDisplayUsername();
	getAndDisplayName();
}

// *User Dashboard* GETs random image from USER endpoint and posts as icon for ||My Work|| in --Pick Art-- screen
function getAndDisplayThumb(){
	getThumb(displayThumb);
}

//gets data from user profile endpoint
function getThumb(){
	setTimeout(callback(MOCK_USER_PROFILE_UPDATES));
}

function displayThumb(data){
	$('displayDiv').append(
		`<img src="${data.artwork.image}" alt="${data.artwork.title}"></img>
		<p class='artwork-title'>${data.artwork.title}</p>`);
}

function getAndDisplayUsername(){
	getUsername(displayUsername);
}

//get Username from User Profile endpoint
function getUsername(callback){
	setTimeout(function(){ callback(MOCK_USER_PROFILE_UPDATES)}, 100);
}

function renderUsername(data){
	$('#usernameHeader').text(data.username);
}

function getAndDisplayName(){
	getName(displayName);
}

function getName(callback){
	setTimeout(function(){ callback(MOCK_USER_PROFILE_UPDATES)}, 100);
}

function renderName(data){
	$('#nameHeader').text(data.name);
}

//gets sequence and renders to p5js theatre
function getSequenceAndRender(){
	const animationId = getAnimationID(returnAnimationId)
	getSequence(animationId, renderTheatre);
}

//*Animation Showcase* GETs image sequence and posts in canvas players? made in p5.js
function getSequence(requestedId, callback){
	getSequence.forEach(item => {
		if(item.id === requestedId){
			setTimeout(function(){ callback(MOCK_SEQUENCE_UPDATES)})
		}
	})	
}

//Canvas plays what the animation looks like up till the user's slide? 
//player created with p5js
function renderTheatre(data){
	sequence = data.userDrawn;
	//import sequence data array into p5js code
	// P5.JS CODE CODE CODE (sequence)
}

