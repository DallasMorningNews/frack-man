$(document).ready(function() {

	//custom scripting goes here

	var stories = [];

	var breakeven = [];
	var windowWidth = $(window).width();

	var format = d3.format("$,.2f");

	var counter = 0;

	var sectionHeads = ["#story1", "#section2", "#section3", "#section4"];


	// Break even D3 bar graph

	$.getJSON("js/data.json", function(data) {
		breakeven = data;
		drawChart(breakeven, "#permian-chart");
	});

	function drawChart(data, targetDiv) {
		var w = $("#permian-chart").width(),
		 	h = 750;

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
					.attr("id", "chart");

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
				return d.name + " | " + format(d.dollars);
			})
			.attr("x", function(d) {
				return xScale(0.5);
			})
			// .attr("y", function(d, i) {
			// 	if (windowWidth > 650) {
			// 		return yScale(i) + 17;
			// 	} else {
			// 		return yScale(i);
			// 	}
			// })
			.attr("y", function(d, i) {
				return yScale(i);
			})
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
				scrollTop: $(sectionHeads[counter]).offset().top
			}, 2000);
		}
	});

	$('.fa-chevron-right').click(function() {
		if (counter < sectionHeads.length - 1) {
			counter ++;
			$('html, body').animate({
				scrollTop: $(sectionHeads[counter]).offset().top
			}, 2000);
		}
	});


    $('.fa-chevron-circle-down').click(function() {
        if (windowWidth < 950) {
			$('.nav-bar').find('.nav-bar-expand').slideToggle();
		}
		// $('.nav-bar-expand').show();
    });

	// $('.nav-bar-expand').click(function() {
	// 	$('nav-bar-expand').hide();
	// });




	$(window).resize(function() {

		setTimeout(function(){
			chartWidth = $("#permian-chart").width();
			$("#chart").remove();
			drawChart(breakeven, "#permian-chart");
		}, 250);

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
