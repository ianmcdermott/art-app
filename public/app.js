let imageSketch = function(p){
	p.preload = function(){
	}

	p.setup = function() {
			p.createCanvas(1200, 1200);
			p.background(255, 0, 0);

			p.displayDrawing();
			p.noLoop();

	}

	p.displayDrawing = function(){
		if(userDrawing){

			for (let i = 0; i < userDrawing.length; i++) {

		   		let lines = userDrawing[i].lines;
		   		let points = userDrawing[i].points;
				let weight = userDrawing[i].radius;

				if(lines){

					for(let j = 0; j < lines.length; j++){
						let c = userDrawing[i].color;
						p.strokeWeight(weight);
						p.stroke(c);
						p.line(lines[j].mouseX, lines[j].mouseY, lines[j].pmouseX, lines[j].pmouseY);
					}
				}
				if(points){
					for(let j = 0; j < points.length; j++){
						let c = userDrawing[i].color;
						p.noStroke();
						p.fill(c);
						p.ellipse(points[j].x, points[j].y, weight, weight);
					}
				}
			}
		}
	}
}

let theatre = function(p){
	let frameCount = 0;
	p.preload = function(){
	}

	p.setup = function() {
			let canvas  = p.createCanvas(1200, 1200);
			canvas.parent('#js-theatre-holder');
	}

	p.draw = function(){
		p.background(255, 0, 0);
		p.displayDrawing(userTheatre[frameCount].frame);
		frameCount++;
		if(frameCount > userTheatre.length-1) frameCount = 0;
	}

	p.displayDrawing = function(frame){
		if(userTheatre){
			for (let i = 0; i < frame.length; i++) {

		   		let lines = frame[i].lines;
		   		let points = frame[i].points;
				let weight = frame[i].radius;

				if(lines){

					for(let j = 0; j < lines.length; j++){
						let c = frame[i].color;
						p.strokeWeight(weight);
						p.stroke(c);
						p.line(lines[j].mouseX, lines[j].mouseY, lines[j].pmouseX, lines[j].pmouseY);
					}
				}
				if(points){
					for(let j = 0; j < points.length; j++){
						let c = frame[i].color;
						p.noStroke();
						p.fill(c);
						p.ellipse(points[j].x, points[j].y, weight, weight);
					}
				}
			}
		}
	}
}

let userArtworkObject;
frameC = 22;
let drawing = [];
frameCount = 0;

const testUserID = '5a2590fac270315d5fd22294';

const DATABASE_URL = "http://localhost:8080/";

let GUIDE_URL = 'media/sequences-frames/flowerGuide_';
const EXTENSION = '.png'
const testAnimationId = '5a1ee44fc270315d5f98e947';
let sequenceId = "5a24a1cec270315d5fca2021";
let userDrawing;
let userTheatre;

// const imageSketch = require("./image")
//concatenates first/last name
function concatename(name){
	return `${name.first-name} ${name.last-name}`;
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
		`<div id="js-image-holder"></div>
		<p>${title}</p>
		<p class="subtle">${date}</p>`
		)
}


// *Canvas* load guide image for the canvas and display canvas from sketch.js file
function displayCanvas(guideImage){
	let guide = getGuideImage(displayGuide);
	$('body').append(`<script src="sketch.js"></script>`)
}

function prepCanvas(){
	populateUserArtworkObject();

	//GUIDE_URL = getGuide(returnGuide);
	//sequenceId = getAndReturnSequenceId();
	//displayGuide(GUIDE_URL)
}

function getAndReturnSequenceId(){
	getSequenceId(returnSequenceId)
}

function getSequenceId(callback){
	const settings = {
	 	contentType: "application/json",
		url:  DATABASE_URL+`sequences`,
		success: callback,
		error: callback(null)//"Error getting playlist"
	};
	$.ajax(settings);
}

function returnSequenceId(data){
	return data.sequences[0].id;
}

// *Canvas* GETs image for current guide from "guide image" key's array and displays through p5.js program
function getGuide(callback){
	const settings = {
	 	contentType: "application/json",
		url:  DATABASE_URL+`sequences`,
		success: callback,
		error: callback(null)//"Error getting playlist"
	};
	$.ajax(settings);
}

function returnGuide(data){
	return data.sequences[0].guide;
}

function displayGuide(data){
	return data['guide-frames'][data['drawn-frames'].length];
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

// GET and return value of framecount in sequence object

function renderGallery(){
	getAndRenderArtworkThumb();
	getAndRenderAnimationThumb();
	getAndRenderArtworkInfo();
	getAndRenderAnimationInfo();
}

function getAndRenderArtworkThumb(){
	getArtwork(renderArtworkThumb);
}


function getArtwork(callback){
	console.log('getArtworkThumb ran');
	const settings = {
		url:  DATABASE_URL+`userdrawn`,
		success: callback,
		error: "Error getting userprofile info"
	};
	$.ajax(settings);
}

function renderArtworkThumb(data){
	console.log('renderArtworkThumb ran');
	//load user drawing into its own object to be more easily accessible in p5 code
	userDrawing = data.userdrawn[3].frame;
	new p5(imageSketch, "js-artwork-thumb");
}
//<p class='js-artwork-title'>${data.userProfile[0].artwork[0].title}</p>



function getAndRenderAnimationThumb(){
	getArtwork(renderAnimationThumb);
}
function renderAnimationThumb(data){
	console.log('renderAnimationThumb ran');
	let randomFrame = Math.floor(Math.random()*data.userdrawn.length); 
	console.log("RF "+ randomFrame);
	userDrawing = data.userdrawn[randomFrame].frame;
	//load user drawing into its own object to be more easily accessible in p5 code
	new p5(imageSketch, "js-theatre-thumb");
}


function getAndRenderAnimation(){
	getArtwork(renderAnimation);
}

function renderAnimation(data){
	console.log('renderAnimationThumb ran');
	
	//load user drawing into its own object to be more easily accessible in p5 code
	userTheatre = data.userdrawn;
	new p5(theatre);
	$('#js-theatre-holder').prepend(
			`<div class="js-theatre-holder"></div>
	`);	
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
	getAndRenderAnimation();
}

function getAndRenderAnimationInfo(){
	console.log('getAndRenderAnimationInfo ran')
	getAnimationInfo(renderAnimationInfo);
}

function getAnimationInfo(callback){
	const settings = {
		contentType: "application/json",
		url:  DATABASE_URL+`animations`+testAnimationId,
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

// *User Dashboard* GETs username, first/last name, and one random artwork to display on profile
function populateDashboard(){
	console.log('populateDashboard running');
	getAndRenderUsername();
	getAndRenderUserInfo();
	getAndRenderArtworkThumb();
}

function getAndRenderUserInfo(){
	console.log('getAndRenderUserInfo running');
	getUserProfile(renderUserInfo);
}

function getUserInfo(callback){
	console.log('getUsername running');
	const settings = {
		url:  DATABASE_URL+`userprofile`,
		success: callback,
		error: "Error getting userprofile info"
	};

	$.ajax(settings);
}


function renderUsername(data){
	console.log('renderUsername running');
	$('#js-user-header').html(`<p>Welcome ${data.userProfile[0].name}`);
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
	const source = GUIDE_URL +  data.userProfile[0].artwork[0].frame + '.png';
	$('#js-artwork-thumb').prepend(
			`<img src="${source}" alt="${data.userProfile[0].artwork[0].title}" width=80%>
			 <p class='js-artwork-title'>${data.userProfile[0].artwork[0].title}</p>`);
	}
}

// get current frame number of sequence

// stringify frame number

function postArtworkCredits(username){
	console.log(username);
	console.log('postArtworkCredits ran');	
	const settings = {
		url: DATABASE_URL + 'credits/' + sequenceId,
		method: 'PUT',
			data: JSON.stringify({
				"id": sequenceId,
				"name": username
			}),
			dataType: 'json',
			headers: {
				'Content-Type': 'application/json'
			},
			success: console.log('success PUT userdrawn'),
			error: console.error('PUT drawing error')		
	};
	$.ajax(settings);
	return false;
}

function postArtworkUserDrawn(testUserID){
	console.log(sequenceId +":::"+ drawing);
	console.log('postArtworkUserDrawn ran');	
	const settings = {
		url: DATABASE_URL + 'userdrawn/' + sequenceId,
		method: 'PUT',
			data: JSON.stringify({
				"id": sequenceId,
				"frameNumber": frameCount,
				"frame": drawing
			}),
			dataType: 'json',
			headers: {
				'Content-Type': 'application/json'
			},
			success: console.log('success PUT userdrawn'),
			error: console.error('PUT drawing error')		
	};
	$.ajax(settings);
	return false;
}

//PUT new art on user profile to update image for thumbnail display purposes
function putArtworkUserProfile(callback, userID, artworkTitle, animationId){
	console.log('putArtwork ran');	
	const settings = {
		url: DATABASE_URL + 'userprofile/' + userID,
		method: 'PUT',
			data: JSON.stringify({
				"id": userID,
				"artwork": [{
					"frame": drawing,
		            "animationId": animationId,
		            "title": artworkTitle,
		            "creationDate": new Date()
	            }]
			}),
			dataType: 'json',
			headers: {
				'Content-Type': 'application/json'
			},
			success: function(){
				callback;
			},
			error: console.error('PUT drawing error')		
	};
	$.ajax(settings);
	return false;
}

//PUT new art on animation to update image for thumbnail display purposes
function putArtworkAnimations(callback, animationId){
	console.log('putArtwork ran');	
	const settings = {
		url: DATABASE_URL + 'animations/' + animationId,
		method: 'PUT',
			data: JSON.stringify({
				"id": userID,
			//	"creationDate": new Date(),
				"frame": drawing
	            
			}),
			dataType: 'json',
			headers: {
				'Content-Type': 'application/json'
			},
			success: function(){
				callback;
			},
			error: console.error('PUT Animation drawing error')		
	};
	$.ajax(settings);
		return false;

}

//POST new art to sequences endpoint
function postArtworkSequences(callback, userID, artworkTitle, animationId){
	console.log('putArtwork ran');	
	const settings = {
		url: DATABASE_URL + 'userprofile/' + userID,
		method: 'POST',
			data: JSON.stringify({
				"id": userID,
				"artwork": [{
					"frame": drawing,
		            "animationId": animationId,
		            "title": artworkTitle,
		            "creationDate": new Date()
	            }]
			}),
			dataType: 'json',
			headers: {
				'Content-Type': 'application/json'
			},
			success: function(){
				callback;
				console.log('success!');
			},
			error: console.error('PUT drawing error')		
	};
	$.ajax(settings);
	return false;
}



function renderGalleryAndShowcase(){
	getAndRenderArtworkThumb();
	getAndRenderAnimationThumb();
}

function renderImage(data){
	$('#js-view-gallery').append(`data.`);
}




function handleCss(){
	let sw = $('.square1').width();
	$('.square1').css({'height':sw+'px'});
	$('.square2').css({'height':sw+'px'});
	$('.square1').css({'border-width':sw/10+'px'});
	$('.square2').css({'border-width':sw/10+'px'});
}

function runApp(){
	handleCss();
}

/// CANVAS POSTING FUNCTIONS ///
function submitArtwork(){
	$('#js-artwork-form').submit(function(event){
		event.preventDefault();
		createUserdrawnObject();
	//	updateAnimationObject();
	});
}

// POST new userdrawn object
function createUserdrawnObject(){
	let frameNumber = userArtworkObject.frameNumber;
	console.log('framenumber ran');
	// console.log(frameNumber);
	// POST drawing to frame to userdrawn endpoint
	// POST title to userdrawn
	let title = $("js-title-form").val();
	// POST username to userdrawn
	let username = userArtworkObject.username;
	// POST animationId
	let animationId = userArtworkObject.animationId;
	// POST artist name to userdrawn
	let artist = userArtworkObject.artist;
	// POST creationDate
	let creationDate = new Date();
	postUserDrawn(frameNumber, drawing, title, animationId, artist, creationDate);
}
// Update animation object
function updateAnimationObject(){
	// PUT new currentframe number to animation endpoint based on endpoint
	// PUT drawing object in lastFrame to animation endpoint
	// PUT date in lastDrawnDate to animation endpoint
}

function populateUserArtworkObject(){
	console.log(animationInfo);
	// POST frame number based on currentFrame used for guide to userdrawn endpoint
	
	getAndReturnArtistInfo();


	// console.log(frameNumber);
	// POST drawing to frame to userdrawn endpoint
	// POST title to userdrawn
	let title = $("js-title-form").val();
	// POST username to userdrawn
	let username = artistInfo.username;
	// POST animationId
	let animationId = testAnimationId;
	// POST artist name to userdrawn
	let artist = artistInfo.artist;
	// POST creationDate
	let creationDate = new Date();
}

function getUserProfile(callback){
	console.log('getUsername running');
	const settings = {
		url:  DATABASE_URL+`userprofile`,
		success: callback,
		error: "Error getting userprofile info"
	};
	$.ajax(settings);
}

function gatherArtistInfo(data){
	userProfileObject = {
		id: data.id,
	    username: data.username,
	    name: data.name
	}
	//Use that info to get animation info and add to userArtworkObject
	getAndReturnAnimationInfo(userProfileObject)
	// return userProfileObject;
}

function getAndReturnAnimationInfo(){
	getAndGatherAnimationInfo();
}

function getAndGatherAnimationInfo(){
	getAnimationInfo(gatherAnimationInfo);
}

function getAnimationInfo(callback){
	const settings = {
		url:  DATABASE_URL+`animations`+testAnimationId,
		success: callback,
		error: "Error getting userprofile info",
	};
	$.ajax(settings);
}

function gatherAnimationInfo(data){
	$.extend(userArtworkObject, {
	 	title : data.animations[0].title, 
	 	lastDrawnDate : data.animations[0].lastDrawnDate,
		lastFrame: data.animations[0].lastFrame,
	    frameCount: data.animations[0].frameCount
	};
}


function getAndReturnArtistInfo(){
	getUserProfile(returnUserInfo);
}

// Get Artist info and add to userArtworkObject
function getAndGatherArtistInfo(){
	getUserProfile(gatherArtistInfo);
}


function getArtistInfo(){
	console.log('getAndRenderUsername ran');
	getUserProfile(renderUsername);
}



function getAndReturnUsername(){
	getUserProfile(returnUsername);
}

function returnUsername(data){
	return data.userProfile[0].name;
}

function getAndReturnAnimationId(){

}

function getAndReturnArtistName(){

}


function postUserDrawn(_frameNumber, drawing, _title, _animationId, _artist, _creationDate){
	console.log(sequenceId +":::"+ drawing);
	console.log('postArtworkUserDrawn ran');	
	const settings = {
		url: DATABASE_URL + 'userdrawn/' + sequenceId,
		method: 'PUT',
			data: JSON.stringify({
				//"id": sequenceId,
				"frameNumber": _frameCount,
				"frame": drawing,
			    "title": _title,
			    "animationId": _animationId,
			    "artist": _artist,
			    "creationDate": _creationDate 
			}),
			dataType: 'json',
			headers: {
				'Content-Type': 'application/json'
			},
			success: console.log('success PUT userdrawn'),
			error: console.error('PUT drawing error')		
	};
	$.ajax(settings);
	return false;
}
// 	console.log('putArtwork ran');	
// 	const settings = {
// 		url: DATABASE_URL + 'userprofile/' + userID,
// 		method: 'POST',
// 			data: JSON.stringify({
// 				"id": userID,
// 				"artwork": [{
// 					"frame": drawing,
// 		            "animationId": animationId,
// 		            "title": artworkTitle,
// 		            "creationDate": new Date()
// 	            }]
// 			}),
// 			dataType: 'json',
// 			headers: {
// 				'Content-Type': 'application/json'
// 			},
// 			success: function(){
// 				callback;
// 				console.log('success!');
// 			},
// 			error: console.error('PUT drawing error')		
// 	};
// 	$.ajax(settings);
// 	return false;
// }


// 1. POST frame to userdrawn
// 2. GET frameId and animationId from userdrawn
// 3. GET frames array based on animationId from sequences
// 4. PUT newly appended frames back into sequences object

$(runApp)

//function that allows users to update their profile pic to any frame they've drawn, puts new frame item in userprofile artwork key

///    p5 Image Maker ///
//new p5();
