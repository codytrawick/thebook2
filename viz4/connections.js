var svg = d3.select("#viz"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

// CONSTS
var TWOPI = 2 * Math.PI;
var ANIMATIONSTEP = 200;
var CIRCLERADIUS = 300;
var NODERADIUS = 30;

// console.log(d3.curveBundle);

var errorOutput = d3.select("#errors");

var labelNodes = [];

svg.select("#studentNode")
  .append("circle")
  .attr("cx", NODERADIUS)
  .attr("cy", NODERADIUS)
  .attr("r", NODERADIUS)

svg.select("#logo")
  .attr("x", width / 2 - 100)
  .attr("y", height / 2 - 50);

function parseResults(error, students, mentors, huddle1, huddle2, shopTalk, powerMeals) {
  if (error) {
    console.error(error);
    throw("An error occured");
  }

  var nodesById = {};
  var links = [];

  students.forEach(function(d, i) {
    d.fullName = d["First Name"] + " " + d["Last Name"];
    nodesById[d.fullName] = d;
    d.theta = TWOPI * i / students.length;
    d.r = CIRCLERADIUS;
    // d.x = width / 2 + (NODERADIUS * 1.25 * (i + .5) * Math.pow(-1, i));
    // d.y = 600;
    d.x = width / 2 + Math.cos(d.theta) * d.r;
    d.y = height / 2 + Math.sin(d.theta) * d.r;
  });

  var c = 0;

  mentors.forEach(function(d) {
    if (nodesById[d.Name] == undefined) {
      d.fullName = d.Name;
      nodesById[d.fullName] = d;
      d.theta = TWOPI * c / 31;
      d.r = CIRCLERADIUS * 1.5;
      // d.x = width / 2 + (NODERADIUS * 1.25 * (i + .5) * Math.pow(-1, i));
      // d.y = 600;
      d.x = width / 2 + Math.cos(d.theta) * d.r;
      d.y = height / 2 + Math.sin(d.theta) * d.r;
      c++;
    }
    students.forEach(function(s) {
      if (s["Week " + d.Week] == '1' || s["Mashup " + d.Week] == "1") {
        links.push({"source":nodesById[d.Name], "target":s});
      }
    })
  })


  huddle1.forEach(function(d) {
    d.Name = d["First Name"] + " " + d["Last Name"];
    if (nodesById[d.Name] == undefined) {
      d.fullName = d.Name;
      nodesById[d.fullName] = d;
      d.theta = TWOPI * c / 19;
      d.r = CIRCLERADIUS * .75;
      // d.x = width / 2 + (NODERADIUS * 1.25 * (i + .5) * Math.pow(-1, i));
      // d.y = 600;
      d.x = width * 0.2 + Math.cos(d.theta) * d.r;
      d.y = height * 0.2 + Math.sin(d.theta) * d.r;
      c++;
    }
    students.forEach(function(s) {
      if (s["Honeywell Huddle"] == "6/14 Design Thinking") {
        links.push({"source":nodesById[d.Name], "target":s});
      }
    })
  })

  labelNodes.push({
    "name":"Honeywell Huddle",
    "date":"June 14",
    "x":width * 0.2,
    "y":height * 0.2
  })

  huddle2.forEach(function(d) {
    d.Name = d["First Name"] + " " + d["Last Name"];
    if (nodesById[d.Name] == undefined) {
      d.fullName = d.Name;
      nodesById[d.fullName] = d;
      d.theta = TWOPI * c / 17;
      d.r = CIRCLERADIUS * .75;
      // d.x = width / 2 + (NODERADIUS * 1.25 * (i + .5) * Math.pow(-1, i));
      // d.y = 600;
      d.x = width * 0.2 + Math.cos(d.theta) * d.r;
      d.y = height * 0.8 + Math.sin(d.theta) * d.r;
      c++;
    }
    students.forEach(function(s) {
      if (s["Honeywell Huddle"] == "6/14 Design Thinking") {
        links.push({"source":nodesById[d.Name], "target":s});
      }
    })
  })

  labelNodes.push({
    "name":"Honeywell Huddle",
    "date":"July 18",
    "x":width * 0.2,
    "y":height * 0.8
  })

  shopTalk.forEach(function(d) {
    d.Name = d["First Name"] + " " + d["Last Name"];
    if (nodesById[d.Name] == undefined) {
      d.fullName = d.Name;
      nodesById[d.fullName] = d;
      d.theta = TWOPI * c / 7;
      d.r = CIRCLERADIUS * .5;
      // d.x = width / 2 + (NODERADIUS * 1.25 * (i + .5) * Math.pow(-1, i));
      // d.y = 600;
      d.x = width * 0.8 + Math.cos(d.theta) * d.r;
      d.y = height * 0.2 + Math.sin(d.theta) * d.r;
      c++;
    }
    students.forEach(function(s) {
      if (s["Shop Talk"] != undefined) {
        links.push({"source":nodesById[d.Name], "target":s});
      }
    })
  })

  labelNodes.push({
    "name":"Shop Talk",
    "date":"June 21",
    "x":width * 0.8,
    "y":height * 0.2
  })

  for (var i = 0; i < students.length; i++) {
    for (var j = i + 1; j < students.length; j++) {
      links.push({"source":students[i], "target":students[j]});
    }
  }

  var powerMealOnly = [];

  powerMeals.forEach(function(pM) {
    pM.forEach(function(d, i) {
      d.Name = d["First Name"] + " " + d["Last Name"];
      if (nodesById[d.Name] == undefined) {
        nodesById[d.Name] = d;
        powerMealOnly.push(d);
        d.attendees = pM;
      } else {
        pM[i] = nodesById[d.Name];
      }
    })
  });

  labelNodes.push({
    "name":"Power Meals",
    "date":"It Varies",
    "x":width * 0.8,
    "y":height * 0.8
  })

  powerMeals.forEach(function(pM) {
    pM.forEach(function(d, i) {
      for (var j = 0; j < i; j++) {
        let l = {"source":d, "target":pM[j]};
        links.push(l);
      }
    })
  })

  powerMealOnly.forEach(function(d, i) {
    d.theta = TWOPI * i / powerMealOnly.length;
    d.r = CIRCLERADIUS * 0.8;
    d.x = width * 0.8 + Math.cos(d.theta) * d.r;
    d.y = height * 0.8 + Math.sin(d.theta) * d.r;
  });

  var nodeData = Object.entries(nodesById);
  var nodeSelect = d3.select("#nodes").selectAll("g")
    .data(nodeData);


  nodeSelect.enter()
    .append("g")
    .attr("transform", function(d) {
       return "translate(" + [d[1].x - NODERADIUS, d[1].y - NODERADIUS] + ")" ;
     })
    // .attr("width", NODERADIUS * 2)
    // .attr("height", NODERADIUS * 2)
    .append("image")
    .attr("height", NODERADIUS * 2)
    .attr("width", NODERADIUS * 2)
    .attr("xkit:href", function(d) { return "../Photos/" + d[0] + ".png"})
    .on("mouseenter", function(d) {
      linkUpdate.classed("link--hover", function(s) { return s.source == d[1] || s.target == d[1]; })
    })
    .on("mouseleave", function(d) {
      linkUpdate.classed("link--hover", false)
    })
    .on("error", function(d) {
      d3.event.stopPropagation();
      d3.select(this)
        .on("error", function(d) {
          errorOutput.append("p")
            .text(d[0])
        })
        .attr("xkit:href", function(d) { return "../Photos/" + d[0] + ".jpg"})
      // return "this.onerror = null; this.href='Cody Trawick.png';";
    })
    .append("title")
      .text(function(d) { return d[0]; })

    var linkSelect = d3.select("#links").selectAll("path")
      .data(links);

    function arcPath(link) {
      let s = link.source;
      let t = link.target;
      if (s.y == t.y) {
        let r = Math.abs(s.x - t.x) / 4;
        return `M ${s.x} ${s.y}
                C ${s.x} ${s.y + r}
                ${t.x} ${t.y + r}
                ${t.x} ${t.y}
        `
      } else {
        return `M ${s.x} ${s.y}
                C ${s.x} ${(s.y + t.y) / 2}
                ${t.x} ${(s.y + t.y) / 2}
                ${t.x} ${t.y}
        `
      }
    }

    linkSelect.enter()
        .append("path")
        .attr("d", arcPath);

   var linkUpdate = d3.selectAll("path");

   labelNodes.forEach(function(lN) {
     let g = d3.select("#nodes")
      .append("g")
      .attr("transform", "translate(" + [lN.x, lN.y] + ")")
      .attr("text-anchor", "middle")

    g.append("circle")
      .attr("r", NODERADIUS * 3)
      .classed("label", true)

    g.append("text")
      .text(lN.name)
      .classed("strong", true)

    g.append("text")
      .text(lN.date)
      .attr("y", 20)
   })


}

var powerMeals = function(callback) {
  let q2 = d3.queue();
  q2.defer(d3.csv, "Power Meal 6-13.csv");
  q2.defer(d3.csv, "Power Meal 6-26.csv");
  q2.defer(d3.csv, "Power Meal 7-11.csv");
  q2.defer(d3.csv, "Power Meal 7-18.csv");
  q2.defer(d3.csv, "Power Meal 7-27.csv");
  q2.awaitAll(function(err, results) {
    if (err) {
      console.error(err);
    }
    callback(null, results);
  })
}

var q = d3.queue();
q.defer(d3.tsv, "sbxa.tsv");
q.defer(d3.csv, "mentors.tsv");
q.defer(d3.csv, "Honeywell Huddle June.csv");
q.defer(d3.csv, "Honeywell Huddle July.csv");
q.defer(d3.csv, "Shop Talk.csv");
q.defer(powerMeals)
// q.defer(d3.tsv, "week6.tsv");
// q.defer(d3.tsv, "week7.tsv");
q.await(parseResults);
