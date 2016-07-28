$(document).ready(function() {

	//custom scripting goes here



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
