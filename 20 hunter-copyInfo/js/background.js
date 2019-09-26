// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// The onClicked callback function.
function onClickHandler(info, tab) {
	
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
	chrome.browserAction.setIcon({path:"../img/icon.png"});
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"});
	});
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  // Create one test item
  chrome.contextMenus.create({"title": "~~~获取个人信息~~~", "id": "parent"});
});

chrome.runtime.onMessage.addListener(
	function(request, sender) {
		// read `newIconPath` from request and read `tab.id` from sender
		chrome.browserAction.setIcon({path:"../img/logo.png"});
	}
);