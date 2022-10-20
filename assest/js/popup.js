
window.onload = function() {
    document.getElementById("btn-optins-page").onclick = function() {
        chrome.tabs.create({"url": "../view/newtab.html"});
        chrome.browserAction.setBadgeText({text: "opc"});

    }



    document.getElementById("sub").onclick = function() {
        let url = document.querySelector('#url').value;
        let palavras = document.querySelector('#palavras').value;
        console.log(palavras);
        var data = "url=" + url + "&palavras=" + encodeURIComponent(palavras);
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                document.querySelector('form').style.display="none";
            }
        });
        xhr.open("POST", "https://seo-miguel.glitch.me/add_palavras");
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(data);

    };
}



function post_palavras() {

}
