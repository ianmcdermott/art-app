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

let drawing = [];
let isDrawing = false;
let releasedMouse = false;
/*
{drawing: [
	{path: {
		points: [array of points],
		color: color
		radius: radius
	}

]}
*/
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

	let submitButton = select('#js-artwork-submit');
	let clearButton  = select('#js-artwork-clear');

	//submitButton.mousePressed(saveDrawing);
	//clearButton.mousePressed(clearDrawing);
	//populate color swatches
	createPallet();
}

function draw() {
	//set guide image
	image(img, 100, 100);
	//set frame
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
	isDrawing = true;
	brush.drag(mouseX, mouseY);
	//brush.update(mouseX, mouseY)
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
		//if mouse is inside swatch, update brush and fill icon
			if(d < this.r){
				fillIcon.c = this.c 
				brush.c = this.c;
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

function handleDrawing(_x, _y){
	if(isDrawing){
		var point = {
			x: mouseX,
			y: mouseY
		}
	
	points.push(point);
	path.push({
			coord:points,
			color: brush.c,
			radius: brush.r
		});
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

	display(x, y){
		stroke(100, 100, 100, 50);
		strokeWeight(0.5);
		noFill();
		ellipse(x,y,this.r, this.r)
	}

	drag(_x, _y){
		this.path.points = [];
		this.path.lines = [];
		let weight = this.r+constrain(dist(mouseX, mouseY, pmouseX, pmouseY), 0, 25);
		constrain(80);
		strokeWeight(weight);
		stroke(this.c);
		line(mouseX, mouseY, pmouseX, pmouseY);
		if(isDrawing){
			this.path = {
				points: [],
				lines: [],
				color: this.c,
				radius: this.r
			};
			let lineCoords = {mouseX, mouseY, pmouseX, pmouseY};
			//console.log(lineCoords);
			this.path.lines.push(lineCoords);
			console.log(this.path.lines);

			this.path.color = this.c;
			if(releasedMouse){
				drawing.push(this.path);
				console.log(drawing);
				releasedMouse = false;
			}
		}
		
	}

	click(_x, _y){
		noStroke();
		this.x = _x;
		this.y = _y;
		fill(this.c);
		ellipse(this.x, this.y, this.r, this.r);
		if(releasedMouse){
			this.path.points.push(mouseX, mouseY);
			drawing.push(this.path);
			console.log(drawing);
			releasedMouse = false;
		}
	}

	sizeUp(amount){
		console.log('sizing up');
		this.r += amount;
 		this.path.radius = this.r;
	}

	sizeDown(amount){
		this.r -= amount;
		this.path.radius = this.r;
	}

}

function saveDrawing(){
	var ref = database.ref('drawings');
	var data = {
		frame: drawing
	}
	var result = ref.push(data, dataSent);

	function dataSent(err, status){
		console.log(status);
	}
}

function clearDrawing(){

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


