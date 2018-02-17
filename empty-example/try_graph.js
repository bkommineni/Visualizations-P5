var width ;
var height ;

/*function setup() {
  width = 800;
  height = 800;
	createCanvas(width, height);
	//fill(0);
  //drawGrid();

  //stroke(200);
	//fill(120);
  stroke(51);
  strokeWeight(100);
  point(40,-800);
  //line(40, -800, 40, 800);

  //strokeWeight(20);
  //stroke(51);
  //point(760,800);

	/*for (var x=-width; x < width; x+=40) {
    print(x + " "+ (-height) + " "+ x + " "+ height);
    strokeWeight(4);
    stroke(51);
    //point(x,-height);
    //point(x,height);
		line(x, -height, x, height);
		//text(x, x+1, 12);
	}
	/*for (var y=-height; y < height; y+=40) {
		line(-width, y, width, y);
		text(y, 1, y+12);
	}
}*/

/*function draw() {
	background(240);
	//drawGrid();
	//fill(0);
	//rect(60, 60, 100, 100);
}

function drawGrid() {
	stroke(200);
	fill(120);

	for (var x=-width; x < width; x+=40) {
    print(x + " "+ (-height) + " "+ x + " "+ height);
		line(x, -height, x, height);
		text(x, x+1, 12);
	}
	for (var y=-height; y < height; y+=40) {
		line(-width, y, width, y);
		text(y, 1, y+12);
	}
}*/



function myFunction(a, b) {
    return a * b;            // Function returns the product of a and b
}
var x = myFunction(4, 3);    // Function is called, return value will end up in x
console.log(x);
