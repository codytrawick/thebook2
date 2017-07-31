var svg = d3.select("#viz"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

// CONSTS
var TWOPI = 2 * Math.PI;
var ANIMATIONSTEP = 200;
var CIRCLERADIUS = 500;
var NODERADIUS = 50;

// console.log(d3.curveBundle);

svg.select("#logo")
  .attr("x", width / 2 - 100)
  .attr("y", height / 2 - 50);

function parseResults(error, students, m1, m2, m3) {
  if (error) {
    console.error(error);
    throw("An error occured");
  }

  var nodesById = {};
  var links = [];

  students.forEach(function(d, i) {
    d.fullName = d["First Name"] + " " + d["Last Name"];
    nodesById[d.fullName] = d;
    // d.theta = TWOPI * i / students.length;
    // d.r = CIRCLERADIUS;
    d.x = width / 2 + (NODERADIUS * 1.25 * (i + .5) * Math.pow(-1, i));
    d.y = 600;
  });

  for (var i = 0; i < students.length; i++) {
    for (var j = i + 1; j < students.length; j++) {
      links.push({"source":students[i], "target":students[j]});
    }
  }

  var nodeData = Object.entries(nodesById);
  var nodeSelect = d3.select("#nodes").selectAll("g")
    .data(nodeData);

  nodeSelect.enter()
    .append("g")
    .attr("transform", function(d) {
       return "translate(" + [d[1].x, d[1].y] + ")" ;
     })
    // .attr("width", NODERADIUS * 2)
    // .attr("height", NODERADIUS * 2)
    .append("image")
    .attr("height", NODERADIUS * 2)
    .attr("width", NODERADIUS * 2)
    .attr("xkit:href", function(d) { return "Photos/" + d[0] + ".png"});

}

var q = d3.queue();
q.defer(d3.tsv, "sbxa.tsv");
q.defer(d3.tsv, "week5.tsv");
q.defer(d3.tsv, "week6.tsv");
q.defer(d3.tsv, "week7.tsv");
q.await(parseResults);
