


const FADE_IN_TIME_IN_MS = 4000;
const FADE_OUT_TIME_IN_MS = 2000;
const STAND_STILL_INTERVAL = 3000;
const FADE_STEPS = 50;
const ALPHA_INTERVAL = 1./FADE_STEPS;
const FADE_IN_INTERVAL = FADE_IN_TIME_IN_MS/FADE_STEPS;
const FADE_OUT_INTERVAL = FADE_OUT_TIME_IN_MS/FADE_STEPS;

const PICTURES = [
	'P1.jpg', 
	'P2.jpg', 
	'P3.jpg', 
	'P4.jpg'];
	
var images = new Array();
var imageIdx = 0;
var ga = 0; // global alpha: transparency 
var ctx = null; 
var intervalId = null;
var canvasWidth = 0;
var canvasHeight = 0;

// var t1, t2; 

function init() {
	for (var i=0; i<PICTURES.length; i++) {
		images[i] = new Image();
		images[i].src = PICTURES[i];
	}

	var canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
	
	nextpicture();
	
	// t1 = new Date().getSeconds();
	intervalId = setInterval(fadein, FADE_IN_INTERVAL);
}

function fadeout() {
	ga -= ALPHA_INTERVAL;
	ctx.globalAlpha = ga;
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	ctx.drawImage(images[imageIdx], 0, 0, canvasWidth, canvasHeight);
	if (ga <= 0.) {
		clearInterval(intervalId);
		ga = 0.;
		nextpicture();
		intervalId = setInterval(fadein, FADE_IN_INTERVAL);
	}
}

function timeout() {
	ga = 1.0;
	intervalId = setInterval(fadeout, FADE_OUT_INTERVAL);
}


function fadein() {
	ga += ALPHA_INTERVAL;	
	ctx.globalAlpha = ga;
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	ctx.drawImage(images[imageIdx], 0, 0, canvasWidth, canvasHeight);
	// picture is displayed without transparency - consider it fully "loaded"
	if (ga >= 1.0) {
		clearInterval(intervalId);
		ga = 1.0;
		// t2 = new Date().getSeconds();
		// alert(t1)
		// alert(t2);
		setTimeout(timeout, STAND_STILL_INTERVAL);
	}
}

function nextpicture() {
	imageIdx = (imageIdx + 1) % images.length;
}