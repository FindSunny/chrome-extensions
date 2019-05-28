var ___hostName = window.location.hostname;

/**
* 删除知乎回答中的多媒体资源
*/
function ___removeMediasFromResult() {
	// remove header / ads
	$('#root header, .Question-sideColumn').remove();
	
	// remove imgs / videos
	$('.ListShortcut').find('figure, .RichText-video').remove();
}

/**
* Quora网站 免登陆查看回答
*/
function ___removeLoginModal() {
	// 去掉弹出框
	$('.BaseSignupForm').parent().remove();
	// 删除模糊状态
	$('.signup_wall_prevent_scroll').removeClass('signup_wall_prevent_scroll');
}

/**
* 慕课网去除登陆框
*/
var ____timer = '';
function ___startTimer(){
	____timer = setInterval('___removeLoginDialog()', 1000);
}
function ___removeLoginDialog(){	
	$('#signin').remove();
	$('.modal-backdrop').removeClass('modal-backdrop');
	if (____timer) {
		clearInterval(____timer);
	}
}

// 主逻辑
switch (___hostName) {
	case "www.zhihu.com":
		___removeMediasFromResult();
		$(document).scroll(function(){
			___removeMediasFromResult();
		});	
		break;
		
	case "www.quora.com":
		___removeLoginModal();
		break;
		
	case "www.imooc.com":
		___startTimer();
		break;
}











