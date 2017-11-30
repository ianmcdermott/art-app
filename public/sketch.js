let x = 0;
let creamsicle = '#ffb241';
let mint = '#39b876';
let magenta = '#e32c7e';
let colorArray = [creamsicle, mint, magenta];
let defaultSwatch = colorArray[0];

let radius = 50;
let fillColor = mint;
let strokeColor = 255;
let strokeOn = false;
let fillOn = true;
let numColor = 3;
let swatches = [];
let brush;

let strokeI;
let img;
let pg;

function preload(){
	pg = createGraphics(0, 0);
	//guide image loads to graphics buffer to avoid being on same layer as drawn image
	img = pg.loadImage('./media/sequences/flowerGuide_00000.png');
}

function setup() {
	let canvas  = createCanvas(1200, 1200);
	canvas.parent('js-sketch-holder');
	background(0);
	noStroke();
	fill(255);
	rect(100, 100, 1000, 1000);
	brush = new Brush(50, defaultSwatch);

	//populate color swatches
	createPallet();
}

function draw() {
	image(img, 100, 100);
	frame();
	renderPallet();
	//brush.display(mouseX, mouseY);

}

function createPallet(){
	for(let i = 0; i < numColor; i++){
		swatches.push(new ColorSwatch(((i*100)+50), 50, 50, colorArray[i]));
	}

	//strokeIcon = new Str5okeIcon(1125, 30, 40);
	fillIcon = new FillIcon(1050, 25, 50);
}

function renderPallet(){
	for(let i = 0; i < numColor; i++){
		swatches[i].display();
	}
	//strokeIcon.display();
	fillIcon.display();
}

function frame(){
	noStroke();
	fill(0);
	rect(0, 0, 1200, 100);
	fill(0);
	rect(0, 1100, 1200, 100);
	fill(0);
	rect(0, 0, 100, 1200);
	fill(0);
	rect(1100, 0, 100, 1200);
}

function mouseDragged() {
	brush.drag(mouseX, mouseY);
	//brush.update(mouseX, mouseY)
	

	return false;
}

function mouseClicked(){
	for(let i = 0; i < numColor; i++){
		swatches[i].clicked(mouseX, mouseY);
	}
	brush.click(mouseX, mouseY);

}

function keyPressed(){
	if(key === 'Ý'){
		if(keyIsDown(SHIFT)){
			brush.sizeUp(10);
		} else {
			brush.sizeUp(1);
		}
	}
	console.log(key);
	if(key === 'Û'){
		if(keyIsDown(SHIFT)){
			brush.sizeDown(10);
		} else {
			brush.sizeDown(1);
		}
	}
	if(key === 'e'){
	}
}

function ColorSwatch(_x, _y, _r, _c){
	this.x = _x;
	this.y = _y;
	this.r = _r;
	this.c = _c;

	this.display = function(){
		fill(this.c);
		ellipse(this.x, this.y, this.r, this.r);
	}


	this.clicked = function(_x, _y){
		let d = dist(_x, _y, this.x, this.y);
			if(d < this.r){
				console.log("clicked on "+ this.c);
				//if(strokeActive){
				fillIcon.c = this.c 
				brush.c = this.c;
				//} else {
					//fillIcon.c = this.c 
			//	}
		}
	}
}


class Icon{
	constructor(_x, _y, _r){
		this.x = _x;
		this.y = _y;
		this.r = _r;
		this.c = defaultSwatch;
	}

	display(){
		rect(this.x, this.y, this.r);
	}
}


class StrokeIcon extends Icon{
	display(){
		stroke(this.c);
		strokeWeight(10);
		noFill();
		rect(this.x, this.y, this.r, this.r);
	}
}

class FillIcon extends Icon{
	display(){

		fill(this.c);	
		noStroke();
		rect(this.x, this.y, this.r, this.r);
	}
}

class Brush{
 	constructor( _r, _c){
 		this.r = _r;
 		this.c = _c;
 	}

	display(x, y){
		stroke(100, 100, 100, 50);
		strokeWeight(0.5);
		noFill();
		ellipse(x,y,this.r, this.r)
	}

	drag(_x, _y){
		let weight = this.r+constrain(dist(mouseX, mouseY, pmouseX, pmouseY), 0, 25);
		constrain(80);
		strokeWeight(weight);
		stroke(this.c);
		line(mouseX, mouseY, pmouseX, pmouseY)
	}

	click(_x, _y){
		noStroke();
		this.x = _x;
		this.y = _y;
		fill(this.c);
		ellipse(this.x, this.y, this.r, this.r);
	}

	sizeUp(amount){
		console.log('sizing up');
		this.r += amount;
	}

	sizeDown(amount){
		this.r -= amount;
	}

}

// class Eraser extends Brush{
// 	constructor(_r, _c){
// 		super(this.r) = _r;
// 		super(this.c) = fill(255);
// 	}
// }

//eraser function
//export function - hook to submit button
//select images and import


