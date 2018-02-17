let table;
let width;
let height;
let margin;
let intervals;
let y_max;
let x_max;
let z_max;
let bar_width;
let interval_width_px;
let tick_width;
let text_size;
let data_points = [];
let total_violent_vals = [];
let pop_vals = [];
let total_property_vals = [];
let data_point_scale;

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
  data_point_scale = 10;

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

function loadDataPointsForScatterPlot() {

  for(var r=0;r<table.getRowCount();r++)
  {
    total_violent_vals.push(table.getNum(r,'Totals.Violent.All'));
    pop_vals.push(table.getNum(r,'Population'));
    total_property_vals.push(table.getNum(r,'Totals.Property.All'));
  }

  y_max = Math.ceil(Math.max(...total_property_vals));
  x_max = Math.ceil(Math.max(...total_violent_vals));
  z_max = Math.ceil(Math.max(...pop_vals));

  for(var r=0;r<table.getRowCount();r++)
  {
    var y = (table.getNum(r,'Totals.Property.All')* (height - (2*margin)))/y_max;
    var x = (table.getNum(r,'Totals.Violent.All')* (width - (2*margin)))/x_max;
    var z = (table.getNum(r,'Population')*data_point_scale)/z_max;
    data_points.push(new DataPoint((x) ,(height - 2*margin - y),z));
  }

}

function setPlotArea() {

  push();
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
  for(var j=0;j<=10;j++)
  {
    var z = (height - interval_width_px*(j) - (2*margin));
    line(0-tick_width,z,tick_width,z);
    var label = (interval_width_px*(j) * y_max)/(height - (2*margin));
    text(label.toString(), 0-margin, z);
  }
  pop();

}

function plotXTicks() {

  push();
  translate(margin,(height-margin));
  for(var j=0;j<=10;j++)
  {
    var z = interval_width_px*(j);
    line(z,0-tick_width,z,tick_width);
    var label = (interval_width_px*(j) * x_max)/(width - (2*margin));
    textAlign(CENTER);
    text(label.toString(), z , margin-50);
  }
  pop();

}

class DataPoint {
  constructor(x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  show() {
    stroke(0,191,255);
    strokeWeight(this.z);
    point(this.x,this.y);
  }
}
