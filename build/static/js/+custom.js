$(document).ready(function() {

	//custom scripting goes here

	var stories = [];

	var breakeven = [];
	var windowWidth = $(window).width;


	// Break even D3 bar graph

	$.getJSON("js/data.json", function(data) {
		breakeven = data;
		drawChart(breakeven, "#chart-wrapper");
	});

	function drawChart(data, targetDiv) {
		var w = $("#chart-wrapper").width(),
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
			chartWidth = $("#chart-wrapper").width();
			$("#chart").remove();
			drawChart(breakeven, "#chart-wrapper");
		}, 250);

	});

	$(window).scroll(function() {
		var distanceFromTop = $(this).scrollTop();
		if (distanceFromTop >= $('#contentHeader').height()) {
			$('#nav').fadeIn().addClass('fixed');
		} else {
			$('#nav').fadeOut(0).removeClass('fixed');
		}
	});

	$(window).scroll(function() {
		stories = [];
		$.each($(".story"), function () {
			console.log($(this).offset().top);
			if ($(this).offset().top < $(window).scrollTop() + ($(window).height() / 2)) {
				stories.push($(this));
			}
		});
		var target = stories.length - 1;
		console.log(target);
		$("li").removeClass("active");
		$("li").eq(target).addClass("active");
	});

	$('#tab1').on('click', function(){

		  $('#tab2, #tab3, #tab4').css("background-color", "#713032").removeClass("active");
		  $(this).css("background-color", "#232322").addClass("active");

		//   $('#story1').show();
		//   $('#story2, #story3, #story4').hide();
     });

	 $('#tab2').on('click', function(){

		   $('#tab1, #tab3, #tab4').css("background-color", "#713032").removeClass("active");
		   $(this).css("background-color", "#232322").addClass("active");

		//    $('#story2').show();
		//    $('#story1, #story3, #story4').hide();
	 });

	 $('#tab3').on('click', function(){

		   $('#tab1, #tab2, #tab4').css("background-color", "#713032").removeClass("active");
		   $(this).css("background-color", "#232322").addClass("active");

		//    $('#story3').show();
		//    $('#story1, #story2, #story4').hide();
	 });

	 $('#tab4').on('click', function(){

		   $('#tab1, #tab2, #tab3').css("background-color", "#713032").removeClass("active");
		   $(this).css("background-color", "#232322").addClass("active");

		//    $('#story4').show();
		//    $('#story1, #story2, #story3').hide();
	 });



	$(function() {
		$("#story2").lazyload();
	});

	// // horizontal accordion
	// $('#panel4').on('click', function(){
	//
	// 	  $('#panel2').animate({"left":"2%"}, 750);
 // 		  $('#panel3').animate({"left":"4%"}, 775);
	// 	  $('#panel4').animate({"left":"6%"}, 800);
	//
	// 	  $('#tab1, #tab2, #tab3').css("background-color", "#232322");
	// 	  $('#tab4').css("background-color", "#713032");
	//
	// 	//   $('#contentHeader').hide('slide', {direction: 'left'}, 850);
    //  });
	//
	//
	//
	// // horizontal accordion
	// $('#panel3').on('click', function(){
	//
	// 	  $('#panel2').animate({"left":"2%"}, 750);
 // 		  $('#panel3').animate({"left":"4%"}, 775);
	// 	  $('#panel4').animate({"left":"98%"}, 800);
	//
	// 	  $('#tab1, #tab2, #tab4').css("background-color", "#232322");
	// 	  $('#tab3').css("background-color", "#713032");
	//
	// 	//   $('#contentHeader').hide('slide', {direction: 'left'}, 850);
    //  });
	//
	//
    //  /* Panel click pushes other panels out of way */
    //  $('#call2Action, #panel2').on('click', function(){
	//
	// 	 $('#panel2').animate({"left":"2%"}, 800);
	// 	 $('#panel3').animate({"left":"96%"}, 775);
	// 	 $('#panel4').animate({"left":"98%"}, 800);
	//
	// 	 $('#tab1, #tab3, #tab4').css("background-color", "#232322");
	// 	 $('#tab2').css("background-color", "#713032");
	//
	// 	 $('#story-container1').hide('slide', {direction: 'left'}, 822);
	//
    //  });
	//
    //  /* Panel 1 click pushes other panels out of way */
    //  $('#panel1').on('click', function(){
	//
    //      $('#panel2').animate({"left":"94%"}, 700);
    //      $('#panel3').animate({"left":"96%"}, 750);
	// 	 $('#panel4').animate({"left":"98%"}, 800);
	//
	// 	 $('#tab2, #tab3, #tab4').css("background-color", "#232322");
	// 	 $('#tab1').css("background-color", "#713032");
	//
	// 	 $('#contentHeader').show('slide', {direction: 'left'}, 595);
    //  });





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
