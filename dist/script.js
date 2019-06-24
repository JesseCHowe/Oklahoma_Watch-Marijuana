  var width = 800,
    height = 600;

  var svg = d3.select("svg")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  var color = d3.scale.threshold()
    .domain([0, 1, 6, 12, 18, 24, 30, 41, 47])
    .range(['#efefef', '#ddd','#377359', '#3d995f', '#84aa5','#bdbd3c','#329b51',"#f3d110"]);

  var projection = d3.geo.mercator()
    .center([-9.15, 35.03])
    .rotate([90.90, 0])
    .scale(5000)
    .translate([width / 2.9, height / 2]);

  var geoPath = d3.geo.path()
    .projection(projection);

  queue()
    .defer(d3.json, "https://gist.githubusercontent.com/JesseCHowe/e1cfe815f163f5789ae92a1c80f746dc/raw/b0c3c63af19c16c63b4e0a1f7810f60bfff30a15/Oklahoma_Marijuana.json")
    .await(ready);

  function ready(error, counties) {
    

 
  var div = d3.select(".tooltip_contain").append("div")
        .data(counties.features)
    .attr("class", "tooltip")
    .style("opacity", 1);

         /*svg.append("text")
      .attr("x", 0)
      .attr("y", 255)
    .attr("opacity",0.5)
    .attr("font-size", 14)
      .attr("dy", ".35em")
      .text("Wyandotte County");*/

   svg.append("g")
      .selectAll("path")
      .data(counties.features)
      .enter()
      .append("path")
      .attr("d", geoPath)
      .attr("class", "county")
      .style('stroke', function(d) {
        return color(d.properties['Marijuana Ok Watch Complete_Processors'])
      })
      .style('fill', function(d) {
        return color(d.properties['Marijuana Ok Watch Complete_Processors'])
      })
          .on("mouseover", function(d) {
        d3.selectAll(".county").style("opacity", 0.25);
     d3.select(this).style("opacity", 1);
        div.transition().duration(300)
          .style("opacity", 1)

        div.html("<div class='desc'>ZIP: " + (d.properties['GEOID10']) + "</br>" + (d.properties['Marijuana Ok Watch Complete_City']) +", OK" + "</br>" + "Dispensaries: <strong>" + (d.properties['Marijuana Ok Watch Complete_Dispensaries']) + "</strong></br>" + "Processors: <strong>"+(d.properties['Marijuana Ok Watch Complete_Processors']) + "</strong></br>" + "Growers: <strong>" +(d.properties['Marijuana Ok Watch Complete_Growers']) + "</strong></div>")

          //.style("left", (d3.event.pageX) + "px")
          //.style("top", (d3.event.pageY + 30) + "px")
       ;
      })
      .on("mouseout", function() {
        d3.selectAll('.county')
          .style("opacity", 1);
        div.transition().duration(300)
          .style("opacity", 0);
      });
    //Labels

            var select = d3.select(".menu div select");
    select.on("change", function(d) {
      myFunction();
    });
    
        select
      .selectAll("option")
      .data(counties.features)
      .enter()
      .append("option")
      .attr("value", function(d) {
        return "i" + d.properties['GEOID10'];
      })
      .attr("class", function(d) {
        return "i" + d.properties['GEOID10'];
      })
      .text(function(d) {
        return d.properties['GEOID10'];
      });
    
    
    
    
    var linearV = d3.scale.linear()
    .domain([0, 1, 6, 12, 18, 24, 30, 41, 47])
    .range(['#efefef', '#ddd','#377359', '#3d995f', '#84aa5','#bdbd3c','#329b51',"#f3d110"]);
    svg.append("g")
        .attr("class", "legendV")
        .attr("transform", "translate(40,200)");
    
    var legendV = d3.legend.color()
                              .shapeWidth(20)
                              .cells(10)
                              .title("Dispensaries")
                              .labelFormat(d3.format('.0f'))
                              .scale(linearV);
    svg.select(".legendV")
        .call(legendV);
    
  }

      function showResults() {
      //svg.selectAll(".county").attr("display","none");
        svg.selectAll(".county")
          .style('fill', function(d) {
        return color(d.properties['Marijuana Ok Watch Complete_Dispensaries'])
      })
        .style('stroke', function(d) {
        return color(d.properties['Marijuana Ok Watch Complete_Dispensaries'])
      })
}

      function showMargin() {
      //svg.selectAll(".county").attr("display","none");
        svg.selectAll(".county").style('fill', function(d) {
        return color(d.properties['Marijuana Ok Watch Complete_Processors'])
      })
              .style('stroke', function(d) {
        return color(d.properties['Marijuana Ok Watch Complete_Processors'])
      })
}

      function showMargin2() {
      //svg.selectAll(".county").attr("display","none");
        svg.selectAll(".county").style('fill', function(d) {
        return color(d.properties['Marijuana Ok Watch Complete_Growers'])
      })
              .style('stroke', function(d) {
        return color(d.properties['Marijuana Ok Watch Complete_Growers'])
      })
}