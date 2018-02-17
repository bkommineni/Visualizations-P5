let table;
let width;
let height;
let margin;
let intervals;
let map1;
let total_violent_vals = [];
let years = [];
let y_max;
let x_max;
let y_min;
let x_min;
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

  plotYLabel();

  plotXLabel();

  years.sort(function(a, b){return a - b});

  push();
  translate(margin,margin);

  for(var k=0;k<(years.length-1);k++)
  {
    var pop_val = map1.get(years[k].toString());

    var mappedVal_y = map(pop_val,
                        y_min,y_max,(margin+10),
                        (height - margin -10));

    var mappedVal_x = map(years[k],
                        x_min,x_max,(margin+10),
                        (width - margin -10));
    print(mappedVal_x + " "+ mappedVal_y);

    var pop_val_next = map1.get(years[k+1].toString());

    var mappedVal_y_next = map(pop_val_next,
                        y_min,y_max,(margin+10),
                        (height - margin -10));

    var mappedVal_x_next = map(years[k+1],
                        x_min,x_max,(margin+10),
                        (width - margin -10));


    var plot_val_next = (pop_val_next * (height-(2*margin)))/y_max;


    push();
    strokeWeight(8);
    stroke(11,211,211);
    point((mappedVal_x - margin),(height - mappedVal_y - margin));
    pop();
    line((mappedVal_x - margin),(height - mappedVal_y - margin),
         (mappedVal_x_next - margin),(height - mappedVal_y_next - margin));
  }
  var pop_val = map1.get(years[k].toString());

  var mappedVal_y = map(pop_val,
                      y_min,y_max,(margin+10),
                      (height - margin -10));

  var mappedVal_x = map(years[k],
                      x_min,x_max,(margin+10),
                      (width - margin -10));
  push();
  strokeWeight(8);
  stroke(11,211,211);
  point((mappedVal_x - margin),(height - mappedVal_y - margin));
  pop();
  pop();
}

function plotYLabel() {
  push();
  textAlign(CENTER);
  text('Totals.Violent.All',margin/2,(height-2*margin)/2);
  pop();
}

function plotXLabel() {
  push();
  translate(margin,(height-margin));
  textAlign(CENTER);
  text('Year',(width-2*margin)/2,margin/2);
  pop();
}

function loadMap() {

  map1 = new Map();
  for(var r=0;r<table.getRowCount();r++)
  {
    if(map1.has(table.getString(r,'Year').toString()))
    {
      var v = map1.get(table.getString(r,'Year').toString());
      v = v + table.getNum(r,16);
      map1.set(table.getString(r,'Year'),v);
    }
    else {
      map1.set(table.getString(r,'Year'),table.getNum(r,'Totals.Violent.All'));
    }
  }

  for (var [year, total_violent] of map1) {
    total_violent_vals.push(total_violent);
    years.push(year);
  }

  y_max = Math.ceil(Math.max(...total_violent_vals));
  y_min = Math.ceil(Math.min(...total_violent_vals));
  x_max = Math.ceil(Math.max(...years));
  x_min = Math.ceil(Math.min(...years));

}

function setPlotArea() {

  push();
  textSize(12);
  textStyle(BOLD);
  text('Line Chart - County Crime Data',(width - 2*margin)/2,margin/2);
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

  var gap = (width - 2*margin)/years.length;
  push();
  translate(margin,(height-margin));

  //x-axis ticks
  for(var i=0;i<years.length;i++)
  {
    var mappedVal = map(years[i],
                        x_min,x_max,(margin+10),
                        (width - margin -10));
    push();
    line((mappedVal-margin),tick_width,(mappedVal - margin),-tick_width);
    textSize(7);
    textAlign(CENTER);
    text(years[i].toString(), (mappedVal - margin), 10);
    pop();
  }
  pop();

}
