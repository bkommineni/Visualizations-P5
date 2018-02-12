var table;

function preload() {
  table = loadTable('assets/county_crime.csv','csv','header')
}

function setup() {
  var width = 1800;
  var height = 800;
  var margin = 50;
  var intervals = 10;

  createCanvas(width,height);
  background(0, 191, 255);

  var map1 = new Map();

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

  var total_violent_vals = []
  var states = []

  for (var [state, total_violent] of map1) {
    total_violent_vals.push(total_violent);
    states.push(state);
  }

  var max = Math.floor(Math.max(...total_violent_vals));


  var bar_width = 20;
  translate(margin, 0);
  line(0,0,0,height);

  line(0,height,width,height);
  //line(0-margin,(height-margin),width,(height-margin));

  var interval_width_px = 80;
  var tick_width = 5;

  //y-axis ticks
  for(var j=0;j<10;j++)
  {
    var z = (height - interval_width_px*(j+1));
    line(0-tick_width,z,tick_width,z);
    var label = (interval_width_px*(j+1) * max)/height;
    text(label.toString(), 0-margin, z);
  }

  var text_size = 5;

  //x-axis ticks
  for(var i=0;i<states.length;i++)
  {
    push();
    textSize(text_size);
    text(states[i].toString(), (i*bar_width), (height - text_size));
    pop();
  }
  
  for(var i=0;i<total_violent_vals.length;i++)
  {
    var y = (total_violent_vals[i] * height)/max;
    push();
    fill(176,224,230);
    //print((i*bar_width) + " "+ (height - y) + " " + bar_width + " "+ y + " " + (y - margin));
    rect((i*bar_width),(height - y),bar_width,(y));
    pop();
  }

}
