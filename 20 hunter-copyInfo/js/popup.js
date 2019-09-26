$(document).ready(function(){
	$("#copyInfoBtn").click(function(){
		
		// 动态执行JS代码
		//chrome.tabs.executeScript(tabId, {code: 'document.body.style.backgroundColor="red"'});
		
		// 动态执行JS文件
		//chrome.tabs.executeScript(tabId, {file: 'some-script.js'});
	});	
});