$(document).ready(function(){function t(t,a){var n=$("#chart-wrapper").width(),r=340,o=d3.scale.linear().domain([0,d3.max(t,function(t){return t.dollars})]).range([0,n]),l=d3.scale.ordinal().domain(d3.range(t.length)).rangeRoundBands([0,r],.3),c=d3.select(a).append("svg").attr("width",n).attr("height",r).attr("id","chart");c.selectAll("rect").data(t).enter().append("rect").attr("x",function(t){return o(0)}).attr("y",function(t,a){return l(a)}).attr("width",function(t){return o(t.dollars)}).attr("height",l.rangeBand()).attr("fill","#2b6188"),c.selectAll("text").data(t).enter().append("text").text(function(t){return t.name}).attr("x",function(t){return o(.5)}).attr("y",function(t,a){return e>650?l(a)+13:l(a)}).attr("fill","white").attr("class","labels")}var a=[],e=$(window).width;$.getJSON("js/data.json",function(e){a=e,t(a,"#chart-wrapper")}),$(window).resize(function(){setTimeout(function(){chartWidth=$("#chart-wrapper").width(),$("#chart").remove(),t(a,"#chart-wrapper")},250)}),$("#panel4").on("click",function(){$("#panel2").animate({left:"2%"},750),$("#panel3").animate({left:"4%"},775),$("#panel4").animate({left:"6%"},800),$("#tab1, #tab2, #tab3").css("background-color","#232322"),$("#tab4").css("background-color","#713032")}),$("#panel3").on("click",function(){$("#panel2").animate({left:"2%"},750),$("#panel3").animate({left:"4%"},775),$("#panel4").animate({left:"98%"},800),$("#tab1, #tab2, #tab4").css("background-color","#232322"),$("#tab3").css("background-color","#713032")}),$("#call2Action, #panel2").on("click",function(){$("#panel2").animate({left:"2%"},800),$("#panel3").animate({left:"96%"},775),$("#panel4").animate({left:"98%"},800),$("#tab1, #tab3, #tab4").css("background-color","#232322"),$("#tab2").css("background-color","#713032"),$("#story-container1").hide("slide",{direction:"left"},822)}),$("#panel1").on("click",function(){$("#panel2").animate({left:"94%"},700),$("#panel3").animate({left:"96%"},750),$("#panel4").animate({left:"98%"},800),$("#tab2, #tab3, #tab4").css("background-color","#232322"),$("#tab1").css("background-color","#713032"),$("#contentHeader").show("slide",{direction:"left"},595)}),$(window).scroll(function(){var t=$(this).scrollTop();t>=$("#contentHeader").height()?$("#accordion").fadeIn("slow").addClass("fixed"):$("#accordion").fadeOut("slow").removeClass("fixed")}),$(function(){$('a[href*="#"]:not([href="#"])').click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var t=$(this.hash);if(t=t.length?t:$("[name="+this.hash.slice(1)+"]"),t.length)return $("html, body").animate({scrollTop:t.offset().top},1e3),!1}})});var n=new Date,r=n.getFullYear();$(".copyright").text(r)});
//# sourceMappingURL=scripts-bundle.js.map
