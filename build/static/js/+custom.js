$(document).ready(function() {

	//custom scripting goes here

	var stories = [];

	var breakeven = [];
	var windowWidth = $(window).width;


	// Break even D3 bar graph

	$.getJSON("js/data.json", function(data) {
		breakeven = data;
		drawChart(breakeven, "#permian-chart");
	});

	function drawChart(data, targetDiv) {
		var w = $("#permian-chart").width(),
		 	h = 340;

		var xScale = d3.scale.linear()
						.domain([0, d3.max(data, function (d) {
							return d.dollars;
						})])
						.range([0, w]);

	 	var yScale = d3.scale.ordinal()
						.domain(d3.range(data.length))
						.rangeRoundBands([0, h], 0.3);


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
			.attr("fill", "#2b6188");


		svg.selectAll("text")
			.data(data)
			.enter()
			.append("text")
			.text(function(d) {
				return d.name;
			})
			.attr("x", function(d) {
				return xScale(0.5);
			})
			.attr("y", function(d, i) {
				if (windowWidth > 650) {
					return yScale(i) + 13;
				} else {
					return yScale(i);
				}
			})
			.attr("fill", "white")
			.attr("class", "labels");

	}


	$(window).resize(function() {

		setTimeout(function(){
			chartWidth = $("#permian-chart").width();
			$("#chart").remove();
			drawChart(breakeven, "#permian-chart");
		}, 250);

	});

	// $(window).scroll(function() {
	// 	var distanceFromTop = $(this).scrollTop();
	// 	if (distanceFromTop >= $('#contentHeader').height()) {
	// 		$('#nav').fadeIn().addClass('fixed');
	// 	} else {
	// 		$('#nav').fadeOut(0).removeClass('fixed');
	// 	}
	// });

console.log(stories);

	$(window).scroll(function() {
		var distanceFromTop = $(this).scrollTop();
		if (distanceFromTop >= $('#contentHeader').height()) {
			$('#nav').fadeIn().addClass('fixed');
		} else {
			$('#nav').fadeOut(0).removeClass('fixed');
		}

		stories = [];
		$.each($(".story"), function() {

			if ($(this).offset().top < $(window).scrollTop() + ($(window).height() / 4)) {
				stories.push($(this));
			}

		});
		var target = stories.length - 1;
		console.log(target);
		$(".nav-bar ul li").removeClass("active");
		$(".nav-bar ul li").eq(target).addClass("active");
	});



	 $(function() {
	  $('a[href*="#"]:not([href="#"])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = (target.length + 100) ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html, body').animate({
	          scrollTop: target.offset().top
	        }, 1000);
	        return false;
	      }
	    }
	  });
	});

	// injecting current year into footer
	// DO NOT DELETE

	var d = new Date();
	var year = d.getFullYear();

	$('.copyright').text(year);


	// some code blocks require javascript to function, like slideshows, synopsis blocks, etc
	// you can find that code here: https://github.com/DallasMorningNews/generator-dmninteractives/wiki/Cookbook



});
