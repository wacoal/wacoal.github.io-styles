import Util from './Util.js'

// Application entry point
window.onload = () => {
  const date = Util.formatDate()
  console.log('[' + date + '] Application was launched.')

  const elm = document.querySelector('.date')
  if (elm) {
    elm.textContent = date
  }
}

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
