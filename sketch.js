var h = window.innerHeight - 50,
		w = window.innerWidth - 50;
var paused = false;

var gnats = [];

const count = 100;
const radius = 5;

var majorityInfected = false;

var pointHistory = [];

var recovery;
var socialDistancing;

var sd = false;

function setup() {
  // put setup code here

	createCanvas(w, h);
	background(51);

	setupGame();

	recovery = createCheckbox('Gnats can recover', false);
	socialDistancing = createCheckbox('Some Gnats practice social distancing', false);
	socialDistancing.changed(function(){
		sd = !sd;
		reset();
	})
}

function setupGame(){
	var r;
	for (g = 0; g < count; g++){
		r = new Gnat(random(rightBound), random(h));
		gnats.push(r);
		r.show();
	}
	let masterIndex = floor(random(50))
	let master = gnats[masterIndex].infected = true;
}

var final = false;

function draw() {
	var infectedCount = 0,
			immuneCount = 0;
  // put drawing code here
	background(51);
	stroke(255);
	noStroke();
	fill(255);
	rect(rightBound, 0, w-rightBound, h)
	for (i in gnats){
		gnats[i].update();
		gnats[i].show();
		infectedCount += gnats[i].infected ? 1 : 0;
		immuneCount += gnats[i].immune ? 1 : 0;
		//console.log(g);
	}
	if ((immuneCount == count || infectedCount == count) && final == false){
		final=true;
		setTimeout(function(){
			reset();
		}, 1000);
 }
 var point = {
	 frame: frameCount,
	 numInfected: infectedCount
 }
 pointHistory.push(point);
 graph();

 recovery.position(rightBound + buffer, 20);
 socialDistancing.position(rightBound + buffer, 45);
}

function reset(){
	gnats = [];
	final=false;
	pointHistory = [];
	frameCount = 0;
	setupGame();
}

function keyPressed(){
  if (keyCode === 32){
		if (paused) {
		  resume();
		} else{
		  pause();
		}
  }
}
var buffer = 50;

function graph(){

	//defines top left corner
	var startX = rightBound;
	var startY = 0;

	var endX = w;
	var endY = h;

	var graphWidth = (endX - buffer) - (startX + buffer);
	var graphHeight = (startY + buffer) - (endY - buffer);

	var xMax = frameCount;
	var yMax = count;

	stroke(0);

	line(startX + buffer, startY + buffer, startX + buffer, endY-buffer);
	line(startX + buffer, endY - buffer, endX - buffer, endY - buffer);

	push();
	fill(0);
	noStroke();
	text(yMax, startX + buffer - 25, startY + buffer + 15)
	text(xMax, endX - buffer - 15, endY - buffer + 20)
	pop();

	stroke(0);
	strokeWeight(3);

	var xval;
	var yval;

	fill(255, 255, 100)
	beginShape();
	for (c in pointHistory){
		xval = (c/xMax) * graphWidth + startX + buffer;
		yval = buffer + startY - (pointHistory[c].numInfected/yMax) * graphHeight;
		vertex(xval, yval)
	}
	vertex(endX - buffer, endY - buffer)
	vertex(startX + buffer, endY - buffer);
	endShape();
}

function pause(){
  paused = true;
  noLoop();
}

function resume(){
  paused = false;
  loop();
}

function wait(ms)
{
var d = new Date();
var d2 = null;
do { d2 = new Date(); }
while(d2-d < ms);
}
