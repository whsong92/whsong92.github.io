document.addEventListener("DOMContentLoaded", function(){
    init();   
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
    var navi = "";
    switch(goPage){        
        case "study":
            content = "study.html";
            navi = 'navigate.html';
            break;
        case "project":
            content = "project.html";
            navi = 'navigate.html';
            break;
        case "about":
            content = "about.html";
            navi = 'navigate.html';
            break;
        default :
            content = "study.html";
            navi = 'navigate.html';
            break;
    }
    swh.loadComponent(".navi-div", navi);
    swh.loadPages(".content-div", content);
}
