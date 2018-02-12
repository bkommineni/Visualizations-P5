let table;
let bars = [];
let width;
let height;
let margin;
let intervals;
let map1;
let total_violent_vals = [];
let states = [];
let max;
let bar_width;
let interval_width_px;
let tick_width;
let text_size;

function preload() {
  table = loadTable('assets/county_crime.csv','csv','header')
}

function setup() {
  width = 2000;
  height = 1000;
  margin = 100;
  intervals = 10;
  bar_width = 20;
  interval_width_px = 80;
  tick_width = 3;
  text_size = 5;

  createCanvas(width,height);
  background(0, 191, 255);

  //load map with values from .csv
  loadMap();

  //setting plot area
  setPlotArea();

  //plot y-axis ticks
  plotYTicks();

  //plot x-axis ticks
  plotXTicks();

  for(var i=0;i<total_violent_vals.length;i++)
  {
    var y = (total_violent_vals[i] * (height-(2*margin)))/max;
    bars.push(new Bar((i*bar_width),(height - (2*margin) - y),bar_width,y));
  }
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
      v = v + table.getNum(r,16);
      map1.set(table.getString(r,'State'),v);
    }
    else {
      map1.set(table.getString(r,'State'),table.getNum(r,16));
    }
  }

  for (var [state, total_violent] of map1) {
    total_violent_vals.push(total_violent);
    states.push(state);
  }

  max = Math.floor(Math.max(...total_violent_vals));

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
  for(var j=0;j<10;j++)
  {
    var z = (height - interval_width_px*(j+1) - (2*margin));
    line(0-tick_width,z,tick_width,z);
    var label = (interval_width_px*(j+1) * max)/(height - (2*margin));
    text(label.toString(), 0-margin, z);
  }
  pop();

}

function plotXTicks() {

  push();
  translate(margin,(height-margin));
  translate(bar_width,0);

  //x-axis ticks
  text_size = 10;
  for(var i=0;i<states.length;i++)
  {
    push();
    line(((i*bar_width) + (bar_width/2)),tick_width,((i*bar_width) + (bar_width/2)),-tick_width);
    //textSize(text_size);
    //text(states[i].toString(), (i*bar_width) + (bar_width/2), 5);
    pop();
  }
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
    noFill();
    rect(this.x,this.y,this.width,this.height);
  }
}
