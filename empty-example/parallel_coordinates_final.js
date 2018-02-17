let table;
let width;
let height;
let margin;
let intervals;
let y_max;
let x_max;
let bar_width;
let interval_width_px;
let tick_width;
let text_size;
let data_points = [];
let attributes = [];
let attributes_vals = [];
let no_of_Records ;
let data_records = [];

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

  //original table has 117965 records; it is taking lot of
  //time to create scatter plot;created a variable to try with
  //smaller sizes
  no_of_Records = 200;
  attributes.push('Population');
  attributes.push('Totals.Violent.All');
  attributes.push('Totals.Violent.Assault');
  attributes.push('Totals.Violent.Murder');
  attributes.push('Totals.Violent.Rape');
  attributes.push('Totals.Violent.Robbery');

  for(var i=0;i<attributes.length;i++)
  {
    attributes_vals.push([]);
  }

  createCanvas(width,height);
  background(245,255,250);

  //setting plot area
  setPlotArea();

  setParallelAxes();

  //load data points with values from .csv
  loadDataPointsForScatterPlot(attributes);

  //plot y-axis ticks
  plotYTicks();

  plotDataPoints();

}

function plotDataPoints() {

  var width_btwn_parllel_axes = (height - (2*margin))/(attributes.length + 1);
  push();
  translate(margin,margin);
  for(var j=0;j<data_records.length;j++)
  {
    for(var i=0;i<(data_records[j].length - 1);i++)
    {
      push();
      translate(width_btwn_parllel_axes*(i+1),0);
      stroke(0,191,255);
      line(data_records[j][i].getPoint_x_cord(),data_records[j][i].getPoint_y_cord() - margin,
           (data_records[j][i+1].getPoint_x_cord() + width_btwn_parllel_axes),
           data_records[j][i+1].getPoint_y_cord() - margin);
      pop();
    }
  }
  pop();
}

function setParallelAxes() {

  var width_btwn_parllel_axes = (height - (2*margin))/(attributes.length + 1);
  push();
  translate(margin,margin);
  for(var i=0;i<attributes.length;i++)
  {
    push();
    translate(width_btwn_parllel_axes*(i+1),0);
    textAlign(CENTER);
    textSize(7);
    text(attributes[i],0,-(margin/4));
    line(0,0,0,(height - 2*margin));
    pop();
  }
  pop();

}

function loadDataPointsForScatterPlot(attributes_list) {

  for(var r=0;r<no_of_Records;r++)
  {
    for(var m=0;m<attributes_list.length;m++)
    {
      attributes_vals[m].push(table.getNum(r,attributes_list[m]));
    }
  }

  var width_btwn_parllel_axes = (height - (2*margin))/(attributes.length + 1);
  push();
  translate(margin,margin);
  for(var i=0;i<no_of_Records;i++)
  {
    var data_record = [];
    for(var j=0;j<attributes.length;j++)
    {
      push();
      translate(width_btwn_parllel_axes*(j+1),0);
      var max = Math.max(...attributes_vals[j]);
      var min = Math.min(...attributes_vals[j]);
      var point = attributes_vals[j][i];
      var point_mappedVal = map(point,
                          min,max,(margin+10),
                          (height - margin-10));
      data_record.push(new DataPoint(0,point_mappedVal));
      pop();
    }
    data_records.push(data_record);
  }
  pop();

}

function setPlotArea() {

  push();
  text('Parallel Coordinates - County Crime Data',(width - 2*margin)/2,margin/2);
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

  var width_btwn_parllel_axes = (height - (2*margin))/(attributes.length + 1);
  push();
  translate(margin, margin);
  for(var i=0;i<attributes.length;i++)
  {
    push();
    translate(width_btwn_parllel_axes*(i+1),0);
    var max = Math.max(...attributes_vals[i]);
    var min = Math.min(...attributes_vals[i]);

    var y_width_val = ((max - min)/10);

    for(var j=0;j<=10;j++)
    {
      var tick = max - (y_width_val*j);
      var mappedVal = map(tick,
                          min,max,(margin+10),
                          (height - margin -10));
      line(0-tick_width,(mappedVal - margin),tick_width,
                        (mappedVal - margin));
      textSize(8);
      text(Math.ceil(tick).toString(), (0-margin)/2,
           (height - mappedVal - margin));
    }
    pop();
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
    strokeWeight(3);
    point(this.x,this.y);
  }

  getPoint_x_cord() {
    return(this.x);
  }

  getPoint_y_cord() {
    return(this.y);
  }
}
