let table;
let width;
let height;
let margin;
let intervals;
let y_max;
let x_max;
let y_min;
let x_min;
let bar_width;
let interval_width_px;
let tick_width;
let text_size;
let data_points = [];
let total_violent_vals = [];
let pop_vals = [];

function preload() {
  table = loadTable('assets/county_crime.csv','csv','header')
}

function setup() {
  width = 800;
  height = 800;
  margin = 100;
  intervals = 10;
  bar_width = 20;
  interval_width_px = (height - 2*margin)/10;
  tick_width = 3;
  text_size = 5;

  createCanvas(width,height);
  background(245,255,250);

  //setting plot area
  setPlotArea();

  //load data points with values from .csv
  loadDataPointsForScatterPlot();

  //plot y-axis ticks
  plotYTicks();

  //plot x-axis ticks
  plotXTicks();

  plotXLabel();

  plotYLabel();

}

function draw() {
  push();
  translate(margin,margin);
  for(var m=0;m<data_points.length;m++)
  {
    data_points[m].show();
  }
  pop();
}

function plotXLabel() {

  push();
  translate(margin,(height-margin));
  textAlign(CENTER);
  text('Totals.Violent.All',(width-(2*margin))/2,margin/2);
  pop();

}

function plotYLabel() {

  push();
  translate(margin, margin);
  textAlign(CENTER);
  text('Population',-50,(height-(2*margin))/2 + 30);
  pop();

}

function loadDataPointsForScatterPlot() {

  for(var r=0;r<table.getRowCount();r++)
  {
    total_violent_vals.push(table.getNum(r,'Totals.Violent.All'));
    pop_vals.push(table.getNum(r,'Population'));
  }

  y_max = Math.ceil(Math.max(...pop_vals));
  y_min = Math.ceil(Math.min(...pop_vals));
  x_max = Math.ceil(Math.max(...total_violent_vals));
  x_min = Math.ceil(Math.min(...total_violent_vals));

  for(var r=0;r<table.getRowCount();r++)
  {
    var y = table.getNum(r,'Population');
    var x = table.getNum(r,'Totals.Violent.All');
    var x_mappedVal = map(x,
                        x_min,x_max,(margin+10),
                        (height - margin -10));
    var y_mappedVal = map(y,
                    y_min,y_max,(margin+10),
                    (height - margin -10));

    data_points.push(new DataPoint((x_mappedVal - margin),
                     (height - y_mappedVal - margin)));
  }

}

function setPlotArea() {

  push();
  textSize(12);
  textStyle(BOLD);
  text('Scatter plot bivariate - County Crime Data',(width - 2*margin)/2,margin/2);
  translate(margin, margin);
  line(0,0,0,(height-(2*margin)));

  translate(0,(height-(2*margin)));
  line(0,0,(width-(2*margin)),0);

  translate((width-(2*margin)),0);
  line(0,0,0,-(height-(2*margin)));

  translate(0,-(height-(2*margin)));
  line(0,0,-(width-(2*margin)),0);
  pop();

}

function plotYTicks() {

  push();
  translate(margin, margin);
  var y_width_val = ((y_max - y_min)/10);

  for(var j=0;j<=10;j++)
  {
    var tick = y_max - (y_width_val*j);
    var mappedVal = map(tick,
                        y_min,y_max,(margin+10),
                        (height - margin-10));
    print(mappedVal);
    line(0-tick_width,(mappedVal - margin),tick_width,
                      (mappedVal - margin));
    textSize(8);
    text(Math.ceil(tick).toString(), (0-margin)/2,
         (height - mappedVal - margin));
  }
  pop();

}

function plotXTicks() {

  push();
  translate(margin, (height - margin));
  var x_width_val = ((x_max - x_min)/10);

  for(var j=0;j<=10;j++)
  {
    var tick = (x_width_val*j);
    var mappedVal = map(tick,
                        x_min,x_max,(margin+10),
                        (height - margin-10));
    line((mappedVal - margin),0-tick_width,
          (mappedVal - margin),tick_width);
    textSize(8);
    textAlign(CENTER);
    text(Math.ceil(tick).toString(),
         (mappedVal-margin), margin/4);
  }
  pop();

}

class DataPoint {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }

  show() {
    stroke(0,191,255);
    strokeWeight(5);
    point(this.x,this.y);
  }
}
