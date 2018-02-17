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
let total_violent_vals = [];
let pop_vals = [];
let matrix_size ;
let matrix_cell_width ;
let matrix_cell_height ;
let attributes = [];
let attributes_vals = [];
let no_of_Records ;

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
  matrix_size = 3;
  matrix_cell_width = (width - 2*margin)/matrix_size;
  matrix_cell_height = (height - 2*margin)/matrix_size;
  //original table has 117965 records; it is taking lot of
  //time to create scatter plot;created a variable to try with
  //smaller sizes
  no_of_Records = 1000;
  attributes.push('Population');
  attributes.push('Totals.Violent.All');
  attributes.push('Totals.Property.All');

  for(var i=0;i<attributes.length;i++)
  {
    attributes_vals.push([]);
  }

  createCanvas(width,height);
  background(245,255,250);

  //setting plot area
  setPlotArea();

  //draw matrix cells
  drawMatrixCells();

  //load data points with values from .csv
  loadDataPointsForScatterPlot(attributes);

  //plot y-axis ticks
  plotYTicks();

  //plot x-axis ticks
  plotXTicks();

}

function drawMatrixCells() {

  push();
  translate(margin,margin);
  for(var i=0;i<matrix_size-1;i++)
  {
    push();
    translate(matrix_cell_width*(i+1),0);
    line(0,0,0,(height - 2*margin));
    pop();
  }
  pop();

  push();
  translate(margin,margin);
  for(var j=0;j<matrix_size-1;j++)
  {
    push();
    translate(0,matrix_cell_height*(j+1));
    line(0,0,(width - 2*margin),0)
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

  push();
  translate(margin,margin);
  for(var m=0;m<attributes_list.length;m++)
  {
    for(var n=0;n<attributes_list.length;n++)
    {
      for(var p=0;p<no_of_Records;p++)
      {
        push();
        translate(matrix_cell_width*(m),matrix_cell_height*(n));
        var x_max = Math.max(...attributes_vals[m]);
        var x_min = Math.min(...attributes_vals[m]);
        var x = attributes_vals[m][p];
        var x_mappedVal = map(x,
                            x_min,x_max,(margin+(m*matrix_cell_width)+10),
                            (height - margin - matrix_cell_width*(matrix_size-m-1)-10));

        var y_max = Math.max(...attributes_vals[n]);
        var y_min = Math.min(...attributes_vals[n]);
        var y = attributes_vals[n][p];
        var y_mappedVal = map(y,
                        y_min,y_max,(margin+(n*matrix_cell_height)+10),
                        (height - margin - matrix_cell_height*(matrix_size-n-1)-10));

        new DataPoint((x_mappedVal - margin - matrix_cell_width*m),
                      (height - y_mappedVal - margin - matrix_cell_height*(matrix_size-n-1))).show();
        pop();
      }
    }
  }
  pop();
}

function setPlotArea() {

  push();
  textSize(12);
  textStyle(BOLD);
  text('Scatter plot matrix - County Crime Data',(width - 2*margin)/2,margin/2);
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
  for(var i=0;i<attributes.length;i++)
  {
    push();
    translate(0,matrix_cell_height*(i));
    textAlign(LEFT);
    text(attributes[i],-margin,margin);
    var max = Math.max(...attributes_vals[i]);
    var min = Math.min(...attributes_vals[i]);

    var y_width_val = ((max - min)/10);

    for(var j=0;j<=10;j++)
    {
      var tick = max - (y_width_val*j);
      var mappedVal = map(tick,
                          min,max,(margin+(i*matrix_cell_height)+10),
                          (height - margin - matrix_cell_height*(matrix_size-i-1)-10));
      line(0-tick_width,(mappedVal - margin - matrix_cell_height*i),tick_width,
                        (mappedVal - margin - matrix_cell_height*i));
      textSize(8);
      text(Math.ceil(tick).toString(), (0-margin)/2,
           (height - mappedVal - margin - matrix_cell_height*(matrix_size-i-1)));
    }
    pop();
  }
  pop();

}

function plotXTicks() {

  push();
  translate(margin, (height - margin));
  for(var i=0;i<attributes.length;i++)
  {
    push();
    translate(matrix_cell_width*(i),0);
    textAlign(RIGHT);
    text(attributes[i],margin,margin/2);
    var max = Math.max(...attributes_vals[i]);
    var min = Math.min(...attributes_vals[i]);

    var x_width_val = ((max - min)/10);

    for(var j=0;j<=10;j++)
    {
      var tick = (x_width_val*j);
      var mappedVal = map(tick,
                          min,max,(margin+(i*matrix_cell_width)+10),
                          (height - margin - matrix_cell_width*(matrix_size-i-1)-10));
      line((mappedVal - margin - matrix_cell_width*i),0-tick_width,
            (mappedVal - margin - matrix_cell_width*i),tick_width);
      textSize(4);
      textAlign(CENTER);
      text(Math.ceil(tick).toString(),
           (mappedVal-margin - matrix_cell_width*i), margin/4);
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
}
