"use strict";

// var $ = require('jquery');

$(function () {
		console.log("test");
		//ページ内スクロール
		$("a[href^='#']").on("click", function () {
				var href = $(this).attr("href");
				var target = $(href == "#" || href == "" ? 'html' : href);
				var position = target.offset().top - 60;
				$("html, body").animate({ scrollTop: position }, 500, "swing");
				return false;
		});
});