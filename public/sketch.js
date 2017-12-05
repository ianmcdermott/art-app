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

let isDrawing = false;
let releasedMouse = false;
let initialRadius = 50;

function preload(){
	pg = createGraphics(0, 0);
	//guide image loads to graphics buffer to avoid being on same layer as drawn image
	img = pg.loadImage(GUIDE_URL+NUMBER_EXTENSION);
}

function setup() {
	let canvas  = createCanvas(1200, 1200);
	canvas.parent('js-sketch-holder');
	noStroke();
	fill(255);
	rect(100, 100, 1000, 1000);
	brush = new Brush(initialRadius, defaultSwatch);

	let submitButton = select('#js-artwork-submit');
	let clearButton  = select('#js-artwork-clear');
	clearButton.mousePressed(clearDrawing);
	//populate color swatches
	createPallet();
}

function draw() {
	background(255);
	//set guide image
	image(img, 100, 100);
	//set frame
	displayDrawing();
	frame();	
	renderPallet();

	if(keyIsPressed){
		console.log("!!!!!!"+JSON.stringify(drawing));
	}
}

function displayDrawing(){
	if(drawing){
		for (let i = 0; i < drawing.length; i++) {
	   		let lines = drawing[i].lines;
	   		let points = drawing[i].points;
			let weight = drawing[i].radius;

			if(lines){
				for(let j = 0; j < lines.length; j++){
					let c = drawing[i].color;
					strokeWeight(weight);
					stroke(c);
					line(lines[j].mouseX, lines[j].mouseY, lines[j].pmouseX, lines[j].pmouseY);
				}
			}
			if(points){
				for(let j = 0; j < points.length; j++){
					let c = drawing[i].color;
					noStroke();
					fill(c);
					ellipse(points[j].x, points[j].y, weight, weight);
				}
			}
		}
	}
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
	isDrawing = true;
	releasedMouse = false;
	brush.drag(mouseX, mouseY);

	return false;
}

function mouseReleased(){
	releasedMouse = true;
	isDrawing = false;
}

function mouseClicked(){
	isDrawing = true;
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
	if(key === 'Û'){
		if(keyIsDown(SHIFT)){
			brush.sizeDown(10);
		} else {
			brush.sizeDown(1);
		}
	}
	if(key === 'e' || key === 'E'){
	}

	if(key === 'b' || key === 'B'){
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
		//if mouse is inside swatch, update brush and fill icon
			if(d < this.r){
				fillIcon.c = this.c;
				brush.updateColor(this.c);

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
  		this.path = {
			points: [],
			lines: [],
			color: this.c,
			radius: this.r
		};
		this.dragging = false;

 	}

	display(){
	
	}

	drag(_x, _y){
		this.x = _x;
		this.y = _y;

		this.path = {
			points: [],
			lines: [],
			color: this.path.color,
			radius: this.radius
		};
		if(isDrawing){
			let weight = this.r+constrain(dist(mouseX, mouseY, pmouseX, pmouseY), 0, 25);
			let lineCoords = {mouseX: this.x, mouseY: this.y, pmouseX, pmouseY};
			this.path.lines.push(lineCoords);
			this.path.radius = weight;
			this.path.color = fillIcon.c;

			if(releasedMouse){
				releasedMouse = false;
			}
		}
		drawing.push(this.path);
	}

	click(_x, _y){
		this.x = _x;
		this.y = _y;

		this.path = {
			points: [],
			lines: [],
			color: this.path.color,
			radius: this.r
		};
		//if(isDrawing){
			this.path.points.push({x: this.x, y: this.y});
			this.path.color = fillIcon.c;
			this.path.radius = this.r;

			drawing.push(this.path);
			//releasedMouse = false;
	//	}
	}

	sizeUp(amount){
		this.r += amount;
	}


	sizeDown(amount){
		this.r -= amount;
	}

}


function clearDrawing() {
  drawing = [];
}

// class Eraser extends Brush{
// 	constructor(_r, _c){
// 		super(this.r) = _r;
// 		super(this.c) = fill(255);
// 	}
// }

