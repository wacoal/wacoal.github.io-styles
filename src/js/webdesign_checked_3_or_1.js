



// var $ = require('jquery');

$(function(){
  console.log("test");
  //ページ内スクロール
  $("a[href^='#']").on("click",function(){
		let href= $(this).attr("href");
		let target = $(href == "#" || href == "" ? 'html' : href);
		let position = target.offset().top-60;
		$("html, body").animate({scrollTop:position}, 500, "swing");
		return false;
	});
});
