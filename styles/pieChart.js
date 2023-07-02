var currentDivPieData;

var bronzeData = [{
    rank: "Division IV",
    percentage: 48.53,
    color: "#ba917d"
  },{
    rank: "Division III",
    percentage: 20.20,
    color: "#ba917d"
  },{
    rank: "Division II",
    percentage: 17.99,
    color: "#ba917d"
  },{
    rank: "Division I",
    percentage: 13.28,
    color: "#ba917d"
  },];

var silverData = [{
    rank: "Division IV",
    percentage: 32.82,
    color: "#d5d3e1"
  },{
    rank: "Division III",
    percentage: 23.23,
    color: "#d5d3e1"
  },{
    rank: "Division II",
    percentage: 26.38,
    color: "#d5d3e1"
  },{
    rank: "Division I",
    percentage: 17.57,
    color: "#d5d3e1"
  },];
  
var goldData = [{
    rank: "Division IV",
    percentage: 38.37,
    color: "#fad699"
  },{
    rank: "Division III",
    percentage: 24.15,
    color: "#fad699"
  },{
    rank: "Division II",
    percentage: 22.95,
    color: "#fad699"
  },{
    rank: "Division I",
    percentage: 14.53,
    color: "#fad699"
  },];

var platinumData = [{
    rank: "Division IV",
    percentage: 60.72,
    color: "#6cfbfc"
  },{
    rank: "Division III",
    percentage: 19.86,
    color: "#6cfbfc"
  },{
    rank: "Division II",
    percentage: 12.68,
    color: "#6cfbfc"
  },{
    rank: "Division I",
    percentage: 6.74,
    color: "#6cfbfc"
  },];

var diamondData = [{
    rank: "Division IV",
    percentage: 86.89,
    color: "#2ab1ec"
  },{
    rank: "Division III",
    percentage: 7.44,
    color: "#2ab1ec"
  },{
    rank: "Division II",
    percentage: 3.47,
    color: "#2ab1ec"
  },{
    rank: "Division I",
    percentage: 2.20,
    color: "#2ab1ec"
  },];

//pie chart code
var pieSvg = d3.select(".pieChart")
    width = +pieSvg.attr("width"),
    height = +pieSvg.attr("height"),
    radius = Math.min(width, height) / 2,
    g = pieSvg.append("g").attr("transform", "translate(" + width / 1.95 + "," + height / 1.95 + ") rotate(" + 60 + ")")

var pieData = [{
    rank: "Bronze",
    percentage: 20.4,
    color: "#ba917d",
    text:"Bronze tier is devided into four divisions. To leave each division a player needs to collect 500 RP per division. The entry costs go from 15 to 24, in increments of 3."
  },{
    rank: "Silver",
    percentage: 14.29,
    color: "#d5d3e1",
    text:"Silver tier is devided into four divisions. To leave each division a player needs to collect 600 RP per division. The entry costs go from 27 to 36, in increments of 3."
  },{
    rank: "Gold",
    percentage: 20.17,
    color: "#fad699",
    text:"Gold tier is devided into four divisions. To leave each division a player needs to collect 700 RP per division. The entry costs go from 39 to 48, in increments of 3."
  },{
    rank: "Platinum",
    percentage: 24.92,
    color: "#6cfbfc",
    text:"Platinum tier is devided into four divisions. To leave each division a player needs to collect 700 RP per division. The entry costs go from 51 to 60, in increments of 3."
  },{
    rank: "Diamond",
    percentage: 15.87,
    color: "#2ab1ec",
    text:"Diamond tier is devided into four divisions. To leave each division a player needs to collect 700 RP per division. The entry costs go from 63 to 72, in increments of 3."
  },{
    rank: "Master",
    percentage: 4.13,
    color: "#c97df2",
    text:"Master tier requires a minimum of 15000 RP and the starts at 75 while it increases by 5 for every 1000 RP collected, up to a cost of 175."
  },{
    rank: "Predator",
    percentage: 0.24,
    color: "#f64a41",
    text: "Predator tier has only the top 750 players and the entry cost starts at 75 while it increases by 5 for every 1000 RP collected, up to a cost of 175."
  }];

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.percentage; });

var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 90);

var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var arc = g.selectAll(".arc")
    .data(pie(pieData))
    .enter().append("g")
      .attr("class", "arc");

var percentageText = d3.selectAll(".pieChart").append("text")
        .text("0%")
        .attr("x", radius + 45)
        .attr("y", radius + 10)
        .style("visibility", "hidden");

var rankText = d3.select('.rankText');
rankText.text("Bronze tier is devided into four divisions. To leave each division a player needs to collect 500 RP per division. The entry costs go from 15 to 24, in increments of 3.");

var divPieData = bronzeData;

arc.append("path")
    .attr("d", path)
    .attr("fill", function(d) { return d.data.color; })    
    .on("mouseover", function(d){      
      var name = this.parentNode.lastChild.innerHTML; 
      var text;
      console.log(pieData)
      pieData.forEach(element => {
              if(name === element['rank']){
                text = element['percentage'] + "%"
              }
            });
      percentageText.style("visibility", "visible").text(text);
    })
    .on("mouseout", function(d){percentageText.style("visibility", "hidden")})
    .on("click", function(d) { 
        //return console.log(this.parentNode.lastChild.innerHTML);
        var name = this.parentNode.lastChild.innerHTML;
        var transf = this.parentNode.parentNode.getAttribute('transform');
        var rotation;

        if(transf.includes("rotate")){
            rotation = transf.split("rotate")[1];
            rotation = rotation.split("(")[1];
            rotation = rotation.split(")")[0];
        }
        else{
            rotation = 0;
        }
       
        let attrs = this.getAttribute('d');
        //console.log(name);
        var attributes = attrs.split(",");
        
        //return console.log((startAngle + endAngle)/2);
        var startAngle = parseInt(attributes[0].split("M")[1])
        var endAngle = parseInt(attributes[1])
        
/*
        // The amount we need to rotate:
        var rotate = 180 - (startAngle + 90)/2 / Math.PI * 180;
        var endAngle;
        pieData.forEach(element => {
              if(name === element['rank']){
                endAngle = 90 - startAngle+Math.PI*element['percentage']/100;
                RotateThis(endAngle)
              }
            });
*/
            
          pieData.forEach(element => {
            if(name === element['rank']){
              rankText.text(element['text']);
            }
          });
        // Transition the pie chart
        if(name === "Bronze")
        {
            RotateThis(60)         
            deleteChart()
            ChangeChart(bronzeData);   
        }
        else if(name === "Silver")
        {
            RotateThis(350)
            deleteChart()
            ChangeChart(silverData);
        }
        else if(name === "Gold")
        {
            RotateThis(290)
            deleteChart()
            ChangeChart(goldData);
        }
        else if(name === "Platinum")
        {
            RotateThis(210)
            deleteChart()
            ChangeChart(platinumData);
        }
        else if(name === "Diamond")
        {
            RotateThis(137)
            deleteChart()
            ChangeChart(diamondData);
        }
        else if(name === "Master")
        {
            RotateThis(98)
            deleteChart()
        }
        else if(name === "Predator")
        {
            RotateThis(92)
            deleteChart()
        }        
    });    

    var text = arc.append("text")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ") rotate(" + (-60) +  ")"; })
      .attr("dy", "0.35em")
      .text(function(d) { return d.data.rank; });

    function RotateThis(rotate){
            g.transition()
            .attr("transform",  "translate(" + width / 1.7 + "," + height / 1.58 + ") rotate(" + rotate + ")")
            .duration(1000);

            // Τransition the labels:
            text.transition()
            .attr("transform", function(dd) {
            return "translate(" + label.centroid(dd) + ") rotate(" + (-rotate) + ")"; })
            .duration(1000);
    }


//divisions pie chart code
  ChangeChart(bronzeData);

  var divPieSvg = d3.selectAll(".divPie").style("visibility", "visible")
  function deleteChart(){ divPieSvg.selectAll("g").remove()}

  var div = d3.select(".divPie").append("div")	
  .attr("class", "tooltipPIE")				
  .style("opacity", 0);

  function hideChart(){d3.selectAll(".divPieChart").style("visibility", "hidden")}

  function ChangeChart(divPieData){
    currentDivPieData = divPieData;   
    divPieSvg = d3.selectAll(".divPieChart").style("visibility", "visible")
    divPieWidth = +divPieSvg.attr("width"),
    divPieHeight = +divPieSvg.attr("height"),
    divPieRadius = Math.min(divPieWidth, divPieHeight) / 2,
    divG = divPieSvg.append("g").attr("transform", "translate(" + divPieWidth / 2 + "," + divPieHeight / 2 + ") rotate(" + 60 + ")")

    var divPie = d3.pie()
        .sort(null)
        .value(function(d) { return d.percentage; });

    var divPath = d3.arc()
        .outerRadius(divPieRadius - 10)
        .innerRadius(0);

    var divLabel = d3.arc()
        .outerRadius(divPieRadius - 40)
        .innerRadius(divPieRadius - 40);

    var divArc = divG.selectAll(".arc")
        .data(pie(divPieData))
        .enter().append("g")
          .attr("class", "arc");

    divArc.append("path")
        .attr("d", divPath)
        .attr("fill", function(d) { return d.data.color; })    
        .on("mousemove", function(d){  
            var colors = this.getAttribute('fill');
            var name = this.parentNode.lastChild.innerHTML;
            var text;
            currentDivPieData.forEach(element => {
              if(name === element['rank']){
                text = element['percentage']
              }
            });
            console.log(event)
            div.style("opacity", 1)
            div.html(text + "%")	
                  .style("left", event.clientX + 20 + "px")		
                  .style("top",  event.clientY - 20 + "px");
          })
        .on("mouseout", function(d){
          div.transition()		
                .duration(50)		
                .style("opacity", 0);
        });    

    var divText = divArc.append("text")
      .attr("transform", function(d) { return "translate(" + divLabel.centroid(d) + ") rotate(" + (-60) +  ")"; })
      .attr("dy", "0.35em")
      .text(function(d) { return d.data.rank; });
}