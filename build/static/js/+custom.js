$(document).ready(function() {

	//custom scripting goes here

	var breakeven = [];

	// Break even D3 bar graph

	$.getJSON("js/data.json", function(data) {
		breakeven = data;
		drawChart(breakeven, "#chart-wrapper");
	});

	function drawChart(data, targetDiv) {
		var w = $("#chart-wrapper").width(),
		 	h = 300;

		var xScale = d3.scale.linear()
						.domain([0, d3.max(data, function (d) {
							return d.dollars;
						})])
						.range([0, w]);

	 	var yScale = d3.scale.ordinal()
						.domain(d3.range(data.length))
						.rangeRoundBands([0, h], 0.5);

		var svg = d3.select(targetDiv)
					.append("svg")
					.attr("width", w)
					.attr("height", h)
					.attr("id", "chart");

		svg.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
			.attr("x", function(d) {
				return xScale(0);
			})
			.attr("y", function(d, i) {
				return yScale(i);
			})
			.attr("width", function(d) {
				return xScale(d.dollars);
			})
			.attr("height", yScale.rangeBand())
			.attr("fill", "black");

		svg.selectAll("text")
			.data(data)
			.enter()
			.append("text")
			.text(function(d) {
				return d.name;
			})
			.attr("x", function(d) {
				return xScale(0);
			})
			.attr("y", function(d, i) {
				return yScale(i);
			})
			.attr("class", "labels");

	}


	$(window).resize(function() {

		setTimeout(function(){
			chartWidth = $("#chart-wrapper").width();
			$("#chart").remove();
			drawChart(breakeven, "#chart-wrapper");
		}, 250);

	});


	// horizontal accordion
	$('#panel3').on('click', function(){

		  $('#panel2').animate({"left":"3%"});
 		  $('#panel3').animate({"left":"6%"});

		  $('#tab1, #tab2').css("background-color", "#333333");
		  $('#tab3').css("background-color", "#e34e36");

     });


     /* Panel click pushes other panels out of way */
     $('#panel2').on('click', function(){

		 $('#panel2').animate({"left":"3%"});
		 $('#panel3').animate({"left":"97%"});

		 $('#tab1, #tab3').css("background-color", "#333333");
		 $('#tab2').css("background-color", "#e34e36");


     });

     /* Panel 1 click pushes other panels out of way */
     $('#panel1').on('click', function(){

         $('#panel2').animate({"left":"94%"});
         $('#panel3').animate({"left":"97%"});

		 $('#tab2, #tab3').css("background-color", "#333333");
		 $('#tab1').css("background-color", "#e34e36");
     });




	// injecting current year into footer
	// DO NOT DELETE

	var d = new Date();
	var year = d.getFullYear();

	$('.copyright').text(year);


	// some code blocks require javascript to function, like slideshows, synopsis blocks, etc
	// you can find that code here: https://github.com/DallasMorningNews/generator-dmninteractives/wiki/Cookbook



});
