$(document).ready(function() {

	//custom scripting goes here

	var stories = [];
	var windowWidth = $(window).width();
	var counter = 0;
	var sectionHeads = ["#section2", "#section3", "#section4", "#section5"];


	// all chart variables



	// breakeven chart variables
	var breakeven = [];
	var decFormat = d3.format("$,.2f");


	// media chart variables
	var media = [];
	var comFormat = d3.format("$,");







	// Scroll function for nav bar

	$(window).scroll(function() {
		var distanceFromTop = $(this).scrollTop();
		if (distanceFromTop > $('.intro-end').offset().top + $('.intro-end').height()) {
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
		counter = target;

		$(".nav-bar ul li").removeClass("active");
		$(".nav-bar ul li").eq(target).addClass("active");

		if (counter === 0) {
			$('.fa-chevron-left').hide();
		} else if (counter === sectionHeads.length - 1) {
			$('.fa-chevron-right').hide();
		} else {
			$('.fa-chevron-left, .fa-chevron-right').show();
		}

	});

	$('.fa-chevron-left').click(function() {
		if (counter > 0) {
			counter --;
			$('html, body').animate({
				scrollTop: $(sectionHeads[counter]).offset().top - 70
			}, 2000);
		}
	});

	$('.fa-chevron-right').click(function() {
		if (counter < sectionHeads.length - 1) {
			counter ++;
			$('html, body').animate({
				scrollTop: $(sectionHeads[counter]).offset().top - 70
			}, 2000);
		}
	});


    $('.fa-chevron-circle-down').click(function() {
        if (windowWidth < 950) {
			$('.nav-bar').find('.nav-bar-expand').slideToggle();
		}
    });

	$('.nav-bar-expand ul a li, .fa-times-circle').click(function() {
		$('.nav-bar-expand').slideToggle();
	});











	// Scroll animation

	 $(function() {
	  $('.nav-bar a, .nav-bar-expand a').click(function() {
		var a = $(this).index();
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = (target.length + 100) ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length && a !== 0) {
	        $('html, body').animate({
	          scrollTop: target.offset().top - 70
	        }, 1000);
	        return false;
		} 
	    }
	  });
	});

	$(".scrollDown").click(function(e) {
	    e.preventDefault();

	    var target = $(this).parent("a").attr("href");

	    $("html, body").animate({
	        scrollTop: $(target).offset().top - 200
	    }, 1000);
	});

   // function() {
   // ('.scrollDown').click(function() {
   //  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
   // var target = $(this.hash);
   // target = (target.length + 100) ? target : $('[name=' + this.hash.slice(1) +']');
   // if (target.length) {
   //   $('html, body').animate({
   //  scrollTop: target.offset().top - 200
   //   }, 1000);
   //   return false;
   // }
   //  }
   // );
   // });










	// Breakeven D3 bar graph

	$.getJSON("js/breakeven.json", function(data) {
		breakeven = data;
		drawChart(breakeven, "#permian-chart");
	});

	function drawChart(data, targetDiv) {


		var w = $("#permian-chart").width(),
		 	h = 800;

		var xScale = d3.scale.linear()
						.domain([0, d3.max(data, function (d) {
							return d.dollars;
						})])
						.range([0, w]);

	 	var yScale = d3.scale.ordinal()
						.domain(d3.range(data.length))
						.rangeRoundBands([0, h], 0.6);

		var svg = d3.select(targetDiv)
					.append("svg")
					.attr("width", w)
					.attr("height", h)
					.attr("id", "chart1");




		svg.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
			.attr("x", function(d) {
				return xScale(0);
			})
			.attr("y", function(d, i) {
				return yScale(i) + 3;
			})
			.attr("width", function(d) {
				return xScale(d.dollars);
			})
			.attr("height", yScale.rangeBand())
			.attr("class", function(d) {
				if (d.shell === "permian") {
					return "permian-bar";
				} else {
					return "bakken-bar";
				}
			});


		svg.selectAll("text")
			.data(data)
			.enter()
			.append("text")
			.text(function(d) {
				return d.name + " | " + decFormat(d.dollars);
			})
			.attr("x", function(d) {
				return xScale(0);
			})
			// .attr("y", function(d, i) {
			// 	if (windowWidth > 650) {
			// 		return yScale(i) + 17;
			// 	} else {
			// 		return yScale(i);
			// 	}
			// })
			.attr("y", function(d, i) {
				return yScale(i) - 3;
			})
			.attr("class", "labels");

	}




	// media d3 chart

	$.getJSON("js/media.json", function(data) {
		media = data;
		drawChart2(media, "#media-chart");
	});


	function drawChart2(data, targetDiv) {


		var w = $("#media-chart").width(),
		 	h = 400;


		var xScale = d3.scale.ordinal()
						.domain(d3.range(data.length))
						.rangeRoundBands([0, w], 0.25);

		var yScale = d3.scale.linear()
						.domain([0, d3.max(data, function (d) {
							return d.dollars;
						})])
						.range([0, (h - 50)]);

		var svg = d3.select(targetDiv)
					.append("svg")
					.attr("width", w)
					.attr("height", h)
					.attr("id", "chart2");




		svg.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
			.attr("x", function(d, i) {
				return xScale(i);
			})
			.attr("y", function(d) {
				return h - yScale(d.dollars) - 20;
			})
			.attr("height", function(d) {
				return yScale(d.dollars);
			})
			.attr("width", xScale.rangeBand())
			.attr("class", "permian-bar");


		svg.selectAll(".years")
			.data(data)
			.enter()
			.append("text")
			.text(function(d) {
				return d.name;
			})
			.attr("x", function(d, i) {
				return xScale(i) + xScale.rangeBand() / 2;
			})
			.attr("y", function(d) {
				return h - yScale(0.5);
			})
			.attr("text-anchor", "middle")
			.attr("class", "years");


		svg.selectAll(".totals")
			.data(data)
			.enter()
			.append("text")
			.text(function(d) {
				return comFormat(d.dollars);
			})
			.attr("x", function(d, i) {
				return xScale(i) + xScale.rangeBand() / 2;
			})
			.attr("y", function(d) {
				return h - yScale(d.dollars) - 30;
			})
			.attr("text-anchor", "middle")
			.attr("class", "totals");

	}


	function wrap(text, width) {
	  text.each(function() {
	    var text = d3.select(this),
	        words = text.text().split(/\s+/).reverse(),
	        word,
	        line = [],
	        lineNumber = 0,
	        lineHeight = 1.1, // ems
	        y = text.attr("y"),
	        dy = parseFloat(text.attr("dy")),
	        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
	    while (word === words.pop()) {
	      line.push(word);
	      tspan.text(line.join(" "));
	      if (tspan.node().getComputedTextLength() > width) {
	        line.pop();
	        tspan.text(line.join(" "));
	        line = [word];
	        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
	      }
	    }
	  });
	}





	$(window).resize(function() {

		setTimeout(function(){
			chartWidth = $("#permian-chart").width();
			$("#chart1, #chart2").remove();
			drawChart(breakeven, "#permian-chart");
			drawChart2(media, "#media-chart");
		}, 250);

	});





	// videos

	var $videoWrapper = '';

    if ($('.ndn_embed')) {
        $videoWrapper = $('.ndn_embed');
        scaleVideo();
    }

        function scaleVideo() {

            videoWidth = $videoWrapper.width(); //grabs the width of the video player
            videoHeight = videoWidth * 0.5625; //sets a variable equal to 56.25% of the width (the correct aspect ratio for the videos)

            $videoWrapper.css('height', videoHeight); //assings that height variable as the player's height in the css
        }


    $(window).resize(function() {
        scaleVideo(); //runs the video aspect resizer when the width of the browser is changed
    });







	// injecting current year into footer
	// DO NOT DELETE

	var d = new Date();
	var year = d.getFullYear();

	$('.copyright').text(year);


	// some code blocks require javascript to function, like slideshows, synopsis blocks, etc
	// you can find that code here: https://github.com/DallasMorningNews/generator-dmninteractives/wiki/Cookbook



});
