document.addEventListener("DOMContentLoaded", function(){
    init();   
    //test();
});

function init(){
    var curUrl = location.href;
    var params = new Map();
    //파라미터가 있는 경우
    if(curUrl.indexOf("?") > 0){
        var paramList = curUrl.split("?")[1];
        var list = paramList.split("&");
        for(var i=0; i < list.length; i++){
            var p = list[i].split("=");
            if(p.length < 2){
                continue;
            }
            params.set(p[0], p[1]);
        }
    }
    var goPage = params.get("page");
    var content = "";
    switch(goPage){        
        case "study":
            content = "study.html";
            break;
        case "project":
            content = "project.html";
            break;
        case "about":
            content = "about.html";
            break;
        default :
            content = "study.html";
            break;
    }
    loadNavi();
    loadLeft();
    loadContent(content);
}


function loadNavi(){
    var prefix = "./component/";
    var fullUrl = prefix + 'navigate.html';
    var target = document.querySelector(".navi-div");
    loadHtml(target, fullUrl);
}

function loadLeft(){
    var prefix = "./component/";
    var fullUrl = prefix + 'left.html';
    var target = document.querySelector(".left-menu");
    loadHtml(target, fullUrl);
}

function loadContent(content_url){
    var prefix = "./content/";
    var fullUrl = prefix + content_url;
    var target = document.querySelector(".content-div");
    loadHtml(target, fullUrl);
}

function loadHtml(target, url){
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            target.innerHTML  = this.responseText;

            var script_list = target.querySelectorAll("script");
            for(var i=0; i < script_list.length; i++){
                if(script_list[i].src){
                    loadScript(script_list[i].src);
                }
            }
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}

function loadScript(url, callback = null){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    if(callback){
        script.onreadystatechange = callback;
        script.onload = callback;
    }

    // Fire the loading
    document.body.appendChild(script);
}


function test(){
    alert("test");
}