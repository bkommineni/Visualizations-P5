let table;
let bars = [];
let width;
let height;
let margin;
let intervals;
let map1;
let total_violent_vals = [];
let states = [];
let y_max;
let y_min = 0;
let bar_width;
let interval_width_px;
let tick_width;
let text_size;

function preload() {
  table = loadTable('assets/county_crime.csv','csv','header')
}

function setup() {
  width = 800;
  height = 800;
  margin = 100;
  intervals = 10;
  bar_width = 11.5;
  interval_width_px = (height - 2*margin)/10;
  tick_width = 3;
  text_size = 5;

  createCanvas(width,height);
  background(245,255,250);

  //load map with values from .csv
  loadMap();

  //setting plot area
  setPlotArea();

  //plot y-axis ticks
  plotYTicks();

  //plot x-axis ticks
  plotXTicks();

  //plot x-axis label
  plotXLabel();

  //plot y-axis label
  plotYLabel();

  push();
  translate(margin,margin);
  for(var i=0;i<total_violent_vals.length;i++)
  {
    var mappedVal = map(total_violent_vals[i],
                        y_min,y_max,(margin+10),
                        (height - margin -10));

    print(mappedVal);
    bars.push(new Bar((i*bar_width),(height - margin - mappedVal),bar_width,
                     mappedVal - margin));
  }
  pop();
}

function draw() {
  push();
  translate(margin,margin);
  translate(bar_width,0);
  for(var m=0;m<bars.length;m++)
  {
    bars[m].show();
  }
  pop();
}

function loadMap() {

  map1 = new Map();
  for(var r=0;r<table.getRowCount();r++)
  {
    if(map1.has(table.getString(r,'State').toString()))
    {
      var v = map1.get(table.getString(r,'State').toString());
      v = v + table.getNum(r,'Totals.Violent.All');
      map1.set(table.getString(r,'State'),v);
    }
    else {
      map1.set(table.getString(r,'State'),table.getNum(r,'Totals.Violent.All'));
    }
  }

  for (var [state, total_violent] of map1) {
    total_violent_vals.push(total_violent);
    states.push(state);
  }

  y_max = Math.ceil(Math.max(...total_violent_vals));

}

function setPlotArea() {

  push();
  textSize(12);
  textStyle(BOLD);
  text('Bar Chart - County Crime Data',(width - 2*margin)/2,margin/2);
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
                        (height - margin -10));
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
  translate(margin,(height-margin));
  translate(bar_width,0);

  //x-axis ticks
  push();
  text_size = 10;
  for(var i=0;i<states.length;i++)
  {
    line(((i*bar_width) + (bar_width/2)),tick_width,((i*bar_width) + (bar_width/2)),-tick_width);
    textSize(4);
    textAlign(LEFT);
    text(states[i].toString(), (i*bar_width) + (bar_width/2), 5);
  }
  pop();
  pop();

}

function plotXLabel() {

  push();
  translate(margin,(height-margin));
  textAlign(CENTER);
  text('States',(width-(2*margin))/2,20);
  pop();

}

function plotYLabel() {

  push();
  translate(margin, margin);
  textAlign(CENTER);
  text('Totals.Violent.All',-50,(height-(2*margin))/2 + 30);
  pop();

}

class Bar {
  constructor(x,y,width,height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  show() {
    stroke(255);
    strokeWeight(1);
    fill(11,211,211);
    rect(this.x,this.y,this.width,this.height);
  }
}
