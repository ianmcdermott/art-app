const MOCK_USER_AUTH_UPDATES = {
    "username": "username",
    "password":  "password",
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
    "password":  "password",
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
	"guide": "media/path/image.png",
	"userDrawn": "media/path/image.png",
	"credits": ["fakeUser1", "fakeUser2", "fakeUser3"]
}

const mockUser = 'Jeremy Flack';

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
	$('body').append(`<p>Hello ${concatename(data.name)}</p>`);
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
	$('#js-artwork-submit').on('click', function(){
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
	});
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

function renderGallery(){
	getAndRenderArtworkInfo();
	getAndRenderAnimationInfo();
	getAndRenderArtworkThumb();
	getAndRenderAnimationThumb();
}

function getAndRenderArtworkThumb(){
	getArtwork();
}

function getAndRenderAnimationThumb(){
	getAnimation();
}

function getAndRenderArtworkInfo(){
	getArtworkInfo(renderArtworkInfo);
}

function getArtworkInfo(callback){
	setTimeout(callback, 100);
}

function renderArtworkInfo(data){
	$('#js-artwork-info').html(`
		<p>${data.artwork.title}</p>
		<p>by ${data.name}</p>
		<p>Created on: ${data.artwork.date}</p>`);
}

function renderShowcase(){
	getAndRenderAnimationInfo();
	getAndRenderTheatre();
}

function getAndRenderAnimationInfo(){
	getAnimation(callback);
}

function getAnimationInfo(callback){
	setTimeout(callback, 100);
}

function renderAnimationInfo(data){
	$('#js-animation-info').html(`
		<p>${data.title}</p>
		<p>Last frame drawn on: ${data.artwork.date}</p>`);
}

function getAndRenderTheatre(){
	getTheatre(renderTheatre);
}

function getTheatre(callback){
	setTimeout(callback, 100);
}
//Canvas plays what the animation looks like up till the user's slide? 
//player created with p5js
function renderTheatre(data){
	sequence = data.userDrawn;
	//import sequence data array into p5js code
	// P5.JS CODE CODE CODE (sequence)
}

// *User Dashboard* GETs username, first/last name, and one random artwork to display on profile
function populateDashboard(){
	getAndRenderUsername(mockUser);
	getAndRenderUserInfo(mockUser);
	getAndRenderUserArt(mockUser);
}

function getAndRenderUsername(){
	getUsername(displayUsername);
}
function getUsername(callback){
	setTimeout(function(){ callback(MOCK_USER_UPDATES)}, 100);
}

function renderUsername(data){
	$('#js-userHeader').text(data.username);
}

function getAndRenderUserInfo(){
	getUsername(displayUsername);
}

function getUserInfo(callback){
	setTimeout(function(){ callback(MOCK_USER_UPDATES)}, 100);
}

function renderUserInfo(data){
	$('#js-userinfo').html(data.username);
}

function getAndRenderUserArt(){
	setTimeout(renderUserArt, 100);
}


function getUserArt(user, callback){
	//callback success
	callback(user);
	//callback fail with null as value
	//callback(null)
}

//If there's artwork data for user, render 
function renderUserArt(data){
	if(data){
		$('#js-view-art').append(
			`<img src="${data.artwork.image}" alt="${data.artwork.title}"></img>
			<p class='artwork-title'>${data.artwork.title}</p>`);
	}
}

function listenForArtworkSubmit(){
	$('#js-artwork-submit').on('click', () => {
		submitTitle();
		submitArtwork();		
	});
}

function submitTitle(){
	let title = $('js-title-form').val();
	postTitle();
}

function submitArtwork(){
	postArtwork();
}

function postArtwork(){
	setTimeout(callback)
}

function renderGalleryAndShowcase(){
	renderArtworkThumb();
	renderAnimationThumb();
}

function renderImage(data){
	$('js-view-gallery').append(`data.`);
}

function renderAnimationThumb(data){
	$('js-view-gallery').append(`data.`);
}

function handleCss(){
	let sw = $('.square1').width();
	console.log(sw);
	$('.square1').css({'height':sw+'px'});
	$('.square2').css({'height':sw+'px'});
	$('.square1').css({'border-width':sw/10+'px'});
	$('.square2').css({'border-width':sw/10+'px'});
}

function runApp(){
	handleCss();
}

$(runApp)
