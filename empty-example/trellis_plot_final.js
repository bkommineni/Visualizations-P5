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
let states_vals_map_x ;
let states_vals_map_y ;
let no_of_Records ;
let states = [];
let text_width_box_trellis;
let states_total_vals_x_max;
let states_total_vals_x_min;
let states_total_vals_y_max;
let states_total_vals_y_min;

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
  text_width_box_trellis = 20;
  //original table has 117965 records; it is taking lot of
  //time to create scatter plot;created a variable to try with
  //smaller sizes
  no_of_Records = 50000;

  states_vals_map_x = new Map();
  states_vals_map_y = new Map();

  //can try different states if needed
  //note - change matrix size if adding extra states and make sure that
  //its a square matrix
  states.push('California');
  states.push('Florida');
  states.push('New York');
  states.push('Texas');
  states.push('Illinois');
  states.push('Michigan');
  states.push('Virginia');
  states.push('Minnesota');
  states.push('North Carolina');

  attributes.push('Totals.Violent.All');
  attributes.push('Totals.Property.All');

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
  line(0,text_width_box_trellis,(width - 2*margin),text_width_box_trellis);

  for(var j=0;j<matrix_size-1;j++)
  {
    push();
    translate(0,matrix_cell_height*(j+1));
    line(0,0,(width - 2*margin),0);
    line(0,text_width_box_trellis,(width - 2*margin),text_width_box_trellis);
    pop();
  }
  pop();

}

function loadDataPointsForScatterPlot(attributes_list) {

  for(var i=0;i<states.length;i++)
  {
    var arr_x = [];
    var arr_y = [];

    for(var r=0;r<table.getRowCount();r++)
    {
        if(table.getString(r,'State') == states[i])
        {
          arr_x.push(table.getNum(r,'Totals.Violent.All'));
          arr_y.push(table.getNum(r,'Totals.Property.All'));
        }

    }
    states_vals_map_x.set(states[i],arr_x);
    states_vals_map_y.set(states[i],arr_y);
  }

  var states_total_vals_x = [];
  var states_total_vals_y = [];

  for(var i=0;i<states.length;i++)
  {
    var arr_x = states_vals_map_x.get(states[i]);
    var arr_y = states_vals_map_y.get(states[i]);
    states_total_vals_x.push(...arr_x);
    states_total_vals_y.push(...arr_y);
  }

  states_total_vals_x_max = Math.max(...states_total_vals_x);
  states_total_vals_x_min = Math.min(...states_total_vals_x);

  states_total_vals_y_max = Math.max(...states_total_vals_y);
  states_total_vals_y_min = Math.min(...states_total_vals_y);

  var i=0;
  push();
  translate(margin,margin);
  for(var m=0;m<matrix_size;m++)
  {
    for(var n=0;n<matrix_size;n++)
    {
      var state_vals_x = states_vals_map_x.get(states[i]);
      var state_vals_y = states_vals_map_y.get(states[i]);

      for(var p=0;p<no_of_Records;p++)
      {
        push();
        translate(matrix_cell_width*(m),matrix_cell_height*(n));

        var x = state_vals_x[p];
        var x_mappedVal = map(x,
                            states_total_vals_x_min,states_total_vals_x_max,
                            (margin+(m*matrix_cell_width)+10),
                            (height - margin - matrix_cell_width*(matrix_size-m-1)-10));

        var y = state_vals_y[p];
        var y_mappedVal = map(y,
                            states_total_vals_y_min,states_total_vals_y_max,
                            (margin+(n*matrix_cell_height)+ text_width_box_trellis +10),
                            (height - margin - matrix_cell_height*(matrix_size-n-1)-10));

        new DataPoint((x_mappedVal - margin - matrix_cell_width*m),
        (height - y_mappedVal - margin - matrix_cell_height*(matrix_size-n-1) + text_width_box_trellis)).show();
        pop();
      }
      textStyle(BOLD);
      textSize(10);
      textAlign(CENTER);
      text(states[i],matrix_cell_width/2 + (matrix_cell_width *m),
          (matrix_cell_height*n) + text_width_box_trellis/2);
      i = i+ 1;
    }
  }
  pop();
}

function setPlotArea() {

  push();
  textSize(12);
  textStyle(BOLD);
  text('Trellis Plot - County Crime Data',(width - 2*margin)/2,margin/2);
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
  for(var i=0;i<matrix_size;i++)
  {
    push();
    translate(0,matrix_cell_height*(i));
    var max = states_total_vals_y_max;
    var min = states_total_vals_y_min;
    //print(max + " " + min);

    var y_width_val = ((max - min)/10);

    for(var j=0;j<=10;j++)
    {
      var tick = max - (y_width_val*j);
      var mappedVal = map(tick,
                          min,max,(margin+(i*matrix_cell_height)+ text_width_box_trellis +10),
                          (height - margin - matrix_cell_height*(matrix_size-i-1)-10));
      line(0-tick_width,(mappedVal - margin - matrix_cell_height*i),tick_width,
                        (mappedVal - margin - matrix_cell_height*i));
      textSize(8);
      text(Math.ceil(tick).toString(), (0-margin)/2,
           (height - mappedVal - margin - matrix_cell_height*(matrix_size-i-1) + text_width_box_trellis));
    }
    pop();
  }
  textAlign(CENTER);
  text('Totals.Property.All',-50,(height-(2*margin))/2 + 30);
  pop();

}

function plotXTicks() {

  push();
  translate(margin, (height - margin));
  for(var i=0;i<matrix_size;i++)
  {
    push();
    translate(matrix_cell_width*(i),0);
    var max = states_total_vals_x_max;
    var min = states_total_vals_x_min;

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
  textAlign(CENTER);
  text('Totals.Violent.All',(width-(2*margin))/2,margin/2);
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
