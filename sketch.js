/* 
Dan Shiffman's Coding Train
KNN Classifier tutorial Part 1 - 3
*/

let video;
let features;
let knn;
let labelP;
let label = 'nothing';
let ready = false;
let x, y;


function setup() {
	createCanvas(320, 240);
	video = createCapture(VIDEO);
	video.size(320, 240);
	video.style("transform", "scale(-1, 1)");
	// video.hide();

	features = ml5.featureExtractor("MobileNet", modelReady);
	knn = ml5.KNNClassifier();

	labelP = createP('need training data');
	labelP.style('font-size', '32pt');

	x = width/2;
	y = height/2;
}

function goClassify() {
	const logits = features.infer(video);
	knn.classify(logits, function(error, result){
		if(error){
			console.error(error);
		} else {
			label = result.label;
			labelP.html(label);
			goClassify();
		}
	})
}

function keyPressed() {
	const logits = features.infer(video);
	if ( key === 'l' ) {
		knn.addExample(logits, "left");
		console.log("left");
	} else if ( key === 'r' ) {
		knn.addExample(logits, "right");
		console.log("right");
	} else if ( key === 'u' ) {
		knn.addExample(logits, "up");
		console.log("up"); 
	} else if ( key === 'd' ) {
		knn.addExample(logits, "down");
		console.log("down");
	} else if (key === ' ') {
		knn.addExample(logits, "stay");
		console.log("stay");  
	}
}

function modelReady() {
	console.log("MobileNet loaded!");
}

function draw() {
	// image(video, 0, 0);
	background(0);
	fill(255);
	ellipse(x, y, 24);

	if (label == 'left') {
		x--;
	  } else if (label == 'right') {
		x++;
	  } else if (label == 'up') {
		y--;
	  } else if (label == 'down') {
		y++;
	}

	x = constrain(x, 0, width);
	y = constrain(y, 0, height);

	if (!ready && knn.getNumLabels() > 0) {
		goClassify();
		ready = true;
	}
}
