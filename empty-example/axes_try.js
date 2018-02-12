function setup() {

  var width = 500;
  var height = 500;
  var margin = 50;
  var intervals = 10;
  var plot_width = (width - (2*margin));
  var plot_height = (width - (2*margin));

  createCanvas(width,height);
  background(0, 191, 255);

  //strokeWeight(2);
  //stroke(51);
  //rect(50,50,(width-100),(height-100));

  //translate(margin, 0);
  //line(0,0,0,height);
  //strokeWeight(8);
  //stroke(51);
  //line(0,height,width,height);

  push();
  textSize(8);
  //angleMode(DEGREES);
  //rotate(90);
  //textAlign(LEFT,TOP);
  translate(20,40);
  rotate(PI/2.0);
  text('Hello', 40, 80);
  pop();

}
