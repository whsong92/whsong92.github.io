const logoBtn = document.querySelector(".navi-logo");
const homeBtn = document.querySelector(".navi-home");
const studyBtn = document.querySelector(".navi-study");
const projectBtn = document.querySelector(".navi-project");
const aboutBtn = document.querySelector(".navi-about");


logoBtn.addEventListener("click", logoClick);
homeBtn.addEventListener("click", homeClick);
studyBtn.addEventListener("click", studylick);
projectBtn.addEventListener("click", projectClick);
aboutBtn.addEventListener("click", aboutClick);

function logoClick(){
    location.href="/blog/index.html";
}
function homeClick(){
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
    selMenu = params.get("page");
    switch(selMenu){
        case "study":
            location.href="/blog/public/page/main.html?page=study";
            break;
        case "project":
            location.href="/blog/public/page/main.html?page=project";
            break;
        case "about":
            location.href="/blog/public/page/main.html?page=about";
            break;
    }
}
function studylick(){
    location.href="/blog/public/page/main.html?page=study";
}
function projectClick(){
    location.href="/blog/public/page/main.html?page=project";
}
function aboutClick(){
    location.href="/blog/public/page/main.html?page=about";
}

