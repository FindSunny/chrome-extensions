/** 工具定义区 **/
if (!String.prototype.deleteColon) {
	
	(function() {
		
		var deleteColon = function(search) {
			var toString = {}.toString;
			var string = String(this);
			// 如果是对象，抛出异常
			if (string && toString.call(string) == '[object RegExp]') {
				throw TypeError();
			}		
			
			string = string.trim();
			
			var stringLength = string.length;
			var colonIndex = string.indexOf("：");
			console.log(string + " -- " + colonIndex);
			
			if (colonIndex > 0 && colonIndex < (stringLength - 1)) {
				return string.slice(colonIndex + 1, stringLength);
			}

			return string.trim();
		}
		String.prototype.deleteColon = deleteColon;
		
		window.SF_getPersonInfo = function () {
			/* 基础信息 */
			var person = {
				"company": "",
				"name": "",
				"gender": "",
				"age": "",
				"degree": "",
				"workYears": "",
				"telphone": "",
				"wechat": "",
				"email": "",
				"location": "",
				"wantLocation": "",
				"office": ""
			}

			var $basicInfo = $(".resume-basic-info");
			if ($basicInfo.length > 0) {
				// 格式化
				var $basicInfos = $basicInfo.eq(0).find("tbody tr");

				// 姓名, 性别
				person.name = $basicInfos.eq(0).find(".name").html().deleteColon();
				person.gender = $basicInfos.eq(0).find("td").eq(1).html().deleteColon();
				
				// 工作年限, 年龄
				person.workYears = $basicInfos.eq(1).find("td").eq(0).html().deleteColon();
				person.age = $basicInfos.eq(1).find("td").eq(1).html().deleteColon();
				
				// 电子邮件, 学历
				//person.email = $basicInfos.eq(2).find("td").eq(0).html().trim();
				person.degree = $basicInfos.eq(2).find("td").eq(1).html().deleteColon();
				
				// 电话(微信)
				//person.telphone = $basicInfos.eq(3).find("td").eq(0).html().trim();
				person.wechat = person.telphone;
				
				// 所在地
				person.location = $basicInfos.eq(3).find("td").eq(1).html().deleteColon();
				
				
				if ($(".buttons-warp").length > 0) {
					// 目前所在公司
					person.company = $(".buttons-warp").nextAll("table").eq(0).find("tbody > tr").eq(0).find("td").eq(1).html().deleteColon();
					
					// 期望职位
					person.office = $(".buttons-warp").nextAll("table").eq(0).find("tbody > tr").eq(1).find("td").eq(0).html().deleteColon();;
					
					// 所在职位
					person.wantLocation = $(".buttons-warp").nextAll("table").eq(1).find("tbody > tr").eq(2).find("td").eq(0).html().deleteColon();
				}
				
				console.log(person);
				var data = person.company + "\t"
						+ person.location + "\t"
						+ person.wantLocation +"\t"
						+ "\t"
						+ person.name + "（" + person.gender + "）" + "\t"
						+ person.age + "\t"
						+ person.office + "\t"
						+ "\t"
						+ person.telphone + "\t"
						+ person.wechat + "\t"
						+ person.email + "\t"
						+ person.degree;
				return data;
			} else {
				//alert("测试失败");
				//console.log("jiazai");
			}
		}
		
		window.SF_getPhoneAndEmail = function () {
			
		}

	}());
}
/**工具定义区**/

/* onmessage */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(sender.tab ?
			"from a content script:" + sender.tab.url :
			"from the extension");
			console.log(request);
	if (request.greeting == "hello") {		
		var data = SF_getPersonInfo();
		if (!data) {
			return;
		}
		
		// 粘贴数据
		// 使用的Copy方法来自： https://clipboardjs.com/#example-action
		var $trigger = $("<input id='SF_getPersonInfo' type='hidden' data-clipboard-text=''>");
		$trigger.attr("data-clipboard-text", data);
		
		$("body").append($trigger);
		new ClipboardJS('#SF_getPersonInfo');
		$trigger.trigger("click");
		
		//测试改变图标
		// send message to background script
		chrome.runtime.sendMessage({ "IconPath" : "default" });
	}
	return false;
});