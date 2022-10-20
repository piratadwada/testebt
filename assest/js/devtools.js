console.log("hello from devtools");
chrome.devtools.panels.create(
"Estatistica SEO",
"assest/icon.png",
"../view/panel.html",
function(panel) { console.log("hello from callback"); });


chrome.devtools.panels.elements.createSidebarPane("Sidebar SEO",
    function(sidebar) {
        sidebar.setPage("../view/panel.html");
        sidebar.setHeight("8ex");
        sidebar.setObject({ key: "value",chave: "valor" });
});
