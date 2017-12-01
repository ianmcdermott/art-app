const MOCK_USER_AUTH_UPDATES = {
    "username": "username",
    "password":  "password",
    "name": {
    	"first-name": 'First', 
    	"last-name": 'Last'}
}


const MOCK_USER_UPDATES = {
	"name": {
		"firstName": 'Blorp',
		"lastName": 'Bloop'},
 	"id": "111111"
}

const MOCK_ANIMATION_UPDATES = {
	"id":   "888888",
	"title":  "Foo Fa",
	"creationDate":  "2015-03-25",
	"frame": "media/sequences/flowerGuide_00103.png"
}

const MOCK_USER_PROFILE_UPDATES = {
    "username": "username",
    "password":  "password",
    "name": 'First Last',
	"artwork": [{
		"image": "00001",
		"animationId": "0001",
		"title": "Hello World",
		"date": "2015-03-25"
	  }]
};


const MOCK_SEQUENCE_UPDATES = {
	"id":   "111111",
	"title": "Flower",
	"guide": "media/sequences/flowerGuide_",
	"userDrawn": "media/sequences/flowerGuide_",
	"credits": ["fakeUser1", "fakeUser2", "fakeUser3"],
	"creationDate": "date"
};

const currentFrame 

const DATABASE_URL = "http://localhost:8080/";

const GUIDE_URL = 'media/sequences/';
const KEYWORD_URL = 'flowerGuide_';

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
	const settings = {
		headers: {'Authorization': "Bearer "+ AUTHORIZATION_CODE},
		url:  DATABASE_URL+`animations`,
		success: callback,
		error: "Error getting playlist"
	};
	$.ajax(settings)
//	setTimeout(callback(MOCK_ANIMATION_UPDATES), 100);
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
	getAndRenderArtworkThumb();
	getAndRenderAnimationThumb();
	getAndRenderArtworkInfo();
	getAndRenderAnimationInfo();

}

function getAndRenderArtworkThumb(){
	getArtworkThumb(renderArtworkThumb);
}


function getArtworkThumb(callback){
	const settings = {
		url:  DATABASE_URL+`userprofile`,
		success: callback,
		error: "Error getting userprofile info"
	};

	$.ajax(settings);
}

function renderArtworkThumb(data){
	const source = GUIDE_URL + KEYWORD_URL + data.userProfile[0].artwork[0].frame + '.png';
	$('#js-artwork-thumb').prepend(
			`<img src="${source}" alt="${data.userProfile[0].artwork[0].title}" width=80%>
			 <p class='js-artwork-title'>${data.userProfile[0].artwork[0].title}</p>`);
}


function getAndRenderArtworkInfo(){
	getArtworkInfo(renderArtworkInfo);
}

function getArtworkInfo(callback){
	const settings = {
		url:  DATABASE_URL+`userprofile`,
		success: callback,
		error: "Error getting userprofile info"
	};

	$.ajax(settings);
}

function renderArtworkInfo(data){
	$('#js-artwork-info').html(`
		<p>by ${data.userProfile[0].name}</p>
		<p>Created on: ${data.userProfile[0].artwork[0].date}</p>`);
}

function renderShowcase(){
	console.log('renderShowcase ran')
	getAndRenderAnimationInfo();
	getAndRenderTheatre();
}

function getAndRenderAnimationInfo(){
	console.log('getAndRenderAnimationInfo ran')
	getAnimationInfo(renderAnimationInfo);
}

function getAnimationInfo(callback){
	const settings = {
		contentType: "application/json",
		url:  DATABASE_URL+`animations`,
		success: callback,
		error: "Error getting playlist"
	};
	$.ajax(settings);
	//setTimeout(callback(MOCK_SEQUENCE_UPDATES), 100);
}

function renderAnimationInfo(data){
	$('#js-animation-info').append(`
		<p>${data.animations[0].title}</p>
		<p>Last frame drawn on: ${data.animations[0].creationDate}</p>`);
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
	console.log('populateDashboard running');
	getAndRenderUsername();
	getAndRenderUserInfo();
	getAndRenderUserArt();
}

function getAndRenderUsername(){
	console.log('getAndRenderUsername ran');
	getUsername(renderUsername);
}
function getUsername(callback){
	console.log('getUsername running');
	callback(MOCK_USER_UPDATES);
}

function renderUsername(data){
	console.log('renderUsername running');
	$('#js-user-header').html(`<p>Welcome ${data.name.firstName} ${data.name.lastName}`);
}

function getAndRenderUserInfo(){
	console.log('getAndRenderUserInfo running');
	getUsername(renderUserInfo);
}

function getUserInfo(callback){
	console.log('getUserInfo running');
	setTimeout(function(){ callback(MOCK_USER_UPDATES)}, 100);
}

function renderUserInfo(data){
	console.log('renderUserInfo running');
	$('#js-userinfo').html(data.username);
}

function getAndRenderUserArt(){
	console.log('getAndRenderUserArt running');
	getUserArt(renderUserArt);
}


function getUserArt(callback){
	//callback success
	//setTimeout(callback(MOCK_USER_PROFILE_UPDATES), 100);
	//callback fail with null as value
	//callback(null)
	const settings = {
	 	contentType: "application/json",
		url:  DATABASE_URL+`userprofile`,
		success: callback,
		error: callback(null)//"Error getting playlist"
	};
	$.ajax(settings);
}

//If there's artwork data for user, render in artwork thumb
function renderUserArt(data){
	let boxWidth = $('#js-view-art').width()
	if(data){
	const source = GUIDE_URL + KEYWORD_URL + data.userProfile[0].artwork[0].frame + '.png';
	$('#js-artwork-thumb').prepend(
			`<img src="${source}" alt="${data.userProfile[0].artwork[0].title}" width=80%>
			 <p class='js-artwork-title'>${data.userProfile[0].artwork[0].title}</p>`);
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

// get current frame number of sequence

// stringify frame number

//PUT new art on user profile
function putArtwork(){
	function createPlaylist(callback){
		var url = DATABASE_URL + 'sequences';
		$.ajax(url, {
			method: 'PUT',
			data: JSON.stringify({
				"frame": "00000",
	            "animationId": "000001",
	            "title": "Rising Seedling",
	            "creationDate": "11-29-2017"
			}),
			dataType: 'json',
			headers: {
				'Authorization': 'Bearer ' + AUTHORIZATION_CODE,
				'Content-Type': 'application/json'
			},
			success: function(data) {
				callback(data, openPlaylist);
			},
			error: function(data) {
				callback(null);
			}
		});
}
	setTimeout(callback)
}

//POST artwork to sequences endpoint
function postArtwork(){
	function createPlaylist(callback){
		var url = DATABASE_URL + 'sequences';
		$.ajax(url, {
			method: 'POST',
			data: JSON.stringify({
				'name': 'Metly: A ' + desiredMood + " Journey to " + toStation,
				'public': false
			}),
			dataType: 'json',
			headers: {
				'Authorization': 'Bearer ' + AUTHORIZATION_CODE,
				'Content-Type': 'application/json'
			},
			success: function(data) {
				callback(data, openPlaylist);
			},
			error: function(data) {
				callback(null);
			}
		});
}
	setTimeout(callback)
}

function renderGalleryAndShowcase(){
	getAndRenderArtworkThumb();
	getAndRenderAnimationThumb();
}

function renderImage(data){
	$('#js-view-gallery').append(`data.`);
}

function getAndRenderAnimationThumb(){
	getAnimationThumb(renderAnimationThumb);
}

function getAnimationThumb(callback){
	const settings = {
		contentType: "application/json",
		url:  DATABASE_URL+`animations`,
		success: callback,
		error: "Error getting playlist"
	};
	$.ajax(settings);
}


function renderAnimationThumb(data){
	console.log(data.animations[0].frame);
	let source = data.animations[0].frame;//+"00001.png";
	$('#js-showcase-thumb').append(`<image src="${source}" width="80%">`);
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

//function that allows users to update their profile pic to any frame they've drawn, puts new frame item in userprofile artwork key

