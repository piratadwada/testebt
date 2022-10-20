chrome.browserAction.setBadgeText({text: "SEO"});
chrome.browserAction.setBadgeBackgroundColor({color: "#258"})

// background.js

chrome.browserAction.onClicked.addListener(
  function(tab) {chrome.tabs.query({active: true, currentWindow: true},
  function(tabs) {var activeTab = tabs[0];chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});});
});


//ovindo mensagem
chrome.runtime.onMessage.addListener(function(res, send, senres){
  console.log(res);
})


function resert(){
  chrome.windows.create({"url": "http://localhost", "type":"panel"});
}
function genericOnClick(){
    chrome.contextMenus.create({"title": "Resert"});
    chrome.contextMenus.create({"title": "Estatistic","onclick":resert});
}

var contexts = ["page","selection","link","editable","image","video","audio"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var id = chrome.contextMenus.create({"title": "SEO TOOL", "contexts":[context],"onclick": genericOnClick});
  console.log("'" + context + "' item:" + id);
}
