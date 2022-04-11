const nav = document.querySelector(".nav");

const fixNav = () => {
    nav.addEventListener("click", function(){
        
    });
    if (window.scrollY > nav.offsetHeight) nav.classList.add("active");
    else nav.classList.remove("active");
};

window.addEventListener("scroll", fixNav);



function selNavi(selMenu){

    if(selMenu == null){
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
    }


    var sel, el = document.getElementsByClassName("selMenu");
    if(el.length > 0){
        el.classList.remove("selMenu");
    }
    switch(selMenu){
        case "study":
            sel = document.getElementsByClassName("navi-study")[0];
            break;
        case "project":
            sel = document.getElementsByClassName("navi-project")[0];
            break;
        case "about":
            sel = document.getElementsByClassName("navi-about")[0];
            break;
    }

    sel.classList.add("selMenu");
}

selNavi(null);







