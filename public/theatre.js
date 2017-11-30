let numFrames = 239;
let images = [];
let currentFrame = 0;

 function preload(){
	for(let i = 0; i < numFrames; i++){
		let imageName = 'https://raw.githubusercontent.com/ianmcdermott/art-app/master/public/media/sequences/flowerGuide_'+(('00000' + i).slice(-5))+'.png';
		images[i] = loadImage(imageName);
		console.log(imageName);
	}
 }

function setup(){
	let canvas = createCanvas(1200, 1200);
	frameRate(24);
	canvas.parent('theatre-holder');
}

function draw(){
	background(0);
	image(images[currentFrame], 0, 0);
	currentFrame++;
	if(currentFrame == images.length) currentFrame = 0;
}